# Decision 0004 — Portfolio Review Foundation v0.1 (Phase 3A)

status: Chairwoman Approved
approvedBy: Gina
approvedDate: 2026-07-12
recordPath: decisions/approvals/0004-portfolio-review-foundation-v0.1.md

---

## Decision

The Chairwoman approves the Phase 3A portfolio-review foundation:

- `governance/venture-registry.yaml` — venture registry (PM Workflow, Twinko; file-handoff; external repos read-only);
- `schemas/venture-update.schema.yaml` — venture-update schema (12 fields; unknown fields rejected);
- deterministic validation and board-brief generation (`src/governance/venture-registry.ts`, `src/portfolio/venture-update.ts`, `src/portfolio/generate-brief.ts`, `src/cli.ts`, `skills/ceo/portfolio-review/SKILL.md`, templates);
- the `generated/` non-canonical boundary, including its exclusion from version control;
- the current v0.1 assumptions as documented in `evidence/records/0004-phase3-portfolio-review.md` (frontmatter format; `{start, end}` reporting period with next review = end + 7 days; deterministic cross-venture detection; recommendations never auto-generated).

## Clarification of Scope

**This phase provides the deterministic portfolio-review foundation only.** The pipeline validates inputs and aggregates them — it exercises no judgment. CEO judgment and recommendations (including the brief's "CEO Recommendations" section) require a separate, reviewed reasoning step, whose output remains a recommendation subject to `constitution/AUTHORITY.md`: it can never become approval or canonical truth automatically.

## Scope and Limits

Does not approve any model-call integration, workflow-logic changes, agents, or orchestration; does not make any generated brief canonical; does not alter approvals 0001–0003. Sample inputs remain synthetic and are never citable as venture status.

## Basis

Phase 3 completion report (2026-07-12): typecheck PASS, 40/40 tests passing, CLI run verified on synthetic samples; `CLAUDE.md` (Generated Outputs; Writeback Policy).
