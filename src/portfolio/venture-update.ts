/**
 * Venture update parsing and validation. Deterministic only.
 * Field specification: schemas/venture-update.schema.yaml (tests prove no drift).
 */
import { z } from "zod";
import { parse } from "yaml";
import { VENTURE_REGISTRY, type VentureRegistry } from "../governance/venture-registry.js";
import { resolveIdentity, resolveProjectScopeForWrite } from "../governance/project-identity.js";

const DateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");
const StrList = z.array(z.string().min(1));

export const VentureUpdateSchema = z
  .object({
    venture: z.string().min(1),
    reporting_period: z.object({ start: DateStr, end: DateStr }).strict(),
    current_status: z.string().min(1),
    completed: StrList,
    in_progress: StrList,
    next_priorities: StrList,
    decisions_needed: StrList,
    risks: StrList,
    blockers: StrList,
    dependencies: StrList,
    evidence_references: StrList,
    assumptions_unknowns: StrList,
  })
  .strict(); // unknown fields are rejected, per schemas/venture-update.schema.yaml

export type VentureUpdate = z.infer<typeof VentureUpdateSchema>;

/**
 * Why an update is being loaded. Phase 0A — decisions/approvals/0010-*.md §6.
 *
 * - `operational` (DEFAULT, fails closed): a new venture update entering the
 *   Studio. It must target an ACTIVE canonical project. A superseded identity is
 *   rejected outright and is never silently rewritten to its successor.
 * - `historical`: reading a record that already exists. Superseded identities are
 *   readable, because history stays readable — the 2026-W28 updates cite
 *   `pm-workflow`, and rewriting them to say otherwise would falsify the record.
 *
 * The default is `operational` deliberately: a caller that has not thought about
 * which one it is should get the safe answer.
 */
export type OperationalUpdateResult =
  | {
      ok: true;
      intent: "operational";
      writable: true;
      update: VentureUpdate;
      /** Authorization scope for an operational mutation. */
      projectId: string;
    }
  | { ok: false; reason: string };

export type HistoricalUpdateResult =
  | {
      ok: true;
      intent: "historical";
      writable: false;
      update: VentureUpdate;
      /** Navigation and rendering metadata only. Never write authorization. */
      lineage: { canonicalProjectId: string; historicalIdentity: boolean };
    }
  | { ok: false; reason: string };

/** Extract the YAML frontmatter block from a venture-update markdown file. */
export function parseFrontmatter(content: string): unknown {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/.exec(content);
  if (match === null) {
    throw new Error("No YAML frontmatter block found (expected leading --- ... ---).");
  }
  // YAML parses date-like scalars into Date objects by default; keep raw strings.
  return parse(match[1] ?? "", { schema: "failsafe" });
}

type ParsedUpdate = { ok: true; update: VentureUpdate } | { ok: false; reason: string };

function parseVentureUpdate(raw: unknown): ParsedUpdate {
  const parsed = VentureUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const where = issue === undefined ? "" : ` [${issue.path.join(".") || "root"}: ${issue.message}]`;
    return { ok: false, reason: `Schema validation failed${where}` };
  }
  const update = parsed.data;
  if (update.reporting_period.start > update.reporting_period.end) {
    return { ok: false, reason: "reporting_period.start is after reporting_period.end." };
  }
  return { ok: true, update };
}

/** Validate a new operational update. This is the only API that returns write scope. */
export function validateVentureUpdate(
  raw: unknown,
  registry: VentureRegistry = VENTURE_REGISTRY,
): OperationalUpdateResult {
  const parsed = parseVentureUpdate(raw);
  if (!parsed.ok) return parsed;

  const scope = resolveProjectScopeForWrite({ identity: parsed.update.venture }, registry);
  if (!scope.ok) {
    return {
      ok: false,
      reason:
        scope.code === "unknown_identity"
          ? `Unknown venture "${parsed.update.venture}" — not in governance/venture-registry.yaml.`
          : scope.reason,
    };
  }
  return { ok: true, intent: "operational", writable: true, update: parsed.update, projectId: scope.projectId };
}

/** Read and validate existing history. The result cannot authorize a write. */
export function readHistoricalVentureUpdate(
  raw: unknown,
  registry: VentureRegistry = VENTURE_REGISTRY,
): HistoricalUpdateResult {
  const parsed = parseVentureUpdate(raw);
  if (!parsed.ok) return parsed;

  const resolution = resolveIdentity(parsed.update.venture, registry);
  if (resolution.kind === "unknown" || resolution.kind === "missing") {
    return {
      ok: false,
      reason: `Unknown venture "${parsed.update.venture}" — not in governance/venture-registry.yaml.`,
    };
  }
  return {
    ok: true,
    intent: "historical",
    writable: false,
    update: parsed.update,
    lineage:
      resolution.kind === "superseded"
        ? { canonicalProjectId: resolution.canonicalProjectId, historicalIdentity: true }
        : { canonicalProjectId: resolution.projectId, historicalIdentity: false },
  };
}

/** Parse and authorize a raw file as a new operational update. */
export function loadVentureUpdate(
  content: string,
  registry: VentureRegistry = VENTURE_REGISTRY,
): OperationalUpdateResult {
  try {
    return validateVentureUpdate(parseFrontmatter(content), registry);
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}

/** Parse an existing record for historical inspection/rendering only. */
export function loadHistoricalVentureUpdate(
  content: string,
  registry: VentureRegistry = VENTURE_REGISTRY,
): HistoricalUpdateResult {
  try {
    return readHistoricalVentureUpdate(parseFrontmatter(content), registry);
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}

const HANDOFF_REF = /handoffs\/[A-Za-z0-9_\-./]+\.md/g;

/**
 * Extract every handoff source path mentioned anywhere in an update.
 * Deterministic; used to verify that cited sources actually exist,
 * so an update can never rest on a missing or moved handoff file.
 */
export function extractHandoffRefs(update: VentureUpdate): string[] {
  const strings: string[] = [update.venture, update.current_status];
  for (const list of [
    update.completed,
    update.in_progress,
    update.next_priorities,
    update.decisions_needed,
    update.risks,
    update.blockers,
    update.dependencies,
    update.evidence_references,
    update.assumptions_unknowns,
  ]) {
    strings.push(...list);
  }
  const refs = new Set<string>();
  for (const s of strings) {
    for (const match of s.match(HANDOFF_REF) ?? []) refs.add(match);
  }
  return [...refs].sort();
}
