/**
 * Phase 3 — CEO Weekly Portfolio Review: deterministic pipeline tests.
 */
import { existsSync, readFileSync } from "node:fs";
import { parse } from "yaml";
import { describe, expect, it } from "vitest";
import { loadVentureRegistry, VENTURE_REGISTRY } from "../src/governance/venture-registry.js";
import {
  extractHandoffRefs,
  loadHistoricalVentureUpdate,
  loadVentureUpdate,
  parseFrontmatter,
  readHistoricalVentureUpdate,
  validateVentureUpdate,
  VentureUpdateSchema,
} from "../src/portfolio/venture-update.js";
import {
  generateWeeklyBoardBrief,
  renderHistoricalWeeklyBoardBrief,
  type HistoricalBriefInput,
  type OperationalBriefInput,
} from "../src/portfolio/generate-brief.js";
import { canServeAsCanonicalDecision } from "../src/governance/validate-status.js";

const SAMPLES = [
  "samples/venture-updates/2026-W28/pm-workflow.md",
  "samples/venture-updates/2026-W28/twinko.md",
];

function loadSamples(): HistoricalBriefInput[] {
  return SAMPLES.map((sourcePath) => {
    const rawContent = readFileSync(sourcePath, "utf8");
    const result = loadHistoricalVentureUpdate(rawContent);
    if (!result.ok) throw new Error(`sample invalid: ${sourcePath}: ${result.reason}`);
    return { writable: false, lineage: result.lineage, update: result.update, sourcePath, rawContent };
  });
}

function loadOperationalSamples(): OperationalBriefInput[] {
  return SAMPLES.map((sourcePath) => {
    const original = readFileSync(sourcePath, "utf8");
    const rawContent = sourcePath.includes("pm-workflow")
      ? original.replace("venture: pm-workflow", "venture: nodi")
      : original;
    const result = loadVentureUpdate(rawContent);
    if (!result.ok) throw new Error(`operational sample invalid: ${sourcePath}: ${result.reason}`);
    return { writable: true, projectId: result.projectId, update: result.update, sourcePath, rawContent };
  });
}

describe("venture registry", () => {
  // v0.2 (decisions/approvals/0008): active ventures are twinko and nodi. `pm-workflow` is
  // retained as a superseded identity alias so the historical W28 venture updates that cite
  // it stay valid. Phase 0A (0010) made lifecycle/project_id/superseded_by mechanically
  // recognized — the deeper semantics are proven in tests/project-identity.test.ts.
  it("registers twinko and nodi, plus the superseded pm-workflow alias, file-handoff, read-only", () => {
    const ids = VENTURE_REGISTRY.ventures.map((v) => v.id);
    expect(ids).toHaveLength(3);
    expect(ids).toContain("twinko");
    expect(ids).toContain("nodi");
    expect(ids).toContain("pm-workflow");
    expect(loadVentureRegistry().ventures.every((v) => v.external_repo_access === "read-only")).toBe(true);
  });
});

describe("schema file and code cannot drift", () => {
  it("Zod fields exactly match schemas/venture-update.schema.yaml", () => {
    const spec = parse(readFileSync("schemas/venture-update.schema.yaml", "utf8")) as {
      fields: Record<string, unknown>;
    };
    const yamlFields = Object.keys(spec.fields).sort().join(",");
    const codeFields = Object.keys(VentureUpdateSchema.shape).sort().join(",");
    expect(codeFields).toBe(yamlFields);
  });
});

describe("venture update validation", () => {
  it("both sample inputs are valid", () => {
    for (const path of SAMPLES) {
      const result = loadHistoricalVentureUpdate(readFileSync(path, "utf8"));
      expect(result.ok).toBe(true);
    }
  });

  it("rejects an unknown venture", () => {
    const raw = parseFrontmatter(readFileSync(SAMPLES[0] ?? "", "utf8")) as Record<string, unknown>;
    const result = validateVentureUpdate({ ...raw, venture: "not-a-venture" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain("Unknown venture");
  });

  it("rejects a missing required field and an unknown extra field", () => {
    const raw = parseFrontmatter(readFileSync(SAMPLES[0] ?? "", "utf8")) as Record<string, unknown>;
    const { risks: _dropped, ...withoutRisks } = raw;
    expect(readHistoricalVentureUpdate(withoutRisks).ok).toBe(false);
    expect(readHistoricalVentureUpdate({ ...raw, invented_metric: "42% growth" }).ok).toBe(false);
  });

  it("rejects an inverted reporting period", () => {
    const raw = parseFrontmatter(readFileSync(SAMPLES[0] ?? "", "utf8")) as Record<string, unknown>;
    const bad = { ...raw, reporting_period: { start: "2026-07-12", end: "2026-07-06" } };
    expect(readHistoricalVentureUpdate(bad).ok).toBe(false);
  });
});

describe("handoff source-reference verification", () => {
  it("extracts every cited handoff path from the real W28 updates and all of them exist", () => {
    for (const path of [
      "inputs/venture-updates/2026-W28/pm-workflow.md",
      "inputs/venture-updates/2026-W28/twinko.md",
    ]) {
      const result = loadHistoricalVentureUpdate(readFileSync(path, "utf8"));
      expect(result.ok).toBe(true);
      if (result.ok) {
        const refs = extractHandoffRefs(result.update);
        expect(refs.length > 0).toBe(true);
        for (const ref of refs) expect(existsSync(ref)).toBe(true);
      }
    }
  });

  it("detects a citation of a missing handoff file", () => {
    const raw = parseFrontmatter(readFileSync(SAMPLES[0] ?? "", "utf8")) as Record<string, unknown>;
    const tampered = {
      ...raw,
      evidence_references: ["handoffs/pm-workflow/DOES_NOT_EXIST.md"],
    };
    const result = readHistoricalVentureUpdate(tampered);
    expect(result.ok).toBe(true); // schema-valid…
    if (result.ok) {
      const refs = extractHandoffRefs(result.update);
      expect(refs).toContain("handoffs/pm-workflow/DOES_NOT_EXIST.md"); // …but the CLI existence check rejects it
    }
  });
});

describe("weekly board brief generation", () => {
  const FIXED_NOW = new Date("2026-07-12T09:00:00Z");

  it("contains all nine required sections", () => {
    const { markdown } = renderHistoricalWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    for (const section of [
      "## Executive Summary",
      "## Portfolio Status",
      "## Venture-by-Venture Review",
      "## Cross-Venture Dependencies",
      "## Top Priorities",
      "## Risks and Blockers",
      "## Decisions Required from Gina",
      "## CEO Recommendations",
      "## Next Review Date",
    ]) {
      expect(markdown).toContain(section);
    }
  });

  it("is deterministic for a fixed clock and computes next review = end + 7 days", () => {
    const a = renderHistoricalWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    const b = renderHistoricalWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    expect(a.markdown).toBe(b.markdown);
    expect(a.markdown).toContain("2026-07-19 (period end + 7 days)");
  });

  it("writes only under generated/ and is marked non-canonical", () => {
    const { markdown, outputPath } = generateWeeklyBoardBrief(loadOperationalSamples(), { now: FIXED_NOW });
    expect(outputPath).toBe("generated/board-briefs/weekly-board-brief-2026-07-12.md");
    expect(markdown).toContain("NOT canonical");
    expect(canServeAsCanonicalDecision({ origin: "generated", path: outputPath })).toBe(false);
  });

  it("never invents recommendations and keeps approval boundary language", () => {
    const { markdown } = renderHistoricalWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    expect(markdown).toContain("None auto-generated");
    expect(markdown).toContain("a request, not an approval");
  });

  it("flags the cross-venture dependency present in both samples", () => {
    const { markdown } = renderHistoricalWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    const flagged = markdown.split("## Cross-Venture Dependencies")[1]?.split("## Top Priorities")[0] ?? "";
    expect(flagged).toContain("Twinko");
    expect(flagged).toContain("AI-Native PM Workflow");
  });

  it("operational portfolio contains only Nodi and Twinko and reports 2 of 2 active", () => {
    const { markdown } = generateWeeklyBoardBrief(loadOperationalSamples(), { now: FIXED_NOW });
    expect(markdown).toContain("Ventures reporting: 2 of 2 active.");
    expect(markdown).toContain("**Nodi**");
    expect(markdown).toContain("**Twinko**");
    expect(markdown).not.toContain("**AI-Native PM Workflow**");
  });

  it("counts coverage in distinct projects and rejects a duplicated project (NF-01)", () => {
    // Two updates for the same project previously rendered "2 of 2 active" while an
    // active venture had not reported at all — an overstated coverage claim.
    const [first] = loadOperationalSamples();
    const duplicate = { ...(first as OperationalBriefInput), sourcePath: "samples/duplicate.md" };
    expect(() => generateWeeklyBoardBrief([first as OperationalBriefInput, duplicate])).toThrow(
      /more than one update for project/,
    );
  });

  it("names an active venture that did not report rather than omitting it (NF-01)", () => {
    const [onlyOne] = loadOperationalSamples();
    const { markdown } = generateWeeklyBoardBrief([onlyOne as OperationalBriefInput], { now: FIXED_NOW });
    expect(markdown).toContain("Ventures reporting: 1 of 2 active.");
    expect(markdown).toContain("Not reporting this period:");
    expect(markdown).toContain("absence of a report is not a status");
  });

  it("operational generation rejects a superseded historical alias", () => {
    expect(() =>
      generateWeeklyBoardBrief(loadSamples() as unknown as OperationalBriefInput[], { now: FIXED_NOW }),
    ).toThrow(/Historical input cannot authorize/);
  });
});
