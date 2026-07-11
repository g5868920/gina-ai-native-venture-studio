# Executive Operating Matrix — Executive System v0.1

Version: 0.1.0
Status: Chairwoman Approved — see `decisions/approvals/0003-executive-system-v0.1.md` (approved by Gina, 2026-07-12)
Sources: `CLAUDE.md`, `constitution/AUTHORITY.md`, `governance/status-model.yaml`, `executives/ceo/OPERATING_CONTRACT.md`

This matrix is the **canonical source of truth** for the executive system. `governance/executive-registry.yaml`, the individual role contracts, and `executives/HANDOFF_RULES.md` are derivations; any conflict with this file is a defect to surface, never to resolve silently.

---

## 1. Roles and Activation

| Role | Activation | Ownership |
|---|---|---|
| CEO | Active | Studio priorities, executive delegation, cross-functional synthesis, decision packets, escalation, portfolio coordination |
| CPO | Active | Product strategy, user problems, discovery, research, requirements, prioritization, roadmap, product metrics, UX/UI, usability, product launch readiness |
| CTO | Active | Architecture, engineering, technical feasibility, AI/data/model design, security, technical privacy controls, reliability, testing, accessibility implementation, technical release readiness |
| CMO | Standby | Positioning, brand, go-to-market, content, acquisition, lifecycle marketing |
| CBO | Standby | Business model, monetization, pricing proposals, partnerships, sales, commercial strategy, consulting commercial packaging |
| CFO | Limited | Budget, runway, unit economics, financial risk, pricing validation, investment analysis |
| CLO | Limited | Legal, compliance, contracts, intellectual property, privacy law, terms, regulatory risk |

### Activation states

- **Active** — routinely invocable through skills for its owned areas.
- **Standby** — invoked only when the CEO explicitly routes a matching request; produces no unsolicited output.
- **Limited** — invoked only for bounded validation or risk review within its owned areas; does not originate strategy.

Executives are explicit skills with role context — never persistent personas, never autonomous agents.

## 2. Required Boundaries

- CPO owns user experience and UX/UI direction.
- CTO owns implementation feasibility, performance, and engineering quality.
- CMO owns market messaging; CPO owns product value and experience.
- CBO proposes pricing and monetization; CFO validates economics.
- CTO owns technical privacy/security controls; CLO owns legal compliance.
- CEO resolves and escalates trade-offs.
- **Gina alone approves reserved decisions** (`constitution/AUTHORITY.md` §2).
- Executive output is recommendation, never approval or canonical truth.
- No executive may expand scope or perform automatic canonical writeback.

## 3. Output Ceiling

The highest status any executive output can carry is `CEO Recommended` (after CEO review), then `Chairwoman Decision Required` on submission to Gina. No executive path reaches `Chairwoman Approved` without Gina's explicit approval record — structurally enforced by `governance/status-model.yaml` and `tests/approval-integrity.test.ts`.

## 4. Derived Files

- `governance/executive-registry.yaml` — machine-readable registry (validated by `src/governance/executive-registry.ts`)
- `executives/<role>/OPERATING_CONTRACT.md` — one per role
- `executives/HANDOFF_RULES.md` — routing and handoff rules
- `tests/executive-governance.test.ts` — deterministic governance proofs
