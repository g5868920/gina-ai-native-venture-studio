# SKILL: CEO Consulting-Proposal Review

Version: 0.1.0
Status: Chairwoman Approved — created under `decisions/approvals/0002-ceo-operating-contract-v0.1.md` (Gina, 2026-07-12)
Type: Documentation and schema only. Not an autonomous agent; no model API integration; no external actions.

---

## 1. Purpose and Trigger

Review a consulting-grade proposal (internal investment, client, PM Workflow diagnostic/pilot, AI transformation, partnership, or executive initiative) for decision-readiness before it reaches the Chairwoman.

Trigger: a proposal reaches `CEO Review Required`.

## 2. Role and Required Inputs

Role: AI CEO (or any executor following this file). Inputs: the proposal; its canonical sources with paths; prior related decisions; the commercial/scope context. Missing inputs are listed as missing, never fabricated.

## 3. Source Priority

Authority order per `CLAUDE.md` (Source of Truth). A proposal's own claims rank below canonical decision records and status documents. Chat history is not canonical.

## 4. Procedure

Check that the proposal **diagnoses before it proposes**, then verify it covers, in substance:

1. opportunity qualification;
2. situation and complication;
3. confirmed facts vs. client statements vs. assumptions vs. evidence gaps — explicitly separated;
4. root problem and consequences (not the requested solution restated as the problem);
5. intended business and operating outcomes;
6. viable options with trade-offs, including defer / do nothing where relevant;
7. recommendation and rationale;
8. in-scope and out-of-scope boundaries;
9. client and Studio responsibilities;
10. phased delivery and decision gates;
11. concrete deliverables and acceptance criteria;
12. adoption, training, handoff, maintenance, and rollback;
13. risks, dependencies, and mitigations;
14. evaluation and success measures;
15. commercial assumptions, delivery cost, reusable IP, and change control;
16. open questions and Chairwoman decisions required.

Flag as defects: generic consulting language without operational detail; unsupported ROI or impact promises; a requested solution treated as a proven root cause; AI recommended where a simpler deterministic tool suffices; unlimited customization hidden in a standardized offer; missing adoption/ownership/maintenance/rollback.

## 5. Expected Outputs

One review memo under `generated/reviews/` with the required provenance header: verdict (`Revision Required` or `CEO Recommended`), findings mapped to the checklist above, and the exact revisions requested.

## 6. Evidence Requirements

Every finding cites the proposal section and, where relevant, a repo source path. Unverifiable proposal claims are labeled, not accepted.

## 7. Allowed and Prohibited Actions

Allowed: reading sources; writing the review memo; requesting revisions. Prohibited: approving pricing, contract terms, or external claims; editing the proposal itself; communicating externally; implying Chairwoman approval.

## 8. Approval Boundary

Ceiling: `CEO Recommended`, then `Chairwoman Decision Required` on submission. Pricing, commercial commitments, and external claims are reserved decisions (`constitution/AUTHORITY.md` §2) — always Gina's.

## 9. Escalation Conditions

Escalate when: the proposal binds the Studio commercially or legally; evidence gaps are material to the recommendation; scope conflicts with an approved decision; or the root problem remains undiagnosed after revision.

## 10. Quality Checklist

- [ ] Diagnosis precedes solution
- [ ] Facts / statements / assumptions / gaps separated
- [ ] All 16 coverage points assessed
- [ ] No unsupported ROI or impact claims survive
- [ ] Out-of-scope and rollback explicit
- [ ] Verdict status is `Revision Required` or `CEO Recommended` only
- [ ] Provenance header present

## 11. Writeback Requirements

Review memos go under `generated/` only. Any resulting decision is recorded by Gina as a canonical decision record — never by this skill.

## 12. Version and Status

- 0.1.0 — initial version, created under Phase 2A (CEO design). Execution tooling arrives in a later approved phase.
