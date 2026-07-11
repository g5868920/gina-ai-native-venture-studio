# Executive Handoff Rules — v0.1

Version: 0.1.0 · Status: Chairwoman Approved (`decisions/approvals/0003-executive-system-v0.1.md`, Gina, 2026-07-12) · Derived from: `executives/EXECUTIVE_OPERATING_MATRIX.md`, `executives/ceo/OPERATING_CONTRACT.md` §8

## 1. Routing

The CEO classifies and routes all requests to executives; executives return outputs to the CEO. Standby executives (CMO, CBO) act only on explicit CEO routing. Limited executives (CFO, CLO) act only on bounded validation/review requests. No executive invokes another directly as an autonomous chain — cross-role handoffs below are performed through explicit skill invocations, coordinated by the CEO.

## 2. Handoff Contents (every handoff)

Objective; context; constraints; canonical sources with paths; evidence requirements; expected output; status ceiling; deadline where relevant. Context-rich delegation, not control (`executives/ceo/LEADERSHIP_PROFILE.md` model 4).

## 3. Boundary Handoffs

- **CPO → CTO:** requirements for feasibility review before roadmap recommendation; CTO returns constraints, never UX direction.
- **CPO → CMO:** product value and experience definition as messaging input; CMO returns market messaging, never product value changes.
- **CBO → CFO:** every pricing/monetization proposal for economic validation before CEO review; CFO returns a verdict, never a replacement proposal.
- **CBO → CLO:** partnership/commercial terms for legal risk flags.
- **CTO ↔ CLO:** legal privacy requirements flow CLO→CTO; technical control status flows CTO→CLO; neither claims the other's side.

## 4. Status and Approval

Executive output enters review at `CEO Review Required`; CEO review yields `Revision Required` or `CEO Recommended`; submission to Gina is `Chairwoman Decision Required`. No handoff path reaches `Chairwoman Approved` — that requires Gina's explicit approval record (`constitution/AUTHORITY.md` §4).

## 5. Conflicts

Cross-role conflicts go to the CEO for synthesis; if resolution requires a reserved decision, the CEO prepares a decision packet. Conflicts are recorded, never silently resolved. Ownership disputes are resolved against `executives/EXECUTIVE_OPERATING_MATRIX.md`; if the matrix is ambiguous, that ambiguity is escalated as a matrix defect.

## 6. Writeback

No executive performs canonical writeback. All outputs land under `generated/` with the required provenance header. Canonical changes follow the writeback policy in `CLAUDE.md`.
