# Executive Operating Matrix — Executive System v0.1

Version: 0.1.0
Status: Chairwoman Approved — see `decisions/approvals/0003-executive-system-v0.1.md` (approved by Gina, 2026-07-12)
Sources: `CLAUDE.md`, `constitution/AUTHORITY.md`, `governance/status-model.yaml`, `executives/ceo/OPERATING_CONTRACT.md`

**Amendment — 2026-09-01, Company OS v0.2** (`decisions/approvals/0008-company-os-v0-2-ai-native-operating-model.md`, Gina): the roles, activation states, ownership table, boundaries, and output ceiling below are **unchanged and still canonical**. One clause is amended: §1's "never autonomous agents" is partially superseded. v0.2 permits **bounded** functional agents under a single AI CEO, and those agents are **runtime instantiations of these same roles**, each carrying its role's `OPERATING_CONTRACT.md` as its accountability boundary. No role is renamed, deleted, merged, or newly instantiated (`0007` §7 S6, preserved). Agents adopt a role for a bounded task and drop it — persistent personas remain prohibited, as do agent-to-agent chains that bypass the CEO. Authority comes from `governance/autonomy-model.yaml`, resolved per action, never from the role. First-slice mapping (Product→CPO, Engineering→CTO, Research/Strategy→CEO with CPO research input) is in `docs/COMPANY_OS_ARCHITECTURE_V0_2.md` §1.1; mappings for Design, Growth, Data, Finance/Operations, and Legal/Trust are **open Founder decisions and must not be assumed**.

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
