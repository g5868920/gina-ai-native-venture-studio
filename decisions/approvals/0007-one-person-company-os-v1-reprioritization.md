# Decision 0007 — One-Person Company OS v1.0 Reprioritization

status: Chairwoman Approved
approvedBy: Gina
approvedDate: 2026-07-12
supersedes: 0006 (partial — active priority sequencing only, §1 and §2)
recordPath: decisions/approvals/0007-one-person-company-os-v1-reprioritization.md

---

## Decision

The Chairwoman approves the One-Person Company OS v1.0 reprioritization:

1. **One-Person Company OS v1.0 is the primary active company milestone.** The goal is to make the existing Studio usable as the file-based cockpit from which Gina *drives* the development of PM Workflow and Twinko: planning, decisions, handoffs, and review happen in the Studio; product code is implemented in each product repository (via Claude Code). The Studio does not contain product code.

2. **This decision supersedes only the active-priority sequencing established in `0006` §§1–2.** It does not reject, delete, or invalidate the prototype work. All other provisions of `0006` remain in force unless explicitly contradicted by this decision.

3. **PM Workflow Control Tower:** prototype implementation is substantially complete. Further UX cleanup, commit, push, and dogfooding are paused until the One-Person Company OS v1.0 milestone reaches its definition of done. The work remains valid.

4. **Twinko UI prototype:** deferred until the One-Person Company OS v1.0 milestone is complete.

5. **Twinko Discovery-to-Decision and PM Workflow dogfooding:** remain deferred, not rejected or superseded.

6. **Bounded Studio implementation is authorized — a new, separate grant.** Independently of the supersession in §2, this decision grants a new bounded authorization to implement S1–S8 within the Venture Studio, subject to the hard constraints: file-based; repository-owned; single-founder usable; CLI- or conversationally-operated; built primarily from existing Studio structures; deterministic where practical; human-governed; portable across models and executors. This authorization does not otherwise modify `0006`.

7. **Approved scope (S1–S8):**

   - **S1** `docs/OPERATING_LOOP.md` — one-page operating-loop runbook (the 12 steps mapped to exact files, commands, tool [chat/cowork/code], and model).
   - **S2** `templates/strategic-intake.md` — Chairwoman strategic-intake template.
   - **S3** decisions-needed queue — derived, **non-canonical**, rendered from canonical decision/status sources.
   - **S4** company-state / continuity snapshot (derived) + recovery checklist.
   - **S5** writeback checklist — codifies the `CLAUDE.md` Writeback Policy.
   - **S6 Executive routing activation:**
     - Preserve the currently approved executive statuses.
     - CEO, CPO, and CTO remain Active.
     - CMO and CBO remain Standby.
     - CFO and CLO retain their currently approved Limited status.
     - The executive registry becomes the single routing source for assigning executive functions.
     - Validate that the CEO can route requests to Active, Limited, or Standby functions based on the request type.
     - Executives remain capability and accountability boundaries, not persistent autonomous agents.
     - Do not rename, delete, merge, or instantiate new executive roles.
   - **S7 Deterministic OS CLI** — approved as a deterministic CLI that may only **prepare, render, validate, and orchestrate** the operating loop. It may **not**: make or approve reserved decisions; modify product-repository canonical truth; automatically commit, push, merge, release, spend, or communicate externally; create autonomous executives or a multi-agent system.
   - **S8 Acceptance** — dogfood this reprioritization through the loop; add tests for new deterministic components; `pnpm verify` green; continuation test passes.

8. **Out of scope (unchanged):** web dashboard; database; Supabase; LangGraph; n8n; autonomous executives; multi-agent swarm; live product-repository synchronization; automatic approvals; automatic commit, push, merge, release, spending, or external messaging.

9. **PM Workflow preservation (authorized):** before pausing PM Workflow work, its current implementation is to be preserved with a **local WIP commit** in the `pm-workflow-copilot` repository. This WIP commit must **not** be pushed yet. This is the only authorized action in the product repository under this decision; no product canonical truth is modified. (Not executed as part of the decision-recording step; performed at the pause action, after Chairwoman review.)

## Scope and Limits

Sets company-milestone priority, the bounded Studio build scope (S1–S8), and the PM Workflow preservation action only. Does not decide any pending product decision (Twinko wedge, first-value moment, naming, scope freeze, etc.); does not modify either product repository's canonical truth; does not authorize pushes, releases, or external communication. Evidence and public-claim rules stand: prototypes are demo layers and no external commercial-validation claim may be made from them.

## Definition of Done

One-Person Company OS v1.0 is done when:

- `docs/OPERATING_LOOP.md` lets a solo founder run the 12-step loop end-to-end;
- S3 (decisions-needed queue) and S4 (company-state snapshot) render deterministically and are marked non-canonical;
- the S7 CLI can **prepare, render, validate, and orchestrate** the loop within its stated limits — it makes/approves no reserved decision, mutates no product-repository canonical truth, and performs no automatic commit, push, merge, release, spend, or external message, and creates no autonomous executive or multi-agent system;
- S6 executive routing reads the registry as the single routing source and validation confirms the CEO can route requests to Active / Limited / Standby functions by request type, with no role renamed, deleted, merged, or instantiated and all approved statuses preserved;
- this reprioritization has been dogfooded through the loop once, on real repository data;
- the continuation test passes: a fresh session, reading only repository files, correctly states the current primary milestone and the open decisions;
- `pnpm verify` (typecheck + full test suite) is green.

## Basis

Chairwoman decision of 2026-07-12 (this session), including the S6 modification (Executive routing activation), the S7 constraint set, and the PM Workflow WIP-preservation authorization; `memory/milestones/2026-07-12-fast-track-product-delivery.md`; prior approvals 0001–0006; `CLAUDE.md`; `governance/executive-registry.yaml` (verified 2026-07-12: CEO/CPO/CTO Active, CMO/CBO Standby, CFO/CLO Limited — consistent with this decision and with `tests/executive-governance.test.ts`).
