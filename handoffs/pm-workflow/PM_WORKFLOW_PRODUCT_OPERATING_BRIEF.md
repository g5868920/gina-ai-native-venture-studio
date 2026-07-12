# PM Workflow Product Operating Brief

**Product:** AI-Native Product Workflow Copilot  
**Prepared for:** Gina AI-Native Venture Studio  
**Status date:** 2026-07-11  
**Document role:** Product, architecture, evaluation, governance, commercialization, and execution source of truth

> **Core principle:** AI may recommend. Humans decide.

## Classification Legend

- **Confirmed fact:** Evidenced by the existing repository, artifacts, or implementation records.
- **Approved decision:** Explicitly accepted as the current direction.
- **Working direction:** Preferred path to test; not yet validated.
- **Hypothesis:** Requires user, technical, or market evidence.
- **Open decision:** Requires founder or accountable owner action.

---

## 1. Executive Summary

### What the product is

The AI-Native Product Workflow Copilot is an emerging **AI-native PM/PGM workflow and decision-support system**. Its intended role is to transform fragmented product and program inputs into structured project state, traceable analysis, human-governed decisions, dashboards, and reusable execution artifacts.

The current version is a **reusable workflow and artifact MVP with a static review portal**. It proves that a synthetic set of messy inputs can be processed through a stable 12-module workflow into review-ready PM/PGM artifacts with explicit risks, tradeoffs, source references, decisions needed, and human accountability boundaries.

### What problem it solves

PM and PGM work is often scattered across documents, chats, issue trackers, spreadsheets, analytics tools, design files, and stakeholder memory. Teams repeatedly spend time:

- Reconstructing current state.
- Reconciling conflicting information.
- Drafting similar artifacts.
- Chasing owners and decisions.
- Updating executive reports manually.
- Discovering risks late.
- Losing traceability between evidence, decisions, and delivery.

The product aims to create a governed operating layer between raw project information and accountable execution.

### Who it may serve

Potential users include:

- Product Managers.
- Program Managers.
- Product and engineering leaders.
- Founders operating cross-functional product programs.
- Teams delivering AI, platform, hardware-adjacent, FinTech, or enterprise transformation work.

Potential buyers remain hypotheses and may include heads of product, program management, transformation, operations, CIO/CTO organizations, or founders. No final ICP or buyer has been validated.

### Current stage

- **Product stage:** Reusable workflow and artifact MVP with static review portal.
- **Commercial stage:** Pre-validation; preparing internal Twinko dogfooding.
- **Current proof:** Synthetic end-to-end workflow completeness, artifact usefulness, governance design, and presentation implementation.
- **Not yet proven:** Real-data utility, recurring operation, adoption, willingness to pay, scalability, or commercial repeatability.

### Internal and external use cases

**Internal:** Twinko will be the first controlled real-data dogfooding case. It should test whether the workflow can maintain a recurring product/program control loop using real project sources.

**External:** The longer-term direction is to offer workflow diagnostics, implementation pilots, productized services, and eventually a configurable software platform. External use must be validated after internal dogfood and design-partner evidence.

### Commercialization direction

The approved commercial architecture is:

1. **Standardized core platform.**
2. **Configurable customer workflow layer.**
3. **Limited custom integration or logic.**

The product must not become an unlimited custom-software agency.

### Relationship to Twinko

Twinko is the intended first internal customer, evidence-generation case, and integration testbed. It can validate internal usefulness and expose real product requirements. It cannot independently prove external market demand or willingness to pay.

---

## 2. Product Vision

### Long-term vision

Create a continuously updated, human-governed product and program operating system that converts fragmented sources into:

- Structured project state.
- Evidence-backed insights.
- Visible decisions and open questions.
- Risks and dependencies.
- Review-ready artifacts.
- Role-specific dashboards.
- Recurring founder, PM, PGM, and executive updates.
- Traceable learning after launch.

### Intended product category

**AI-native PM/PGM workflow and decision-support system.**

It sits between:

- Source systems such as GitHub, documents, analytics, feedback, and task trackers.
- Human product/program judgment.
- Dashboards, artifacts, reviews, and execution decisions.

### Strategic advantage

Potential strategic advantages include:

1. **Workflow depth rather than generic generation.** The system models a full product/program lifecycle, not only PRD writing or meeting summaries.
2. **Traceability.** Sources, assumptions, claims, decisions, and artifacts remain linked.
3. **Human governance.** Review records and action gates preserve accountable ownership.
4. **Configurable operating model.** A standard core can adapt to company-specific workflows without rebuilding every implementation.
5. **Cross-artifact consistency.** A shared project-state layer can update dashboards and artifacts from the same facts.
6. **Founder/domain experience.** The product direction is grounded in repeated PM/PGM pain experienced across platform, hardware-adjacent, AI, FinTech, and global programs.

### What the product should not become

- A generic chatbot.
- A document generator with no source control.
- A fully autonomous PM replacement.
- A black-box system that makes commitments.
- A one-size-fits-all workflow forced onto every company.
- An unlimited bespoke development agency.
- A collection of twelve disconnected agents.
- A portal whose polished interface hides weak or stale sources.
- A production AI Voice Assistant runtime.

### Product principles

1. **AI may recommend. Humans decide.**
2. **Source before synthesis.** Every material claim should be traceable.
3. **State before presentation.** Dashboards and artifacts should derive from structured state.
4. **Configuration before customization.** Reuse is the default.
5. **Caveats remain visible.** Missing or conflicting information is not silently filled.
6. **Review is not approval.** Quality does not grant accountability.
7. **Smallest credible workflow first.** Validate a thin recurring slice before broad architecture.
8. **Portable by design.** The product must not depend on one editor, UI generator, model, orchestrator, database, or hosting provider.
9. **Independent evaluation.** Generation and scoring should be separated where practical.
10. **No unsupported impact claims.** Internal and synthetic evidence must be labeled honestly.

---

## 3. Problem Definition

### Validated experience from the founder and existing workflow work

The current product direction is grounded in recurring PM/PGM operating problems:

| Problem | Observed consequence | Product implication |
|---|---|---|
| Fragmented project information | Teams reconstruct status manually and use different versions of truth. | Create a canonical project-state and provenance layer. |
| Manual reporting | PM/PGM time is spent compiling rather than analyzing. | Generate recurring reports from current state. |
| Inconsistent artifacts | PRDs, risk logs, launch reviews, and updates vary by author and project. | Use schemas and templates with configurable fields. |
| Untraceable decisions | Rationale and ownership disappear across chats and meetings. | Maintain a decision entity and audit trail. |
| Late risk detection | Dependencies and unresolved choices surface near launch. | Continuously map risks, owners, triggers, and affected artifacts. |
| Roadmap/execution misalignment | Strategic scope and delivery systems drift. | Link decisions, requirements, milestones, issues, and status. |
| Repetitive PM/PGM work | Similar synthesis and translation work is repeated for each audience. | Reuse structured state to generate role-specific artifacts. |
| Weak governance | AI drafts or informal decisions may be treated as committed. | Use owner reviews and action gates. |
| Poor executive visibility | Leadership receives summaries without evidence or decision needs. | Provide drill-down from executive status to sources and owners. |

### Market hypotheses requiring validation

- Other companies experience the same pain intensely enough to purchase a solution.
- A configurable layer can cover enough workflow variation without excessive custom work.
- PM/PGM teams will trust AI-generated synthesis when provenance and review controls are visible.
- Buyers will fund workflow transformation rather than only buy generic AI tools.
- Teams will allow the product to connect to sensitive product and program sources.
- Time savings and decision-quality improvements can be measured reliably.

These hypotheses must not be treated as validated demand.

---

## 4. Target Customers and ICP Hypotheses

No final ICP has been selected. The following segments should be tested through Twinko learning, founder interviews, and external design partners.

| Segment | Company / team environment | Existing tools | Core pain | Potential buyer | Primary user | Trigger event | Expected value | Sales complexity | Evidence level |
|---|---|---|---|---|---|---|---|---|---|
| Startup product teams | Fast-moving, limited operations capacity, founder-led priorities | GitHub, Notion/Docs, Slack, analytics, design tools | Fragmented decisions, founder reporting, weak process consistency | Founder, Head of Product | PM, PGM, founder | Team growth, missed launch, investor reporting pressure | Faster visibility and repeatable operating cadence | Low–medium | Medium internal relevance; no external validation |
| AI product teams | Rapid experiments, uncertain requirements, model/eval complexity | GitHub, experiment logs, prompt tools, analytics, docs | Model changes, evaluation gaps, risk and requirement drift | Head of Product, AI lead | AI PM, PGM, eval lead | Moving from prototype to beta/production | Traceable decisions, evaluations, launch governance | Medium | Strong workflow fit hypothesis |
| Hardware or device launches | Multi-team dependencies, regional variants, certifications, long timelines | Jira, PLM, spreadsheets, docs, email | Dependency complexity, launch readiness, client commitments | Product/Program VP, device lead | PGM, PM, QA, launch lead | New device or platform launch | Risk visibility and cross-functional alignment | High | Strong founder-domain experience, no market validation |
| Cross-functional platform programs | Shared services, multiple dependent teams, platform roadmaps | Jira/Linear, Confluence/Notion, Slack, BI | Priority conflicts, unclear ownership, status overhead | Platform leader, PMO leader | PM, PGM | Portfolio expansion or execution breakdown | Shared state, decision hygiene, dependency visibility | Medium–high | Strong founder-domain experience |
| FinTech/product delivery | Compliance, partner dependencies, rollout controls | Jira, docs, risk/compliance systems, analytics | Risk, legal, launch, partner and market coordination | Product leader, operations/risk leader | PM, PGM, compliance | New market/product rollout | Controlled evidence, decisions, readiness artifacts | High | Founder-domain experience; requires trust/security evidence |
| Enterprise transformation teams | Many tools, governance requirements, executive reporting | Microsoft/Google suite, Jira, ServiceNow, BI, internal systems | Manual transformation tracking and inconsistent reporting | CIO/CTO, transformation head | Program office, product ops | AI transformation or operating-model redesign | Executive visibility and standard workflow governance | High | Hypothesis only |
| Product/AI consulting firms | Repeat client diagnostics and implementation playbooks | Docs, spreadsheets, project tools | Reinvented deliverables, inconsistent IP reuse | Practice lead | Consultant, engagement manager | Scaling delivery or productizing services | Reusable IP and faster client delivery | Medium | Commercially plausible; unvalidated |

### Early ICP selection criteria

An early segment should have:

- High pain and repeated workflows.
- Accessible, structured-enough data.
- A clear accountable buyer.
- A narrow implementation boundary.
- Measurable baseline effort or quality.
- Tolerance for human-in-the-loop review.
- Low enough integration/security burden for a first pilot.

---

## 5. Core Use Cases

### Prioritization legend

- **P0:** First dogfood or core product validation.
- **P1:** Important after the first slice works.
- **P2:** Later expansion.

| Priority | Use case | User | Input | Workflow | Output | Human decision point | Business value | Evaluation method | Current status |
|---:|---|---|---|---|---|---|---|---|---|
| P0 | Weekly product/program control loop | Founder, PM, PGM | GitHub issues, status notes, milestones, risks, decisions | Normalize changes → synthesize status → detect conflicts → generate decision asks → owner review | Dashboard snapshot, weekly founder report, risk/dependency updates, decision log | Validate status, escalate, accept commitments | Reduces manual reporting and improves visibility | Time saved, missing facts, correction rate, decision latency, trust score | Synthetic artifact exists; real workflow not implemented |
| P0 | Product intake and context normalization | PM | Briefs, goals, stakeholders, constraints, existing docs | Parse → classify → identify missing/contradictory data | Structured project context | Confirm objective, scope, stakeholders | Establishes a reliable foundation | Coverage, source accuracy, missing-data detection | Module 1 synthetic output exists |
| P0 | Decision and prioritization support | PM, PM Lead | Evidence, requests, constraints, metrics, risks | Compare options → expose assumptions/tradeoffs → recommend | Prioritization matrix, decision brief, scope options | Commit priority/scope/resources | Improves decision transparency | Human usefulness, rationale coverage, override rate | Modules 4–5 synthetic outputs exist |
| P0 | Risk and dependency management | PGM, PM, RD/QA leads | Issues, milestones, dependencies, constraints | Detect changes → map impact → assign owners → escalate | Risk register, dependency map, blocker summary | Accept risk, change timeline/scope | Earlier visibility and fewer surprises | Detection precision, missed critical risk, resolution latency | Module 7 synthetic output exists |
| P0 | Artifact generation from shared state | PM, PGM | Approved state, requirements, decisions, sources | Populate schema → generate draft → validate consistency | PRD, status, launch review, decision log | Review and approve artifact use | Reduces repeated drafting and drift | Fact accuracy, coverage, edit distance, time saved | Synthetic artifacts exist; state-driven generation not implemented |
| P1 | Requirement synthesis and feature definition | PM, RD, UX, QA | Approved scope, evidence, constraints | Convert scope to requirements, non-goals, acceptance criteria | Feature brief or PRD draft | Confirm feasibility, testability, build use | Faster aligned definition | Requirement coverage, contradiction count, human edits | Module 6 synthetic output exists |
| P1 | Customer and user feedback synthesis | PM, Research, Support, BD | Feedback, interviews, support tickets, client requests | Cluster → compare → detect contradictions → weight evidence | Theme map, opportunity candidates, evidence caveats | Decide problem framing and priority | Faster insight without losing evidence quality | Source recall, theme precision, confidence calibration | Module 2 synthetic output exists |
| P1 | Launch readiness | PM, PGM, QA, RD, Support, Legal | Scope, QA, risks, support, rollout, legal inputs | Compile readiness → identify gaps → prepare decision packet | Launch-readiness review inputs | Go/no-go, limited rollout, risk acceptance | Better launch control | Critical-gap recall, false readiness claims, owner completion | Module 10 synthetic output exists |
| P1 | Post-launch monitoring and learning | PM, Data, Research, Support | Metrics, feedback, incidents, support signals | Compare expected vs observed → explain gaps → propose options | Post-launch report, roadmap candidates | Scale, pause, rollback, reframe | Closes learning loop | Metric accuracy, interpretation quality, decision usefulness | Module 12 synthetic output exists |
| P1 | Roadmap maintenance | PM, leadership | Decisions, outcomes, capacity, dependencies | Recalculate affected priorities after changes | Updated roadmap and rationale | Commit roadmap changes | Keeps roadmap aligned to evidence and capacity | Change consistency, stale-item rate | Conceptual only |
| P2 | Multi-project portfolio control | Product/Program leadership | Multiple project states | Aggregate without losing project provenance | Portfolio health, resource and dependency views | Reallocate priorities/resources | Executive visibility across workstreams | Portfolio accuracy and drill-down quality | Not started |

---

## 6. Product Architecture Model

### 6.1 Standardized Core

**Purpose:** Shared product capabilities and reusable IP across all customers.

Includes:

- Canonical source/provenance model.
- Project-state entities.
- Workflow execution framework.
- Human review and action-gate logic.
- Artifact schemas and versioning.
- Dashboard component schemas.
- Evaluation framework.
- Logging, observability, cost, and failure handling.
- Provider and integration interfaces.
- Security and access-control primitives.

**Must remain reusable:** data model, orchestration contracts, governance model, artifact/version logic, evaluation, and core UI patterns.

**Commercial implication:** supports subscription, platform licensing, or productized service margins.

**Maintenance implication:** changes require versioning, migrations, regression evaluation, and backward-compatibility decisions.

### 6.2 Configurable Customer Workflow

**Purpose:** Adapt the core to a company’s operating model without bespoke software development.

Configurable elements may include:

- Source systems.
- Workflow stages and module use.
- Roles and owners.
- Decision criteria.
- Review thresholds.
- Action-gate triggers.
- Artifact templates.
- Dashboard fields and views.
- Reporting cadence.
- Terminology and taxonomy.
- Model routing and allowed providers.
- Data-retention and access rules.

**Commercial implication:** implementation/configuration fee, onboarding package, or higher service tier.

**Maintenance implication:** configuration must be versioned, testable, exportable, and separated from core code.

### 6.3 Limited Custom Integration or Logic

**Purpose:** Handle requirements that cannot be solved through configuration.

Appropriate custom work:

- Nonstandard source connectors.
- Enterprise identity or security integration.
- Proprietary rules or regulated approval logic.
- Legacy system adapters.
- Customer-specific data transformations.
- Contractually required deployment or isolation patterns.

Custom work should require:

- Clear boundary and acceptance criteria.
- Separate statement of work.
- Reuse assessment.
- Maintenance owner.
- Upgrade compatibility plan.
- Margin and support review.

**Commercial implication:** premium fixed-scope implementation, not unlimited custom development.

---

## 7. Data Ingestion and Source Model

### Current implementation

- File-based Markdown and CSV inputs.
- Manual source selection.
- Manual prompt context assembly.
- Source lists embedded in outputs.
- Static source paths in portal data.
- No automated ingestion, parsing, chunking, access controls, or continuous synchronization.

### Intended source types

- Markdown, text, PDF, DOCX, spreadsheets, and CSV.
- GitHub issues, pull requests, releases, and code metadata.
- Product requirements and design decisions.
- Project-management systems.
- Analytics and metric exports.
- User research, feedback, support tickets, and client inputs.
- Legal, privacy, launch, and marketing materials.
- Meeting/status notes where authorized.

### Proposed information chain

```text
Source
  → Chunk
  → Fact
  → Claim
  → Insight
  → Decision
  → Artifact
```

| Layer | Definition | Minimum controls |
|---|---|---|
| Source | Original file, record, issue, event, or message | Source ID, owner, location, timestamp, sensitivity, access |
| Chunk | Addressable segment of a source | Source pointer, boundaries, parser version, checksum |
| Fact | Directly supported statement | Citation, confidence, timestamp, validity window |
| Claim | Derived or asserted statement | Supporting facts, inference label, author/model, confidence |
| Insight | Pattern or interpretation across claims | Evidence set, alternatives, contradictions, caveats |
| Decision | Human-owned choice or recorded status | Decision owner, date, options, rationale, impact, reversibility |
| Artifact | Review or execution deliverable | Source state version, template version, status, reviewer, expiry |

### Required metadata

- Stable IDs.
- Project and tenant reference when applicable.
- Source type and system.
- Owner and access group.
- Created and modified timestamps.
- Ingestion timestamp.
- Version or checksum.
- Sensitivity/data classification.
- Provenance pointer.
- Confidence and inference type.
- Validity or freshness window.
- Conflict state.
- Review state.

### Conflict and missing-data handling

The system should:

- Preserve conflicting facts rather than selecting one silently.
- Identify source authority and recency.
- Request a human decision when conflict affects commitment-sensitive use.
- Label missing critical fields.
- Prevent unsupported defaults from becoming facts.
- Carry unresolved caveats into downstream artifacts.

### Access controls

Before real data is connected, define:

- Data classes allowed for each model/provider.
- Redaction and minimization rules.
- User and role permissions.
- Tenant/project isolation.
- Retention and deletion.
- Export and audit rights.
- Restrictions on external sharing.

---

## 8. Structured Project State

The following is a **proposed minimal entity model**, not a finalized production schema.

| Entity | Purpose | Illustrative key fields | Relationships | Update logic | Human ownership |
|---|---|---|---|---|---|
| Project | Root workstream context | ID, name, stage, objective, status, owner | Contains all entities | Manual creation; controlled updates | Founder/PM |
| Source | Registered evidence origin | ID, type, URI/path, owner, sensitivity, timestamps | Produces chunks/facts | Connector/file update | Source owner |
| Fact | Directly supported information | ID, statement, citation, confidence, freshness | Supports claims/requirements/risks | Re-extract on source change | Domain reviewer |
| Requirement | Product or program need | ID, type, priority, status, acceptance criteria, source | Links facts, decisions, milestones, artifacts | Versioned change | PM, RD/UX/QA reviewers |
| Decision | Human-owned choice | ID, status, owner, options, rationale, date, reversibility | Affects requirements, roadmap, risks | Human record only | Decision owner |
| Risk | Threat or uncertainty | ID, severity, probability, trigger, mitigation, owner | Links dependencies/milestones/decisions | Source updates + review | Risk owner |
| Dependency | Required external/internal condition | ID, owner, needed-by, status, affected items | Links milestones, requirements, risks | Event/change-based | Dependency owner |
| Milestone | Time-bound delivery point | ID, date, status, evidence, owner | Groups requirements/issues/risks | Schedule updates | PGM/RD/PM |
| Metric | Quantitative signal | ID, definition, value, period, source, quality | Supports outcomes/decisions | Scheduled or event update | Data owner |
| Owner/Role | Accountability | ID, role, scope, permissions | Assigned to entities/reviews | Admin/manual | Organization owner |
| Review Record | Owner review state | ID, module/artifact, status, reviewer, caveat, date | Gates artifacts/decisions | Human action | Module owner |
| Approval/Action Gate | Commitment control | ID, trigger, blocked use, required owner, state | References reviews and decisions | Policy + human record | Decision owner |
| Artifact | Versioned output | ID, type, template, state version, status, reviewer | Derived from state and sources | Regenerate on affected changes | Artifact owner |
| Workflow Run | Execution history | ID, workflow version, inputs, outputs, model, cost, status | Produces agent outputs/artifacts | Each run | System; reviewed by operator |
| Agent Output | Intermediate model result | ID, node, model, prompt/version, confidence, citations | Feeds checks/state/artifacts | Per node execution | Node owner/reviewer |
| Feedback | User review or correction | ID, target, category, comment, action | Updates evaluation/rework | Human input | User/reviewer |
| Change Event | Source or state change | ID, entity, before/after, time, actor | Triggers impact analysis | System/manual | Audit owner |

### State-design rules

- Stable facts and decisions should not be recopied into twelve independent module datasets.
- Module views should be derived from a shared canonical state.
- Human decisions must remain distinct from model recommendations.
- State writes must be auditable and reversible where possible.
- Artifacts should record the state and source versions from which they were generated.

---

## 9. Workflow and Agent Architecture

### Business workflow stages

The 12 canonical modules remain the business workflow. They may be grouped for execution as:

1. **Discovery:** Modules 1–3.
2. **Decision:** Modules 4–5.
3. **Definition:** Module 6.
4. **Program governance:** Module 7.
5. **Cross-functional alignment:** Module 8.
6. **Validation:** Module 9.
7. **Launch readiness:** Module 10.
8. **Operating cadence:** Module 11.
9. **Post-launch learning:** Module 12.

### Agent architecture principle

Do not equate each module with a separate autonomous agent. Use a smaller set of reusable workflow nodes that operate on shared project state.

### Proposed node set

| Node | Input | Output | Tools | State read/write | Evaluation | Human point | Failure handling |
|---|---|---|---|---|---|---|---|
| Intake and normalization | Authorized files/events | Registered sources, metadata, normalized records | Parsers, connectors, schema validators | Read sources; write source/chunk records | Parse accuracy, required-field coverage | Confirm source scope and classification | Quarantine unsupported/corrupt input |
| Extraction and classification | Chunks | Facts, requirements, risks, owners, dates | Structured extraction model, rules | Read chunks; write candidate entities | Citation accuracy, schema validity | Review low-confidence/high-impact items | Mark uncertain; do not promote to fact |
| Evidence synthesis and conflict detection | Facts and claims | Themes, contradictions, missing data | Retrieval, deterministic comparison, reasoning model | Read facts; write claims/insights/conflicts | Source recall, conflict precision | Resolve material contradictions | Preserve alternatives and block validated use |
| Decision support | Insights, constraints, criteria | Options, tradeoffs, recommendation, decision request | Scoring rules, reasoning model | Read state; write recommendation only | Rationale coverage, calibration, usefulness | Human records decision | No automatic commitment; return to evidence |
| Artifact generation | Approved/reviewed state plus template | Draft artifact with citations and status | Template renderer, model for narrative | Read state; write artifact version | Coverage, cross-artifact consistency, unsupported claims | Owner reviews artifact | Rework, block, or regenerate affected sections |
| Governance and quality review | Outputs, policies, review records | Validation results, gate state, escalation | Deterministic validators, independent model, policy engine | Read all; write checks/gate status | False-negative/positive rate, policy compliance | Decision owner handles gate | Block commitment-sensitive use |
| Change impact and targeted rerun | Change events and dependency graph | Affected entities, modules, artifacts, rerun plan | Dependency graph, rules | Read history; write impact/run plan | Missed-impact rate, unnecessary reruns | Human approves high-impact rerun | Fall back to broader rerun with warning |

### Deterministic versus model-based logic

**Prefer deterministic logic for:**

- IDs and versions.
- Schema validation.
- Required fields.
- Source-path resolution.
- Status transitions.
- Gate enforcement.
- Dependency calculations when explicit.
- Artifact template assembly.
- Diffing and audit logs.

**Use model reasoning for:**

- Classification of unstructured inputs.
- Evidence synthesis.
- Conflict explanation.
- Option comparison.
- Draft recommendations.
- Narrative generation.
- Detection of missing context not captured by rules.

---

## 10. Human Governance

### Current approved model

- Every module requires an owner review record before the output is treated as reviewed.
- Allowed statuses:
  - Accepted for downstream draft use.
  - Accepted with caveats.
  - Blocked pending input.
  - Blocked pending decision.
  - Rework required.
- Review does not automatically equal approval.
- Downstream drafting may continue with visible caveats unless an action gate blocks commitment-sensitive use.
- High-quality AI output does not equal an approved artifact.

### Action gates

Action gates may block:

- Investment commitment.
- Resource allocation.
- Committed scope.
- Build-ready PRD use.
- Engineering execution.
- External messaging or customer sharing.
- QA sign-off.
- Launch approval and rollout.
- Risk acceptance.
- Official status communication.
- Scale, pause, rollback, reframe, or roadmap reprioritization.

### Governance requirements for the operational product

| Requirement | Intended behavior |
|---|---|
| Decision ownership | Each commitment-sensitive decision has an accountable role. |
| Confidence thresholds | Low-confidence, high-impact outputs require review or remain blocked. |
| Source review | Reviewers can inspect cited evidence and freshness. |
| Override capability | Humans can correct, reject, or supersede model output with rationale. |
| Audit trail | Changes, reviews, decisions, and workflow runs are immutable or versioned. |
| Rerun logic | Reruns preserve prior versions and identify changed evidence. |
| Irreversible actions | External sending, launch, resource commitments, or destructive writes require explicit human action outside model generation. |
| Output labeling | Model-generated, inferred, human-reviewed, and approved states remain distinct. |
| Escalation | Unresolved high-impact issues route to a named decision owner. |

---

## 11. Dashboard System

Dashboards should render from schema-defined state, not arbitrary LLM-generated layouts.

| Dashboard | Intended user | Data source | Key components | Refresh logic | Drill-down | Success criteria |
|---|---|---|---|---|---|---|
| Founder/Executive Control Tower | Founder, executives | Project state, milestones, decisions, risks, metrics | Health, major changes, decisions needed, top risks, next milestones | Daily or event-based; weekly summary | To source, owner, artifact, decision | Accurate, low-noise, action-oriented |
| Product Health | PM, product lead | Metrics, feedback, requirements, experiments | KPI trend, feedback themes, assumptions, outcomes | Scheduled metric/feedback refresh | Metric definition, cohort, source | Detect meaningful change without overclaiming causality |
| Roadmap and Scope | PM, leadership | Decisions, requirements, capacity, dependencies | Priorities, committed/candidate scope, rationale, change history | On approved decision or source change | To decision and evidence | No stale committed scope |
| Program Execution | PGM, RD, QA | Milestones, issues, dependencies, risks | Status, blockers, critical path, owner, due date | Event-based | To issue/source/owner | Earlier blocker detection and clear accountability |
| Decisions | PM, PGM, leadership | Recommendations and human records | Pending, decided, superseded, rationale, reversibility | On review/decision event | To evidence/options/impact | Reduced lost decisions and faster turnaround |
| Launch Readiness | PM, PGM, QA, RD, Support, Legal | Requirements, QA, risks, support, legal, rollout | Readiness gaps, gates, owners, evidence, known limitations | On affected source changes | To source and review record | No false “ready” state; critical gaps visible |
| Artifact Library | All roles | Versioned artifacts and source state | Status, version, owner, freshness, source coverage | On regeneration/review | To sections and citations | Users know which version is authoritative |
| Agent/Workflow Activity | Operator, engineering | Workflow runs, models, errors, cost | Run status, node output, failure, latency, cost | Real time or per run | To logs and state diff | Debuggable, auditable, cost-visible |
| Reviews Required | Owners, decision makers | Review records and action gates | Pending reviews, blockers, due dates, affected uses | Event-based | To output, evidence, policy | Review work is actionable, not ceremonial |

---

## 12. Artifact System

| Artifact | Input data | Template/schema | Provenance | Human review | Approval posture | Versioning/regeneration |
|---|---|---|---|---|---|---|
| Project overview | Context, objectives, stakeholders, constraints | Project overview schema | Source links for material facts | PM owner | Review-ready, not approved by generation | Regenerate when core context changes |
| Product brief | Problems, evidence, users, strategy, constraints | Product brief schema | Facts and hypotheses separated | PM/PM Lead | Strategy requires human decision | New version on strategic change |
| PRD / feature brief | Approved scope, requirements, constraints, UX/QA inputs | Requirement and acceptance-criteria schema | Requirement-level sources | PM, RD, UX, QA | Build use requires action gate clearance | Targeted section regeneration |
| Decision log | Options, recommendation, decision record | Decision schema | Evidence and rationale | Decision owner | Human record is authoritative | Append/version; never overwrite history |
| Risk register | Risks, triggers, dependencies, mitigations | Risk schema | Source and detection method | Risk owner | Risk acceptance separate | Update on change event |
| Dependency register | Cross-team/system dependencies | Dependency schema | Source issue/milestone | PGM/owner | Commitment depends on owner confirmation | Event-based update |
| Roadmap | Decisions, requirements, outcomes, capacity | Roadmap item schema | Decision and evidence links | PM Lead/leadership | Commitment requires human decision | Versioned after approved changes |
| Executive weekly status | State changes, milestones, risks, decisions | Executive status schema | Drill-down links | PGM/founder | Official distribution requires review | Weekly snapshot plus diff |
| Launch-readiness review | QA, risks, support, legal, rollout | Readiness/gate schema | Requirement and evidence links | PM, PGM, QA, RD, Support, Legal | Go/no-go remains human decision | Regenerate on material change |
| Post-launch report | Metrics, feedback, incidents, expected outcomes | Outcome-review schema | Metric/source definitions | PM, Data, Research | Scale/pause/rollback requires decision | Periodic and event-based |

### Artifact rules

- Every artifact records template version, state version, source set, generation time, model/tool, reviewer, and status.
- Derivative exports never become more authoritative than the source artifact.
- Regeneration should update only affected sections where feasible.
- Human edits must be preserved or explicitly reconciled during reruns.

---

## 13. Evaluation Framework

### Existing evaluation evidence

- Synthetic AI Voice Assistant case.
- Twelve module outputs.
- Module-level historical scorecard.
- Overall historical score: 4/5.
- Average module score: 3.9/5.
- Human review of artifacts, governance, and consistency.
- Evaluation backlog.

### Evaluation dimensions

| Dimension | Definition | Initial method |
|---|---|---|
| Fact accuracy | Claims match the source | Human sample review + deterministic citation checks |
| Source attribution | Material claims include valid provenance | Path/ID validation and reviewer scoring |
| Requirement coverage | Required information is represented | Schema checklist against sources |
| Hallucination rate | Unsupported claims are introduced | Golden-set comparison and human review |
| Conflict detection | Contradictory sources are surfaced | Seeded conflicts + precision/recall review |
| Missing critical information | Important gaps are identified | Known-missing test cases and reviewer scoring |
| Decision-support usefulness | Options/tradeoffs improve human decision work | User rating, decision time, override analysis |
| Artifact consistency | Artifact follows schema and status rules | Automated validation |
| Cross-artifact consistency | Shared facts and decisions remain aligned | Entity/version comparison |
| Workflow completion | Required stages execute and preserve state | Run-state validation |
| Human override rate | Humans correct or reject recommendations | Review logs; interpret by severity, not as a raw success metric |
| Time saved | Effort compared with baseline | Time study before/after |
| User trust | Confidence in accuracy and control | Structured user survey/interview |
| Cost | Model, infrastructure, integration, and human review cost | Per-run and per-project accounting |
| Latency | Time to update state and produce outputs | Node and end-to-end timing |

### Evaluation assets to build

- Twinko baseline workflow records.
- Golden source packets with expected facts, conflicts, and missing fields.
- Expected artifact schemas.
- Human scoring rubrics.
- Independent technical validators.
- Model/provider regression set.
- Change-impact and targeted-rerun test cases.
- Security and access-control tests before external pilots.

### Known gaps

- No real-data benchmark.
- No independent customer scoring.
- No automated source/path validator.
- No provider comparison.
- No cost or latency baseline.
- No long-running workflow failure tests.
- No security or tenant-isolation tests.

---

## 14. Twinko Dogfooding Plan

### Objective

Validate one recurring PM/PGM workflow using real, authorized Twinko inputs while preserving source traceability and human accountability.

### Recommended first slice

**Weekly product/program control loop.**

```text
Authorized sources
→ normalized project updates
→ risks / dependencies / decisions needed
→ dashboard state
→ weekly founder report
→ owner review
→ changed-source rerun
```

### Potential Twinko inputs

- Product requirements.
- Design decisions.
- GitHub issues and pull-request/release state.
- Development status.
- Bugs.
- Launch risks.
- Legal/privacy requirements.
- Marketing and launch plans.
- User feedback.
- Analytics when available.
- Founder and team status notes.

### Expected outputs

- Project overview/status.
- Milestone and dependency view.
- Risk register.
- Decision log and decisions-needed list.
- Weekly founder report.
- Selected roadmap/backlog update.
- Review record and caveats.
- Source-change diff.

### Baseline process

Before running the tool, record:

- How the report is currently produced.
- Time spent collecting, reconciling, writing, and reviewing.
- Number of source systems and manual copy steps.
- Missing or conflicting information.
- Number of corrections after distribution.
- Decision turnaround time.
- Founder confidence in accuracy and completeness.

### Dogfood metrics

| Metric | What it measures |
|---|---|
| Preparation time | Efficiency versus baseline |
| Source coverage | Whether critical inputs were included |
| Unsupported claim rate | Accuracy and hallucination control |
| Conflict recall | Ability to surface inconsistent information |
| Human correction rate | Quality and trust calibration |
| Decision-needed precision | Whether escalation is useful and not noisy |
| Report usefulness | Founder/PM/PGM rating |
| Rerun effort | Ability to update after source changes |
| Traceability success | Percentage of material claims with valid provenance |
| Governance compliance | Correct review and gate behavior |
| Cost and latency | Operational feasibility |

### Failure cases to test

- Missing owner.
- Conflicting status between GitHub and notes.
- Stale milestone date.
- Risk severity disagreement.
- Sensitive information not allowed for an external model.
- Unsupported source format.
- Human correction after artifact generation.
- Source change that affects only one artifact.
- Model failure or timeout.
- Attempted external distribution without review.

### Evidence levels

1. **Internal usefulness:** Twinko users find the output accurate and valuable.
2. **Product validation:** The workflow works repeatedly, updates correctly, and reduces effort or improves decision quality.
3. **Commercial validation:** Independent external customers adopt and pay under repeatable terms.

Twinko can support levels 1 and 2. It cannot alone prove level 3.

---

## 15. Technical Architecture

### Current architecture — confirmed

| Layer | Current state |
|---|---|
| Source | Repository files and synthetic data |
| Workflow | Manual prompt execution in Cursor/ChatGPT-assisted workflow |
| State | Distributed across Markdown, CSV, outputs, and static TypeScript mirrors |
| Governance | Markdown governance map and static portal representation |
| Artifacts | Markdown outputs plus Excel/PPT/PDF exports |
| Frontend | Static Next.js/React/TypeScript/Tailwind portal |
| Hosting | Vercel-compatible static deployment |
| Backend | None |
| Database | None |
| Auth/permissions | None |
| Connectors | None |
| Observability | Build/dev logs only |

### Proposed architecture — working direction

```text
Source connectors / file intake
        ↓
Parsing + normalization
        ↓
Canonical PostgreSQL project state
        ↓
Workflow orchestration and change-impact graph
        ↓
Model/rule nodes + independent validators
        ↓
Human review records and action gates
        ↓
Schema-driven dashboards and versioned artifacts
        ↓
Exports, notifications, and approved external actions
```

| Component | Candidate | Decision state | Validation needed |
|---|---|---|---|
| Frontend | Review existing Next.js base; evolve only if requirements fit | Working direction | Operational dashboard UX, auth, state loading, deployment |
| Backend/API | Supabase services or separate API layer | Working direction | Security, portability, scale, vendor boundary |
| Database | PostgreSQL | Working direction | Minimal entity model, migrations, audit pattern |
| Orchestration | LangGraph | Working direction | Stateful resumability, human gates, error recovery, complexity |
| File storage | Supabase or portable object storage | Working direction | Access controls, retention, export |
| Retrieval | SQL first; pgvector only where needed | Working direction | Concrete semantic retrieval use cases |
| Model layer | Task-based routing across providers | Working direction | Accuracy, privacy, latency, cost, structured output reliability |
| Automation | n8n for triggers/integrations/notifications | Working direction | Versioning, failure handling, state authority |
| Authentication | Supabase Auth or alternative | Not started | Role model and customer requirements |
| Permissions | Project/role/tenant policies | Not started | Data classes and workflow roles |
| Logging/observability | Run, node, model, cost, state diff, error logs | Not started | Operational and privacy requirements |
| Testing | Schema, unit, integration, golden-set, regression, security | Not started | Independent evaluation design |
| Multi-tenancy | Tenant-isolated configuration and data | Not approved | External customer requirements |

### Portability requirements

- Repository-owned code and config.
- Standard data exports and migrations.
- Provider adapters rather than model-specific business logic.
- External project state rather than orchestration-internal truth.
- Versioned n8n or automation flows if used.
- Fresh-clone build and test.
- Migration acceptance tests.
- No critical decisions stored only in AI chat history.

---

## 16. Tool-Assisted Build Workflow

All tools are collaborators under human and repository control; none should become an undocumented source of truth.

| Tool | Intended role | Must not own | Human checkpoint |
|---|---|---|---|
| ChatGPT 5.6 | Product strategy, architecture reasoning, cross-file consolidation, evaluation design, prompts, structured specifications | Final business/technical decision, unreviewed code merge | Founder approves product and architecture decisions |
| ChatGPT Work | Long-form cross-file workflows where useful | Private state not exported to repository | Review source coverage and outputs |
| Claude Code with Fable | Preferred implementation experiment for repo-wide coding, migration, tests, and refactors | Unreviewed architecture changes or direct production release | Plan review, branch review, test evidence |
| Cursor | Day-to-day repository work, targeted edits, interactive debugging | Permanent context or decisions trapped in chats | Changes reviewed in Git diff |
| GitHub | Source control, pull requests, release history, issues | Product truth that is absent from canonical state/docs | Branch/PR/release controls |
| LangGraph | Candidate workflow orchestration and resumable state-machine logic | Canonical business data trapped only in graph internals | Architecture and failure-mode review |
| Supabase/PostgreSQL | Candidate structured state, files, auth, and permissions | Vendor-only schema with no export/migration path | Data model, security, migration review |
| n8n | External triggers, SaaS integrations, notifications | Core reasoning or undocumented business rules | Flow review and failure handling |
| Codex or independent agent | Code review, tests, security/quality challenge, independent evaluation | Silent auto-approval of generated implementation | Human resolves findings and conflicts |

### Repository-control rules

- Work on branches or worktrees.
- Preserve a known-good release tag.
- Require diffs and test evidence.
- Record architecture decisions in ADRs/decision log.
- Do not allow agents to change canonical governance or module identities without explicit approval.
- Separate generation, implementation, and evaluation roles where practical.
- Keep secrets outside the repository.
- Preserve rollback.

### Resolving model conflicts

1. Compare source evidence and requirements.
2. Prefer deterministic tests and canonical files over model assertions.
3. Ask an independent agent for review when material.
4. Escalate unresolved product/architecture tradeoffs to the founder.
5. Record the final human decision and rationale.

---

## 17. Security, Legal, Privacy, and Trust

### Before Twinko real-data use

Define:

- Data classification: public, internal, confidential, restricted, personal, regulated.
- Which classes may be processed by each provider/tool.
- Redaction, minimization, and pseudonymization.
- Retention and deletion.
- Access roles and least privilege.
- Audit logs.
- Source ownership and customer data ownership.
- Human approval before external communication or irreversible actions.

### External customer requirements to anticipate

| Area | Requirement direction |
|---|---|
| Confidentiality | NDA and clear permitted-use terms |
| Data processing | Data Processing Agreement where applicable |
| Service scope | Master Service Agreement and fixed Statement of Work |
| Data ownership | Customer retains source data; derived artifacts and reusable IP boundaries defined |
| AI disclosure | Explain where AI is used, reviewed, and limited |
| Provider usage | List subprocessors/models and retention/training terms |
| Access control | Role and tenant isolation |
| Auditability | Source, model, run, review, and decision history |
| Liability | Boundaries for recommendations, decisions, and external actions |
| Intellectual property | Ownership of customer-specific config versus reusable platform IP |
| AI-generated artifacts | Draft/review labels and accountable human approval |
| Security | Encryption, secrets management, backups, incident response, vulnerability management |

### Trust principles

- No hidden autonomous commitments.
- No unsupported claims presented as facts.
- No customer-facing output without the required review.
- Clear distinction among model output, human-reviewed output, and approved decision.
- Correctability and version history.
- Visible source freshness and confidence.

---

## 18. Commercialization Model

All pricing structures below are hypotheses. No numeric price should be fixed before interviews and pilot evidence.

| Stage | Customer | Offer | Deliverables | Typical duration hypothesis | Inputs | Human effort | Reusable IP | Pricing hypothesis | Success criteria | Main risks | Transition condition |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Workflow Diagnostic | Product/program team with visible operating pain | Map current workflow, data, governance, and opportunities | Current-state map, pain/risk assessment, target-state blueprint, pilot recommendation | 1–3 weeks | Interviews, docs, tools, sample artifacts | High consulting effort | Diagnostic framework, maturity model | Fixed-fee diagnostic | Clear high-value workflow and quantified baseline | Becomes generic consulting; no implementation path | Customer approves a bounded pilot |
| Implementation Pilot | Design partner with one priority workflow | Configure and run one end-to-end workflow | Data contract, configured workflow, artifacts/dashboard, governance, evaluation | 4–8 weeks | Authorized sources and owners | High but bounded | Connectors, schemas, templates, eval cases | Fixed-fee pilot plus usage/infrastructure pass-through | Repeatable runs, measurable value, user trust | Integration/security overruns | Repeat use and willingness to continue |
| Productized Service | Teams needing ongoing managed workflow | Recurring workflow operation with standardized service levels | Regular reports, artifacts, reviews, support, improvements | Monthly/quarterly | Ongoing source access | Medium recurring human effort | Standard operating playbook and configurations | Setup fee + recurring retainer/license | Retention, lower delivery effort, repeatable margins | Human support burden and customization drift | Multiple customers use similar configuration |
| Configurable Platform / SaaS | Teams with recurring self-service needs | Software for configurable state, workflows, reviews, dashboards, artifacts | Platform access, templates, connectors, support tiers | Annual/monthly | Customer-managed sources/config | Lower marginal effort if product works | Core platform and marketplace/templates | Subscription + implementation; usage tiers as needed | Product adoption, retention, healthy gross margin | Security, procurement, multi-tenancy, support | Product-market and unit-economic evidence |

---

## 19. Customer Implementation Model

### Implementation sequence

1. Qualification.
2. Discovery.
3. Current-state workflow mapping.
4. Data and tool audit.
5. Criteria and governance definition.
6. Target-state design.
7. Configuration.
8. Limited integration.
9. Testing and evaluation.
10. Human-governance setup.
11. Pilot.
12. Measurement.
13. Rollout decision.
14. Support and improvement.

### Standardized versus configurable versus custom

| Area | Standardized | Configurable | Custom only when required |
|---|---|---|---|
| Source/provenance schema | Yes | Field mappings | Proprietary source adapter |
| Project-state entities | Yes | Optional fields/taxonomy | Regulated or legacy entity needs |
| Governance statuses and audit | Yes | Roles, thresholds, gates | Legally mandated workflow |
| Artifact engine | Yes | Templates, terminology, sections | Specialized regulated output |
| Dashboard framework | Yes | Views, filters, KPIs | Unique visualization/integration |
| Evaluation framework | Yes | Customer-specific golden cases and thresholds | Specialized benchmark tooling |
| Integrations | Common connectors | Credentials, mappings, cadence | Unsupported legacy system |
| Security | Core controls | Policies and roles | Customer-specific deployment/isolation |

### Customer-fit guardrail

Decline or separately price work when:

- The requested functionality does not strengthen reusable IP.
- The customer cannot define owners or success criteria.
- The data cannot be accessed safely.
- The pilot requires a full platform rebuild.
- The customer expects autonomous approval or liability transfer.
- Ongoing support cost is likely to exceed revenue.

---

## 20. Business Model and Unit Economics

### Revenue options

- Fixed-fee workflow diagnostic.
- Fixed-fee implementation pilot.
- Configuration/onboarding fee.
- Productized managed-service retainer.
- Platform subscription.
- Usage-based model/infrastructure pass-through or tiering.
- Premium connectors, security, deployment, or support.
- Template/vertical packages where repeatable.

### Cost drivers

- Founder/consultant discovery and implementation time.
- Customer-specific integration work.
- Model inference and evaluation calls.
- Parsing and storage.
- Hosting and observability.
- Security/compliance work.
- Human review and support.
- Regression testing across customer configurations.
- Sales and procurement cycle.

### Gross-margin risks

- Unbounded customization.
- Heavy manual cleanup of customer data.
- High model usage without task routing.
- Too many one-off connectors.
- Enterprise security obligations before sufficient revenue.
- Managed-service support masquerading as SaaS.
- Customer-specific prompts and logic that cannot be upgraded centrally.

### Unit-economic evidence required

Track per diagnostic/pilot/customer:

- Sales effort.
- Discovery hours.
- Configuration and integration hours.
- Review/support hours.
- Model and infrastructure cost.
- Time to first value.
- Reuse percentage.
- Renewal/continuation.
- Customer-reported value.

No margin, price, or scalability claim is validated yet.

---

## 21. Product Risks and Dependencies

| Category | Risk | Mitigation direction |
|---|---|---|
| User adoption | Users may not trust or change workflow behavior | Start with high-pain recurring output; show sources and correction controls |
| Data quality | Inputs may be stale, incomplete, contradictory, or inaccessible | Provenance, freshness, conflict states, missing-data gates |
| Model reliability | Extraction or synthesis may be wrong | Structured outputs, low-confidence review, independent checks |
| Hallucination | Unsupported claims may enter artifacts | Citation requirements, claim classification, golden tests |
| Integration complexity | Each customer may use different tools and permissions | Standard connector contracts, limited pilot sources, custom-work guardrails |
| Security/privacy | Product may process sensitive product, user, legal, or commercial data | Data classification, provider policy, least privilege, tenant isolation |
| Legal/liability | Customers may rely on generated recommendations | Contractual boundaries, human approvals, audit trail |
| Cost | Model and human review costs may exceed value | Model routing, deterministic logic, per-run cost tracking |
| Latency | Connected workflows may be too slow for recurring use | Async runs, incremental updates, performance SLOs |
| Workflow rigidity | Standardization may fail to match customer operating models | Configuration layer and modular templates |
| Excessive customization | Services work may overwhelm product development | Fixed boundaries, reusable-IP review, pricing discipline |
| Lack of external validation | Internal success may not translate to a market | Design partners, interviews, paid pilots |
| Founder capacity | One founder may become bottleneck across product, delivery, and sales | Narrow scope, staged hiring/partners, reusable playbooks |
| Twinko dependency | Product may overfit one internal case | Preserve generic schema and add a second external case |
| Third-party tools | Editors, models, orchestration, backend, or hosting may change | Portability, adapters, exports, migration tests |
| Source drift | Markdown, database, portal, and exports may diverge | Canonical state, generated manifests, validation |
| Evaluation leakage | Same model may generate and score | Independent agents, deterministic checks, human scoring |

---

## 22. Decisions Already Made

The full decision register is maintained in `PM_WORKFLOW_DECISION_LOG.md`. The most important approved decisions are:

1. The product is a reusable AI-native PM/PGM workflow and decision-support system.
2. The AI Voice Assistant is a synthetic sample case only.
3. The 12 canonical modules remain stable.
4. Markdown is the current source of truth; portal and exports are derivative.
5. The current portal is static, not operational.
6. All modules require owner review records.
7. Action gates block commitment-sensitive use, not all downstream drafting.
8. Twinko is the first internal dogfood, not external validation.
9. The commercial architecture is standardized core + configurable workflow + limited custom implementation.
10. Cursor and v0 are current tools, not permanent dependencies.
11. The next phase should validate one small real workflow rather than rebuild everything.
12. The existing v1 baseline should be preserved as evidence.

---

## 23. Open Decisions

| Question | Why it matters | Options | Information required | Recommended deadline | Can Twinko help? |
|---|---|---|---|---|---|
| What is the first dogfood slice? | Defines data, architecture, users, and evaluation | Weekly control loop; requirement-to-backlog; feedback-to-roadmap; launch readiness | Pain, frequency, source access, baseline, owner | Immediate | Yes |
| Which sources are authorized? | Real data cannot be processed safely without boundaries | Public/internal only; redacted confidential; provider-specific rules | Data classification, provider terms, owner consent | Before ingestion | Yes |
| File-based or database first? | Determines speed versus state capability | File manifests; SQLite/local; PostgreSQL/Supabase | Change frequency, concurrency, audit, rerun needs | After source inventory | Yes |
| Is LangGraph necessary for v0.1? | Avoids premature orchestration complexity | Simple scripts/workflow; LangGraph spike | Required persistence, pauses, retries, human gates | During technical spike | Yes |
| Which model/tool routing is best? | Quality, cost, privacy, and control vary | ChatGPT/OpenAI; Claude; mixed; local where needed | Benchmark tasks and provider restrictions | During pilot | Yes |
| What is the minimal review UX? | Governance must be usable, not only documented | File records; simple form; dashboard queue | Users, cadence, audit need | Before second run | Yes |
| What counts as internal success? | Prevents subjective claims | Time, accuracy, completeness, trust, decision speed | Baseline and thresholds | Before first run | Yes |
| Which ICP should be tested first? | Focuses interviews and design partners | Startup; AI team; hardware/platform; FinTech; transformation | Pain interviews, buyer access, security burden | After Twinko v0.1 | Partially |
| What pricing model is acceptable? | Determines pilot design and margins | Diagnostic, fixed pilot, retainer, subscription | Interviews, effort, cost, willingness to pay | Before external offer | No, not alone |
| What portability target is mandatory first? | Limits lock-in risk | Editor; coding agent; hosting; model; backend | Current dependency and migration cost | During v0.1 | Yes |
| Is self-hosting required? | Major architecture and support impact | No; enterprise option; core requirement | ICP/security evidence | After design partners | No |
| When is multi-tenancy justified? | Avoids premature enterprise architecture | After second customer; before SaaS; never for service | Customer count, isolation requirements | Later | No |

---

## 24. Immediate Execution Sequence

The sequence should optimize for learning, not architecture completeness.

| Step | Scope | Deliverable | Exit criterion |
|---:|---|---|---|
| 1 | Consolidation | These four master documents | Venture Studio has a consistent source of truth |
| 2 | Freeze v1 | Tagged/archived known-good synthetic baseline | Current proof-of-work is protected |
| 3 | Twinko dogfood scope | One-page workflow charter | User, sources, pain, outputs, owner, cadence, metrics approved |
| 4 | Source inventory and data policy | Source register and allowed-data matrix | First run has authorized inputs |
| 5 | Minimal data contract | Versioned schema for first slice | Sample sources normalize successfully |
| 6 | Structured state spike | File-based or PostgreSQL-backed minimal state | Facts, decisions, risks, owners, and versions persist |
| 7 | Thin workflow implementation | Intake → synthesis → report → review | One complete run with traceability |
| 8 | Dashboard and artifacts | Schema-driven status view and selected outputs | Same state drives both without manual duplication |
| 9 | Human governance | Review record and action-gate handling | Commitment-sensitive use is correctly blocked |
| 10 | Evaluation and rerun | Baseline comparison and changed-source rerun | Value, failures, cost, latency, and corrections are measured |
| 11 | Technical hardening | Tests, logging, fresh clone, portability check | Another tool/environment can reproduce the run |
| 12 | Architecture decision | Keep/change/reject record for LangGraph, Supabase, n8n, models | Decisions are based on evidence |
| 13 | External design-partner preparation | Sanitized demo, diagnostic, pilot scope, security questionnaire | Ready for interviews without overclaiming |
| 14 | Commercial package | Diagnostic and pilot offer with boundaries | Clear deliverables, pricing hypothesis, success criteria, and custom-work rules |

### Recommended near-term milestone

**Twinko Dogfooding Pilot v0.1: one real, recurring, traceable weekly product/program control loop with human review and a changed-source rerun.**

---

## Source Basis

Primary materials used:

- `README.md`
- `docs/project-log.md`
- `docs/workflow-definition.md`
- `docs/human-governance-map.md`
- `docs/human-in-the-loop-rules.md`
- `docs/source-to-output-map.md`
- `docs/workflow-runbook.md`
- Modules 1–12 outputs and the Module 5 checkpoint.
- `evaluation/module-quality-scorecard.md`
- `evaluation/workflow-quality-review.md`
- `evaluation/iteration-backlog.md`
- `case-study/project-summary.md`
- `case-study/future-roadmap.md`
- `demo-portal/README.md`
- `demo-portal/visual-portal-app/package.json`
- `demo-portal/visual-portal-app/lib/portal-data.ts`
- `demo-portal/visual-portal-app/lib/governance-data.ts`
- Master consolidation, Twinko, commercialization, tool-stack, and portability decisions from the Project conversation.
