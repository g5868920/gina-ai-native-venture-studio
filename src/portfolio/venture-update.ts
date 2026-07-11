/**
 * Venture update parsing and validation. Deterministic only.
 * Field specification: schemas/venture-update.schema.yaml (tests prove no drift).
 */
import { z } from "zod";
import { parse } from "yaml";
import { VENTURE_REGISTRY, type VentureRegistry } from "../governance/venture-registry.js";

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

export type UpdateResult =
  | { ok: true; update: VentureUpdate }
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

export function validateVentureUpdate(
  raw: unknown,
  registry: VentureRegistry = VENTURE_REGISTRY,
): UpdateResult {
  const parsed = VentureUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const where = issue === undefined ? "" : ` [${issue.path.join(".") || "root"}: ${issue.message}]`;
    return { ok: false, reason: `Schema validation failed${where}` };
  }
  const update = parsed.data;
  if (!registry.ventures.some((v) => v.id === update.venture)) {
    return {
      ok: false,
      reason: `Unknown venture "${update.venture}" — not in governance/venture-registry.yaml.`,
    };
  }
  if (update.reporting_period.start > update.reporting_period.end) {
    return { ok: false, reason: "reporting_period.start is after reporting_period.end." };
  }
  return { ok: true, update };
}

/** Parse + validate a raw file's content. */
export function loadVentureUpdate(content: string, registry: VentureRegistry = VENTURE_REGISTRY): UpdateResult {
  try {
    return validateVentureUpdate(parseFrontmatter(content), registry);
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}
