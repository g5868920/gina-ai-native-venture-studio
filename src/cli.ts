/**
 * Minimal Studio CLI — Phase 3.
 *
 * Usage: node dist/cli.js [--historical] <venture-update.md> [more update files...]
 * (via pnpm: `pnpm portfolio-review -- samples/venture-updates/2026-W28/*.md`)
 *
 * Operational mode validates active-project updates and, only if ALL are valid,
 * writes a Weekly Board Brief under generated/board-briefs/. Historical mode
 * validates and renders to stdout only. Deterministic; no network or model calls.
 *
 * --historical  Read pre-existing records that may cite a superseded venture
 *               identity (e.g. the 2026-W28 updates, which cite `pm-workflow`).
 *               This mode is structurally read-only and returns no output path.
 *               WITHOUT it, the CLI refuses a superseded identity.
 */
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { preflightCanonicalRepository } from "./governance/canonical-repo.js";
import { extractHandoffRefs, loadHistoricalVentureUpdate, loadVentureUpdate } from "./portfolio/venture-update.js";
import {
  generateWeeklyBoardBrief,
  renderHistoricalWeeklyBoardBrief,
  type HistoricalBriefInput,
  type OperationalBriefInput,
} from "./portfolio/generate-brief.js";

export function main(argv: string[]): number {
  // Refuse to operate from a stale duplicate checkout before touching anything.
  if (!preflightCanonicalRepository()) return 3;

  const files = argv.filter((a) => !a.startsWith("-"));
  const historical = argv.includes("--historical");
  if (files.length === 0) {
    console.error("Usage: portfolio-review [--historical] <venture-update.md> [more...]");
    return 2;
  }

  const operationalInputs: OperationalBriefInput[] = [];
  const historicalInputs: HistoricalBriefInput[] = [];
  let invalid = 0;
  for (const file of files) {
    // The read happens before validation, so it needs its own handling: an unreadable
    // path is invalid input, not an internal fault, and must be reported the same way
    // every other invalid input is rather than as an uncaught ENOENT stack trace.
    let rawContent: string;
    try {
      rawContent = readFileSync(file, "utf8");
    } catch (error) {
      console.error(`INVALID ${file}: cannot read input — ${error instanceof Error ? error.message : String(error)}`);
      invalid += 1;
      continue;
    }
    const result = historical ? loadHistoricalVentureUpdate(rawContent) : loadVentureUpdate(rawContent);
    if (result.ok) {
      const missingRefs = extractHandoffRefs(result.update).filter((ref) => !existsSync(ref));
      if (missingRefs.length > 0) {
        console.error(
          `INVALID ${file}: cited handoff source(s) not found: ${missingRefs.join(", ")}. ` +
            "An update may not rest on missing or moved sources.",
        );
        invalid += 1;
        continue;
      }
      if (result.intent === "historical") {
        console.log(
          `VALID   ${file} (historical record; venture: ${result.update.venture}; lineage project_id: ${result.lineage.canonicalProjectId}; writable: false; handoff sources verified: ${extractHandoffRefs(result.update).length})`,
        );
        historicalInputs.push({
          writable: false,
          lineage: result.lineage,
          update: result.update,
          sourcePath: file,
          rawContent,
        });
      } else {
        console.log(
          `VALID   ${file} (venture: ${result.update.venture}; project_id: ${result.projectId}; writable: true; handoff sources verified: ${extractHandoffRefs(result.update).length})`,
        );
        operationalInputs.push({
          writable: true,
          projectId: result.projectId,
          update: result.update,
          sourcePath: file,
          rawContent,
        });
      }
    } else {
      console.error(`INVALID ${file}: ${result.reason}`);
      invalid += 1;
    }
  }

  if (invalid > 0) {
    console.error(`\n${invalid} invalid input(s). Fix at the source — the generator never patches data. No brief generated.`);
    return 1;
  }

  if (historical) {
    const brief = renderHistoricalWeeklyBoardBrief(historicalInputs);
    console.log(`\n${brief.markdown}`);
    console.log("\nHistorical render complete. Read-only mode: no file was written.");
    return 0;
  }

  let brief;
  try {
    brief = generateWeeklyBoardBrief(operationalInputs);
  } catch (error) {
    console.error(`INVALID portfolio input: ${error instanceof Error ? error.message : String(error)}`);
    console.error("\nFix at the source — the generator never patches data. No brief generated.");
    return 1;
  }
  if (!brief.outputPath.startsWith("generated/")) {
    throw new Error("Governance violation: brief output must live under generated/.");
  }
  mkdirSync(dirname(brief.outputPath), { recursive: true });
  writeFileSync(brief.outputPath, brief.markdown, "utf8");
  console.log(`\nBrief written: ${brief.outputPath}`);
  console.log("Reminder: generated output is derivative — NOT canonical, and contains no approvals.");
  return 0;
}

/**
 * True when this module is the process entry point rather than an import.
 *
 * A raw `argv[1] === fileURLToPath(import.meta.url)` comparison is not enough: Node
 * makes argv[1] absolute but does NOT resolve symlinks, so invoking the CLI through
 * a symlink made the guard fail and the process exited 0 having done nothing at all.
 * A governance CLI that silently succeeds without acting is worse than one that
 * errors, so both sides are resolved to real paths, with a URL comparison as fallback.
 */
export function isDirectInvocation(): boolean {
  const entry = process.argv[1];
  if (entry === undefined) return false;
  const selfPath = fileURLToPath(import.meta.url);
  try {
    if (realpathSync(entry) === realpathSync(selfPath)) return true;
  } catch {
    // Fall through to the URL comparison below.
  }
  try {
    return pathToFileURL(entry).href === import.meta.url;
  } catch {
    return false;
  }
}

if (isDirectInvocation()) {
  process.exitCode = main(process.argv.slice(2));
}
