/**
 * Deterministic status-transition validation.
 *
 * Governance rules enforced here (see constitution/AUTHORITY.md):
 *  - only statuses defined in governance/status-model.yaml are valid;
 *  - only transitions listed in the model are allowed;
 *  - entering "Chairwoman Approved" additionally requires a valid,
 *    explicit approval record — there is no automatic approval;
 *  - generated artifacts can never serve as canonical decision records.
 *
 * No model/LLM reasoning is involved anywhere in this module.
 */
import { STATUS_MODEL, type StatusModel } from "./status-model.js";

export interface ApprovalRecord {
  /** Repo-relative path to the written Chairwoman decision record. */
  recordPath: string;
  /** Must equal the approver defined in the status model ("Gina"). */
  approvedBy: string;
  /** ISO date, YYYY-MM-DD. */
  approvedOn: string;
}

export type ValidationResult = { ok: true } | { ok: false; reason: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isKnownStatus(status: string, model: StatusModel = STATUS_MODEL): boolean {
  return model.statuses.includes(status);
}

export function validateApprovalRecord(
  record: ApprovalRecord | undefined,
  model: StatusModel = STATUS_MODEL,
): ValidationResult {
  if (record === undefined) {
    return {
      ok: false,
      reason:
        `"${model.approval.status}" requires an explicit approval record; none was provided. ` +
        "AI may recommend. Humans decide.",
    };
  }
  if (record.recordPath.trim() === "") {
    return { ok: false, reason: "Approval record must reference a decision record path." };
  }
  if (record.approvedBy !== model.approval.approver) {
    return {
      ok: false,
      reason:
        `Approval must be recorded by "${model.approval.approver}" (Chairwoman); ` +
        `got "${record.approvedBy}".`,
    };
  }
  if (!ISO_DATE.test(record.approvedOn)) {
    return { ok: false, reason: "Approval record must include an ISO date (YYYY-MM-DD)." };
  }
  return { ok: true };
}

export function validateTransition(
  from: string,
  to: string,
  options: { approvalRecord?: ApprovalRecord } = {},
  model: StatusModel = STATUS_MODEL,
): ValidationResult {
  if (!isKnownStatus(from, model)) {
    return { ok: false, reason: `Unknown status: "${from}".` };
  }
  if (!isKnownStatus(to, model)) {
    return { ok: false, reason: `Unknown status: "${to}".` };
  }
  const allowed = model.transitions[from] ?? [];
  if (!allowed.includes(to)) {
    return { ok: false, reason: `Transition not allowed: "${from}" -> "${to}".` };
  }
  if (to === model.approval.status) {
    return validateApprovalRecord(options.approvalRecord, model);
  }
  return { ok: true };
}

/** Where an artifact comes from. Generated outputs are derivative (CLAUDE.md: Generated Outputs). */
export type ArtifactOrigin = "canonical" | "generated";

export interface Artifact {
  origin: ArtifactOrigin;
  /** Repo-relative path. */
  path: string;
}

/**
 * A generated recommendation is never a canonical decision.
 * Canonical decision records must be canonical-origin files outside generated/.
 */
export function canServeAsCanonicalDecision(artifact: Artifact): boolean {
  if (artifact.origin === "generated") return false;
  if (artifact.path.startsWith("generated/")) return false;
  return true;
}
