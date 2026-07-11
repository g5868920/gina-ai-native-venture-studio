# Decision 0003 — Executive System v0.1

status: Chairwoman Approved
approvedBy: Gina
approvedDate: 2026-07-12
recordPath: decisions/approvals/0003-executive-system-v0.1.md

---

## Decision

The Chairwoman approves Executive System v0.1:

- **Activation semantics** (closing the open assumption in `evidence/records/0003-executive-system-v0.1.md`):
  - Active = routine invocation;
  - Standby = explicit CEO routing only;
  - Limited = bounded validation/review only.
- `executives/EXECUTIVE_OPERATING_MATRIX.md` — Executive Operating Matrix v0.1 (canonical source of truth for the executive system);
- `governance/executive-registry.yaml` — Executive Registry v0.1 (derived);
- Operating contracts: `executives/cpo/OPERATING_CONTRACT.md`, `executives/cto/OPERATING_CONTRACT.md`, `executives/cmo/OPERATING_CONTRACT.md`, `executives/cbo/OPERATING_CONTRACT.md`, `executives/cfo/OPERATING_CONTRACT.md`, `executives/clo/OPERATING_CONTRACT.md`;
- `executives/HANDOFF_RULES.md` — executive handoff rules.

## Scope and Limits

Approves the executive system design only. Does not alter the CEO design (approval 0002) or governance kernel (approval 0001); does not activate agents, orchestration, model calls, APIs, databases, or dashboards; does not authorize commits, releases, or external communication. Gina alone continues to approve reserved decisions; executive output remains recommendation, never approval.

## Basis

Executive System v0.1 completion report (2026-07-12): 29/29 tests passing including the six required governance proofs; `constitution/AUTHORITY.md`; `governance/status-model.yaml`.
