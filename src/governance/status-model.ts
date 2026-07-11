/**
 * Loads and validates the canonical status model from governance/status-model.yaml.
 *
 * The YAML file is the canonical source of truth (CLAUDE.md: Source of Truth).
 * This module only parses, schema-validates, and integrity-checks it —
 * it encodes no statuses of its own, so code and canon cannot drift silently.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z } from "zod";

const StatusModelSchema = z.object({
  version: z.string(),
  statuses: z.array(z.string()).length(10),
  approval: z.object({
    status: z.string(),
    requires_approval_record: z.literal(true),
    approver: z.string().min(1),
  }),
  transitions: z.record(z.string(), z.array(z.string())),
});

export type StatusModel = z.infer<typeof StatusModelSchema>;

const DEFAULT_MODEL_PATH = fileURLToPath(
  new URL("../../governance/status-model.yaml", import.meta.url),
);

/**
 * Load the status model and fail loudly on any structural defect.
 * Deterministic: same file in, same model (or same error) out.
 */
export function loadStatusModel(path: string = DEFAULT_MODEL_PATH): StatusModel {
  const model = StatusModelSchema.parse(parse(readFileSync(path, "utf8")));

  const known = new Set(model.statuses);
  if (known.size !== model.statuses.length) {
    throw new Error("Status model integrity error: duplicate status names.");
  }
  if (!known.has(model.approval.status)) {
    throw new Error(
      `Status model integrity error: approval status "${model.approval.status}" is not a known status.`,
    );
  }
  for (const status of model.statuses) {
    if (!(status in model.transitions)) {
      throw new Error(`Status model integrity error: no transition entry for "${status}".`);
    }
  }
  for (const [from, targets] of Object.entries(model.transitions)) {
    if (!known.has(from)) {
      throw new Error(`Status model integrity error: unknown status in transitions: "${from}".`);
    }
    for (const to of targets) {
      if (!known.has(to)) {
        throw new Error(
          `Status model integrity error: unknown transition target: "${from}" -> "${to}".`,
        );
      }
    }
  }
  return model;
}

/** Canonical model instance used by default across the governance layer. */
export const STATUS_MODEL: StatusModel = loadStatusModel();
