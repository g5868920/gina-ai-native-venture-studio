# gina-ai-native-venture-studio

Repository-owned operating system for Gina AI-Native Venture Studio, including AI executive governance, portfolio coordination, decision rights, source-of-truth rules, and CEO reporting workflows.

**Governing instructions:** `CLAUDE.md`. Core principle: **AI may recommend. Humans decide.** Gina (Founder and Chairwoman) alone approves reserved decisions — see `constitution/AUTHORITY.md`.

## Setup (clean clone)

Requires Node.js ≥ 20 and pnpm (via `corepack enable pnpm`).

```bash
pnpm install
pnpm verify        # typecheck + full test suite
```

## Demo — CEO Weekly Portfolio Review (Milestone 1)

One command runs the end-to-end workflow: validates the source-referenced venture updates for AI-Native PM Workflow and Twinko (compiled from the read-only handoffs under `handoffs/`), verifies every cited handoff source exists, and generates the deterministic Weekly Board Brief:

```bash
pnpm demo
```

Output: `generated/board-briefs/weekly-board-brief-<period-end>.md` — derivative, `CEO Review Required — NOT canonical`, excluded from version control.

For a new week, write updates under `inputs/venture-updates/<period>/` following `templates/venture-update.md`, then run:

```bash
pnpm portfolio-review -- inputs/venture-updates/<period>/*.md
```

The CEO judgment layer (recommendations with trade-offs, next actions) is a separate reviewed reasoning step per `decisions/approvals/0004-portfolio-review-foundation-v0.1.md`, written as `weekly-board-brief-<period>-reviewed.md` alongside the deterministic brief — primarily in Traditional Chinese per the Chairwoman language policy in `skills/ceo/portfolio-review/SKILL.md` §5.

## Repository map

`constitution/` authority model · `governance/` status model + executive/venture registries · `executives/` operating matrix, contracts, handoff rules · `skills/ceo/` executive skills · `schemas/`, `templates/` update format · `handoffs/` read-only venture handoff sources · `inputs/` validated venture updates · `decisions/approvals/` Chairwoman decision records · `evidence/records/` provenance · `generated/` derivative outputs (never canonical) · `src/`, `tests/` deterministic pipeline.

## Governance invariants (mechanically tested)

Recommendations can never become approvals; `Chairwoman Approved` requires an explicit approval record by Gina; unknown statuses fail; generated outputs cannot serve as canonical decisions; no executive may approve reserved decisions. See `tests/`.
