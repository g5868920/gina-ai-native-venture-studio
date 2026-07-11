# Authority Model — Gina AI-Native Venture Studio

Version: 0.1.0
Status: Chairwoman Approved — see `decisions/approvals/0001-phase1-governance-kernel.md` (approved by Gina, 2026-07-12)
Source: `CLAUDE.md` — Founder Authority, Status and Approval Integrity

---

## 1. Founder Authority

**Gina is Founder and Chairwoman.**

AI executives (including the AI CEO) may analyze, draft, compare, challenge, recommend, and prepare decision packets.

**AI may recommend. Humans decide.**

No AI output, however high quality, constitutes approval. Never imply that Gina approved something unless an explicit approval record exists.

## 2. Reserved Decisions

The following decisions require explicit Chairwoman approval:

- venture creation, shutdown, or reprioritization;
- committed product scope;
- pricing and monetization;
- material architecture decisions;
- privacy, legal, safety, and trust policy;
- contracts, spending, and external commitments;
- public portfolio claims;
- protected-branch merges;
- production releases;
- external communications on behalf of the Studio or its ventures.

## 3. Recommendation Is Never Approval

- `CEO Recommended` must never equal `Chairwoman Approved`.
- Review does not equal approval.
- A generated artifact (anything under `generated/` or produced by an executor) is derivative and can never serve as a canonical decision record.
- There is no automatic path from any recommendation status to `Chairwoman Approved`. The status model (`governance/status-model.yaml`) contains no direct transition from `CEO Recommended` to `Chairwoman Approved`; approval is reachable only from `Chairwoman Decision Required`, and only with a valid approval record.

## 4. Approval Record

A transition to `Chairwoman Approved` is valid only when accompanied by an explicit approval record with all of:

- `recordPath` — repo-relative path to the written Chairwoman decision record;
- `approvedBy` — must be `Gina`;
- `approvedOn` — ISO date (`YYYY-MM-DD`).

The deterministic enforcement of this rule lives in `src/governance/validate-status.ts` and is proven by `tests/approval-integrity.test.ts`.

## 5. Precedence

If this file and `CLAUDE.md` ever conflict, `CLAUDE.md` governs until the conflict is resolved by an explicit Chairwoman decision. Conflicts must be surfaced, never silently resolved.
