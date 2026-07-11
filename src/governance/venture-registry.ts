/**
 * Loads and validates governance/venture-registry.yaml. Deterministic only.
 * External venture repositories are read-only; this module never writes anywhere.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z } from "zod";

const VentureSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  integration: z.literal("file-handoff"),
  external_repo_access: z.literal("read-only"),
});

const VentureRegistrySchema = z.object({
  version: z.string(),
  status: z.string(),
  ventures: z.array(VentureSchema).min(1),
});

export type Venture = z.infer<typeof VentureSchema>;
export type VentureRegistry = z.infer<typeof VentureRegistrySchema>;

const DEFAULT_PATH = fileURLToPath(new URL("../../governance/venture-registry.yaml", import.meta.url));

export function loadVentureRegistry(path: string = DEFAULT_PATH): VentureRegistry {
  const registry = VentureRegistrySchema.parse(parse(readFileSync(path, "utf8")));
  const ids = new Set<string>();
  for (const v of registry.ventures) {
    if (ids.has(v.id)) throw new Error(`Venture registry integrity error: duplicate id "${v.id}".`);
    ids.add(v.id);
  }
  return registry;
}

export const VENTURE_REGISTRY: VentureRegistry = loadVentureRegistry();
