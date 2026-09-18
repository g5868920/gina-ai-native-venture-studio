/**
 * Phase 0A — canonical project identity, registry hardening, project isolation.
 * Authority: decisions/approvals/0010-phase-0a-canonical-identity-and-registry-hardening.md
 * Invariant under test (architecture §4): every operational project-scoped state
 * mutation must resolve to exactly one active canonical project_id.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { parse } from "yaml";
import { afterAll, describe, expect, it } from "vitest";
import {
  activeProjectIds,
  activeVentures,
  findVentureById,
  loadVentureRegistry,
  VENTURE_REGISTRY,
} from "../src/governance/venture-registry.js";
import {
  assertProjectScopeForWrite,
  ProjectScopeError,
  resolveIdentity,
  resolveProjectScopeForWrite,
  resolveSingleProjectScope,
} from "../src/governance/project-identity.js";
import {
  checkCanonicalRepository,
  isStaleCopyPath,
  loadCanonicalRepoAssertion,
} from "../src/governance/canonical-repo.js";
import {
  loadHistoricalVentureUpdate,
  loadVentureUpdate,
  parseFrontmatter,
  readHistoricalVentureUpdate,
  validateVentureUpdate,
} from "../src/portfolio/venture-update.js";
import { execFileSync } from "node:child_process";
import { isDirectInvocation, main as runCli } from "../src/cli.js";
import { symlinkSync } from "node:fs";
import { join as joinPath } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const W28_PM_WORKFLOW = "inputs/venture-updates/2026-W28/pm-workflow.md";
const W28_TWINKO = "inputs/venture-updates/2026-W28/twinko.md";

/**
 * Scratch root for fixtures, OUTSIDE the repository. Tests previously wrote under
 * generated/, which meant a read-only independent review could not execute the suite
 * at all — three consecutive reviews had to skip it. Nothing here touches the worktree.
 */
const SCRATCH = mkdtempSync(joinPath(tmpdir(), "studio-phase0a-"));

/**
 * Write a tampered copy of the real registry to a scratch path and load it through the
 * REAL loader. Integrity rules must be proven by the code under test, never restated
 * by the test itself.
 */
function expectRegistryRejects(tamper: (yaml: string) => string, pattern: RegExp): void {
  const original = readFileSync("governance/venture-registry.yaml", "utf8");
  const tampered = tamper(original);
  expect(tampered).not.toBe(original); // the tamper actually applied
  const tmp = joinPath(SCRATCH, `registry-${Math.abs(hash(pattern.source))}.yaml`);
  writeFileSync(tmp, tampered, "utf8");
  try {
    expect(() => loadVentureRegistry(tmp)).toThrow(pattern);
  } finally {
    rmSync(tmp, { force: true });
  }
}

// Leave the filesystem as we found it, not just the worktree: without this the suite
// accumulated one empty studio-phase0a-* directory per run in the OS temp directory.
afterAll(() => {
  rmSync(SCRATCH, { recursive: true, force: true });
});

/** Tiny deterministic string hash, only to keep scratch filenames distinct. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

describe("canonical active projects (Phase 0A §§1–2)", () => {
  it("nodi loads as an active canonical project", () => {
    const nodi = findVentureById("nodi");
    expect(nodi?.lifecycle).toBe("active");
    expect(nodi?.project_id).toBe("nodi");
    expect(resolveIdentity("nodi")).toMatchObject({ kind: "active", projectId: "nodi" });
  });

  it("twinko loads as an active canonical project", () => {
    const twinko = findVentureById("twinko");
    expect(twinko?.lifecycle).toBe("active");
    expect(twinko?.project_id).toBe("twinko");
    expect(resolveIdentity("twinko")).toMatchObject({ kind: "active", projectId: "twinko" });
  });

  it("nodi and twinko have distinct canonical project_ids, and they are the only active projects", () => {
    const ids = activeProjectIds().sort();
    expect(ids).toEqual(["nodi", "twinko"]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(activeVentures().map((v) => v.id).sort()).toEqual(["nodi", "twinko"]);
  });

  it("the registry file and the loader agree on the v0.2 fields — no silent stripping", () => {
    const raw = parse(readFileSync("governance/venture-registry.yaml", "utf8")) as {
      ventures: Record<string, unknown>[];
    };
    for (const rawVenture of raw.ventures) {
      const loaded = findVentureById(rawVenture["id"] as string);
      expect(loaded).toBeDefined();
      expect(loaded?.project_id).toBe(rawVenture["project_id"]);
      expect(loaded?.lifecycle).toBe(rawVenture["lifecycle"]);
      expect(loaded?.superseded_by).toBe(rawVenture["superseded_by"]);
    }
  });
});

describe("superseded identity (Phase 0A §§3, 5)", () => {
  it("pm-workflow is recognized as superseded, and its successor is explicitly nodi", () => {
    const resolution = resolveIdentity("pm-workflow");
    expect(resolution.kind).toBe("superseded");
    if (resolution.kind !== "superseded") throw new Error("expected superseded");
    expect(resolution.supersededBy).toBe("nodi");
    expect(resolution.canonicalProjectId).toBe("nodi");
    expect(resolution.supersededByDecision).toContain("0008");
  });

  it("pm-workflow is NOT a third active venture", () => {
    expect(activeVentures().some((v) => v.id === "pm-workflow")).toBe(false);
    expect(activeProjectIds()).not.toContain("pm-workflow");
  });

  it("an unrecognized identity resolves to unknown, and an empty one to missing", () => {
    expect(resolveIdentity("euno").kind).toBe("unknown");
    expect(resolveIdentity("").kind).toBe("missing");
    expect(resolveIdentity(null).kind).toBe("missing");
    expect(resolveIdentity("   ").kind).toBe("missing");
  });
});

describe("new-write protection (Phase 0A §6)", () => {
  it("rejects a new operational write against the superseded pm-workflow identity", () => {
    const result = resolveProjectScopeForWrite({ identity: "pm-workflow" });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected rejection");
    expect(result.code).toBe("superseded_identity");
    expect(result.reason).toContain("superseded");
  });

  it("names the canonical successor but does NOT silently rewrite the request", () => {
    const result = resolveProjectScopeForWrite({ identity: "pm-workflow" });
    if (result.ok) throw new Error("expected rejection");
    // The successor is offered for the caller to re-issue explicitly…
    expect(result.canonicalSuccessor).toBe("nodi");
    // …and the rejection stands. A rejected write never yields a usable project scope.
    expect(result).not.toHaveProperty("projectId");
    expect(() => assertProjectScopeForWrite({ identity: "pm-workflow" })).toThrow(ProjectScopeError);
  });

  it("accepts a new operational write against nodi", () => {
    expect(resolveProjectScopeForWrite({ identity: "nodi" })).toEqual({
      ok: true,
      projectId: "nodi",
      ventureId: "nodi",
    });
    expect(assertProjectScopeForWrite({ identity: "nodi" })).toBe("nodi");
  });

  it("accepts a new operational write against twinko", () => {
    expect(resolveProjectScopeForWrite({ identity: "twinko" })).toEqual({
      ok: true,
      projectId: "twinko",
      ventureId: "twinko",
    });
    expect(assertProjectScopeForWrite({ identity: "twinko" })).toBe("twinko");
  });

  it("resolves projectId-only input only through active canonical project_ids", () => {
    expect(resolveProjectScopeForWrite({ projectId: "nodi" })).toEqual({
      ok: true,
      projectId: "nodi",
      ventureId: "nodi",
    });
    const supersededVentureId = resolveProjectScopeForWrite({ projectId: "pm-workflow" });
    expect(supersededVentureId.ok).toBe(false);
    if (!supersededVentureId.ok) expect(supersededVentureId.code).toBe("unknown_identity");
  });

  it("rejects a write with no project identity at all — scope is never defaulted", () => {
    for (const request of [{}, { identity: null }, { identity: "" }, { identity: "  ", projectId: null }]) {
      const result = resolveProjectScopeForWrite(request);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.code).toBe("missing_identity");
    }
  });

  it("rejects a write against an unknown identity", () => {
    const result = resolveProjectScopeForWrite({ identity: "euno" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("unknown_identity");
  });
});

describe("project isolation invariant (Phase 0A §7)", () => {
  it("a mutation cannot resolve to multiple active projects", () => {
    const result = resolveSingleProjectScope(["nodi", "twinko"]);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("conflicting_identity");
      expect(result.reason).toContain("more than one active project");
    }
  });

  it("Twinko state cannot be written through a Nodi or PM Workflow identifier", () => {
    const viaNodi = resolveProjectScopeForWrite({ identity: "nodi", projectId: "twinko" });
    expect(viaNodi.ok).toBe(false);
    if (!viaNodi.ok) expect(viaNodi.code).toBe("conflicting_identity");

    // …and the superseded identity is refused before any cross-project question arises.
    const viaPmWorkflow = resolveProjectScopeForWrite({ identity: "pm-workflow", projectId: "twinko" });
    expect(viaPmWorkflow.ok).toBe(false);
    if (!viaPmWorkflow.ok) expect(viaPmWorkflow.code).toBe("superseded_identity");
  });

  it("Nodi state cannot be written through a Twinko identifier", () => {
    const result = resolveProjectScopeForWrite({ identity: "twinko", projectId: "nodi" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("conflicting_identity");
  });

  it("agreeing identity and project_id resolve to exactly one project", () => {
    expect(resolveProjectScopeForWrite({ identity: "nodi", projectId: "nodi" })).toEqual({
      ok: true,
      projectId: "nodi",
      ventureId: "nodi",
    });
  });

  it("ambiguous or empty scope fails closed", () => {
    expect(resolveSingleProjectScope([]).ok).toBe(false);
    expect(resolveSingleProjectScope([null, undefined, ""]).ok).toBe(false);
    expect(resolveSingleProjectScope(["nodi", "pm-workflow"]).ok).toBe(false);
    // Repeating the same project is not ambiguity.
    expect(resolveSingleProjectScope(["nodi", "nodi"])).toEqual({
      ok: true,
      projectId: "nodi",
      ventureId: "nodi",
    });
  });

  it("no historical dogfood relationship can couple the two ventures", () => {
    // Twinko never resolves to nodi, and nodi never resolves to twinko, by any identity.
    for (const identity of ["twinko"]) {
      const r = resolveProjectScopeForWrite({ identity });
      expect(r.ok && r.projectId).toBe("twinko");
    }
    for (const identity of ["nodi"]) {
      const r = resolveProjectScopeForWrite({ identity });
      expect(r.ok && r.projectId).toBe("nodi");
    }
  });
});

describe("injected registries cannot bypass the canonical schema (F-01)", () => {
  /**
   * Resolvers accept a caller-supplied registry, which never passes through
   * loadVentureRegistry(). When the Zod schema ran only in the file loader, an injected
   * registry carrying a malformed canonical identifier was handed back as authorized
   * write scope — a project-authorization boundary failure, reproduced before the fix.
   */
  const MALFORMED: [string, unknown][] = [
    [
      "whitespace-padded project_id",
      { id: "nodi", name: "N", project_id: " twinko ", lifecycle: "active" },
    ],
    ["uppercase id", { id: "NODI", name: "N", project_id: "NODI", lifecycle: "active" }],
    ["empty project_id", { id: "nodi", name: "N", project_id: "", lifecycle: "active" }],
    [
      "unknown extra field",
      { id: "nodi", name: "N", project_id: "nodi", lifecycle: "active", invented: "x" },
    ],
    [
      "unrecognized lifecycle",
      { id: "nodi", name: "N", project_id: "nodi", lifecycle: "retired" },
    ],
  ];

  function injected(venture: Record<string, unknown>): never {
    const registry = {
      version: "0.0.0",
      status: "injected",
      ventures: [{ integration: "file-handoff", external_repo_access: "read-only", ...venture }],
    };
    return registry as never;
  }

  for (const [label, venture] of MALFORMED) {
    it(`rejects an injected registry with a ${label}`, () => {
      const registry = injected(venture as Record<string, unknown>);
      const identity = String((venture as Record<string, unknown>)["id"]);
      expect(() => resolveIdentity(identity, registry)).toThrow(/canonical schema/);
      expect(() => resolveProjectScopeForWrite({ identity }, registry)).toThrow(/canonical schema/);
      expect(() => resolveSingleProjectScope([identity], registry)).toThrow(/canonical schema/);
    });
  }

  it("still accepts a well-formed injected registry", () => {
    const registry = injected({ id: "nodi", name: "Nodi", project_id: "nodi", lifecycle: "active" });
    expect(resolveProjectScopeForWrite({ identity: "nodi" }, registry)).toEqual({
      ok: true,
      projectId: "nodi",
      ventureId: "nodi",
    });
  });
});

describe("registry integrity fails closed (Phase 0A §4)", () => {
  it("rejects a duplicate venture id", () => {
    expectRegistryRejects(
      (yaml) => `${yaml}\n  - id: nodi\n    name: Nodi Duplicate\n    project_id: nodi\n    lifecycle: active\n    integration: file-handoff\n    external_repo_access: read-only\n`,
      /duplicate id/,
    );
  });

  it("rejects duplicate active canonical project_ids through the real loader", () => {
    expectRegistryRejects(
      (yaml) =>
        `${yaml}\n  - id: duplicate-project\n    name: Duplicate Project\n    project_id: twinko\n    lifecycle: active\n    integration: file-handoff\n    external_repo_access: read-only\n`,
      /duplicate project_id/,
    );
  });

  it("rejects a venture id colliding with another active project's project_id", () => {
    expectRegistryRejects(
      (yaml) =>
        `${yaml}\n  - id: alpha\n    name: Alpha\n    project_id: beta\n    lifecycle: active\n    integration: file-handoff\n    external_repo_access: read-only\n  - id: beta\n    name: Beta\n    project_id: gamma\n    lifecycle: active\n    integration: file-handoff\n    external_repo_access: read-only\n`,
      /globally unambiguous namespace/,
    );
  });

  it("rejects whitespace-equivalent registry identities instead of normalizing them", () => {
    expectRegistryRejects(
      (yaml) => yaml.replace("  - id: nodi", '  - id: " nodi "'),
      /lowercase slug|whitespace/i,
    );
  });

  it("every accepted active project_id resolves to itself and never another project", () => {
    const registry = loadVentureRegistry();
    for (const venture of activeVentures(registry)) {
      expect(resolveProjectScopeForWrite({ projectId: venture.project_id }, registry)).toEqual({
        ok: true,
        projectId: venture.project_id,
        ventureId: venture.id,
      });
    }
  });

  it("rejects an unknown field rather than silently stripping it", () => {
    expectRegistryRejects(
      (yaml) => yaml.replace("  - id: twinko", "  - invented_field: 42\n    id: twinko"),
      /invented_field|Unrecognized/i,
    );
  });

  it("rejects a superseded entry with no successor", () => {
    expectRegistryRejects(
      (yaml) => yaml.replace("    superseded_by: nodi\n", ""),
      /must declare superseded_by/,
    );
  });

  it("rejects a successor that does not exist", () => {
    expectRegistryRejects(
      (yaml) => yaml.replace("    superseded_by: nodi\n", "    superseded_by: ghost\n"),
      /unknown successor/,
    );
  });

  it("rejects a supersession chain — a successor must itself be active", () => {
    expectRegistryRejects(
      (yaml) => yaml.replace("    superseded_by: nodi\n", "    superseded_by: pm-workflow\n"),
      /unknown successor|supersession chains are not permitted|duplicate/,
    );
  });

  it("rejects a superseded identity whose project_id disagrees with its successor", () => {
    expectRegistryRejects(
      (yaml) =>
        yaml.replace(
          "  - id: pm-workflow\n    name: AI-Native PM Workflow\n    project_id: nodi",
          "  - id: pm-workflow\n    name: AI-Native PM Workflow\n    project_id: twinko",
        ),
      /must carry its successor's canonical project_id/,
    );
  });

  it("rejects an active venture that declares supersession", () => {
    expectRegistryRejects(
      (yaml) =>
        yaml.replace(
          "  - id: twinko\n    name: Twinko\n    project_id: twinko\n    lifecycle: active",
          "  - id: twinko\n    name: Twinko\n    project_id: twinko\n    lifecycle: active\n    superseded_by: nodi",
        ),
      /active venture "twinko" declares superseded_by/,
    );
  });

  it("the real registry satisfies every integrity rule", () => {
    expect(() => loadVentureRegistry()).not.toThrow();
    const superseded = VENTURE_REGISTRY.ventures.filter((v) => v.lifecycle === "superseded");
    for (const v of superseded) {
      const successor = findVentureById(v.superseded_by as string);
      expect(successor?.lifecycle).toBe("active");
      // A superseded identity carries its successor's canonical project_id.
      expect(v.project_id).toBe(successor?.project_id);
    }
  });
});

describe("backward compatibility (Phase 0A §§3, 8)", () => {
  it("the historical W28 pm-workflow record remains readable and maps to project nodi", () => {
    const result = loadHistoricalVentureUpdate(readFileSync(W28_PM_WORKFLOW, "utf8"));
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error(result.reason);
    expect(result.update.venture).toBe("pm-workflow"); // history is not rewritten
    expect(result.writable).toBe(false);
    expect(result.lineage.historicalIdentity).toBe(true);
    expect(result.lineage.canonicalProjectId).toBe("nodi");
    expect(result).not.toHaveProperty("projectId");
  });

  it("the same record is REFUSED as a new operational write", () => {
    const result = loadVentureUpdate(readFileSync(W28_PM_WORKFLOW, "utf8"));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toContain("superseded");
      expect(result.reason).toContain("nodi");
    }
  });

  it("operational intent is the default — a caller that does not think about it gets the safe answer", () => {
    const raw = parseFrontmatter(readFileSync(W28_PM_WORKFLOW, "utf8")) as Record<string, unknown>;
    expect(validateVentureUpdate(raw).ok).toBe(false);
    expect(readHistoricalVentureUpdate(raw).ok).toBe(true);
  });

  it("an operational update against an active venture still succeeds", () => {
    const result = loadVentureUpdate(readFileSync(W28_TWINKO, "utf8"));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.projectId).toBe("twinko");
      expect(result.writable).toBe(true);
    }
  });

  it("historical CLI renders to stdout and does not create or modify a brief", () => {
    const output = "generated/board-briefs/weekly-board-brief-2026-07-12.md";
    const before = existsSync(output) ? readFileSync(output, "utf8") : null;
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args: unknown[]) => logs.push(args.map(String).join(" "));
    try {
      expect(runCli(["--historical", W28_PM_WORKFLOW])).toBe(0);
    } finally {
      console.log = originalLog;
    }
    expect(logs.join("\n")).toContain("Read-only mode: no file was written");
    expect(existsSync(output) ? readFileSync(output, "utf8") : null).toBe(before);
  });

  it("reports an unreadable input through the normal INVALID contract (R4-01)", () => {
    // Previously this surfaced as an uncaught ENOENT stack trace from readFileSync.
    const errors: string[] = [];
    const originalError = console.error;
    console.error = (...args: unknown[]) => errors.push(args.map(String).join(" "));
    let code: number;
    try {
      code = runCli([joinPath(SCRATCH, "definitely-not-here.md")]);
    } finally {
      console.error = originalError;
    }
    expect(code).toBe(1);
    const output = errors.join("\n");
    expect(output).toContain("INVALID");
    expect(output).toContain("cannot read input");
    expect(output).not.toContain("at Object.readFileSync"); // no raw stack trace
  });

  it("a new update citing nodi validates operationally", () => {
    const raw = parseFrontmatter(readFileSync(W28_PM_WORKFLOW, "utf8")) as Record<string, unknown>;
    const result = validateVentureUpdate({ ...raw, venture: "nodi" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.projectId).toBe("nodi");
  });
});

describe("canonical repository safety (Phase 0A §10)", () => {
  it("this checkout is the canonical Studio repository", () => {
    const check = checkCanonicalRepository();
    expect(check.errors).toEqual([]);
    expect(check.ok).toBe(true);
  });

  it("recognizes duplicated-copy directory names", () => {
    const suffixes = loadCanonicalRepoAssertion().stale_directory_suffixes;
    for (const path of [
      "/Users/x/GitHub/gina-ai-native-venture-studio 2",
      "/Users/x/GitHub/gina-ai-native-venture-studio 2/",
      "/Users/x/GitHub/gina-ai-native-venture-studio copy",
      "/Users/x/GitHub/gina-ai-native-venture-studio backup",
      "/Users/x/GitHub/_ARCHIVED_DO_NOT_USE__gina-ai-native-venture-studio_2",
    ]) {
      expect(isStaleCopyPath(path, suffixes)).toBe(true);
    }
    expect(isStaleCopyPath("/Users/x/GitHub/gina-ai-native-venture-studio", suffixes)).toBe(false);
  });

  it("a checkout missing the v0.2 markers fails the preflight", () => {
    const check = checkCanonicalRepository("/nonexistent/stale-clone");
    expect(check.ok).toBe(false);
    expect(check.errors.join(" ")).toContain("marker file");
  });

  it("records the removal of the stale duplicate, with its authorization", () => {
    // F-02 was remediated by deleting the stale checkout (Founder decision, 2026-09-01).
    // The record is retained as provenance; nothing here depends on that path existing.
    const assertion = loadCanonicalRepoAssertion();
    expect(assertion.known_stale_copies.length).toBeGreaterThan(0);
    const dup = assertion.known_stale_copies[0] as Record<string, unknown>;
    expect(dup["status"]).toBe("deleted");
    expect(dup["removed_on"]).toBe("2026-09-01");
    expect(String(dup["removal_authorized_by"])).toContain("Founder decision");
    expect(String(dup["pre_deletion_verification"])).toContain("no commits absent");
  });

  it("does not depend on the deleted sibling checkout existing", () => {
    for (const copy of loadCanonicalRepoAssertion().known_stale_copies) {
      const record = copy as Record<string, unknown>;
      if (record["status"] !== "deleted") continue;
      expect(existsSync(joinPath(process.cwd(), String(record["path"])))).toBe(false);
    }
    // The copy-detection rules survive the deletion: they guard future copies too.
    expect(isStaleCopyPath("/Users/x/GitHub/gina-ai-native-venture-studio 2")).toBe(true);
    expect(checkCanonicalRepository().ok).toBe(true);
  });

  it("tolerates a checkout that has the markers but no Git metadata at all", () => {
    // Regression guard. Requiring a readable Git origin made `git` a hard runtime
    // dependency and rejected legitimate checkouts with no `.git` (an export, an
    // archive, a copied tree) — while catching nothing, because the known stale
    // duplicate is a clone of this same repository and shares its origin exactly.
    const root = joinPath(SCRATCH, "nogit-checkout");
    rmSync(root, { recursive: true, force: true });
    try {
      for (const marker of loadCanonicalRepoAssertion().canonical.marker_files) {
        const target = joinPath(root, marker);
        mkdirSync(joinPath(target, ".."), { recursive: true });
        writeFileSync(target, "marker", "utf8");
      }
      expect(existsSync(joinPath(root, ".git"))).toBe(false);
      const check = checkCanonicalRepository(root);
      expect(check.errors).toEqual([]);
      expect(check.ok).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("rejects a checkout whose Git origin does not match the approved canonical remote", () => {
    const assertion = loadCanonicalRepoAssertion();
    const check = checkCanonicalRepository(undefined, {
      ...assertion,
      canonical: { ...assertion.canonical, remote: "https://example.invalid/not-canonical.git" },
    });
    expect(check.ok).toBe(false);
    expect(check.errors.join(" ")).toContain("Git origin");
  });
});

describe("CLI entry guard — must never silently do nothing", () => {
  /**
   * Regression guard. The guard originally compared `process.argv[1]` to
   * `fileURLToPath(import.meta.url)` verbatim. Node makes argv[1] absolute but does
   * NOT resolve symlinks, so invoking the CLI through a symlink skipped `main`
   * entirely: exit 0, no output, nothing done. For a governance CLI, silently
   * succeeding without acting is worse than failing.
   */
  const selfPath = fileURLToPath(new URL("../src/cli.ts", import.meta.url));

  function withArgv1<T>(value: string | undefined, fn: () => T): T {
    const original = process.argv[1];
    if (value === undefined) delete process.argv[1];
    else process.argv[1] = value;
    try {
      return fn();
    } finally {
      if (original === undefined) delete process.argv[1];
      else process.argv[1] = original;
    }
  }

  it("recognizes direct invocation through a symlink", () => {
    const dir = joinPath(SCRATCH, "cli-entry");
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const link = joinPath(dir, "cli-link.ts");
    try {
      symlinkSync(selfPath, link);
      expect(withArgv1(link, isDirectInvocation)).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("recognizes direct invocation through a non-normalized path", () => {
    // A literal "/./" segment, built by string surgery so path.join cannot
    // normalize it away before the guard ever sees it.
    const indirect = selfPath.replace(/\/cli\.ts$/, "/./cli.ts");
    expect(indirect).not.toBe(selfPath);
    expect(withArgv1(indirect, isDirectInvocation)).toBe(true);
  });

  it("does not self-execute when imported by another entry point", () => {
    expect(withArgv1("/usr/local/bin/vitest", isDirectInvocation)).toBe(false);
    expect(withArgv1(undefined, isDirectInvocation)).toBe(false);
  });
});

describe("pre-build canonical preflight (NF-02)", () => {
  /**
   * `pnpm demo` and `pnpm portfolio-review` ran `pnpm build` first, so a copied
   * checkout had its dist/ written before anything refused to run there — which
   * contradicted the CLI's own "refuse before touching anything" claim. The guard
   * therefore has to run before the build that produces the compiled guard.
   */
  function runPreflight(root: string): { status: number; stderr: string } {
    try {
      execFileSync("node", ["scripts/preflight.mjs", root], { encoding: "utf8", stdio: "pipe" });
      return { status: 0, stderr: "" };
    } catch (error) {
      const e = error as { status?: number; stderr?: string };
      return { status: e.status ?? -1, stderr: e.stderr ?? "" };
    }
  }

  it("accepts the canonical checkout and refuses a copy-patterned one, writing nothing", () => {
    expect(runPreflight(process.cwd()).status).toBe(0);

    const stale = joinPath(SCRATCH, "preflight", "gina-ai-native-venture-studio 2");
    rmSync(joinPath(SCRATCH, "preflight"), { recursive: true, force: true });
    mkdirSync(stale, { recursive: true });
    try {
      const result = runPreflight(stale);
      expect(result.status).toBe(3); // same refusal code the CLI uses
      expect(result.stderr).toContain("REFUSING TO RUN");
      // Refusal must not have produced anything inside the rejected checkout.
      expect(existsSync(joinPath(stale, "dist"))).toBe(false);
    } finally {
      rmSync(joinPath(SCRATCH, "preflight"), { recursive: true, force: true });
    }
  });

  it("agrees with the compiled checker, so the two implementations cannot drift", () => {
    // Policy is single-sourced in governance/canonical-repository.yaml; only the two
    // cheap predicates exist twice. This asserts they classify identically.
    const drift = joinPath(SCRATCH, "drift");
    rmSync(drift, { recursive: true, force: true });
    mkdirSync(joinPath(drift, "studio 2"), { recursive: true });
    mkdirSync(joinPath(drift, "plain"), { recursive: true });
    // A checkout that looks canonical by name and markers but carries a foreign origin:
    // the one dimension where the two checkers previously disagreed.
    const wrongOrigin = joinPath(drift, "gina-ai-native-venture-studio");
    mkdirSync(wrongOrigin, { recursive: true });
    for (const marker of loadCanonicalRepoAssertion().canonical.marker_files) {
      mkdirSync(joinPath(wrongOrigin, marker, ".."), { recursive: true });
      writeFileSync(joinPath(wrongOrigin, marker), "marker", "utf8");
    }
    execFileSync("git", ["-C", wrongOrigin, "init", "-q"], { stdio: "ignore" });
    execFileSync("git", ["-C", wrongOrigin, "remote", "add", "origin", "https://example.invalid/other.git"], {
      stdio: "ignore",
    });
    const roots = [process.cwd(), joinPath(drift, "studio 2"), joinPath(drift, "plain"), wrongOrigin];
    try {
      for (const root of roots) {
        const scriptOk = runPreflight(root).status === 0;
        const checkerOk = checkCanonicalRepository(root).ok;
        expect({ root, scriptOk }).toEqual({ root, scriptOk: checkerOk });
      }
    } finally {
      rmSync(drift, { recursive: true, force: true });
    }
  });

  it("the documented entrypoints run the preflight before the build", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { scripts: Record<string, string> };
    for (const name of ["demo", "portfolio-review", "verify", "build", "test"]) {
      const script = pkg.scripts[name] ?? "";
      expect(script).toContain("pnpm preflight");
      const buildAt = script.indexOf("pnpm build");
      if (buildAt >= 0) expect(script.indexOf("pnpm preflight")).toBeLessThan(buildAt);
    }
  });
});
