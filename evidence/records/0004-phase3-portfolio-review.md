# Evidence Record 0004 — Phase 3: CEO Weekly Portfolio Review

Date: 2026-07-12
Public-use status: Private / not for public use (pending Chairwoman classification)
Review status: Chairwoman Decision Required (Phase 3 output awaiting review; no approval record, per instruction)

---

## Problem and Context

First operational workflow on top of the approved governance kernel (0001), CEO design (0002), and executive system (0003): accept structured venture updates for PM Workflow and Twinko, validate deterministically, and generate a review-ready Weekly Board Brief.

## Gina's Framing and Decisions

Specified the full workflow: file list, the 12 update fields, the 9 brief sections, governance rules (briefs never canonical, recommendations never approvals, unknowns stay unknown, nothing invented, output only under `generated/`, no automatic writeback), and constraints (minimal, file-based, no agents/APIs/databases/model calls/dashboards/external writes; no commit or approval record).

## AI Contribution (Claude, executor)

Designed and implemented: venture registry + loader; update schema (YAML spec + Zod enforcement with an anti-drift test); frontmatter-based update format; deterministic brief generator with injectable clock, sha256 source checksum, and registry-ordered aggregation; minimal CLI (`pnpm portfolio-review`); tests; synthetic samples with every entry prefixed `SAMPLE:`.

## Assumptions (flagged for review)

1. Update files are Markdown with YAML frontmatter (all data in frontmatter; body unparsed).
2. `generated/` added to `.gitignore` so derivative outputs can never be committed accidentally; promotion to canon requires an explicit writeback decision. Easily reversed.
3. Reporting period is `{start, end}` ISO dates; next review = end + 7 days.
4. "CEO Recommendations" renders as explicitly not-auto-generated — a deterministic generator cannot honestly produce recommendations, so the section is added by the CEO during review.
5. Cross-venture detection = a dependency string mentioning another registered venture's id or name (deterministic substring match).

## Implementation and Verification

Exact results in the Phase 3 completion report (typecheck, full test suite, CLI run on samples with generated output path).

## Ownership (no percentages)

Workflow specification, fields, sections, governance rules: **Gina**. Format design, code, tests, samples: **AI (Claude)**. Review/approval: **Gina**, pending.

## Unresolved

Assumptions 1–5 above await Chairwoman confirmation. Skill/registry files are `Draft Ready` pending a future approval record.

---

## Addendum (2026-07-12)

Phase 3A approved by Gina: `decisions/approvals/0004-portfolio-review-foundation-v0.1.md` — covering the registry, schema, deterministic pipeline, `generated/` boundary, and assumptions 1–5 above (all closed). The record clarifies this is the deterministic foundation only; CEO judgment and recommendations require a separate reviewed reasoning step. Original text preserved unchanged.
