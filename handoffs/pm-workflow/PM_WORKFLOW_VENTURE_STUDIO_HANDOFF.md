# PM Workflow Venture Studio Handoff

**Venture:** AI-Native Product Workflow Copilot  
**Destination:** Gina AI-Native Venture Studio  
**Status date:** 2026-07-11  
**Purpose:** Portfolio-level handoff for cross-venture planning, resource allocation, and next-step integration

> **Core principle:** AI may recommend. Humans decide.

## Venture Summary

The AI-Native Product Workflow Copilot is an emerging AI-native PM/PGM workflow and decision-support system. Its intended value is to transform fragmented product and program inputs into structured project state, traceable decisions, visible risks and dependencies, role-specific dashboards, and review-ready execution artifacts.

The current version proves the workflow concept using a synthetic AI Voice Assistant case. It is not yet a connected operational product or commercially validated platform.

## Current Product Stage

**Reusable workflow and artifact MVP with static review portal.**

Current assets include:

- Twelve canonical PM/PGM workflow modules.
- Synthetic source pack and reusable prompts.
- Twelve module outputs plus one recorded scope checkpoint.
- Canonical human-governance map.
- Historical 4/5 workflow evaluation and 3.9/5 module average.
- Excel, PowerPoint, and PDF review exports.
- Static Next.js review/demo portal.

Not currently implemented:

- Real-data ingestion.
- Persistent project state.
- Live workflow orchestration.
- Backend, auth, permissions, or multi-tenancy.
- Automated reruns and change detection.
- External customer operation.

## Current Commercial Stage

**Pre-validation; preparing internal Twinko dogfooding.**

No external customer adoption, willingness to pay, pricing, revenue, or repeatable unit economics has been validated.

## Strategic Role in the Venture Studio

This venture can serve three strategic functions:

1. **Operating layer for Twinko:** convert real product and program activity into current state, risks, decisions, dashboards, and recurring reports.
2. **Reusable Venture Studio infrastructure:** provide a common PM/PGM control system for future ventures, while allowing each venture to configure sources, roles, criteria, governance, and reporting.
3. **Potential standalone commercial offer:** progress from workflow diagnostic to implementation pilot, productized service, and eventually a configurable platform if external evidence supports it.

The intended commercial architecture is:

- Standardized core.
- Configurable venture/customer workflow.
- Limited custom integration or logic.

It must not become an unlimited custom-software agency.

## Twinko Dogfooding Relationship

Twinko is the intended first internal customer and evidence-generation case.

Potential Twinko inputs:

- Requirements and feature backlog.
- Design decisions.
- GitHub issues, development status, and bugs.
- Risks, milestones, and dependencies.
- Legal/privacy requirements.
- Marketing and launch plans.
- User feedback and analytics.

Recommended first dogfood slice:

> **Weekly product/program control loop:** authorized source intake → structured current state → risks/dependencies → decisions needed → dashboard/report → owner review → changed-source rerun.

Twinko may validate internal usefulness and product mechanics. It must not be treated as complete external commercial validation.

## Current Seven-Day Objective

1. Upload and adopt the four PM Workflow master documents in the Venture Studio project.
2. Freeze the existing synthetic v1 as the known-good reference baseline.
3. Select one Twinko workflow slice.
4. Create the Twinko source inventory and data-classification boundary.
5. Draft the minimum project-state data contract.
6. Define baseline and success metrics.
7. Scope one thin technical spike using the new AI-assisted build workflow.

## Next Major Milestone

**Twinko Dogfooding Pilot v0.1 — one real, recurring, traceable workflow.**

Definition of milestone success:

- Controlled real Twinko sources.
- Minimal structured project state.
- Schema-driven status/dashboard and selected artifacts.
- Source provenance for material claims.
- Human review record and correct action-gate behavior.
- Changed-source rerun.
- Before-and-after measurement.
- Documented architecture/tool decisions.
- No external commercial claims based on internal dogfood alone.

## Shared-Team Needs

### Product and PM Operations

- Select the first dogfood slice.
- Define users, owners, cadence, pain, and outputs.
- Establish baseline process and evaluation rubric.
- Maintain the product and decision source of truth.

### UI/UX and Design

- Define the operational dashboard information architecture after the state schema is tested.
- Design review/caveat/gate states without implying automatic approval.
- Reuse the current portal visual language only where it supports real operational needs.
- Keep dashboards schema-driven rather than arbitrarily generated.

### Engineering

- Review the existing repository before changing frameworks.
- Build the smallest end-to-end path.
- Test file-based versus PostgreSQL-backed state.
- Evaluate LangGraph, Supabase, n8n, and model routing only against real requirements.
- Implement tests, logging, rollback, source provenance, and fresh-clone reproducibility.
- Preserve tool portability beyond Cursor and v0.

### Marketing and Growth

- Do not market the current MVP as production SaaS or commercial validation.
- Develop a clear problem/value narrative from Twinko evidence.
- Prepare sanitized proof of workflow quality and human governance.
- Identify design-partner interview targets after internal evidence exists.

### Sales and Consulting

- Define a bounded workflow diagnostic and implementation pilot.
- Specify standardized versus configurable versus custom work.
- Establish qualification and rejection criteria.
- Keep all pricing and willingness-to-pay assumptions labeled as hypotheses.

### Legal, Privacy, and Trust

- Define data classifications and allowed provider/tool use before Twinko ingestion.
- Clarify retention, redaction, access, audit, and deletion.
- Prepare NDA, MSA, SOW, DPA, IP, and AI-disclosure requirements for future external pilots.
- Preserve human responsibility for decisions and external actions.

### Finance and Operations

- Track founder/consulting time, model cost, infrastructure, integration effort, support burden, and reuse.
- Establish pilot-level cost accounting.
- Prevent custom work from hiding poor unit economics.

## Cross-Venture Dependencies

| Dependency | PM Workflow need | Venture Studio implication |
|---|---|---|
| Twinko source systems | Real requirements, GitHub, decisions, bugs, risks, metrics | Twinko must define owners, access, and data boundaries |
| Shared identity and data policy | Future access, permissions, provider rules | Develop Studio-wide minimum security and privacy policy |
| GitHub/repository standards | Version control, decision history, releases | Use common branch, review, ADR, and release conventions |
| Tool portfolio | ChatGPT, Claude Code/Fable, Cursor, Codex, LangGraph, Supabase, n8n | Define each tool’s role and prevent overlapping sources of truth |
| Evaluation discipline | Independent checks and baseline metrics | Reuse a Studio-wide evaluation and evidence standard |
| UI/design system | Schema-driven dashboard components | Reuse design primitives without forcing identical venture UI |
| Commercial services model | Diagnostic, pilot, productized service | Create shared consulting and contracting templates |

## Founder-Level Decisions Required

1. Approve the first Twinko dogfood slice.
2. Approve allowed data and model-provider boundaries.
3. Set the next seven-day founder time budget.
4. Decide whether the first spike is file-based or database-backed after source inventory.
5. Confirm the implementation/review protocol across ChatGPT, Claude Code/Fable, Cursor, GitHub, and independent review.
6. Define internal utility success criteria.
7. Decide which portability risk to test first.
8. Decide when external design-partner outreach may begin.

## Top Risks

1. Rebuilding a broad platform before validating one recurring workflow.
2. Choosing tools before defining data and user requirements.
3. Treating Twinko dogfood as market validation.
4. Allowing customer-specific work to overwhelm the reusable core.
5. Processing sensitive data without approved rules.
6. Letting key decisions remain in AI chats instead of repository records.
7. Maintaining multiple manual truths across Markdown, code, dashboards, and exports.
8. Founder capacity fragmentation across multiple ventures and career priorities.

## Current Resource Priorities

1. **Product definition:** first dogfood workflow and success criteria.
2. **Data:** source inventory, classification, and minimal contract.
3. **Engineering:** one thin implementation and portability test.
4. **Governance:** review records and action gates in the real workflow.
5. **Evaluation:** baseline, accuracy, trust, cost, and rerun evidence.
6. **Commercialization:** only after internal product evidence is produced.

## Tool and Platform Direction

Current tool choices are **working directions**, not approved permanent architecture:

- ChatGPT 5.6 / ChatGPT Work: product, architecture, reasoning, and evaluation support.
- Claude Code with Fable: preferred implementation experiment.
- Cursor: day-to-day repository work.
- GitHub: source control and release history.
- Codex or another independent agent: code/test review.
- LangGraph: orchestration candidate.
- Supabase/PostgreSQL: structured state/backend candidates.
- n8n: triggers, integrations, and notifications candidate.
- Existing Next.js portal: reusable code asset and presentation reference, not current operational frontend.

Cursor and v0 are not permanent product dependencies. Code, data, schemas, prompts, tests, and decisions must remain repository-owned and portable.

## Key Documents in the PM Workflow Project

Upload or reference these documents in the Venture Studio project:

1. `PM_WORKFLOW_PRODUCT_OPERATING_BRIEF.md` — full product, architecture, dogfood, and commercialization source of truth.
2. `PM_WORKFLOW_CURRENT_STATUS.md` — current stage, blockers, next seven-day priorities, and milestone.
3. `PM_WORKFLOW_DECISION_LOG.md` — approved, working, pending, superseded, and rejected decisions.
4. `PM_WORKFLOW_VENTURE_STUDIO_HANDOFF.md` — this portfolio-level handoff.
5. `docs/workflow-definition.md` — canonical 12-module workflow.
6. `docs/human-governance-map.md` — canonical governance source.
7. `docs/source-to-output-map.md` — existing traceability map.
8. `docs/project-log.md` — implementation history through Step 8C.
9. `evaluation/module-quality-scorecard.md` and `workflow-quality-review.md` — historical synthetic baseline.
10. Static portal URL or source package — reviewer-facing implementation evidence only.

## Studio Control-Tower Status

| Field | Status |
|---|---|
| Venture stage | Workflow/artifact MVP |
| Commercial stage | Pre-validation |
| First internal customer | Twinko — planned |
| Current evidence | Synthetic end-to-end workflow, governance, evaluation, exports, static portal |
| Next evidence | Real recurring Twinko workflow with baseline comparison |
| Immediate founder decision | Select dogfood slice and data boundary |
| Primary build risk | Overengineering before validation |
| Primary commercial risk | No external buyer or willingness-to-pay evidence |
| Primary governance rule | AI may recommend. Humans decide. |
