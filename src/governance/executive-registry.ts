/**
 * Loads and validates the executive registry (governance/executive-registry.yaml),
 * which is DERIVED from executives/EXECUTIVE_OPERATING_MATRIX.md (canonical).
 *
 * Deterministic: parsing, schema validation, and integrity checks only.
 * No model reasoning, no agents, no orchestration.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z } from "zod";
import { STATUS_MODEL } from "./status-model.js";

const ActivationSchema = z.enum(["Active", "Standby", "Limited"]);

const ExecutiveSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  activation: ActivationSchema,
  contract: z.string().min(1),
  /**
   * Structurally pinned to `false` for every executive:
   * a registry entry claiming approval power fails schema validation.
   * Gina alone approves reserved decisions (constitution/AUTHORITY.md).
   */
  may_approve_reserved_decisions: z.literal(false),
  owns: z.array(z.string().min(1)).min(1),
});

const RegistrySchema = z.object({
  version: z.string(),
  status: z.string(),
  source_of_truth: z.string(),
  activation_states: z.array(z.string()).min(1),
  output_ceiling: z.string(),
  executives: z.array(ExecutiveSchema).min(1),
});

export type Executive = z.infer<typeof ExecutiveSchema>;
export type ExecutiveRegistry = z.infer<typeof RegistrySchema>;

const DEFAULT_REGISTRY_PATH = fileURLToPath(
  new URL("../../governance/executive-registry.yaml", import.meta.url),
);

export function loadExecutiveRegistry(path: string = DEFAULT_REGISTRY_PATH): ExecutiveRegistry {
  const registry = RegistrySchema.parse(parse(readFileSync(path, "utf8")));

  const ids = new Set<string>();
  const ownershipOwners = new Map<string, string>();

  for (const exec of registry.executives) {
    if (ids.has(exec.id)) {
      throw new Error(`Registry integrity error: duplicate executive id "${exec.id}".`);
    }
    ids.add(exec.id);

    if (!registry.activation_states.includes(exec.activation)) {
      throw new Error(
        `Registry integrity error: "${exec.id}" has activation "${exec.activation}" not in activation_states.`,
      );
    }

    for (const area of exec.owns) {
      const existing = ownershipOwners.get(area);
      if (existing !== undefined) {
        throw new Error(
          `Registry integrity error: ownership area "${area}" claimed by both "${existing}" and "${exec.id}".`,
        );
      }
      ownershipOwners.set(area, exec.id);
    }
  }

  if (!STATUS_MODEL.statuses.includes(registry.status)) {
    throw new Error(`Registry integrity error: status "${registry.status}" is not a known status.`);
  }
  if (!STATUS_MODEL.statuses.includes(registry.output_ceiling)) {
    throw new Error(
      `Registry integrity error: output_ceiling "${registry.output_ceiling}" is not a known status.`,
    );
  }
  if (registry.output_ceiling === STATUS_MODEL.approval.status) {
    throw new Error(
      "Registry integrity error: executive output ceiling can never be the approval status.",
    );
  }

  return registry;
}

/** Canonical registry instance. */
export const EXECUTIVE_REGISTRY: ExecutiveRegistry = loadExecutiveRegistry();

/** Which executive owns an area, or undefined if unowned. Deterministic lookup. */
export function ownerOf(area: string, registry: ExecutiveRegistry = EXECUTIVE_REGISTRY): string | undefined {
  return registry.executives.find((e) => e.owns.includes(area))?.id;
}

/** Always false for every registered executive — approval belongs to Gina alone. */
export function mayApproveReservedDecisions(
  executiveId: string,
  registry: ExecutiveRegistry = EXECUTIVE_REGISTRY,
): boolean {
  const exec = registry.executives.find((e) => e.id === executiveId);
  if (exec === undefined) {
    throw new Error(`Unknown executive: "${executiveId}".`);
  }
  return exec.may_approve_reserved_decisions;
}
