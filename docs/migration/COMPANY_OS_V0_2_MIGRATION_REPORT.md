# Company OS v0.2 — Migration and Architecture Delta Report

Version: 0.2.0
Status: **Chairwoman Decision Required → recorded as approved by** `decisions/approvals/0008-company-os-v0-2-ai-native-operating-model.md`
Document type: Migration report (derived analysis + the record of what was changed)
Prepared: 2026-09-01, from a read-only audit of the actual repositories
Basis: Founder direction "Gina AI-Native Venture Studio — Company OS v0.2 Spec Reconciliation" (2026-09-01)

This report is the audit that Section 19 of the founder direction required **before** editing.
It is derived analysis, not authority. Authority for the changes it describes lives in
`decisions/approvals/0008-*.md`. Where this report and a canonical file disagree, the
canonical file governs.

**No product functionality was implemented.** Every change listed in §D is a specification,
governance, or documentation change, plus one test assertion updated to stay consistent with
a registry change.

**Amendment note — 2026-09-01, Company OS v0.2.1.** This report describes the v0.2.0 migration
and remains accurate as that record. It was followed the same day by an **additive** amendment,
`decisions/approvals/0009-cross-model-deliberation-and-independent-engineering-review.md`,
which adds the Cross-Model Decision Council and the Independent Engineering Review Gate
(architecture §15, §16). Nothing in §§A–E below is superseded by it.

**Status of the two Phase 0A prerequisites this report raised**, as of the Phase 0A
implementation (`0010`): **§E-6 (registry enforcement) is CLOSED** — the loader now recognizes
and enforces `project_id`, `lifecycle`, and `superseded_by`. **§E-7 (duplicate clone) is
CLOSED** — the copy was deleted on 2026-09-01 under explicit Founder authorization; the
copy-detection rules and preflight remain, guarding any future copy. Each finding below carries its own current
status; the original text is preserved beneath it.

---

## A. Executive Summary

### What was audited

| Repository | Path | State at audit |
|---|---|---|
| Company OS (Studio) | `gina-ai-native-venture-studio/` | branch `main`, clean, synced with `origin/main`, HEAD `a2a455a`; `pnpm verify` green (typecheck + 42 tests / 3 suites) |
| Nodi / PM Workflow product | `pm-workflow-copilot/` | branch `feat/pm-control-tower-demo-b-v0.1`, clean, HEAD `7557ef6` |
| Twinko product | `twinko-app/` | branch state read-only; HEAD `af12e08` |

The **Company OS is the Studio repository**. `pm-workflow-copilot` and `twinko-app` are
product repositories and are not part of this migration except as venture identity evidence.

### What changed architecturally, and why

The Studio was built as a **file-based, approval-gated decision-preparation system**: the AI CEO
prepares, Gina approves, a canonical record is written, a handoff goes to a product repo. It is
correct, mechanically tested, and it works — but every unit of AI work terminates at a human
approval, so Founder attention scales linearly with company activity. That is the constraint
v0.2 removes.

v0.2 keeps the governance kernel and changes what sits on top of it:

1. **Approval-based → exception-based management.** The kernel's rule ("AI may recommend.
   Humans decide.") is preserved for *reserved* decisions and narrowed to them. Routine
   reversible internal work moves to bounded agent autonomy under explicit policy, so the
   Founder receives exceptions rather than a queue of everything.
2. **Skills-with-role-context → bounded autonomous agents under an AI CEO.** The v0.1 rule
   "do not build a multi-agent swarm" (`CLAUDE.md` line 161) is **partially superseded**:
   accountable orchestration through a single AI CEO is now permitted; an uncontrolled swarm
   is still prohibited.
3. **File-only state → structured, project-isolated operational state.** Markdown and YAML
   remain canonical for decisions, policy, and skills. Operational entities (Project,
   Objective, Milestone, Decision, Risk, Issue, Activity Event, Agent Run, Artifact, Daily
   Brief) need a structured store with an explicit `project_id`.
4. **Dashboard out of scope → Founder Control Tower is P0.** Still a presentation layer,
   still never authoritative, but now the primary management interface rather than a
   deferred nice-to-have.
5. **Two ventures renamed and decoupled.** `pm-workflow` → **Nodi**; Twinko is no longer a
   dogfooding or validation dependency of Nodi.

### The single most important finding

**The governance kernel does not need to be rebuilt.** Every structural invariant the Studio
already enforces — no automatic path from recommendation to approval, an approval record
required for `Chairwoman Approved`, generated output can never be canonical, source-of-truth
precedence, read-only product repositories — is exactly what makes bounded agent autonomy
safe to add. v0.2 is an **extension of the kernel, not a replacement of it**. What is genuinely
missing is not governance; it is (a) an autonomy/decision-rights model, (b) structured
project-isolated state, and (c) an event and daily-brief layer.

### The most consequential ambiguity found

Twinko is currently **three different things** across the repositories, and only one of them
is a venture:

1. a Studio venture (`governance/venture-registry.yaml`);
2. a **Project inside the Nodi product's database** — the canonical Twinko workspace, 172
   changelog rows, 9 governance records (`pm-workflow-copilot/docs/v2/V2_CURRENT_STATE.md` §4);
3. the historical dogfooding subject of the PM Workflow venture.

Sense (2) is real product data that exists today and is not removed by decoupling the
ventures. §E-1 states exactly what the decoupling does and does not touch.

---

## B. Reuse Assessment

No percentage is given, because the repository does not support that precision — file counts
and line counts are not proportional to architectural value. What follows is an area-by-area
judgement with the evidence for each.

### Reusable as-is (no change required)

| Area | Evidence | Why it survives |
|---|---|---|
| Approval integrity kernel | `governance/status-model.yaml`, `src/governance/validate-status.ts`, `tests/approval-integrity.test.ts` (15 tests) | Structurally prevents auto-approval. Bounded autonomy needs this *more*, not less. |
| Status model (10 statuses + transition table) | `governance/status-model.yaml` | Already contains `Superseded`; v0.2 needs no new status. |
| Source-of-truth hierarchy | `CLAUDE.md` "Source of Truth" | Extended by one row (structured state), not rewritten. |
| Evidence and provenance system | `evidence/records/` (7 records), `CLAUDE.md` "Evidence and Creation Provenance" | Agent runs become another provenance producer. |
| Approval records | `decisions/approvals/0001`–`0007` | Preserved verbatim; `0008` supersedes by reference, never by edit. |
| Deterministic portfolio pipeline | `src/portfolio/`, `src/cli.ts`, `schemas/venture-update.schema.yaml` | Fails closed on invalid input; the model for every future deterministic component. |
| Repository boundaries | `CLAUDE.md` "Repository Boundaries", `docs/OPERATING_LOOP.md` §2 | Product repos stay read-only from the Studio. Unchanged. |
| Executive contracts | `executives/*/OPERATING_CONTRACT.md` (7) | Accountability boundaries; v0.2 agents are instantiations of them, not replacements. |
| Single-writer and Git boundaries | `docs/OPERATING_LOOP.md` §2 | Directly applicable to agents that write files. |
| Skill format | `skills/ceo/*/SKILL.md` (12-part structure) | Already provider-neutral and version-controlled — matches §5 of the founder direction with no change. |

### Reusable with modification

| Area | Change needed |
|---|---|
| `CLAUDE.md` | Ventures; agent restriction; autonomy; Control Tower; structured state; runtime/MCP/n8n positions |
| `constitution/AUTHORITY.md` | Reserved-decision list extended; authority factors added |
| `governance/venture-registry.yaml` | `nodi` added; `pm-workflow` retained as superseded alias; `project_id` recorded |
| `executives/EXECUTIVE_OPERATING_MATRIX.md` | Amendment noting agents are runtime instantiations of existing roles; roles unchanged |
| `docs/OPERATING_LOOP.md` | Amendment noting the loop now has an autonomous branch; 14 steps otherwise intact |
| `skills/ceo/*` | Relocation to `skills/<function>/` is a later refactor; not required for the first slice |

### Superseded (preserved, not deleted)

| Item | Where | Superseded by |
|---|---|---|
| "Do not build a multi-agent swarm in v0.1" (as a blanket prohibition) | `CLAUDE.md` line 161 | `0008` §4 — bounded orchestration permitted; uncontrolled swarm still prohibited |
| "web dashboard" as out-of-scope | `CLAUDE.md` line 285 | `0008` §7 — Control Tower is P0 |
| Twinko as PM Workflow's first internal customer / dogfood case | `handoffs/twinko/TWINKO_DECISION_LOG.md` D-028, D-051; `handoffs/pm-workflow/PM_WORKFLOW_DECISION_LOG.md` PMW-021, PMW-046; `handoffs/*/…` | `0008` §§1–2 |
| Venture name "AI-Native PM Workflow" as the current identity | `CLAUDE.md` line 20, `governance/venture-registry.yaml` | `0008` §1 — Nodi is the current identity; PM Workflow is product lineage |

### Not reusable / genuinely missing (must be added)

- Autonomy and decision-rights model — **nothing in the repository expresses graduated authority**; today every path terminates at Gina.
- Structured operational state with `project_id` — no store, no entity schema, no isolation mechanism.
- Activity/change event model and daily brief — the current cadence is weekly and re-reads whole ventures rather than deltas.
- Agent run records, cost, and failure observability.
- Founder Control Tower views (Portfolio, Today, Decisions, Project Detail, Agent Ops).
- Escalation policy distinguishing CEO-resolvable from Founder-reserved.

---

## C. Architecture Delta

| Area | Current (v0.1, verified) | New direction (v0.2) | Required change |
|---|---|---|---|
| **Venture registry** | `governance/venture-registry.yaml` v0.1.0: `pm-workflow`, `twinko`; no project ids | Ventures are **Twinko** and **Nodi**, each with a stable `project_id` | MODIFY registry: add `nodi`; retain `pm-workflow` as a superseded alias so historical venture updates still validate; record `project_id` and owning repository |
| **Twinko / Nodi relationship** | Twinko = "first internal customer and evidence-generation case" for PM Workflow (`PM_WORKFLOW_CURRENT_STATUS.md` L43; `TWINKO_DECISION_LOG.md` D-028/D-051; `PMW-021`) | Fully independent ventures; shared infrastructure only | SUPERSEDE the dogfood/validation dependency in `0008` §2; mark the handoff snapshots as historical; **do not edit** product-repo decision logs from the Studio |
| **AI CEO** | Classify · route · review · prepare packets; ceiling `CEO Recommended` (`executives/ceo/OPERATING_CONTRACT.md`) | Primary organizational orchestrator; may resolve functional disagreement within approved policy; may authorize agent execution inside autonomy bounds | MODIFY the CEO contract's authority section via `0008`; add orchestration + escalation-arbitration duties to the v0.2 architecture |
| **Functional agents** | Seven executive roles, invoked as skills with role context; "never autonomous agents" (`EXECUTIVE_OPERATING_MATRIX.md` §1) | Bounded autonomous functional agents under the AI CEO; first three: Product, Engineering, Research/Strategy | ADD the agent model to the v0.2 architecture; agents are **runtime instantiations of existing executive roles**, not new roles (0007 §7 S6 forbids renaming/merging/instantiating roles without a Chairwoman decision) — mapping for Design/Growth/Data is an open Founder decision (§E-3) |
| **Skills** | 3 canonical CEO skills + 4 `.claude/skills/` adapters; `Agent ≠ Skill` already explicit | Unchanged principle; skills become reusable across agents, provider-neutral, testable | KEEP the principle and format. ADD: skills move from `skills/ceo/` to `skills/<function>/` when the second agent needs one — deferred, not required for the first slice |
| **Autonomy** | Binary: recommend, or Gina approves. No graduated authority anywhere | Five levels — Observe · Recommend · Execute · Autopilot · Founder Reserved — resolved from Action × Risk × Reversibility × Confidence × Financial/External impact | ADD `governance/autonomy-model.yaml` + the v0.2 architecture §5. Authority is **never** derived from agent role alone |
| **Escalation** | Every conflict reaches Gina as a decision packet (`HANDOFF_RULES.md` §5) | Functional disagreement → AI CEO → resolve within policy **or** create a Founder Decision Packet | ADD the escalation model to the v0.2 architecture §6; MODIFY `HANDOFF_RULES.md` §5 by amendment |
| **Founder governance** | 10 reserved decisions (`constitution/AUTHORITY.md` §2) | Extended: safety policy, sensitive-data governance, irreversible high-impact technical decisions, major external claims, high reputational-risk actions, venture start/shutdown, material pivots | MODIFY `constitution/AUTHORITY.md` to v0.2.0 (additive; nothing removed) |
| **Dashboard** | Explicitly out of scope (`CLAUDE.md` line 285) | Founder Control Tower is **P0**; views: Portfolio, Today, Decisions, Project Detail, Agent Operations | SUPERSEDE the out-of-scope entry; ADD the view contract to the v0.2 architecture §8 |
| **Structured state** | Markdown + YAML files only; `inputs/venture-updates/` is the sole structured input | Ten entities with explicit project isolation; extensible, not over-engineered | ADD entity definitions to the v0.2 architecture §7. **Schema files are deliberately not created in this pass** — they belong to the first implementation slice |
| **Events** | None. Weekly cadence re-reads whole ventures (`docs/OPERATING_LOOP.md` Step 13) | Agents emit activity/change events; importance assessment; CEO daily synthesis of deltas and exceptions | ADD the event and daily-brief model to the v0.2 architecture §9 |
| **Claude Code** | "a development tool, not automatically part of the product runtime" (`CLAUDE.md` line 324) | Preferred implementation environment for the first build phase; **must not become the canonical Company OS** | KEEP the existing sentence — it is already correct. STRENGTHEN with the portability requirement in the v0.2 architecture §11 |
| **Runtime** | None. Deterministic Node/TypeScript CLI only | Claude Agent SDK is the leading candidate — **working direction, replaceable** | ADD as working direction in the v0.2 architecture §11, explicitly not an approved irreversible dependency; no dependency added in this pass |
| **MCP** | Not mentioned anywhere | Deferred; future integration mechanism where it improves portability | ADD the deferral to the v0.2 architecture §12; no custom MCP server without a stated use case |
| **n8n** | Out of scope (`CLAUDE.md` line 287, with LangGraph) | Future trigger/schedule/webhook/integration layer; never the reasoning layer | MODIFY the out-of-scope entry to a conditional deferral; LangGraph stays out of scope (no demonstrated requirement) |
| **Source of truth** | 8-level hierarchy; generated output never canonical; chat never canonical | Unchanged in principle; one level inserted for canonical structured state | MODIFY the hierarchy in `CLAUDE.md`; the Control Tower stays at presentation level, below generated reports |
| **Evaluation** | Governance invariants mechanically tested (42 tests); no output-quality evaluation | Agent output evaluation; generation separated from evaluation | KEEP the invariant tests. ADD evaluation-boundary requirements to the v0.2 architecture §10; harness itself is implementation work |
| **Project isolation** | None. Handoffs are per-venture directories, but nothing enforces isolation | Every project-scoped entity carries `project_id`; an agent reads only its project's state | ADD isolation as an architectural invariant (v0.2 architecture §4) and as a first-slice acceptance criterion |

---

## D. File-Level Migration Plan

All paths are relative to the Studio repository root unless stated otherwise.

### Studio — governing files

```text
File:   CLAUDE.md
Status: MODIFY
Reason: Names the wrong ventures; prohibits autonomous agents outright; puts the dashboard
        out of scope; has no autonomy, event, or structured-state model.
Change: Ventures → Twinko + Nodi. Agent restriction → bounded orchestration. Autonomy model
        section added. Control Tower P0. Structured state + project isolation. Runtime/MCP/n8n
        positions. Source-of-truth hierarchy gains canonical structured state.
Deps:   decisions/approvals/0008; docs/COMPANY_OS_ARCHITECTURE_V0_2.md; constitution/AUTHORITY.md
```

```text
File:   docs/COMPANY_OS_ARCHITECTURE_V0_2.md
Status: ADD
Reason: No single canonical architecture file exists; v0.1 architecture is spread across
        CLAUDE.md, the executive matrix, and the operating loop.
Change: New canonical architecture: organizational model, project isolation, agents, skills,
        autonomy, escalation, structured state, Control Tower, events, evaluation, runtime,
        integrations, first vertical slice, and what remains prohibited.
Deps:   decisions/approvals/0008; governance/autonomy-model.yaml
```

```text
File:   constitution/AUTHORITY.md
Status: MODIFY (amend to v0.2.0; §§1, 3, 4, 5 unchanged)
Reason: The reserved-decision list predates autonomous execution and omits safety policy,
        sensitive-data governance, irreversible technical decisions, and reputational risk.
Change: §2 extended additively; §6 added (authority is resolved from action characteristics,
        never from agent role).
Deps:   decisions/approvals/0008; governance/autonomy-model.yaml
```

```text
File:   governance/autonomy-model.yaml
Status: ADD
Reason: Nothing in the repository expresses graduated decision rights.
Change: Five autonomy levels; the five authority factors; Founder-reserved categories; the
        resolution rule (lowest applicable level wins); default level for unclassified actions.
Deps:   constitution/AUTHORITY.md; decisions/approvals/0008
```

```text
File:   governance/venture-registry.yaml
Status: MODIFY (v0.1.0 → v0.2.0)
Reason: Venture identity changed; no project isolation key exists.
Change: `nodi` added (active, project_id `nodi`, repo `pm-workflow-copilot`, lineage recorded);
        `twinko` gains project_id and repo; `pm-workflow` retained as a superseded alias so
        historical venture updates under inputs/ and samples/ still validate.
Deps:   tests/portfolio-review.test.ts; src/governance/venture-registry.ts
        (as planned, the loader stripped lifecycle/project_id — CLOSED by Phase 0A `0010` §4,
        which made the schema strict and added six integrity rules; see §E-6)
```

```text
File:   executives/EXECUTIVE_OPERATING_MATRIX.md
Status: MODIFY (amendment block only — table, boundaries, and ceiling unchanged)
Reason: It states executives are "never autonomous agents"; v0.2 permits bounded agents.
Change: Amendment recording that v0.2 functional agents are runtime instantiations of these
        same roles under `governance/autonomy-model.yaml`; no role renamed, merged, or created.
Deps:   decisions/approvals/0008 (which preserves 0007 §7 S6)
```

```text
File:   docs/OPERATING_LOOP.md
Status: MODIFY (header amendment only — the 14 steps are unchanged and still govern)
Reason: The loop assumes every unit of work ends at Chairwoman approval.
Change: Amendment noting the v0.2 autonomous branch: work inside approved autonomy executes
        and records an event; work outside it re-enters at Step 6.
Deps:   docs/COMPANY_OS_ARCHITECTURE_V0_2.md §6
```

```text
File:   decisions/approvals/0008-company-os-v0-2-ai-native-operating-model.md
Status: ADD
Reason: Section 21 of the founder direction requires 14 decisions recorded explicitly.
Change: New approval record; supersedes by reference only. 0001–0007 unedited.
Deps:   none (this is the authority the rest depends on)
```

```text
File:   evidence/records/0008-company-os-v0-2-spec-reconciliation.md
Status: ADD
Reason: CLAUDE.md requires provenance for meaningful work.
Change: Before-state, framing, AI contribution, what was accepted/changed, files touched,
        validation run and its exact result, unresolved risks.
Deps:   decisions/approvals/0008
```

```text
File:   prompts/founding/FOUNDING_ENGINEER_PROMPT_V0_2.md
Status: ADD (v0.1 prompt preserved unchanged alongside it)
Reason: The v0.1 prompt hard-codes the superseded ventures and the no-agent restriction.
Change: New prompt for the v0.2 build phase, scoped to the first vertical slice.
Deps:   docs/COMPANY_OS_ARCHITECTURE_V0_2.md
```

```text
File:   README.md
Status: MODIFY (minimal)
Reason: Names AI-Native PM Workflow as a current venture; no pointer to v0.2 architecture.
Change: Venture names; one pointer line. Setup and demo instructions unchanged.
Deps:   governance/venture-registry.yaml
```

```text
File:   tests/portfolio-review.test.ts
Status: MODIFY (one assertion)
Reason: Asserts the registry contains "exactly pm-workflow and twinko". The registry changed.
Change: Assert nodi + twinko + the retained pm-workflow alias. No behavior change.
Deps:   governance/venture-registry.yaml
```

### Studio — files deliberately NOT changed

```text
decisions/approvals/0001–0007      KEEP — historical approvals; superseded by reference only
evidence/records/0001–0007         KEEP — provenance is never rewritten
memory/milestones/2026-07-12-*.md  KEEP for now — a new active milestone belongs to the
                                   implementation phase, not the spec phase (§E-5)
handoffs/pm-workflow/**            KEEP — read-only snapshots of the product repo's own truth;
handoffs/twinko/**                 the Studio must not edit another repo's canonical records
inputs/, samples/venture-updates/  KEEP — historical W28 records; the `pm-workflow` venture id
                                   is retained precisely so these stay valid
skills/**, .claude/skills/**       KEEP — format already matches v0.2; relocation deferred
src/**                             KEEP — no runtime change in a specification pass
executives/*/OPERATING_CONTRACT.md KEEP — authority changes ride on 0008 + the v0.2 architecture
generated/**                       KEEP — derivative; regenerated, never migrated
```

### Product repositories — NOT changed by this migration

```text
pm-workflow-copilot/**   NOT CHANGED. Product identity (Copilot → Nodi) is a product-repo
                         reserved decision, not a Studio edit. See §E-2.
twinko-app/**            NOT CHANGED.
```

### REMOVE

One candidate, and it is **not** executed here:

```text
../gina-ai-native-venture-studio 2/   Stale duplicate clone of the Studio repository, behind
                                      HEAD and holding a stale .git/index.lock. It is a real
                                      hazard: a session opening it would read superseded
                                      governance as current. Deleting a directory containing a
                                      git repository is destructive and outside a spec pass —
                                      flagged for Gina, not removed. See §E-7.
```

Nothing else is recommended for deletion. Every other conflict is resolved by supersession.

---

## E. Risks and Ambiguities

### E-1 · Decoupling Twinko and Nodi does not delete Twinko data inside Nodi — **resolved, stated for the record**

`pm-workflow-copilot` holds a canonical Twinko workspace in its database: 172 changelog rows,
9 governance records, 9 state items, 30 decision conditions, 6 sources / 118 claims / 11
analyses (`docs/v2/V2_CURRENT_STATE.md` §4, re-verified at commit `9aa6201`).

Decision `0008` §2 removes the **governance dependency** — Twinko is no longer a validation
or dogfooding obligation for Nodi, and neither venture's progress gates the other. It does
**not** touch that data, and nothing in this migration authorizes deleting or migrating it.
That repository's own rule stands: *do not mutate canonical Twinko data.*

### E-2 · Nodi vs. PM Workflow identity — **resolved as Nodi, with one real inconsistency to hand back**

The founder direction asked whether a third venture exists. It does not. Evidence that Nodi is
the current identity of the same venture:

- `pm-workflow-copilot/docs/v2/nodi/` — four current specs, the newest edited 2026-08-31
- `docs/v2/V2_CURRENT_STATE.md` §1: the product is "Product Decision Continuity"; §12 records
  locked Nodi Project-Layer decisions as *implemented*
- commit `7557ef6` "feat(nodi): brand foundation, real logo, and the approved Projects surface"

**But the same repository still describes itself as the older product in two places:**
`pm-workflow-copilot/CLAUDE.md` ("AI-Native Product Workflow Copilot") and
`docs/architecture-boundaries.md` §Product. That is an internal inconsistency in the product
repo, and renaming a product's canonical identity is a product-repo reserved decision. It is
**not** fixed here. Founder decision required — see the Remaining Founder Decisions.

Consequence if left: a new session in that repo may read the superseded product name as
current. Low severity, high annoyance, trivially fixed by whoever owns that repo's canonical
truth.

### E-3 · Agent ↔ executive mapping is only partly derivable — **Founder decision required**

Decision `0007` §7 S6 forbids renaming, deleting, merging, or instantiating executive roles
without a Chairwoman decision, and `0008` preserves that. The founder direction names eight
functional agents; the registry holds seven executive roles. Three map cleanly:

| Agent | Executive role | Confidence |
|---|---|---|
| Product | CPO | Clean — CPO already owns product strategy, discovery, requirements, prioritization |
| Engineering | CTO | Clean — CTO already owns architecture, engineering, testing, technical privacy |
| Research / Strategy | **split** — strategy sits with CEO; research sits with CPO (`executive-registry.yaml` lists `research` under CPO) | **Ambiguous** |

Growth ↔ CMO, Finance/Operations ↔ CFO, Legal/Trust ↔ CLO, Data ↔ (unassigned) are
**proposals, not derivations** — CMO owns acquisition and lifecycle marketing, which is
narrower than "Growth"; no role owns "Data" today.

This report does **not** invent that mapping. The v0.2 architecture defines only the three
first-slice agents, with Research/Strategy explicitly marked as CEO-owned with CPO research
input, pending confirmation.

### E-4 · Recording "approved" from a written directive

Decisions `0001`–`0007` were recorded as `Chairwoman Approved` with basis "Chairwoman decision
of \<date\> (this session)". `0008` follows that same established pattern, with its basis being
Gina's written Company OS v0.2 direction of 2026-09-01. Two things are deliberately kept
narrow:

- **Only what the direction actually decided is recorded as approved.** The Claude Agent SDK
  is recorded as *working direction*, not an approved dependency, because the direction itself
  says so.
- **Nothing was inferred into an approval.** Every consequential gap is in the Remaining
  Founder Decisions rather than silently resolved.

If Gina considers `0008` premature, it can be superseded by `0009` without any other file
changing — that is the point of supersession-by-reference.

### E-5 · No new active milestone was created

`memory/milestones/2026-07-12-fast-track-product-delivery.md` still carries the One-Person
Company OS v1.0 amendment as the current primary milestone. v0.2 clearly supersedes that
sequencing, but a milestone record is an *execution* artifact and this was a specification
pass. **Consequence:** until a milestone amendment is written, a fresh session following the
recovery checklist will read `0008` as the governing decision but the July milestone as the
active work — a visible, surfaced inconsistency rather than a silent one. Writing that
amendment is the first act of the implementation phase.

### E-6 · The registry loader does not yet enforce what the registry now records — **CLOSED by Phase 0A (`0010` §4)**

> **Resolved 2026-09-01.** `src/governance/venture-registry.ts` now recognizes `project_id`,
> `lifecycle`, and `superseded_by`, rejects unknown fields, and fails closed on six integrity
> rules. New operational writes against `pm-workflow` are refused (`0010` §6). The original
> finding is preserved below as the record of what was wrong.

`src/governance/venture-registry.ts` validates only `id`, `name`, `integration`, and
`external_repo_access`; Zod strips the new `project_id`, `lifecycle`, `repository`, and
`lineage` fields. So the YAML **documents** the supersession of `pm-workflow` but nothing
**enforces** it — a new venture update citing `venture: pm-workflow` would still validate.

That is intentional for a spec pass (changing the loader is implementation), and it is the
first item on the implementation list. Until then the supersession is a documented rule, not
a mechanical guarantee. Stated plainly so nobody assumes otherwise.

### E-7 · Stale duplicate Studio clone — **CLOSED 2026-09-01 by removal**

> **Resolved 2026-09-01.** Two steps. First, `governance/canonical-repository.yaml` plus a
> preflight made the canonical checkout mechanically identifiable, and the copy was archived
> under a do-not-use name. Then round-2 independent review found the residual hazard that
> mattered: the copy carried its own pre-Phase-0A CLI with no preflight and remained executable,
> which no change to this repository could reach. Gina authorized removal, and the checkout was
> **deleted** — both the archived and original paths verified absent, with the full suite passing
> without the sibling. Pre-deletion re-verification found no commits absent from canonical, only
> branch `main`, and no unique content. The copy-detection rules and preflight are retained
> deliberately: they guard any *future* copy. Original finding preserved below.

`../gina-ai-native-venture-studio 2/` is a second clone of the Studio, behind HEAD, with a
stale `.git/index.lock`. Any session that opens it will read superseded governance as current
and may violate the single-writer protocol. Not deleted here (destructive, out of scope for a
spec pass). Recommended: Gina removes it, or renames it to something unmistakably archival.

### E-8 · Superseded dogfood statements live in product-repo snapshots

The dogfood dependency is asserted in ~30 places across `handoffs/pm-workflow/` and
`handoffs/twinko/` — but those are **read-only snapshots of the product repositories' own
canonical documents**. The Studio must not edit them; doing so would create a competing source
of truth, which `CLAUDE.md` prohibits.

Handled by: `0008` §2 supersedes the dependency at Studio level, and `handoffs/README` scope
is unchanged. The product repositories' own decision logs (Twinko `D-028`/`D-051`, PM Workflow
`PMW-021`/`PMW-046`) still record the old direction and should be updated **by their own
owners**, through their own decision processes. Until then, a reader of those files sees the
superseded direction. Flagged, not silently patched.

### E-9 · Risks that are architectural rather than clerical

| Risk | Why it matters | Mitigation in v0.2 |
|---|---|---|
| Autonomy expanding by drift | Each individually reasonable "this is routine too" widens the bound until Founder-reserved is hollow | Autonomy is resolved per-action from five factors, never from role; unclassified actions default to Recommend; every autonomous execution emits an auditable event |
| The Control Tower quietly becoming truth | A dashboard that is easier to read than the records becomes the record | It stays below generated reports in the source hierarchy; it renders schema-driven state and computes no domain meaning |
| Project isolation failing silently | Cross-project leakage is invisible until it produces a wrong decision | `project_id` on every project-scoped entity, plus an isolation test as a first-slice acceptance criterion — not a convention |
| Premature agent-org expansion | Eight agents before one loop works produces eight untested surfaces | First slice is limited to three agents and one project; `0008` §14 makes proving the loop a precondition |
| Runtime lock-in | Building directly against one SDK makes replacement expensive | Agent definitions, skills, policies, and state stay repository-owned; the SDK is an execution adapter |
