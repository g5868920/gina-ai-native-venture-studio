# Decision 0009 — Cross-Model Deliberation and Independent Engineering Review

status: Chairwoman Approved
approvedBy: Gina
approvedDate: 2026-09-01
amends: 0008 (additive — Company OS v0.2.0 → v0.2.1). No prior decision is superseded, edited, or deleted.
recordPath: decisions/approvals/0009-cross-model-deliberation-and-independent-engineering-review.md

---

## Basis

Chairwoman written direction of 2026-09-01, "Company OS v0.2 — Architecture Amendment:
Cross-Model Deliberation + Independent Engineering Review", which approves the v0.2
specification and adds two architectural requirements to it.

**This is an additive amendment.** Decision `0008` stands in full. Unrelated architecture is not
rewritten. Specification only — **no runtime functionality is implemented, no dependency is
approved, no provider is configured, and no spend is authorized.**

---

## Decision

### 1. A Cross-Model Decision Council is added as a decision-quality layer

A provider-independent layer lets Claude and OpenAI independently analyze important questions,
challenge each other's reasoning, and provide structured inputs to the AI CEO.

**It is not a new department and must not become an uncontrolled multi-agent discussion.** No
org-chart seat is created, no agent is added, and no model in a council holds authority.

Canonical pattern:

```text
Founder objective / material issue
→ AI CEO frames a shared evidence packet
→ Claude performs independent analysis
→ OpenAI performs independent analysis
→ each model critiques the other's structured analysis
→ AI CEO synthesizes the disagreement and evidence
→ CEO acts within approved authority, or escalates a Founder Decision Packet
```

Required principles:

- **Independent first-pass reasoning** before either model sees the other's conclusion.
- **Maximum bounded deliberation** — default one independent-analysis round and one
  cross-critique round.
- The **CEO remains accountable for synthesis**.
- **Model consensus does not equal approval.**
- **Model disagreement does not automatically require Founder escalation.**
- Escalation depends on the existing autonomy, risk, reversibility, and decision-right policy.
- All material council runs preserve model outputs, evidence references, disagreement, and CEO
  synthesis for auditability.
- **Do not invoke the council for routine low-risk work by default.**

Canonical detail: `docs/COMPANY_OS_ARCHITECTURE_V0_2.md` §15; `governance/decision-council-policy.yaml`.

### 2. Provider access is by adapter, not by a second orchestration stack

The Claude Agent SDK **remains the primary runtime candidate** (`0008` §11, unchanged).

A **provider-adapter abstraction** lets the Company OS invoke Claude and OpenAI through a common
structured interface. OpenAI is invoked through its API as a peer reasoning provider.

**Do not add a second full orchestration framework merely to access OpenAI.** The OpenAI Agents
SDK is **not adopted**; it may be evaluated later only if OpenAI-side tool-using agent behaviour
turns out to be required.

### 3. A council trigger policy is recorded as working direction

Warranted for: major strategy decisions · architecture decisions · significant scope or
prioritization changes · contradictory evidence · low CEO or specialist confidence · high
uncertainty · material cost impact · high-impact launch decisions · specialist request for
independent challenge · Founder-reserved decision preparation.

**Dual-model review is not required for every agent task.** Cost and latency remain observable.

### 4. Council-backed CEO synthesis is a structured output

It supports the Founder Control Tower and carries, at minimum: issue/decision · `project_id` ·
Claude recommendation · OpenAI recommendation · areas of agreement · areas of disagreement ·
material evidence · assumptions · CEO conclusion · CEO rationale · confidence · residual
uncertainty · reversibility · impact · action taken or recommended · Founder action required
(yes/no) · escalation reason if applicable.

Field specification: `schemas/council-synthesis.schema.yaml`.

### 5. Independent Engineering Review Gate

**The model or agent that implements code must not be the sole reviewer of that code.**

Preferred initial model:

```text
approved spec / issue → Claude Code implementation → Claude-generated tests → Claude self-QA
→ deterministic build / test / lint / static checks → independent Codex review → independent
Codex QA → findings returned to Claude → Claude remediation → deterministic verification
→ Codex re-review when required → engineering gate result
```

### 6. Role separation between implementation and review

**Claude Code** owns coding, refactoring, implementation tests, local build, self-QA, and
remediation.

**Codex** owns code review, specification-to-diff comparison, regression analysis, edge-case
analysis, test adequacy, architecture compliance, security-oriented review, independent test/QA
execution where supported, and verification of Claude's remediation.

**Codex does not implement its own review findings by default.** The intended cycle is
**Claude builds → Codex challenges → Claude fixes → Codex verifies.** This separation is
deliberate, to reduce self-review bias.

### 7. Engineering review results are structured and machine-processable

Fields: `review_status` · `critical_findings` · `high_findings` · `medium_findings` ·
`low_findings` · `requirements_coverage` · `tests_status` · `regression_risk` ·
`security_status` · `architecture_compliance` · `recommended_action` · `reviewer` ·
`reviewed_commit`/`diff` · `timestamp`. States: `PASS` · `PASS_WITH_FINDINGS` · `BLOCKED`.

Field specification: `schemas/engineering-review.schema.yaml`.

### 8. Initial merge gate — working policy

Critical: blocking. High: blocking. Medium: fix or explicit CTO/CEO risk acceptance. Low/nit:
non-blocking.

A change is not merge-ready unless deterministic required checks pass, no unresolved Critical
findings remain, no unresolved High findings remain, and the independent Codex review gate
passes.

**This amendment does NOT enable autonomous production merge or deployment. Autopilot remains
disabled unless separately approved.** `commit-push-merge-or-release` stays `founder_reserved`
in `governance/autonomy-model.yaml`.

### 9. High-risk areas still require human and professional review

Independent AI review does not eliminate human or professional review for: authentication and
authorization · secrets · payments · sensitive user data · deletion and retention · production
database migrations · privacy and security policy · safety-critical behaviour · production
infrastructure · irreversible or high-blast-radius changes.

These route through the existing Founder-reserved and qualified-review framework
(`constitution/AUTHORITY.md` §2). **The constitution is not amended by this decision** — the
existing framework is used as-is.

### 10. Control Tower schemas are extended, and the default view stays exception-oriented

Future views may represent Decision Council state (model recommendations, major disagreement,
CEO conclusion, confidence, Founder escalation state) and Engineering state (Claude
implementation status, deterministic CI status, Codex review status, blocking findings,
remediation state, merge readiness).

**Raw model transcripts and per-PR detail are not exposed on a default view.** They are
drill-down only.

---

## Sequencing — this amendment does not displace Phase 0A

Confirmed by the Chairwoman on 2026-09-01: this amendment is **additive to, not ahead of**, the
structural hardening prerequisites already identified in
`docs/migration/COMPANY_OS_V0_2_MIGRATION_REPORT.md` §E and `0008` Remaining Founder Decisions.

**Phase 0A remains the next implementation prerequisite**, comprising at minimum:

1. canonical `nodi` / `twinko` project identity;
2. superseded `pm-workflow` handling;
3. project-write isolation;
4. registry enforcement (`src/governance/venture-registry.ts` currently strips `project_id`,
   `lifecycle`, and `superseded_by` — §E-6);
5. duplicate-repository safety (the stale clone at `../gina-ai-native-venture-studio 2/` — §E-7).

The Independent Engineering Review Gate (§§5–8) governs **how** Phase 0A is built and therefore
applies from the first line of Phase 0A code. The runtime Decision Council (§§1–4) is a build
item that follows; its exact slice placement is an open Founder decision below.

---

## Scope and Limits

Specification and governance only. This decision does **not**: implement the council, the
provider adapter, the review gate, or any schema validator; add or approve any dependency, SDK,
API key, provider account, or spend; enable autonomous merge, deployment, or Autopilot; amend
`constitution/AUTHORITY.md`; change project isolation, escalation, or source-of-truth authority;
or reorder the Phase 0A prerequisites above.

---

## Definition of Done (this decision)

- The council and the engineering gate are canonical in exactly one place each, with
  machine-readable policy and field specifications alongside.
- Approved requirements are distinguishable from working direction throughout.
- No existing v0.2 architecture is rewritten; every change is additive and marked v0.2.1.
- No implementation behaviour changed; `pnpm verify` green.

---

## Remaining Founder Decisions (added by this amendment)

Carried alongside the six still open under `0008`.

7. **Council slice placement.** Whether the runtime Decision Council is built in the first
   vertical slice or in a following one. Phase 0A precedes it either way.
8. **Provider account, key custody, and cost ceiling for OpenAI.** No account, key, or budget is
   authorized by this decision.
9. **Where Codex runs, and how its review result is captured** as a `schemas/engineering-review.schema.yaml`
   record — CI job, local invocation, or hosted review. This determines whether the gate is
   mechanically enforceable or advisory at first.
10. **Who holds the CTO/CEO risk-acceptance authority for Medium findings** in practice, given
    that the executive roles are AI functions and `constitution/AUTHORITY.md` §1 reserves
    approval to Gina. A recorded AI risk acceptance is not a human sign-off, and this amendment
    does not resolve which Medium findings need one.
