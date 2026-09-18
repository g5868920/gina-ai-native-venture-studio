# Decision 0008 — Company OS v0.2: AI-Native Operating Model

status: Chairwoman Approved
approvedBy: Gina
approvedDate: 2026-09-01
supersedes: partial — see §Supersession Scope. No prior decision record is edited or deleted.
recordPath: decisions/approvals/0008-company-os-v0-2-ai-native-operating-model.md

---

## Basis

Chairwoman written direction of 2026-09-01, "Gina AI-Native Venture Studio — Company OS v0.2
Spec Reconciliation", delivered as the governing brief for this session. Supporting audit:
`docs/migration/COMPANY_OS_V0_2_MIGRATION_REPORT.md` (read-only audit of the Studio,
`pm-workflow-copilot`, and `twinko-app` repositories, 2026-09-01). Prior approvals 0001–0007
remain in force except where §Supersession Scope states otherwise.

Only what the direction actually decided is recorded here as approved. Items the direction
described as candidates, working directions, or open questions are recorded as such, and the
consequential gaps it did not resolve are listed under §Remaining Founder Decisions rather
than inferred.

---

## Decision

### 1. Twinko and Nodi are independent ventures

The Studio's active ventures are **Twinko** and **Nodi**. Nodi is the current venture identity
of the venture previously registered as `pm-workflow` / "AI-Native PM Workflow"; the PM
Workflow work forms part of Nodi's **product lineage**, not a separate venture. No third
venture is created.

The two ventures **may share**: Company OS infrastructure, functional agents, skills, common
schemas, policies, tooling, and evaluation infrastructure.

They **must not share**: project state, product decisions, roadmaps, evidence, risks,
milestones, product-validation responsibility, or commercial-validation responsibility.

### 2. Twinko is no longer a dogfood or validation dependency of Nodi

Every specification describing Twinko as a dogfooding project, internal customer, or
validation dependency for Nodi / PM Workflow, and every specification describing Nodi /
PM Workflow as depending on Twinko for product validation, is **superseded**.

Historical records are preserved, not deleted. This decision supersedes the dependency at
Studio level; the product repositories' own decision logs (Twinko `D-028`, `D-051`;
PM Workflow `PMW-021`, `PMW-046`) record the prior direction and must be updated by their own
owners through their own decision processes. The Studio does not edit another repository's
canonical truth.

Neither venture's progress gates the other. This decision changes no data: the Twinko
workspace inside the Nodi product repository is product data and is untouched.

### 3. The Studio moves from approval-based to exception-based Founder management

AI agents handle routine work and reversible decisions within approved boundaries. Gina is
involved primarily in high-impact, high-risk, irreversible, strategic, commercial, legal,
privacy, safety, or otherwise Founder-reserved decisions.

"AI may recommend. Humans decide." is **preserved in full for reserved decisions** and is
narrowed to them. It never applied to, and does not now govern, routine reversible internal
work executed inside an explicit autonomy policy.

### 4. Bounded autonomous agents are permitted

The v0.1 prohibition "do not build a multi-agent swarm" (`CLAUDE.md`, v0.1) is **partially
superseded**. Accountable orchestration through a single AI CEO is now permitted.

Still prohibited: uncontrolled multi-agent swarms; agents that initiate external actions
without authorization; agents that self-grant authority; agent-to-agent autonomous chains that
bypass the AI CEO; any autonomous action outside `governance/autonomy-model.yaml`.

Authority is resolved per action from Action × Risk × Reversibility × Confidence × Financial
or External impact. **It is never derived from an agent's role.**

### 5. The AI CEO is the primary organizational orchestrator

The AI CEO selects capabilities and specialists, coordinates their work, evaluates results
against policy, authorizes execution inside approved autonomy, and escalates only what is
Founder-reserved or unresolvable within approved strategy and policy.

Functional agents do not escalate directly to Gina when the AI CEO can resolve the issue
within approved policy. The AI CEO's ceiling on reserved decisions is unchanged: it prepares
them; it never approves them.

### 6. Skills remain modular organizational capabilities, not agents

`Agent ≠ Skill` is preserved. Skills are reusable organizational capabilities, SOPs, and
professional workflows: modular, version-controlled, repository-owned, testable, and
provider-neutral by default. Claude-specific files may act as adapters around canonical
Company OS skill definitions; they may not become the canonical definition.

### 7. The Founder Control Tower is P0

The dashboard's out-of-scope status in v0.1 is **superseded**. The Control Tower is now a P0
management interface. Its purpose is to reduce Founder cognitive load, not to expose all agent
activity. Initial views: Portfolio, Today, Decisions, Project Detail, and Agent Operations —
with Agent Operations deliberately not dominating the default view.

### 8. The dashboard is not authoritative state

The Control Tower is a presentation layer. Authority order is preserved:

`authoritative human/system decision → canonical decision + project state → generated
summaries and reports → Founder Dashboard`

Dashboard UI is **schema-driven**. Agents may emit structured state; application code
determines how it renders. An LLM does not generate the dashboard surface.

### 9. Project state must remain isolated

Every project-scoped entity carries a stable `project_id` or equivalent isolation mechanism.
An agent operating on one venture reads only that venture's project state. Isolation is an
enforced invariant with a test, not a convention.

### 10. Claude Code is the preferred implementation environment

Claude Code is the preferred implementation environment and founding engineering tool for the
first build phase: repository inspection, architecture implementation, code generation,
refactoring, tests, debugging, and implementation planning.

Claude Code **must not become the canonical Company OS**. Company state, agent definitions,
skills, policies, schemas, decisions, and architecture remain repository-owned and portable.

### 11. Claude Agent SDK is a working-direction runtime candidate, not an approved dependency

The Claude Agent SDK is recorded as the current leading candidate for the initial programmatic
agent runtime, on the stated rationale that it aligns with the Claude Code agent model.

This is a **working direction, not an irreversible commitment**. The architecture must preserve
the ability to replace or supplement execution models and providers. No additional
orchestration framework is introduced without a demonstrated requirement. **This decision
approves no dependency and authorizes no installation.**

### 12. MCP is deferred until an integration requirement justifies it

MCP is not required for the first vertical slice. It is a future standard integration mechanism
where it materially improves portability or access to external tools and data (GitHub, Google
Drive, analytics, databases, other SaaS). No custom MCP server is built without a real,
stated use case.

### 13. n8n is a future trigger and integration layer, not the reasoning engine

n8n is not the core agent reasoning layer. Its potential future role is triggers, schedules,
webhook handling, SaaS integrations, and notifications. Authoritative company reasoning and
canonical business rules must never be buried inside opaque n8n workflows. LangGraph remains
out of scope; no demonstrated requirement exists.

### 14. One thin end-to-end loop must be proven before the agent organization expands

The first implementation must prove this loop end-to-end, independently for Twinko and for
Nodi, on the same infrastructure with isolated project state:

`Founder objective → AI CEO reviews ONE project → CEO delegates to specialists → agents use
Skills → agents read ONLY that project's state → routine work resolved autonomously → state,
decisions, risks, and activities updated → material exception identified → Control Tower
updates → only the Founder-reserved issue reaches Gina`

Initial specialists are limited to **Product, Engineering, and Research/Strategy**. Design is
the next specialist added, after the architecture proves sound. Department agents are not
built ahead of the loop.

---

## Supersession Scope

This decision supersedes, by reference and without editing any historical file:

| Superseded | Where recorded | Superseded by |
|---|---|---|
| "AI-Native PM Workflow" as the current venture identity | `CLAUDE.md` v0.1; `governance/venture-registry.yaml` v0.1.0 | §1 |
| Twinko as internal customer / dogfooding / validation dependency of PM Workflow | `0005` §6; `0006` §3; `0007` §5 (as a deferred track); handoff snapshots | §2 |
| "Do not build a multi-agent swarm" as a blanket prohibition on agent autonomy | `CLAUDE.md` v0.1; `FOUNDING_ENGINEER_PROMPT.md` §3.10; `EXECUTIVE_OPERATING_MATRIX.md` §1 | §4 |
| "web dashboard" as out of scope | `CLAUDE.md` v0.1 v0.1-scope; `0007` §8 | §7 |
| n8n as unconditionally out of scope | `CLAUDE.md` v0.1; `0007` §8 | §13 |
| The v0.1 primary milestone sequencing (One-Person Company OS v1.0 as the primary active company milestone) | `0007` §1 | §14 — the first vertical slice becomes the active target once its milestone record is written |

**Explicitly NOT superseded, and still in force:**

- `constitution/AUTHORITY.md` §§1, 3, 4, 5 — founder authority, recommendation-is-never-approval,
  the approval-record requirement, and precedence.
- `0007` §7 S6 — executive roles are not renamed, deleted, merged, or newly instantiated.
  v0.2 functional agents are runtime instantiations of the existing roles.
- `0006` §4 — product repositories own implementation; the Studio owns cross-venture
  coordination.
- All read-only product-repository boundaries.
- Every evidence, provenance, and public-claim rule. Internal use is still not external
  commercial validation.

---

## Scope and Limits

This decision governs Company OS specification and architecture only.

It does **not**: implement any functionality; add any dependency; create a database, agent
runtime, dashboard, MCP server, or n8n workflow; modify any product repository's canonical
truth; authorize any commit, push, merge, release, spend, or external communication; resolve
any pending product decision in Twinko or Nodi; or approve any public claim.

Implementation of the first vertical slice requires its own bounded authorization, following
the scope agreed after Founder review of this specification set.

---

## Definition of Done (this decision)

- The governing specification set is internally consistent and readable without chat history.
- Venture identity, autonomy, escalation, project isolation, and source-of-truth authority are
  each stated in exactly one canonical place.
- Approved directions are distinguishable from working directions in every file.
- No historical decision or evidence record was edited or deleted.
- `pnpm verify` is green.

---

## Remaining Founder Decisions

Recorded as open. None is inferred, and none blocks the specification set.

1. **Agent ↔ executive mapping beyond the first three.** Growth ↔ CMO, Finance/Operations ↔
   CFO, Legal/Trust ↔ CLO, and Data ↔ (no current owner) are proposals, not derivations.
   Research/Strategy currently splits across CEO (strategy) and CPO (research).
2. **Nodi product identity inside `pm-workflow-copilot`.** That repository still names itself
   "AI-Native Product Workflow Copilot" in `CLAUDE.md` and `docs/architecture-boundaries.md`
   while `docs/v2/nodi/` is the current direction. Renaming a product's canonical identity is
   that repository's reserved decision.
3. **Repository topology for the Control Tower and agent runtime.** Studio repository, a new
   repository, or an existing product repository — undecided, and it affects the first slice.
4. **Structured state store.** File-backed structured records versus an embedded database. The
   architecture is deliberately storage-agnostic pending this decision.
5. **Initial autopilot boundary.** Which specific routine action classes start at Autopilot
   rather than Execute. The architecture ships them all at Execute or lower until Gina widens
   the bound.
6. **Whether to retire the stale duplicate Studio clone** at `../gina-ai-native-venture-studio 2/`.
