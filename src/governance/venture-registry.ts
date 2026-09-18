/**
 * Loads and validates governance/venture-registry.yaml. Deterministic only.
 * External venture repositories are read-only; this module never writes anywhere.
 *
 * Phase 0A (decisions/approvals/0010-*.md): the v0.2 fields `project_id`,
 * `lifecycle`, and `superseded_by` are now MECHANICALLY RECOGNIZED rather than
 * silently stripped. The venture schema is `.strict()`, so an unknown field is a
 * loud failure, not a quiet drop — a registry that says something this loader does
 * not understand must never load as if it had said nothing.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z } from "zod";

export const VENTURE_LIFECYCLES = ["active", "superseded"] as const;
export type VentureLifecycle = (typeof VENTURE_LIFECYCLES)[number];

const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");
const CanonicalIdentifier = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "expected a lowercase slug with no leading, trailing, or embedded whitespace",
  );

const VentureSchema = z
  .object({
    id: CanonicalIdentifier,
    name: z.string().min(1),
    project_id: CanonicalIdentifier,
    lifecycle: z.enum(VENTURE_LIFECYCLES),
    integration: z.literal("file-handoff"),
    external_repo_access: z.literal("read-only"),
    // Supersession (required on a superseded entry; forbidden on an active one —
    // enforced below, because Zod alone cannot express the cross-field rule).
    superseded_by: CanonicalIdentifier.optional(),
    superseded_on: IsoDate.optional(),
    superseded_by_decision: z.string().min(1).optional(),
    retention_reason: z.string().min(1).optional(),
    // Provenance / navigation. Documentation only; no behaviour depends on these.
    repository: z.string().min(1).optional(),
    lineage: z.string().min(1).optional(),
  })
  .strict();

const VentureRegistrySchema = z
  .object({
    version: z.string(),
    status: z.string(),
    ventures: z.array(VentureSchema).min(1),
  })
  .strict();

export type Venture = z.infer<typeof VentureSchema>;
export type VentureRegistry = z.infer<typeof VentureRegistrySchema>;

const DEFAULT_PATH = fileURLToPath(new URL("../../governance/venture-registry.yaml", import.meta.url));

function integrityError(message: string): never {
  throw new Error(`Venture registry integrity error: ${message}`);
}

/**
 * Structural invariants the registry must satisfy before any caller sees it.
 * Every one of these fails closed: an ambiguous or self-contradictory registry
 * does not load in a degraded form, it does not load at all.
 *
 * SHAPE IS CHECKED HERE, NOT ONLY IN THE FILE LOADER. Resolvers accept a
 * caller-supplied registry object, which never passes through `loadVentureRegistry`.
 * When the Zod schema ran only in the loader, an injected registry could carry a
 * malformed canonical identifier — `project_id: " twinko "`, an uppercase id, an
 * unknown extra field — and still be handed back as authorized write scope. That is
 * a project-authorization boundary failure, so the schema runs on every path that
 * can reach a write decision.
 */
export function assertVentureRegistryIntegrity(registry: VentureRegistry): void {
  const parsed = VentureRegistrySchema.safeParse(registry);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const where = issue === undefined ? "" : ` [${issue.path.join(".") || "root"}: ${issue.message}]`;
    integrityError(`registry does not satisfy the canonical schema${where}.`);
  }

  const byId = new Map<string, Venture>();
  for (const v of registry.ventures) {
    if (byId.has(v.id)) integrityError(`duplicate id "${v.id}".`);
    byId.set(v.id, v);
  }

  const active = registry.ventures.filter((v) => v.lifecycle === "active");
  if (active.length === 0) integrityError("no active venture — at least one is required.");

  // An active project_id must identify exactly one active venture, or project
  // isolation cannot be enforced downstream.
  const activeProjectIds = new Set<string>();
  for (const v of active) {
    if (activeProjectIds.has(v.project_id))
      integrityError(`duplicate project_id "${v.project_id}" among active ventures.`);
    activeProjectIds.add(v.project_id);
    const idOwner = byId.get(v.project_id);
    if (idOwner !== undefined && idOwner.id !== v.id) {
      integrityError(
        `active project_id "${v.project_id}" for venture "${v.id}" collides with venture id "${idOwner.id}". ` +
          "Venture ids and active canonical project_ids must form one globally unambiguous namespace.",
      );
    }
    if (v.superseded_by !== undefined)
      integrityError(`active venture "${v.id}" declares superseded_by — an active venture is not superseded.`);
    if (v.superseded_on !== undefined || v.superseded_by_decision !== undefined)
      integrityError(`active venture "${v.id}" declares supersession metadata.`);
  }

  for (const v of registry.ventures.filter((x) => x.lifecycle === "superseded")) {
    if (v.superseded_by === undefined)
      integrityError(`superseded venture "${v.id}" must declare superseded_by.`);
    const successor = byId.get(v.superseded_by);
    if (successor === undefined)
      integrityError(`superseded venture "${v.id}" points at unknown successor "${v.superseded_by}".`);
    // No supersession chains: a successor must itself be a live target, so
    // resolution is one hop and can never cycle.
    if (successor.lifecycle !== "active")
      integrityError(
        `superseded venture "${v.id}" points at "${successor.id}", which is not active — supersession chains are not permitted.`,
      );
    if (successor.project_id !== v.project_id)
      integrityError(
        `superseded venture "${v.id}" has project_id "${v.project_id}" but its successor "${successor.id}" has "${successor.project_id}" — a superseded identity must carry its successor's canonical project_id.`,
      );
  }
}

export function loadVentureRegistry(path: string = DEFAULT_PATH): VentureRegistry {
  const registry = VentureRegistrySchema.parse(parse(readFileSync(path, "utf8")));
  assertVentureRegistryIntegrity(registry);
  return registry;
}

export const VENTURE_REGISTRY: VentureRegistry = loadVentureRegistry();

/** Ventures currently operating. Superseded identities are excluded. */
export function activeVentures(registry: VentureRegistry = VENTURE_REGISTRY): Venture[] {
  return registry.ventures.filter((v) => v.lifecycle === "active");
}

/** Exact venture-id lookup. Returns superseded entries too — callers decide what that means. */
export function findVentureById(
  id: string,
  registry: VentureRegistry = VENTURE_REGISTRY,
): Venture | undefined {
  return registry.ventures.find((v) => v.id === id);
}

/** The canonical project_id of every active project. */
export function activeProjectIds(registry: VentureRegistry = VENTURE_REGISTRY): string[] {
  return activeVentures(registry).map((v) => v.project_id);
}
