/**
 * Minimal Studio CLI — Phase 3.
 *
 * Usage: node dist/cli.js <venture-update.md> [more update files...]
 * (via pnpm: `pnpm portfolio-review -- samples/venture-updates/2026-W28/*.md`)
 *
 * Validates venture updates and, only if ALL are valid, generates the
 * Weekly Board Brief under generated/board-briefs/. Deterministic; no
 * network, no model calls, no writes outside generated/.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { loadVentureUpdate } from "./portfolio/venture-update.js";
import { generateWeeklyBoardBrief, type BriefInput } from "./portfolio/generate-brief.js";

function main(argv: string[]): number {
  const files = argv.filter((a) => !a.startsWith("-"));
  if (files.length === 0) {
    console.error("Usage: portfolio-review <venture-update.md> [more...]");
    return 2;
  }

  const inputs: BriefInput[] = [];
  let invalid = 0;
  for (const file of files) {
    const rawContent = readFileSync(file, "utf8");
    const result = loadVentureUpdate(rawContent);
    if (result.ok) {
      console.log(`VALID   ${file} (venture: ${result.update.venture})`);
      inputs.push({ update: result.update, sourcePath: file, rawContent });
    } else {
      console.error(`INVALID ${file}: ${result.reason}`);
      invalid += 1;
    }
  }

  if (invalid > 0) {
    console.error(`\n${invalid} invalid input(s). Fix at the source — the generator never patches data. No brief generated.`);
    return 1;
  }

  const brief = generateWeeklyBoardBrief(inputs);
  if (!brief.outputPath.startsWith("generated/")) {
    throw new Error("Governance violation: brief output must live under generated/.");
  }
  mkdirSync(dirname(brief.outputPath), { recursive: true });
  writeFileSync(brief.outputPath, brief.markdown, "utf8");
  console.log(`\nBrief written: ${brief.outputPath}`);
  console.log("Reminder: generated output is derivative — NOT canonical, and contains no approvals.");
  return 0;
}

process.exitCode = main(process.argv.slice(2));
