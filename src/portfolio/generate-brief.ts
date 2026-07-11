/**
 * Weekly Board Brief generation. Fully deterministic:
 * aggregates validated inputs only — never invents metrics, outcomes,
 * evidence, rankings, or recommendations. Missing facts remain unknown.
 * Structure: templates/weekly-board-brief.md.
 */
import { createHash } from "node:crypto";
import { VENTURE_REGISTRY, type VentureRegistry } from "../governance/venture-registry.js";
import type { VentureUpdate } from "./venture-update.js";

export interface BriefInput {
  update: VentureUpdate;
  sourcePath: string;
  rawContent: string;
}

export interface BriefOptions {
  /** Injectable clock for deterministic tests. */
  now?: Date;
  registry?: VentureRegistry;
}

export interface BriefResult {
  markdown: string;
  /** Repo-relative output path under generated/ (the only allowed destination). */
  outputPath: string;
}

const SKILL_ID = "ceo/portfolio-review v0.1.0";

function fmtList(items: string[], label?: (s: string) => string): string {
  if (items.length === 0) return "_None reported._";
  return items.map((s) => `- ${label === undefined ? s : label(s)}`).join("\n");
}

function addDaysIso(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function generateWeeklyBoardBrief(inputs: BriefInput[], options: BriefOptions = {}): BriefResult {
  if (inputs.length === 0) throw new Error("No validated venture updates provided.");
  const registry = options.registry ?? VENTURE_REGISTRY;
  const now = options.now ?? new Date();

  // Deterministic order: registry order.
  const order = new Map(registry.ventures.map((v, i) => [v.id, i] as const));
  const sorted = [...inputs].sort(
    (a, b) => (order.get(a.update.venture) ?? 99) - (order.get(b.update.venture) ?? 99),
  );
  const nameOf = (id: string): string => registry.ventures.find((v) => v.id === id)?.name ?? id;

  const periodStart = sorted.map((i) => i.update.reporting_period.start).sort()[0] ?? "";
  const periodEnd = sorted.map((i) => i.update.reporting_period.end).sort().at(-1) ?? "";
  const nextReview = addDaysIso(periodEnd, 7);
  const checksum = createHash("sha256")
    .update(sorted.map((i) => i.rawContent).join("\n\n"))
    .digest("hex")
    .slice(0, 16);

  const decisions = sorted.flatMap((i) => i.update.decisions_needed.map((d) => ({ v: i.update.venture, d })));
  const risks = sorted.flatMap((i) => i.update.risks.map((r) => ({ v: i.update.venture, r })));
  const blockers = sorted.flatMap((i) => i.update.blockers.map((b) => ({ v: i.update.venture, b })));

  const otherVentureTokens = (selfId: string): string[] =>
    registry.ventures.filter((v) => v.id !== selfId).flatMap((v) => [v.id.toLowerCase(), v.name.toLowerCase()]);
  const isCross = (dep: string, selfId: string): boolean => {
    const low = dep.toLowerCase();
    return otherVentureTokens(selfId).some((t) => low.includes(t));
  };

  const lines: string[] = [];
  lines.push(`# Weekly Board Brief — ${periodStart} to ${periodEnd}`, "");
  lines.push(`> Generated: ${now.toISOString()} · Skill: ${SKILL_ID} · Executor: deterministic script (src/portfolio/generate-brief.ts)`);
  lines.push(`> Sources: ${sorted.map((i) => i.sourcePath).join(", ")} · Checksum: sha256:${checksum}`);
  lines.push(`> Review status: CEO Review Required — generated output, derivative, NOT canonical. Recommendations are not approvals.`, "");

  lines.push("## Executive Summary", "");
  lines.push(`Ventures reporting: ${sorted.length} of ${registry.ventures.length} registered.`, "");
  for (const i of sorted) lines.push(`- **${nameOf(i.update.venture)}** — ${i.update.current_status}`);
  lines.push("", `Totals from inputs: ${decisions.length} decision(s) needed, ${risks.length} risk(s), ${blockers.length} blocker(s). Nothing in this brief is invented; missing facts remain unknown.`, "");

  lines.push("## Portfolio Status", "");
  lines.push("| Venture | Status | Risks | Blockers | Decisions needed |");
  lines.push("|---|---|---|---|---|");
  for (const i of sorted) {
    const u = i.update;
    lines.push(`| ${nameOf(u.venture)} | ${u.current_status} | ${u.risks.length} | ${u.blockers.length} | ${u.decisions_needed.length} |`);
  }
  lines.push("");

  lines.push("## Venture-by-Venture Review", "");
  for (const i of sorted) {
    const u = i.update;
    lines.push(`### ${nameOf(u.venture)} (${u.reporting_period.start} – ${u.reporting_period.end})`, "");
    lines.push(`Status: ${u.current_status}`, "");
    lines.push("**Completed**", "", fmtList(u.completed), "");
    lines.push("**In progress**", "", fmtList(u.in_progress), "");
    lines.push("**Next priorities**", "", fmtList(u.next_priorities), "");
    lines.push("**Evidence references**", "", fmtList(u.evidence_references), "");
    lines.push("**Assumptions / unknowns**", "", fmtList(u.assumptions_unknowns), "");
  }

  lines.push("## Cross-Venture Dependencies", "");
  const cross = sorted.flatMap((i) =>
    i.update.dependencies.filter((d) => isCross(d, i.update.venture)).map((d) => `${nameOf(i.update.venture)}: ${d}`),
  );
  const local = sorted.flatMap((i) =>
    i.update.dependencies.filter((d) => !isCross(d, i.update.venture)).map((d) => `${nameOf(i.update.venture)}: ${d}`),
  );
  lines.push("**Flagged cross-venture** (mentions another registered venture)", "", fmtList(cross), "");
  lines.push("**Other dependencies**", "", fmtList(local), "");

  lines.push("## Top Priorities", "");
  lines.push("_Input order preserved per venture; no ranking is invented._", "");
  lines.push(fmtList(sorted.flatMap((i) => i.update.next_priorities.map((p) => `${nameOf(i.update.venture)}: ${p}`))), "");

  lines.push("## Risks and Blockers", "");
  lines.push("**Risks**", "", fmtList(risks.map((x) => `${nameOf(x.v)}: ${x.r}`)), "");
  lines.push("**Blockers**", "", fmtList(blockers.map((x) => `${nameOf(x.v)}: ${x.b}`)), "");

  lines.push("## Decisions Required from Gina", "");
  lines.push("_Listing a decision here is a request, not an approval. Approval requires an explicit Chairwoman record (constitution/AUTHORITY.md §4)._", "");
  lines.push(fmtList(decisions.map((x) => `${nameOf(x.v)}: ${x.d}`)), "");

  lines.push("## CEO Recommendations", "");
  lines.push("_None auto-generated. Deterministic generation never invents recommendations; the CEO adds them during review, and recommendations can never become approvals._", "");

  lines.push("## Next Review Date", "");
  lines.push(`${nextReview} (period end + 7 days)`, "");

  return {
    markdown: lines.join("\n"),
    outputPath: `generated/board-briefs/weekly-board-brief-${periodEnd}.md`,
  };
}
