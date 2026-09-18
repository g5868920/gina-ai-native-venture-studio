#!/usr/bin/env node
/**
 * Canonical-repository preflight that runs BEFORE any build or generated output.
 * Phase 0A — decisions/approvals/0010-*.md §10; review finding NF-02.
 *
 * WHY THIS EXISTS SEPARATELY FROM src/governance/canonical-repo.ts
 * The compiled checker cannot guard the step that compiles it: `pnpm demo` and
 * `pnpm portfolio-review` ran `pnpm build` first, so a copied checkout had its
 * `dist/` written before anything refused to run there. That contradicted the CLI's
 * own "refuse before touching anything" claim. This script is plain ESM with no
 * build step, so it can run first.
 *
 * POLICY IS NOT DUPLICATED. The rules live in governance/canonical-repository.yaml
 * and are read from there. Only the two cheap predicates are expressed twice, and
 * tests/project-identity.test.ts asserts that this script and the TypeScript checker
 * agree on the same set of paths — so the two cannot drift silently.
 *
 * All three signals of src/governance/canonical-repo.ts are mirrored here, INCLUDING
 * the Git-origin mismatch. Origin cannot identify a copy of this repository (a copy
 * shares its origin exactly) — name and marker files do that — but omitting it here
 * made the two checkers disagree, so a marker-complete checkout with a foreign origin
 * could build before the compiled CLI refused it. A drift test asserts both classify
 * the same paths identically; a check that exists in only one of them is a defect in
 * the pair, whatever its individual value.
 *
 * Read-only. Exits 0 when the checkout is canonical, 3 when it is not — the same
 * refusal code the CLI uses.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const REPO_ROOT = fileURLToPath(new URL("../", import.meta.url));
const ASSERTION_PATH = join(REPO_ROOT, "governance/canonical-repository.yaml");

/** Mirrors normalizeRemote() in src/governance/canonical-repo.ts. */
function normalizeRemote(remote) {
  const trimmed = remote.trim().replace(/\/$/, "").replace(/\.git$/, "");
  const ssh = /^git@([^:]+):(.+)$/.exec(trimmed);
  return ssh === null ? trimmed : `https://${ssh[1]}/${ssh[2]}`;
}

/** Origin, or null when it cannot be read — inconclusive, never disqualifying. */
function readOriginRemote(root) {
  try {
    return execFileSync("git", ["-C", root, "remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

/** Errors describing why `root` is not the canonical checkout. Empty means it is. */
export function preflightErrors(root = process.cwd()) {
  const assertion = parse(readFileSync(ASSERTION_PATH, "utf8"));
  const errors = [];

  const name = basename(resolve(root).replace(/[/\\]+$/, ""));
  const suffixes = assertion.stale_directory_suffixes ?? [];
  const prefixes = assertion.stale_directory_prefixes ?? [];
  if (suffixes.some((s) => name.endsWith(s)) || prefixes.some((p) => name.startsWith(p))) {
    errors.push(
      `Directory name "${name}" matches a duplicated-copy pattern. The canonical Studio ` +
        `repository is named "${assertion.canonical.repository_name}".`,
    );
  }

  const origin = readOriginRemote(root);
  if (origin !== null && normalizeRemote(origin) !== normalizeRemote(assertion.canonical.remote)) {
    errors.push(
      `Git origin "${origin}" does not match the approved canonical remote "${assertion.canonical.remote}".`,
    );
  }

  const missing = (assertion.canonical.marker_files ?? []).filter((rel) => !existsSync(join(root, rel)));
  if (missing.length > 0) {
    errors.push(
      `Missing Company OS v0.2 marker file(s): ${missing.join(", ")}. A checkout without ` +
        "these predates Company OS v0.2 and its governance is superseded.",
    );
  }

  return errors;
}

function main(argv) {
  const root = argv[0] ?? process.cwd();
  const errors = preflightErrors(root);
  if (errors.length === 0) return 0;
  console.error("REFUSING TO RUN — this does not look like the canonical Studio repository.");
  for (const error of errors) console.error(`  - ${error}`);
  console.error(`  Checked: ${resolve(root)}`);
  console.error("  See governance/canonical-repository.yaml. Nothing was built, read, or written.");
  return 3;
}

if (process.argv[1] !== undefined && basename(process.argv[1]) === "preflight.mjs") {
  process.exitCode = main(process.argv.slice(2));
}
