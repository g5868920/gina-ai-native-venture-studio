# SKILL: CEO Weekly Portfolio Review

Version: 0.1.0
Status: Chairwoman Approved — see `decisions/approvals/0004-portfolio-review-foundation-v0.1.md` (Gina, 2026-07-12). Deterministic foundation only; CEO judgment/recommendations require a separate reviewed reasoning step.
Type: Deterministic file-based workflow. No agents, APIs, databases, model calls, dashboards, or external repo writes.

---

## 1. Purpose and Trigger

Turn structured venture updates into a review-ready Weekly Board Brief for the Chairwoman. Trigger: weekly cadence (`executives/ceo/OPERATING_CONTRACT.md` §9) or on demand.

## 2. Role and Required Inputs

Role: AI CEO (any executor — human, script, or model — following this file). Inputs: one venture-update file per reporting venture, conforming to `templates/venture-update.md` and `schemas/venture-update.schema.yaml`, for ventures registered in `governance/venture-registry.yaml`.

## 3. Source Priority

Updates are venture handoffs (authority level 5, `CLAUDE.md` Source of Truth) — below decision records and status documents, above generated reports. The brief is derivative (level 6).

## 4. Procedure

1. Validate every update deterministically: `pnpm portfolio-review -- <update files>` (schema, registered venture, period sanity, unknown fields rejected).
2. Fix invalid inputs at the source — never patch data in the brief.
3. Generate the brief (same command; runs only when all inputs validate).
4. CEO review: add recommendations under **CEO Recommendations**, mark reviewed items, set status toward `CEO Recommended` → `Chairwoman Decision Required`.
5. Submit to Gina.

## 5. Expected Outputs

One brief under `generated/board-briefs/`, sections exactly per `templates/weekly-board-brief.md`, with provenance header (timestamp, sources, checksum, skill, executor, review status).

## 6. Evidence Requirements

Claims carry evidence references from inputs or sit in assumptions/unknowns. Missing facts remain visibly unknown. Metrics, outcomes, and evidence are never invented — the generator is deterministic and cannot.

## 7. Allowed and Prohibited Actions

Allowed: validating inputs, generating the brief, flagging gaps and conflicts. Prohibited: editing canonical files or venture repositories; filling missing facts; upgrading claim strength; treating the brief as a decision; external communication.

## 8. Approval Boundary

Brief ceiling: `Chairwoman Decision Required`. Decisions listed in the brief are made only by Gina via explicit approval records (`constitution/AUTHORITY.md` §4).

## 9. Escalation Conditions

Escalate immediately: an update contradicts a canonical decision record; material facts unknown for a reserved decision; cross-venture conflict; evidence references that do not resolve.

## 10. Quality Checklist

- [ ] All inputs validated; failures fixed at source
- [ ] Every section present; empty sections say "None reported."
- [ ] No invented metrics, outcomes, evidence, or ranking
- [ ] Decisions-required section separates asking from approving
- [ ] Provenance header complete
- [ ] Output under `generated/` only

## 11. Writeback Requirements

Brief generation is safe automatic writeback (`generated/` only). Nothing in a brief becomes canonical without the writeback policy in `CLAUDE.md`; venture repositories are never written.

## 12. Version and Status

- 0.1.0 — initial version (Phase 3, first operational workflow).
