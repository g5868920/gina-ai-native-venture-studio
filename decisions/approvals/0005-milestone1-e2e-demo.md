# Decision 0005 — Milestone 1: End-to-End Venture Studio Demo

status: Chairwoman Approved
approvedBy: Gina
approvedDate: 2026-07-12
recordPath: decisions/approvals/0005-milestone1-e2e-demo.md

---

## Decision

The Chairwoman approves Milestone 1 and records that:

1. **Milestone 1 acceptance criteria are complete** — the repository supports the end-to-end local workflow (handoff sources → factual, source-referenced venture updates → deterministic validation with handoff-citation existence checks → Weekly Board Brief), with typecheck, build, full test suite (42/42) and e2e demo run verified per the Milestone 1 completion report and `evidence/records/0005-milestone1-e2e-demo.md`.
2. **`pnpm demo` is the approved v0.1 demo path**, documented in `README.md`.
3. **CEO human-readable outputs default to Traditional Chinese**, with English retained for precise product/technical/governance/business terms, per the language policy in `skills/ceo/portfolio-review/SKILL.md` §5. Machine-readable fields, status values, IDs, file paths and schema keys remain in English.
4. **Generated briefs remain non-canonical** — everything under `generated/` is derivative, excluded from version control, and can never serve as a canonical decision.
5. **Free-form handoff extraction and the handoff checksum manifest are deferred** — update compilation from handoffs remains executor work under the portfolio-review skill; the citation existence check is the accepted M1 integrity guarantee.
6. **Unresolved product decisions are not Milestone 1 blockers** — the open items from the W28 review (dogfood slice conflict PMW-046 vs D-051, data/provider boundary, Twinko wedge and first-value moment, spike storage choice, founder time budget) remain open product decisions tracked for their own review, and do not gate this milestone.

## Scope and Limits

Approves Milestone 1 completion and the operating conventions above only. Does not decide any open product decision listed in item 6; does not authorize new phases, infrastructure, commits, releases or external communication.

## Basis

Milestone 1 completion report (2026-07-12); `evidence/records/0005-milestone1-e2e-demo.md`; prior approvals 0001–0004; `CLAUDE.md`.
