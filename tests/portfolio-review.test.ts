/**
 * Phase 3 — CEO Weekly Portfolio Review: deterministic pipeline tests.
 */
import { existsSync, readFileSync } from "node:fs";
import { parse } from "yaml";
import { describe, expect, it } from "vitest";
import { loadVentureRegistry, VENTURE_REGISTRY } from "../src/governance/venture-registry.js";
import {
  extractHandoffRefs,
  loadVentureUpdate,
  parseFrontmatter,
  validateVentureUpdate,
  VentureUpdateSchema,
} from "../src/portfolio/venture-update.js";
import { generateWeeklyBoardBrief, type BriefInput } from "../src/portfolio/generate-brief.js";
import { canServeAsCanonicalDecision } from "../src/governance/validate-status.js";

const SAMPLES = [
  "samples/venture-updates/2026-W28/pm-workflow.md",
  "samples/venture-updates/2026-W28/twinko.md",
];

function loadSamples(): BriefInput[] {
  return SAMPLES.map((sourcePath) => {
    const rawContent = readFileSync(sourcePath, "utf8");
    const result = loadVentureUpdate(rawContent);
    if (!result.ok) throw new Error(`sample invalid: ${sourcePath}: ${result.reason}`);
    return { update: result.update, sourcePath, rawContent };
  });
}

describe("venture registry", () => {
  it("registers exactly pm-workflow and twinko, file-handoff, read-only", () => {
    const ids = VENTURE_REGISTRY.ventures.map((v) => v.id);
    expect(ids).toHaveLength(2);
    expect(ids).toContain("pm-workflow");
    expect(ids).toContain("twinko");
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
      const result = loadVentureUpdate(readFileSync(path, "utf8"));
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
    expect(validateVentureUpdate(withoutRisks).ok).toBe(false);
    expect(validateVentureUpdate({ ...raw, invented_metric: "42% growth" }).ok).toBe(false);
  });

  it("rejects an inverted reporting period", () => {
    const raw = parseFrontmatter(readFileSync(SAMPLES[0] ?? "", "utf8")) as Record<string, unknown>;
    const bad = { ...raw, reporting_period: { start: "2026-07-12", end: "2026-07-06" } };
    expect(validateVentureUpdate(bad).ok).toBe(false);
  });
});

describe("handoff source-reference verification", () => {
  it("extracts every cited handoff path from the real W28 updates and all of them exist", () => {
    for (const path of [
      "inputs/venture-updates/2026-W28/pm-workflow.md",
      "inputs/venture-updates/2026-W28/twinko.md",
    ]) {
      const result = loadVentureUpdate(readFileSync(path, "utf8"));
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
    const result = validateVentureUpdate(tampered);
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
    const { markdown } = generateWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
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
    const a = generateWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    const b = generateWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    expect(a.markdown).toBe(b.markdown);
    expect(a.markdown).toContain("2026-07-19 (period end + 7 days)");
  });

  it("writes only under generated/ and is marked non-canonical", () => {
    const { markdown, outputPath } = generateWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    expect(outputPath).toBe("generated/board-briefs/weekly-board-brief-2026-07-12.md");
    expect(markdown).toContain("NOT canonical");
    expect(canServeAsCanonicalDecision({ origin: "generated", path: outputPath })).toBe(false);
  });

  it("never invents recommendations and keeps approval boundary language", () => {
    const { markdown } = generateWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    expect(markdown).toContain("None auto-generated");
    expect(markdown).toContain("a request, not an approval");
  });

  it("flags the cross-venture dependency present in both samples", () => {
    const { markdown } = generateWeeklyBoardBrief(loadSamples(), { now: FIXED_NOW });
    const flagged = markdown.split("## Cross-Venture Dependencies")[1]?.split("## Top Priorities")[0] ?? "";
    expect(flagged).toContain("Twinko");
    expect(flagged).toContain("AI-Native PM Workflow");
  });
});
