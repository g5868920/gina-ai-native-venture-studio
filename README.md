# gina-ai-native-venture-studio

Repository-owned operating system for Gina AI-Native Venture Studio, including AI executive governance, portfolio coordination, decision rights, source-of-truth rules, and CEO reporting workflows.

**Company OS v0.2.2** (`0008` v0.2.0, `0009` v0.2.1 amendment, `0010` Phase 0A, 2026-09-01). Active ventures: **Twinko** and **Nodi**.

**Governing instructions:** `CLAUDE.md` (how to work here) · `docs/COMPANY_OS_ARCHITECTURE_V0_2.md` (what the system is) · `docs/migration/COMPANY_OS_V0_2_MIGRATION_REPORT.md` (what changed from v0.1 and why).

Core principle: **AI may recommend. Humans decide** — for reserved decisions. Management is otherwise exception-based: bounded agents handle routine reversible work under `governance/autonomy-model.yaml`. Gina (Founder and Chairwoman) alone approves reserved decisions — see `constitution/AUTHORITY.md`.

## Setup (clean clone)

Requires Node.js ≥ 20 and pnpm (via `corepack enable pnpm`).

```bash
pnpm install
pnpm verify        # typecheck + full test suite
```

## Demo — CEO Weekly Portfolio Review (Milestone 1)

One command validates and renders the historical 2026-W28 pair to stdout without writing a file. The sample cites the venture under its former `pm-workflow` id, retained deliberately so history stays valid; new updates use `nodi`:

```bash
pnpm demo
```

Historical output is read-only and written only to stdout. No generated artifact is created by `pnpm demo`.

For a new week, write updates under `inputs/venture-updates/<period>/` following `templates/venture-update.md`, then run:

```bash
pnpm portfolio-review -- inputs/venture-updates/<period>/*.md
```

Operational output: `generated/board-briefs/weekly-board-brief-<period-end>.md` — derivative, `CEO Review Required — NOT canonical`, excluded from version control.

The CEO judgment layer (recommendations with trade-offs, next actions) is a separate reviewed reasoning step per `decisions/approvals/0004-portfolio-review-foundation-v0.1.md`, written as `weekly-board-brief-<period>-reviewed.md` alongside the deterministic brief — primarily in Traditional Chinese per the Chairwoman language policy in `skills/ceo/portfolio-review/SKILL.md` §5.

## Repository map

`constitution/` authority model · `governance/` status model + autonomy model + decision-council and engineering-review policies + executive/venture registries · `executives/` operating matrix, contracts, handoff rules · `skills/ceo/` executive skills · `schemas/`, `templates/` update format · `handoffs/` read-only venture handoff sources · `inputs/` validated venture updates · `decisions/approvals/` Chairwoman decision records · `evidence/records/` provenance · `generated/` derivative outputs (never canonical) · `src/`, `tests/` deterministic pipeline.

## Governance invariants (mechanically tested)

Recommendations can never become approvals; `Chairwoman Approved` requires an explicit approval record by Gina; unknown statuses fail; generated outputs cannot serve as canonical decisions; no executive may approve reserved decisions. See `tests/`.
