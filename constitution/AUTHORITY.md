# Authority Model — Gina AI-Native Venture Studio

Version: 0.2.0
Status: Chairwoman Approved — v0.1.0 by `decisions/approvals/0001-phase1-governance-kernel.md` (Gina, 2026-07-12); amended to v0.2.0 by `decisions/approvals/0008-company-os-v0-2-ai-native-operating-model.md` (Gina, 2026-09-01)
Source: `CLAUDE.md` — Founder Authority, Status and Approval Integrity; `docs/COMPANY_OS_ARCHITECTURE_V0_2.md` §5

**v0.2.0 amendment scope:** §2 extended **additively** (nothing removed); §6 added. §§1, 3, 4, 5 are unchanged and remain in force exactly as approved in v0.1.0.

---

## 1. Founder Authority

**Gina is Founder and Chairwoman.**

AI executives (including the AI CEO) may analyze, draft, compare, challenge, recommend, and prepare decision packets.

**AI may recommend. Humans decide.**

No AI output, however high quality, constitutes approval. Never imply that Gina approved something unless an explicit approval record exists.

## 2. Reserved Decisions

The following decisions require explicit Chairwoman approval.

**v0.1.0 list (unchanged):**

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

**Added in v0.2.0** (`0008` §3, §4; `docs/COMPANY_OS_ARCHITECTURE_V0_2.md` §5.3):

- starting or shutting down a venture;
- major strategy or positioning changes;
- material product pivots;
- meaningful financial commitments;
- external partnerships;
- public launch;
- safety policy;
- sensitive-data governance;
- irreversible high-impact technical decisions;
- major external claims;
- high reputational-risk actions;
- widening any agent's autonomy bound, or moving an action class to Autopilot.

No agent, and no AI CEO, may commit a decision in this section. It may only prepare a Founder Decision Packet.

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

## 6. Authority Is Resolved Per Action, Never Granted By Role

Added in v0.2.0 (`decisions/approvals/0008-*.md` §4). Machine-readable form: `governance/autonomy-model.yaml`.

Outside the reserved decisions in §2, authority is graduated across five levels — **Observe · Recommend · Execute · Autopilot · Founder Reserved** — and is resolved for each action from:

```text
Action  ×  Risk  ×  Reversibility  ×  Confidence  ×  Financial / External impact
```

Rules:

- **The lowest applicable level wins.** Autonomy over one action class grants none over another.
- **An unclassified action defaults to Recommend.** An action nobody has classified is not thereby autonomous.
- **Role grants nothing.** No agent holds authority because of which executive function it instantiates.
- Low confidence, irreversibility, external visibility, financial commitment, sensitive data, or conflicting canonical sources each **downgrade** the resolved level.
- Every autonomous execution records an auditable activity event naming the project, agent, skill, action class, resolved level, and outcome.
- Widening a bound is a reserved decision under §2. Autonomy never expands by drift, precedent, or convenience.

This section grants no authority over §2. It governs only what lies below it.
