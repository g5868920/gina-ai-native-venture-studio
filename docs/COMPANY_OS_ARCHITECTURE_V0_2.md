# Company OS Architecture v0.2 — AI-Native Venture Studio

Version: 0.2.2
Status: **Chairwoman Approved** — v0.2.0 by `decisions/approvals/0008-company-os-v0-2-ai-native-operating-model.md`; amended to v0.2.1 by `decisions/approvals/0009-cross-model-deliberation-and-independent-engineering-review.md`; amended to v0.2.2 by `decisions/approvals/0010-phase-0a-canonical-identity-and-registry-hardening.md` (all Gina, 2026-09-01)

**v0.2.1 amendment scope — additive.** §§0–13 are unchanged except for the four clearly marked v0.2.1 insertions in §8.1, §10, §11.2, and §14. Two sections are added: **§15 Cross-Model Decision Council** and **§16 Independent Engineering Review Gate**. No existing architecture is rewritten.

**v0.2.2 amendment scope — additive.** One insertion: **§16.5.1**, which resolves the Medium-finding disposition authority left open by v0.2.1 (`0010` §11). Nothing else is changed.
Document type: Canonical architecture
Supersedes: the architecture statements distributed across `CLAUDE.md` v0.1, `executives/EXECUTIVE_OPERATING_MATRIX.md` §1 (agent clause only), and `prompts/founding/FOUNDING_ENGINEER_PROMPT.md` §3 — by reference; those files are amended, not deleted.

This is the single canonical description of how the Company OS is built. `CLAUDE.md` governs
how to work in the repository; this file governs what the system is. Where the two disagree,
surface the conflict — `CLAUDE.md` governs until an explicit Chairwoman decision resolves it
(`constitution/AUTHORITY.md` §5).

Every statement here is either **Approved** (carried by decision `0008`) or **Working
direction** (explicitly labelled, reversible without a new decision). Nothing is left
ambiguous between the two.

---

## 0. What changed from v0.1, in one paragraph

v0.1 was a file-based, approval-gated decision-preparation system: every unit of AI work
terminated at a human approval. That is correct and it works, but Founder attention scaled
linearly with company activity. v0.2 keeps the entire governance kernel — no automatic path
from recommendation to approval, an approval record required for `Chairwoman Approved`,
generated output never canonical, product repositories read-only — and changes what sits on
top of it: bounded autonomous agents under a single AI CEO, graduated decision rights,
project-isolated structured state, an event stream, and a Founder Control Tower that surfaces
exceptions rather than everything.

---

## 1. Organizational model

```text
Founder — Gina
        ↓
AI CEO / Company Orchestrator
        ↓
Functional Agents
├── Product              (v0.2 first slice)
├── Engineering          (v0.2 first slice)
├── Research / Strategy  (v0.2 first slice)
├── Design               (next, after the loop is proven)
├── Growth               (later)
├── Data                 (later)
├── Finance / Operations (later)
└── Legal / Trust        (later)
        ↓
Shared Company Infrastructure
        ↓
Independent Venture / Project State
├── Twinko
├── Nodi
└── Future ventures
```

**Approved.** The AI CEO is the primary coordinating layer. Functional agents do not escalate
directly to Gina when the AI CEO can resolve the issue within approved strategy and policy,
and they do not form autonomous agent-to-agent chains.

### 1.1 Agents are runtime instantiations of the existing executive roles

Decision `0007` §7 S6 forbids renaming, deleting, merging, or newly instantiating executive
roles without a Chairwoman decision, and `0008` preserves that. So v0.2 does not create a
parallel org: a functional agent is the runtime form of an executive role that already exists
in `governance/executive-registry.yaml`, carrying that role's `OPERATING_CONTRACT.md` as its
accountability boundary.

| Functional agent | Executive role | Status |
|---|---|---|
| Product | CPO (Active) | **Approved** — CPO already owns product strategy, discovery, requirements, prioritization, roadmap |
| Engineering | CTO (Active) | **Approved** — CTO already owns architecture, engineering, feasibility, testing, technical privacy controls |
| Research / Strategy | CEO (strategy) with CPO research input | **Working direction** — the split is real in the registry and has not been resolved by decision; confirm before adding a fourth agent |
| Design, Growth, Data, Finance/Operations, Legal/Trust | proposed CPO / CMO / — / CFO / CLO | **Open Founder decision** (`0008` Remaining Founder Decisions §1). Not built. Do not assume the mapping. |

An agent adopts the role for a bounded task, produces output, and drops it. **No persistent
personas.** Executive output ceilings are unchanged (`EXECUTIVE_OPERATING_MATRIX.md` §3).

---

## 2. The operating loop

```text
Founder objective / event
        ↓
AI CEO
        ↓
select capability / specialist
        ↓
agent uses appropriate Skills + Tools
        ↓
review / policy / evaluation
        ↓
within approved autonomy?
   ├── Yes → execute + canonical writeback + activity event
   └── No  → escalate (AI CEO resolves, or prepares a Founder Decision Packet)
```

**Approved.** This does not replace the 14-step loop in `docs/OPERATING_LOOP.md`; it adds the
autonomous branch to it. Work inside approved autonomy executes and records an event. Work
outside it re-enters the existing loop at Step 6 (decisions-needed identification) and follows
Steps 7–8 to a Chairwoman decision, unchanged.

---

## 3. Source of truth

**Approved.** The v0.1 hierarchy is preserved with one level inserted for canonical structured
state:

1. Explicit Chairwoman-approved decision record
2. Canonical project state and canonical decision records (structured state, §7)
3. Product decision log (venture-owned)
4. Current-status document
5. Product operating brief
6. Venture Studio handoff
7. Generated summaries, reports, and briefs
8. Founder Control Tower / any presentation layer
9. AI chat or conversational memory

Unchanged rules: generated output is derivative and can never override canonical files;
external venture sources are read-only by default; conflicts are surfaced, never silently
resolved; chat history is not canonical until written into the repository.

**Repository-owned and portable.** Company state, agent definitions, skills, policies, schemas,
decisions, and architecture live in this repository in open formats. No tool — Claude Code
included — is the Company OS.

---

## 4. Project isolation

**Approved, and it is an invariant rather than a convention.**

- Every project-scoped entity carries a stable `project_id`.
- Current values: `twinko`, `nodi`, recorded in `governance/venture-registry.yaml`.
- An agent operating on a project reads **only** that project's state. There is no ambient
  cross-project read.
- Cross-project work is a Founder-visible portfolio operation performed by the AI CEO, never a
  side effect of an agent's task.
- Ventures share infrastructure, agents, skills, schemas, policies, tooling, and evaluation.
  They never share project state, product decisions, roadmaps, evidence, risks, milestones, or
  validation responsibility.

**Acceptance:** the first vertical slice ships with a test that fails if an agent run reads or
writes state carrying another project's `project_id`. Isolation that is not tested is not
isolation.

---

## 5. Autonomy and decision rights

**Approved.** Machine-readable form: `governance/autonomy-model.yaml`.

### 5.1 Levels

| Level | The agent may | The agent may not |
|---|---|---|
| **Observe** | inspect and analyze state | change anything |
| **Recommend** | propose a course of action with rationale, alternatives, and confidence | act on it |
| **Execute** | perform approved, reversible, internal work | act outside the approved action class |
| **Autopilot** | make *and* execute routine bounded decisions under explicit policy | exceed the policy's stated bound |
| **Founder Reserved** | prepare a decision packet | commit, in any form |

### 5.2 Authority is resolved per action, never granted by role

```text
Action  ×  Risk  ×  Reversibility  ×  Confidence  ×  Financial / External impact
```

The **lowest** applicable level wins. A Product agent with Autopilot on backlog grooming has no
autonomy over pricing; the same agent's routine action drops to Recommend when its confidence
is low or the action turns out to be irreversible.

**Unclassified actions default to Recommend.** An action class nobody has classified is not
thereby autonomous.

### 5.3 Founder-reserved categories

Extends `constitution/AUTHORITY.md` §2: starting or shutting down a venture; major strategy or
positioning changes; material product pivots; meaningful financial commitments; pricing;
contracts; external partnerships; public launch; legal and privacy policy; safety policy;
sensitive-data governance; irreversible high-impact technical decisions; major external
claims; high reputational-risk actions; plus everything already listed in §2 of the
constitution.

Routine reversible internal work should progressively require less Founder involvement — by
explicit policy change, recorded as a decision, never by drift.

---

## 6. Escalation

**Approved.**

```text
Functional disagreement
        ↓
AI CEO evaluates against approved strategy and policy
        ↓
Can it be resolved within them?
   ├── Yes → resolve + record the rationale as an event
   └── No  → create a Founder Decision Packet
```

The Founder receives **exceptions, not organizational debate**. A resolved disagreement is
recorded — it is auditable — but it does not reach Gina.

A Founder Decision Packet carries, where relevant: project · decision · recommendation ·
alternatives · evidence · rationale · confidence · impact · reversibility · risk · cost impact ·
schedule impact · deadline · whether Founder action is required.

Ceiling unchanged: `Chairwoman Decision Required`. Never `Chairwoman Approved`
(`governance/status-model.yaml`; `tests/approval-integrity.test.ts`).

---

## 7. Structured state

**Approved as an entity model. Storage mechanism is an open Founder decision** (`0008`
Remaining Founder Decisions §4) — the model is deliberately storage-agnostic, and no schema
files are created until the first slice needs them.

| Entity | Project-scoped | Purpose |
|---|---|---|
| Project | is the scope | A venture or a governed initiative within one |
| Objective | yes | What the project is currently trying to achieve |
| Milestone | yes | A dated, checkable target |
| Decision | yes | What was decided, on what basis, by whom, and whether that basis still holds |
| Risk | yes | A known way this can go wrong, with severity and owner |
| Issue | yes | Something already wrong, with an owner |
| Activity Event | yes | An append-only record that something meaningful happened (§9) |
| Agent Run | yes | One agent execution: inputs, skills used, outputs, cost, outcome, failures |
| Artifact | yes | A durable output with provenance and version |
| Daily Brief | portfolio-level, composed of project-scoped events | The CEO's daily synthesis for the Founder |

Rules:

- Every project-scoped entity carries `project_id`. No exceptions, including Activity Event and
  Agent Run.
- Every entity records provenance: who or what produced it, from which sources, at what time.
- Human-authored truth and AI-proposed content are distinguishable at the record level.
- Markdown and YAML remain canonical for decisions, policy, skills, and architecture. Structured
  state is for operational entities.
- **Do not extend this model speculatively.** Add an entity when the first slice cannot be built
  without it.

---

## 8. Founder Control Tower

**Approved as P0.** Its purpose is to reduce Founder cognitive load — not to expose all agent
activity.

It answers exactly five questions:

1. How is each venture doing?
2. What materially changed?
3. What risks require attention?
4. What decisions actually require me?
5. What did the AI organization handle without me?

### 8.1 Views

| View | Contents |
|---|---|
| **Portfolio** | Per venture: health · current focus · current phase/state · next milestone · major recent changes · top risks · Founder decisions required |
| **Today** | Major changes · newly surfaced risks · milestone changes · important completed work · decisions requiring Founder attention · work handled autonomously |
| **Decisions** | Founder Decision Packets, with the fields listed in §6 |
| **Project Detail** | One view per venture — Twinko, Nodi, future ventures — reading only that project's state |
| **Agent Operations** | Agent health · failed runs · tool failures · cost · execution traces. Administrative and diagnostic; **must not dominate the default Founder view** |

**Added in v0.2.1** (`0009` §9). Two further schema-backed view areas, both drill-down by default:

| View area | Contents | Default visibility |
|---|---|---|
| **Decision Council** | Model recommendations · major disagreement · CEO conclusion · confidence · Founder escalation state (fields: `schemas/council-synthesis.schema.yaml`) | Surfaces on Today and Decisions **only** when a run produced material disagreement or a Founder-reserved escalation. Otherwise drill-down. |
| **Engineering** | Claude implementation status · deterministic CI status · Codex review status · blocking findings · remediation state · merge readiness (fields: `schemas/engineering-review.schema.yaml`) | Surfaces **only** on a blocked gate or an unresolved Critical/High finding. Otherwise drill-down. |

**Raw model transcripts and per-PR detail are never on a default view.** They are reachable only when the Founder drills into a specific council run or engineering gate. The dashboard stays exception-oriented; adding two data sources must not turn it into an activity feed.

### 8.2 Data principle

**Approved.**

```text
authoritative human / system decision
        ↓
canonical decision + project state
        ↓
generated summaries / reports
        ↓
Founder Control Tower
```

- The dashboard is a **presentation layer, never a source of truth**. It sits at level 8 in §3.
- The UI is **schema-driven**. Agents emit structured state; application code decides how it
  renders. An LLM does not generate the surface.
- A view must not compute domain meaning. If it needs a derived number, that number comes from a
  projection of canonical state.
- Where a canonical value does not exist, **report the gap**. Do not invent a derivation and do
  not present a scaffolded value as authoritative.

---

## 9. Events and the Daily Brief

**Approved.** Agents do not re-read the entire company every day.

```text
agent performs work
        ↓
state updated
        ↓
activity / change event recorded
        ↓
importance assessment
        ↓
material events only
        ↓
CEO daily synthesis
        ↓
Founder Control Tower
```

- Events are append-only and carry `project_id`, actor, timestamp, and what changed.
- Importance assessment separates material change from bookkeeping. It must **fail toward
  material** — an unrecognized event type is treated as material rather than silently dropped.
- The daily brief reports **deltas and exceptions**. It does not restate full project state.
- Work handled autonomously appears in the brief as a summary — visible, not hidden, and not
  demanding action.

---

## 10. Evaluation

**Approved as a boundary; the harness itself is implementation work.**

- The existing governance invariants stay mechanically tested (`tests/` — approval integrity,
  executive governance, portfolio pipeline).
- **Generation is separated from evaluation.** The agent that produced an output does not score
  it.
- **Added in v0.2.1** (`0009` §4): this principle now has two named instances — the Cross-Model
  Decision Council (§15), where each provider critiques the other's independent analysis, and the
  Independent Engineering Review Gate (§16), where the model that implements code is never the
  sole reviewer of that code. Both exist to reduce self-review bias, and neither is optional
  where its trigger policy applies.
- **Council and gate runs are cost- and latency-observable.** Every run records provider, cost,
  wall time, and outcome, so dual-model review stays a measurable expense rather than an assumed
  one.
- Deterministic logic is preferred wherever practical: IDs, statuses, validation, gating, diffs,
  projections, and rendering. Model reasoning is for unstructured interpretation only.
- Agent runs record cost, latency, tool failures, and outcome, so quality and expense are
  observable rather than asserted.

---

## 11. Implementation environment and runtime

### 11.1 Claude Code — **Approved**

Preferred implementation environment and founding engineering tool for the first build phase:
repository inspection, architecture implementation, code generation, refactoring, tests,
debugging, implementation planning.

**Claude Code must not become the canonical Company OS.** Critical company state, agent
definitions, skills, policies, schemas, decisions, and architecture remain repository-owned and
portable. A `.claude/` file may adapt a canonical definition; it may never be the definition.

### 11.2 Agent runtime — **Working direction**

The Claude Agent SDK is the current leading candidate for the initial programmatic agent
runtime, on the stated rationale that it aligns with the Claude Code agent model.

This is a working architecture direction, **not an irreversible dependency**. The architecture
preserves the ability to replace or supplement execution models and providers: agent
definitions, skills, policies, and state are repository-owned data; the runtime is an execution
adapter over them. No additional orchestration framework is introduced without a demonstrated
requirement. Nothing is installed under this decision.

#### 11.2.1 Provider adapter — added in v0.2.1 (`0009` §1)

The Cross-Model Decision Council (§15) requires reasoning from more than one provider. It is
served by a **provider-adapter abstraction**, not by a second orchestration stack:

- **Claude Agent SDK remains the primary runtime candidate.** Unchanged.
- **A common structured interface** lets the Company OS invoke Claude and OpenAI as peer
  reasoning providers: the same evidence packet in, the same structured analysis shape out.
- **OpenAI is invoked through its API** as a peer reasoning provider. That is the whole
  integration.
- **Do not add a second full orchestration framework merely to reach OpenAI.** This is the most
  likely way this amendment gets over-built.
- **OpenAI Agents SDK is not adopted.** It may be *evaluated* later, and only if OpenAI-side
  tool-using agent behaviour turns out to be required — a demonstrated requirement, never an
  anticipated one.
- Provider identity is data, not structure: adding, replacing, or removing a provider must not
  require changes to skills, policies, state, or the CEO's synthesis logic.

#### 11.2.2 Implementation-time model roles — added in v0.2.1 (`0009` §5)

Distinct from runtime reasoning providers, and not to be conflated with them. **Claude Code
implements; Codex independently reviews.** Full separation of duties in §16.

**Nothing in §11.2 approves a dependency, an API key, a spend, or an installation.**

### 11.3 Default technical direction — **carried forward from v0.1, unchanged**

Node.js ≥ 20 · TypeScript · pnpm · Markdown and YAML · JSON Schema or Zod validation ·
deterministic file-based workflows where practical · Vitest · GitHub for history. No hard-coded
absolute paths, no committed secrets, clean-clone reproducibility.

---

## 12. Integrations

### 12.1 MCP — **Deferred**

Not required for the first vertical slice. A future standard integration mechanism where it
materially improves portability or access to external tools and data — GitHub, Google Drive,
analytics, databases, other SaaS. **No custom MCP server without a real, stated use case.**

### 12.2 n8n — **Deferred to a trigger and integration role**

Not the core agent reasoning layer. Potential future role: triggers, schedules, webhook
handling, SaaS integrations, notifications.

```text
GitHub event → n8n / webhook layer → Company OS event → appropriate agent
scheduled daily review → trigger → CEO agent → daily brief
```

**Authoritative company reasoning and canonical business rules must never live inside an opaque
n8n workflow.** LangGraph remains out of scope — no demonstrated requirement.

---

## 13. The first vertical slice

**Approved** (`0008` §14). Build this loop, end to end, before expanding the organization.

```text
Gina gives the AI CEO an objective
        ↓
CEO reviews ONE project
        ↓
CEO delegates to appropriate specialists
        ↓
agents use Skills
        ↓
agents read ONLY that project's state
        ↓
routine work is resolved autonomously
        ↓
state / decisions / risks / activities are updated
        ↓
a material exception is identified
        ↓
Founder Control Tower updates
        ↓
only the Founder-reserved issue reaches Gina
```

It must work independently for **Twinko** and for **Nodi**, on the same Company OS
infrastructure, with isolated project state.

**Specialists in the slice: Product, Engineering, Research/Strategy. Nothing else.** Design is
next, after the architecture proves sound. Do not build all department agents first.

### 13.1 Acceptance criteria

1. The loop runs end to end for one project, from objective to Control Tower.
2. It runs for the second project with no shared project state and no code fork.
3. An agent attempting to read another project's state fails a test.
4. At least one routine action executes autonomously and appears in the Daily Brief as handled.
5. At least one Founder-reserved item escalates as a Decision Packet with the §6 fields, and
   nothing auto-approves it.
6. Every agent run is recorded with inputs, skills, outputs, cost, and outcome.
7. `pnpm verify` is green, including the existing 42 governance tests.
8. A fresh session, reading only repository files, can state the current state of the loop.

---

## 14. What remains prohibited

Unchanged from v0.1 unless a line says otherwise. **Extended in v0.2.1** by the council bounds
in §15.6 and the engineering-gate bounds in §16.7:

- Uncontrolled multi-agent swarms; agent-to-agent autonomous chains that bypass the AI CEO.
- Any agent granting itself authority, or authority inferred from role rather than resolved
  from action characteristics.
- Autonomous approval of a reserved decision, by any path.
- Claiming Gina approved something without an approval record.
- Rewriting a product repository's canonical truth from the Studio.
- Automatic commit, push, merge, release, spend, or external communication.
- Presentation layers becoming authoritative.
- Persistent executive personas; renaming, deleting, merging, or instantiating executive roles
  without a Chairwoman decision.
- Speculative infrastructure: additional orchestration frameworks, vector databases, custom MCP
  servers, n8n flows before triggers require them, enterprise multi-tenancy, microservices, or
  abstractions without a current use case.
- Fabricated state, metrics, validation, or results. Internal use is never external commercial
  validation.

---

## 15. Cross-Model Decision Council

**Approved, v0.2.1** — `decisions/approvals/0009-cross-model-deliberation-and-independent-engineering-review.md` §1.
Policy: `governance/decision-council-policy.yaml`. Output shape: `schemas/council-synthesis.schema.yaml`.

A provider-independent **decision-quality layer**. Claude and OpenAI analyze an important
question independently, challenge each other's reasoning, and hand structured inputs to the AI
CEO.

**It is not a department, and it is not a discussion.** No council seat exists on the org chart
(§1), no agent is added, and no model in a council holds authority. The council produces
*inputs*; the AI CEO remains accountable for the synthesis and for what happens next.

### 15.1 The canonical pattern

```text
Founder objective / material issue
        ↓
AI CEO frames a shared evidence packet
        ↓
Claude performs independent analysis   ─┐  neither sees the other's
OpenAI performs independent analysis   ─┘  conclusion at this stage
        ↓
each model critiques the other's structured analysis
        ↓
AI CEO synthesizes the disagreement and the evidence
        ↓
CEO acts within approved authority  ──or──  escalates a Founder Decision Packet
```

### 15.2 Required principles

- **Independent first pass.** Neither model sees the other's conclusion before producing its
  own. A council that leaks one analysis into the other's first pass is not a council; it is an
  echo. This ordering is the whole point of the layer.
- **Bounded deliberation.** Default: **one independent-analysis round, one cross-critique
  round.** Then it terminates. Extending a round is an explicit, recorded CEO choice with a
  stated reason — never an emergent loop.
- **One shared evidence packet.** Both providers receive the same framing, the same evidence,
  and the same question. Divergence must come from reasoning, not from asymmetric inputs.
- **The CEO is accountable for synthesis.** It is not a vote counter and not a tie-breaker
  ritual: it weighs evidence, states a conclusion, and owns it.
- **Consensus is not approval.** Two models agreeing changes nothing about who decides.
  `constitution/AUTHORITY.md` §§1, 3, 4 apply in full and are untouched by this section.
- **Disagreement does not automatically escalate.** Escalation is determined by the existing
  autonomy, risk, reversibility, and decision-right policy (§5, `governance/autonomy-model.yaml`)
  — never by the fact that two models differed. A CEO that escalates on disagreement alone has
  reintroduced approval-based management through the back door.
- **Auditability.** Every material council run preserves: the evidence packet, each model's
  independent analysis, each critique, the disagreement, the CEO synthesis, and the resulting
  action or escalation.
- **Not for routine work.** The council is not invoked by default for routine low-risk work.

### 15.3 Trigger policy — working direction

Canonical list: `governance/decision-council-policy.yaml`. A council run is warranted for:
major strategy decisions · architecture decisions · significant scope or prioritization changes ·
contradictory evidence · low CEO or specialist confidence · high uncertainty · material cost
impact · high-impact launch decisions · an explicit specialist request for independent challenge ·
Founder-reserved decision preparation.

**Dual-model review is not required for every agent task.** Cost and latency stay observable
(§10) so the expense of the layer is measured rather than assumed.

### 15.4 Output

Council-backed CEO synthesis is emitted as a structured record — not prose — so the Control
Tower can consume it without re-interpretation (§8.2). Fields: `schemas/council-synthesis.schema.yaml`.

Minimum content: issue/decision · `project_id` · Claude recommendation · OpenAI recommendation ·
areas of agreement · areas of disagreement · material evidence · assumptions · CEO conclusion ·
CEO rationale · confidence · residual uncertainty · reversibility · impact · action taken or
recommended · Founder action required (yes/no) · escalation reason if applicable.

### 15.5 Relationship to existing architecture

- **Project isolation (§4) is unchanged.** A council run carries one `project_id`, and the
  evidence packet contains only that project's state. Cross-project framing is a portfolio
  operation performed by the CEO, never a side effect of a council run.
- **Escalation (§6) is unchanged.** A council run is an input to the CEO's evaluation, not a
  parallel path to Gina. Models never escalate; only the CEO does.
- **Evaluation (§10) is reinforced.** Cross-critique is the council's instance of separating
  generation from evaluation.
- **The "no autonomous agent-to-agent chains" rule (§1) still holds.** The critique round is a
  fixed-length, CEO-framed, CEO-terminated protocol between reasoning providers — not agents
  delegating to each other, not an open channel, and never able to start itself.

### 15.6 Council bounds — extends §14

Prohibited:

- more than the default rounds without an explicit, recorded CEO decision and reason;
- letting either model see the other's conclusion before its own independent analysis;
- treating consensus as approval, or disagreement as automatic escalation;
- a council run that spans more than one `project_id`;
- models invoking each other directly, or a council invoking itself;
- routine, low-risk work triggering a council by default;
- adding a second orchestration framework to reach a provider (§11.2.1);
- discarding model outputs, evidence references, disagreement, or synthesis for a material run.

---

## 16. Independent Engineering Review Gate

**Approved, v0.2.1** — `0009` §§4–8. Policy: `governance/engineering-review-gate.yaml`.
Output shape: `schemas/engineering-review.schema.yaml`.

### 16.1 The rule

> **The model or agent that implements code must not be the sole reviewer of that code.**

This is engineering governance, not a style preference. It exists to reduce self-review bias,
and it is the §10 evaluation principle applied to the thing the Studio actually builds.

### 16.2 The preferred initial model

```text
approved spec / issue
        ↓
Claude Code implementation
        ↓
Claude-generated tests
        ↓
Claude self-QA
        ↓
deterministic build / test / lint / static checks
        ↓
independent Codex review
        ↓
independent Codex QA
        ↓
findings returned to Claude
        ↓
Claude remediation
        ↓
deterministic verification
        ↓
Codex re-review when required
        ↓
engineering gate result
```

### 16.3 Role separation

| | Claude Code — **implements** | Codex — **independently reviews** |
|---|---|---|
| Owns | coding · refactoring · implementation tests · local build · self-QA · remediation | code review · specification-to-diff comparison · regression analysis · edge-case analysis · test adequacy · architecture compliance · security-oriented review · independent test/QA execution where supported · verification of Claude's remediation |

**Codex does not implement its own findings by default.** The intended cycle is:

> **Claude builds → Codex challenges → Claude fixes → Codex verifies.**

The separation is deliberate. Collapsing it — letting the reviewer patch what it flagged, or
letting the implementer sign off on itself — removes the only independent check in the loop and
returns the gate to self-review with extra steps.

### 16.4 Structured review result

Machine-processable, not prose. Fields: `schemas/engineering-review.schema.yaml` —
`review_status` · `critical_findings` · `high_findings` · `medium_findings` · `low_findings` ·
`requirements_coverage` · `tests_status` · `regression_risk` · `security_status` ·
`architecture_compliance` · `recommended_action` · `reviewer` · `reviewed_commit`/`diff` ·
`timestamp`.

States: **`PASS`** · **`PASS_WITH_FINDINGS`** · **`BLOCKED`**.

### 16.5 Initial merge gate — working policy

| Severity | Effect |
|---|---|
| **Critical** | Blocking |
| **High** | Blocking |
| **Medium** | Fix, or a bounded policy disposition recorded against the finding — see §16.5.1 |
| **Low / nit** | Non-blocking, **unless several together indicate a material systemic issue** |

#### 16.5.1 Medium-finding disposition authority — resolved in v0.2.2 (`0010` §11)

`0009` left this ambiguous: the gate permitted "CTO/CEO risk acceptance" while
`constitution/AUTHORITY.md` §1 reserves approval to Gina, and those executives are AI functions.
Resolved:

> The AI CTO / CEO may perform a **policy-based operational disposition** of a Medium finding
> when it falls entirely within an already approved bounded-risk envelope.
> **This is not equivalent to human approval.**

All seventeen conditions must hold — internal-only impact · reversible · no Founder-reserved
decision · no legal, privacy, safety, sensitive-data, or material security implication · no
payment or pricing implication · no material financial commitment · no external customer or
partner commitment · no public claim · no production high-blast-radius change · no irreversible
data migration · within approved product scope · within approved architecture · residual risk
explicitly documented. Canonical list: `governance/engineering-review-gate.yaml`.

**If any single condition fails, the finding escalates** to the Founder or to qualified human
review. There is no partial-credit disposition.

**The terminology is binding.** Record it as a bounded policy disposition, or a risk acceptance
under previously approved governance. Never as "human approval", "Founder approval", or "formal
sign-off". The constitution is not amended by this: the principle operates strictly below §2 and
creates no new approval authority.

A change is **not merge-ready** unless all of the following hold:

1. deterministic required checks pass;
2. no unresolved Critical findings remain;
3. no unresolved High findings remain;
4. the independent Codex review gate passes.

**Merge-ready is not merge.** `governance/autonomy-model.yaml` keeps
`commit-push-merge-or-release` at `founder_reserved`, and this section does not change it.
**No autonomous production merge or deployment is enabled by this amendment. Autopilot remains
disabled unless separately approved.**

### 16.6 High-risk areas still require human and professional review

Independent AI review **does not** remove the human or professional review requirement for:
authentication and authorization · secrets · payments · sensitive user data · deletion and
retention · production database migrations · privacy and security policy · safety-critical
behaviour · production infrastructure · irreversible or high-blast-radius changes.

These route through the existing Founder-reserved and qualified-review framework
(`constitution/AUTHORITY.md` §2; §5.3 above). Two AI models agreeing on a payments change is
not a substitute for a person who is accountable for it.

### 16.7 Engineering-gate bounds — extends §14

Prohibited:

- the implementing model acting as the sole reviewer of its own code;
- Codex implementing its own findings by default;
- merging with an unresolved Critical or High finding;
- accepting a Medium finding without a recorded, attributed risk acceptance;
- treating a passing gate as authorization to merge, push, release, or deploy;
- using independent AI review to bypass human review in a §16.6 area;
- silently downgrading a finding's severity to clear a gate.
