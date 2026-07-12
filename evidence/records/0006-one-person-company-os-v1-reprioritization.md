# Evidence Record 0006 — One-Person Company OS v1.0 Reprioritization

Date: 2026-07-12
Public-use status: Private / not for public use (pending Chairwoman classification)
Review status: Chairwoman Approved — see `decisions/approvals/0007-one-person-company-os-v1-reprioritization.md` (Gina, 2026-07-12)

---

## Decision Provenance (per CLAUDE.md)

1. **Before state:** Approved priority was `0006` (Fast-Track Product Delivery): PM Workflow Control Tower primary, Twinko UI secondary, dogfooding + Twinko Discovery deferred. A read-only audit (this session) confirmed the Studio repo is clean and synced with `origin/main`; the Milestone 1 pipeline (handoffs → validated updates → Weekly Board Brief) works; governance invariants are mechanically tested; and the uploaded master-context brief was stale relative to `0006` (it flagged the reprioritization as possibly unapproved, but `0006` is a recorded Chairwoman approval).

2. **Problem and constraints:** Gina chose to make the Studio itself usable as the daily cockpit that *drives* building PM Workflow and Twinko, rather than continue prototype-first delivery. Constraints: file-based; repository-owned; single-founder usable; CLI- or conversationally-operated; built primarily from existing structures; deterministic where practical; human-governed; portable across models and executors. Strict out-of-scope list (no dashboard, database, Supabase, LangGraph, n8n, autonomous executives, multi-agent swarm, live product-repo sync, automatic approvals/commits/pushes/etc.).

3. **Options considered:** (a) keep `0006` prototype-first — declined by Chairwoman (the operating layer is not yet usable daily); (b) minimal OS loop only — declined (Chairwoman chose a larger scope); (c) larger scope including executive-role consolidation / demotion — rejected by Chairwoman (no role may be renamed, demoted, merged, or de-instantiated); (d) **selected:** minimal loop + executive *routing activation* with all approved statuses preserved + a constrained deterministic OS CLI.

4. **Decision and rationale:** Recorded as `0007`. Supersedes only `0006` §1/§2 (active-priority sequencing); prototype work preserved, not rejected. Executive routing activation preserves all currently approved statuses (verified against `governance/executive-registry.yaml`; enforced by `tests/executive-governance.test.ts`). The OS CLI is deterministic and may only prepare/render/validate/orchestrate; it holds no approval, product-mutation, or automatic-action authority.

5. **Implementation:** Not started. This record covers the decision + milestone kickoff only. Build scope S1–S8 begins after a separate stop-for-review checkpoint. No product repository was modified in this step; the authorized PM Workflow local WIP commit (no push) is deferred to the pause action and is not part of this step.

6. **Evidence:** `decisions/approvals/0007-one-person-company-os-v1-reprioritization.md`; amended `memory/milestones/2026-07-12-fast-track-product-delivery.md`; this record. Governance-validation command and result are reported in the completion report for this step.

7. **Tests and evaluation:** No `src/`, registry, or status-model changes were made in this step; only Markdown decision/memory/evidence files were written. The governance invariants (10 statuses; 7 executives; CEO/CPO/CTO Active, CMO/CBO Standby, CFO/CLO Limited; no executive may approve; output ceiling `CEO Recommended`; no automatic recommendation→approval transition) are therefore unaffected by construction. Exact validation command and output are reported to Gina.

8. **Results:** Decision recorded; active-milestones record amended so the current priority state (OS v1.0 primary; PM Workflow paused; Twinko deferred) is unambiguous at the top; provenance captured.

9. **Failures / unresolved risks:** Scope-creep risk on the "larger scope" — mitigated by the explicit S1–S8 list and the out-of-scope guardrail. The PM Workflow prototype is currently an uncommitted working tree; a local WIP commit (no push) is authorized to preserve it before pausing, and is not yet executed. Twinko product-repo canonical (`D-047`) is not yet aligned with the Studio-level deferral (Twinko repo not connected) — tracked for a future writeback handoff.

10. **Human–AI ownership:** Reprioritization decision, the S6 modification (routing activation), the S7 constraint set, and the WIP-preservation authorization: **Gina**. Read-only audit, decision packet, and drafting of `0007` / the milestone amendment / this record: **AI (Claude, `claude-opus-4-8`, CEO / founding-engineer executor)**. Final decision and approval: **Gina**.

11. **What changed next:** Build begins with S1 (operating-loop runbook) after Chairwoman review of this decision-recording step.

12. **Public-use status:** Private until classified.
