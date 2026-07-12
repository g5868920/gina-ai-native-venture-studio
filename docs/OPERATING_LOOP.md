# One-Person Company OS — Operating Loop Runbook

Version: 0.1.0
Status: **Active**
Authorized by: `decisions/approvals/0007-one-person-company-os-v1-reprioritization.md`
Document type: Living Operating Runbook
Initial activation reviewed by Gina on 2026-07-12.

This file is operational documentation under the bounded Studio-implementation authorization in Decision 0007 §6–7 (scope item S1). It is not itself a new reserved decision, a new canonical policy, or a supersession of any existing decision, contract, or skill. It does not modify `CLAUDE.md`, `constitution/AUTHORITY.md`, `governance/*.yaml`, any `executives/*` contract, or any `skills/*` SKILL.md — it only shows how those existing, already-approved structures are used together, in order, by one founder. "Active" means this runbook is now the operating reference for daily use — it does not mean every sentence in it individually carries its own separate Chairwoman approval.

**Living-document policy:** routine clarifications, path corrections, and tool-surface updates to this file do not require a new Chairwoman approval. A new approval is required only when a change would alter: authority boundaries; reserved-decision scope; repository ownership; approval flow; executive responsibility; commit/push/merge/release authority; or the canonical source hierarchy. Any such change must go through the normal decision and approval flow (Steps 6–8 below) and must never be made silently inside this runbook.

Scope: S1 only (this file). S2–S8 (intake template, decisions-needed queue, continuity snapshot, writeback checklist, executive routing validation, OS CLI, acceptance) are referenced below where relevant and marked **(pending SN)** — they do not exist yet and this file does not implement them.

---

## Quick Start (Operator)

For Gina — how to actually run this loop day to day, without re-reading all 14 steps.

- **Submit a new objective:** Say it in Claude Chat to think it through, or directly
  in Cowork if it's already concrete (Step 1). The AI CEO classifies it and tells
  you if it's a reserved decision (Step 2).
- **Identify open decisions:** Ask Cowork "what decisions are open?" — the CEO
  compiles them from the latest board brief's "Decisions Required from Gina"
  section and any open venture updates (Step 6). **(pending S3)** — no standing
  queue file exists yet; this is answered live from current canonical sources
  every time.
- **Create a product handoff:** Only after you've approved the underlying decision
  (Step 8) — the CEO drafts `handoffs/outbound/<slug>.md` in Cowork (Step 9). The
  Studio does not own or directly modify product canonical truth or runtime code.
  Product execution occurs through an authorized write-enabled session inside the
  relevant product repository (`pm-workflow-copilot` or `twinko-app`).
- **Review inbound product work:** Ask the CEO to review the latest status/evidence
  from `pm-workflow-copilot` or `twinko-app` (Step 11) — it reads that repository's
  own canonical docs read-only and turns them into a validated venture update under
  `inputs/venture-updates/<period>/`.
- **Perform canonical writeback:** After you approve something, the CEO writes back
  to whichever canonical record(s) the change actually requires — an approval
  record, an evidence record, a milestone amendment, the venture registry, or a
  handoff — not all of these by default, and never an unrelated record merely to
  complete a checklist (Step 12). If the bridge environment lacks Git identity or
  network access, commit/push happens on the native Mac terminal instead.
- **Recover in a new session:** Open a fresh Chat, Cowork, or Code session and ask
  it to read `CLAUDE.md`, the highest-numbered file in `decisions/approvals/`, and
  the top of the active milestone record — it should state the current primary
  milestone and open decisions without needing this conversation (Step 14).
- **When to stop and escalate:** a reserved decision surfaces; two approved records
  conflict; a canonical owner is unclear; unsafe data/credentials appear; an
  unvalidated claim is being treated as fact; scope or architecture would expand; a
  commit/push/merge/release/external message is requested; branch/HEAD/remote state
  changed unexpectedly. Full list in §2 below — when in doubt, stop rather than
  guess.

---

## Table of Contents

- [Quick Start](#quick-start-operator)
- [14-Step Operating Loop](#1-the-14-step-operating-loop)
- [Mandatory Governance Rules](#2-mandatory-governance-rules)
- [Daily Operating Checklist](#3-daily-operating-checklist)
- [Weekly CEO Review Checklist](#4-weekly-ceo-review-checklist)
- [New-Session Recovery Checklist](#5-new-session-recovery-checklist)
- [Decision 0007 Walkthrough](#6-example-walkthrough--decision-0007-as-the-dogfood-case)
- [S1 Definition of Done](#7-definition-of-done-for-s1)

---

## 0. How to read this file

Every numbered step below states: purpose; responsible role; tool/environment; canonical input; output artifact; whether that output is canonical or derived; human-approval requirement; and the condition under which the step must stop and escalate rather than continue. Nothing here creates new authority — every rule cited already exists in `CLAUDE.md`, `constitution/AUTHORITY.md`, `governance/status-model.yaml`, `executives/`, or `skills/ceo/`. Where this runbook is silent, those files govern.

---

## 1. The 14-step operating loop

### Step 1 — Chairwoman strategic intake

- **Purpose:** Capture Gina's raw objective, problem, or directive with enough context to classify it.
- **Responsible role:** Gina initiates; AI CEO captures.
- **Tool/environment:** Claude Chat for open-ended thinking and exploration; Claude Cowork once the intake is concrete enough to act on (this session is the Studio's Cowork operating seat).
- **Canonical input:** none required to *start* — this is where a new thread of work enters the loop.
- **Output artifact:** an intake note. **(pending S2)** — `templates/strategic-intake.md` does not exist yet; until S2 lands, intake is captured directly in conversation and carried into Step 2's classification.
- **Canonical or derived:** Derived, and not canonical on its own — per `CLAUDE.md` (Source of Truth), chat history is never canonical. It only matters once it is turned into a classified request, a decision packet, or a written decision.
- **Human approval:** None required to capture; Gina is the source, not an approver, at this step.
- **Stop/escalation:** If the request already implies a reserved decision (`constitution/AUTHORITY.md` §2) at first mention, note that immediately — do not let the loop proceed as if it were routine.

### Step 2 — CEO request classification

- **Purpose:** Determine what is being asked, whether it is a reserved decision or delegable work, and which skill applies (`executives/ceo/OPERATING_CONTRACT.md` §6.1).
- **Responsible role:** AI CEO.
- **Tool/environment:** Claude Cowork.
- **Canonical input:** `constitution/AUTHORITY.md` §2 (reserved-decision list); `CLAUDE.md` (Source of Truth, AI CEO Operating Model).
- **Output artifact:** a classification (reserved vs. delegable; candidate skill) — carried forward into Steps 3–7, not a standalone file.
- **Canonical or derived:** Derived; CEO output ceiling is `CEO Recommended` (`governance/executive-registry.yaml`).
- **Human approval:** None at this step.
- **Stop/escalation:** Classification is ambiguous, or the request could fit more than one skill with materially different outcomes — escalate rather than guess.

### Step 3 — Source-of-truth selection

- **Purpose:** Identify which existing files govern this request, in authority order, before drafting anything.
- **Responsible role:** AI CEO.
- **Tool/environment:** Claude Cowork.
- **Canonical input:** `CLAUDE.md` Source of Truth hierarchy (1. Chairwoman-approved decision record → 2. product decision log → 3. current-status document → 4. product operating brief → 5. Venture Studio handoff → 6. generated CEO report → 7. dashboard/presentation layer → 8. chat/conversational memory); the highest-numbered file in `decisions/approvals/`; `memory/milestones/` (checking the top of the file for amendment blocks first — see Step 12).
- **Output artifact:** a cited source list, carried into whichever artifact follows (packet, brief, handoff).
- **Canonical or derived:** Derived (a selection, not new content).
- **Human approval:** None.
- **Stop/escalation:** Two sources at the same or unclear authority level conflict — surface the conflict explicitly; never resolve it silently (`CLAUDE.md` Source of Truth rules).

### Step 4 — Executive-function routing

- **Purpose:** Assign the classified request to the correct executive function.
- **Responsible role:** AI CEO routes; `governance/executive-registry.yaml` is the single routing source (`decisions/approvals/0007-...md` §7 S6).
- **Tool/environment:** Claude Cowork.
- **Canonical input:** `governance/executive-registry.yaml`; `executives/EXECUTIVE_OPERATING_MATRIX.md`; `executives/HANDOFF_RULES.md`.
- **Output artifact:** a routing decision (which executive function — CEO/CPO/CTO Active, CMO/CBO Standby, CFO/CLO Limited — owns this), carried into the handoff or packet that follows.
- **Canonical or derived:** Derived.
- **Human approval:** None, unless routing itself would expand scope or instantiate new capability.
- **Stop/escalation:** Ownership is ambiguous against the matrix (escalate as a matrix defect, `executives/HANDOFF_RULES.md` §5); a Standby or Limited function would be asked to act outside its activation bounds (`executives/EXECUTIVE_OPERATING_MATRIX.md` §1 Activation states); any attempt to rename, delete, merge, or instantiate an executive role — never do this without an explicit Chairwoman decision.

### Step 5 — Portfolio priority review

- **Purpose:** Assess the request against current venture and company priorities.
- **Responsible role:** AI CEO, per `skills/ceo/portfolio-review/SKILL.md`.
- **Tool/environment:** Claude Cowork, running `pnpm portfolio-review -- <update files>` or `pnpm demo`. This step confirmed working in the bridge environment this session for `tsc --noEmit`; the same TypeScript toolchain underlies `pnpm build`/`portfolio-review`/`demo`, so these are expected to run wherever Node/pnpm are available — **only `pnpm verify`'s Vitest suite is confirmed to require the native Mac environment**, due to a platform-specific `@rollup/rollup-*` binary. Do not assume a clean bridge run of `portfolio-review`/`demo` without actually running it and reporting the result.
- **Canonical input:** `governance/venture-registry.yaml`; `memory/milestones/` (current active milestone, top amendment first); `decisions/approvals/`; `inputs/venture-updates/<period>/*.md`.
- **Output artifact:** `generated/board-briefs/weekly-board-brief-<period>.md` (deterministic) and, after CEO review, `...-reviewed.md`.
- **Canonical or derived:** Derived — `CEO Review Required — NOT canonical`; excluded from version control.
- **Human approval:** None to generate; Gina reviews at Step 13 (weekly cadence) or on demand.
- **Stop/escalation:** Any input fails schema/venture-registry/handoff-existence validation — the CLI fails closed and generates no brief (`src/cli.ts`); fix at the source, never patch the brief.

### Step 6 — Decisions-needed identification

- **Purpose:** Compile the items that require a Chairwoman decision.
- **Responsible role:** AI CEO.
- **Tool/environment:** Claude Cowork.
- **Canonical input:** the board brief's "Decisions Required from Gina" section; each venture update's `decisions_needed` field (`schemas/venture-update.schema.yaml`); any conflict surfaced in Steps 3–5.
- **Output artifact:** a decisions-needed list. **(pending S3)** — S1 deliberately creates no tracked pending-decisions directory. Until S3 exists: open decisions are derived live from current canonical sources; the latest board brief may contain a "Decisions Required from Gina" section; the CEO may track them within the active session; no standing deterministic queue exists yet.
- **Canonical or derived:** Derived, non-canonical.
- **Human approval:** None — `constitution/AUTHORITY.md` §3 is explicit that listing a decision as needed is not approval.
- **Stop/escalation:** None specific to this step beyond the general rule above — never let a "needed" list read as if it were already decided.

### Step 7 — Decision-packet preparation

- **Purpose:** Prepare a decision-ready packet for a reserved decision, per `skills/ceo/decision-packet/SKILL.md`.
- **Responsible role:** AI CEO.
- **Tool/environment:** Claude Cowork.
- **Canonical input:** the decision question; canonical sources with paths; prior related Chairwoman decisions; available/missing/conflicting evidence (`skills/ceo/decision-packet/SKILL.md` §2).
- **Output artifact:** one Markdown decision packet, per the skill's §5, under `generated/decision-packets/`. Decision packets are derived, non-canonical, and replaceable. Approved decisions remain under `decisions/approvals/`; execution evidence remains under `evidence/records/`. S1 does not create the `generated/decision-packets/` directory unless an actual packet-generation workflow requires it.
- **Canonical or derived:** Derived; ceiling status `Chairwoman Decision Required` (skill §8) — never `Chairwoman Approved`.
- **Human approval:** None yet — this is preparation, not the decision.
- **Stop/escalation:** Sources materially conflict; required evidence is missing for a high-stakes or irreversible decision; classification (reserved vs. delegated) is unclear (skill §9) — stop and escalate to Gina rather than complete the packet on assumptions.

### Step 8 — Chairwoman approval

- **Purpose:** Gina reviews the packet and makes the reserved decision.
- **Responsible role:** Gina.
- **Tool/environment:** wherever Gina reviews (Chat or Cowork); the resulting record is written in Cowork (or by whichever executor Gina directs) into the repository.
- **Canonical input:** the decision packet from Step 7.
- **Output artifact:** `decisions/approvals/NNNN-<slug>.md`, with `status: Chairwoman Approved`, `approvedBy: Gina`, an ISO `approvedDate`, and `recordPath` matching its own path (`constitution/AUTHORITY.md` §4; enforced by `src/governance/validate-status.ts` and `tests/approval-integrity.test.ts`).
- **Canonical or derived:** **Canonical.** This is the loop's only decision-creation step.
- **Human approval:** This step *is* the approval.
- **Stop/escalation:** Any of the three required approval-record fields is missing, malformed, or not attributed to Gina — the record is invalid; do not treat it as approved.

### Step 9 — Outbound product handoff

- **Purpose:** Operationalize an approved decision or milestone as an execution or preparation handoff to a product repository.
- **Responsible role:** AI CEO drafts; authority comes from the decision already approved in Step 8.
- **Tool/environment:** Claude Cowork (file-based; no live API to any product repository).
- **Canonical input:** the approving decision record; the active milestone record.
- **Output artifact:** `handoffs/outbound/<slug>-execution-handoff.md` or `-preparation-handoff.md`.
- **Canonical or derived:** Canonical, tracked artifact — its authority derives entirely from the decision record it cites; it is not itself a substitute for an approval record and must not claim scope the cited decision did not grant.
- **Human approval:** Already satisfied by Step 8, for exactly the scope that decision covers. Any additional scope in the handoff is a new reserved decision and must return to Step 6/7.
- **Stop/escalation:** The handoff would modify product-repository canonical truth directly (never do this — product repos are read-only from the Studio side except for receiving handoffs); the handoff claims authority beyond the cited decision.

### Step 10 — Product-repository execution

- **Purpose:** Implement the bounded milestone inside the product repository that owns it.
- **Responsible role:** Claude Code, acting as Product Lead / Founding Engineer *inside that repository*, under that repository's own `CLAUDE.md`.
- **Tool/environment:** Claude Code for implementation; native Mac terminal for any Git identity- or network-dependent operation (commit/push), per the Git and execution boundaries below.
- **Canonical input:** the outbound handoff (Step 9); the product repository's own canonical docs (e.g. `pm-workflow-copilot/CLAUDE.md`, `content/canonical/`).
- **Output artifact:** commits, code, tests inside the product repository.
- **Canonical or derived:** Canonical — **within that product repository only.** Studio does not contain product runtime code and does not treat this work as Studio-canonical.
- **Human approval:** Reserved decisions surfaced during implementation (scope change, architecture, pricing, etc.) are not self-approved by Code — they escalate back through Steps 6–8.
- **Stop/escalation:** Any reserved-decision trigger during implementation; any attempt from the product repository to redefine Studio authority, governance, or status rules (`CLAUDE.md` Repository Boundaries — product repos must not redefine Studio authority).

### Step 11 — Inbound status/evidence review

- **Purpose:** Review status, evidence, or completed work returned from a product repository.
- **Responsible role:** AI CEO.
- **Tool/environment:** Claude Cowork.
- **Canonical input:** the product repository's own current-status/decision-log documents, as mirrored (read-only) under `handoffs/pm-workflow/` or `handoffs/twinko/`, or a fresh update conforming to `templates/venture-update.md`.
- **Output artifact:** a validated venture-update file under `inputs/venture-updates/<period>/`.
- **Canonical or derived:** The mirrored handoff files themselves are **snapshots, not canonical** — per the Repository boundaries rules below, Studio "may keep handoffs or labeled snapshots only"; the product repository remains sole authority for its own truth. A validated venture update is a Studio-side input (authority level 5, `CLAUDE.md` Source of Truth), still below any decision record.
- **Human approval:** None to review; a reserved decision surfaced here returns to Step 6.
- **Stop/escalation:** Returned evidence contradicts an existing canonical decision record — surface the conflict; do not resolve it silently and do not let the newer evidence quietly override the decision.

### Step 12 — Canonical writeback

- **Purpose:** Once Gina has approved a conclusion, the CEO writes back to the applicable canonical record(s) — such as an approval record, evidence record, milestone amendment, venture registry, or handoff — according to the change type. It must not update unrelated records merely to complete a checklist.
- **Responsible role:** AI CEO drafts; Gina's prior approval (Step 8) authorizes the writeback; writing itself may be performed by the CEO's executor once authorized.
- **Tool/environment:** Claude Cowork drafts/writes files in the Studio repository; **native Mac terminal is the Git write/push authority** whenever the bridge environment lacks a configured Git identity, the correct platform binaries, or network access (all three have been observed missing in the bridge this session).
- **Canonical input:** the approved decision or reviewed evidence.
- **Output artifact:** whichever of the following the change type actually requires — an approval record (`decisions/approvals/NNNN-*.md`), an evidence record (`evidence/records/NNNN-*.md`), a milestone amendment (`memory/milestones/*.md`, never a silent overwrite), a `governance/*.yaml` update (only where a decision explicitly authorizes it), or a handoff (`handoffs/outbound/`) — not necessarily all of them.
- **Canonical or derived:** Canonical.
- **Human approval:** Required before writeback is canonical — writing without an explicit approval record is prohibited (`CLAUDE.md` Writeback Policy, "Explicit approval required" category).
- **Stop/escalation:** No approval record exists yet for what is being written; an existing canonical document would need to be changed in a way that isn't an amendment/supersession (`CLAUDE.md`: do not silently rewrite approved historical documents — use amendments, supersession, migration, or explicit decisions).

### Step 13 — Weekly portfolio review

- **Purpose:** Recurring cadence check across the whole portfolio (`executives/ceo/OPERATING_CONTRACT.md` §9: weekly board brief).
- **Responsible role:** AI CEO produces; Gina reviews.
- **Tool/environment:** Claude Cowork (`pnpm demo` or `pnpm portfolio-review -- inputs/venture-updates/<period>/*.md`).
- **Canonical input:** `inputs/venture-updates/<period>/*.md`; `governance/venture-registry.yaml`; `memory/milestones/*.md`.
- **Output artifact:** `generated/board-briefs/weekly-board-brief-<period>.md` + `...-reviewed.md` (CEO judgment layer, Traditional-Chinese-primary per the language policy in `skills/ceo/portfolio-review/SKILL.md` §5).
- **Canonical or derived:** Derived, `CEO Review Required — NOT canonical`, excluded from version control.
- **Human approval:** Gina's weekly review; any decision surfaced still requires its own approval record via Steps 6–8.
- **Stop/escalation:** Same as Step 5 (fail-closed on invalid inputs); a reviewed brief describing priorities that a newer approved decision has already superseded — flag it as stale rather than treat it as current (this happened in practice; see the walkthrough below).

### Step 14 — Continuation and recovery

- **Purpose:** Let a fresh session — new chat, new model, new executor — reconstruct the current state without relying on this or any other conversation's memory.
- **Responsible role:** Whichever executor starts the new session.
- **Tool/environment:** Whichever tool starts the session (Cowork, Chat, or Code) — reads files only.
- **Canonical input:** `CLAUDE.md`; `constitution/AUTHORITY.md`; the **highest-numbered file** in `decisions/approvals/`; `memory/milestones/*.md` (read the top of the file first — amendments carry current authority over the original body beneath them); `governance/venture-registry.yaml`, `governance/executive-registry.yaml`, `governance/status-model.yaml`; `README.md` for clean-clone setup.
- **Output artifact:** a correct statement, back to whoever opened the session, of the current primary milestone and open decisions. **(pending S4)** — a rendered company-state/continuity snapshot file does not exist yet; until S4 lands, this step is performed by reading the files above directly, every time.
- **Canonical or derived:** Derived (a restated understanding, not new canonical content) unless the session is also asked to write something new, in which case Steps 1–12 apply.
- **Human approval:** None to reconstruct state; anything acted on afterward re-enters the loop at Step 1 or 2.
- **Stop/escalation:** The files disagree with each other or with what the user asserts — stop and surface the conflict; do not silently pick a version of the truth (this happened in practice; see the walkthrough below).

---

## 2. Mandatory governance rules

### Repository boundaries

- Studio owns company governance, portfolio, milestones, approvals, and cross-venture handoffs.
- Product repositories own product truth and implementation.
- Studio must not contain product runtime code.
- Product repos must not redefine Studio authority.

### Tool roles

- ChatGPT is an optional independent board advisor / strategic reviewer, not a mandatory execution step.
- Studio CEO/CPO handle daily company and product operating decisions.
- Cowork handles cross-file company operations and handoffs.
- Claude Code handles bounded implementation inside the correct repo.
- Native Mac environment is the Git write/push authority when bridge tools lack identity, platform compatibility, or network access.

### Single-writer protocol

- Only one write-enabled session may operate on a repository at a time.
- Other sessions must remain read-only.
- Before writing, verify branch, HEAD, working tree, staged files, remote divergence, and active Git processes.
- If HEAD or working state changes outside the session, stop immediately.
- Do not continue staging or committing after an out-of-band change.

### Git and execution boundaries

- Do not commit or push without explicit authorization.
- Do not push to protected branches without approval.
- Do not assume bridge environments are native Mac environments.
- Do not configure Git identity on behalf of Gina.
- Do not move source to cloud environments merely to rerun local tests.
- Report validation limitations honestly.

### Source-of-truth rules

- Approved decision records outrank generated reports and chat.
- Chat history and Claude Project uploads are non-canonical.
- Product truth remains in the product repo.
- Studio may keep handoffs or labeled snapshots only.
- Do not silently resolve conflicts.

### Escalation triggers

Stop and escalate to Gina whenever any of the following is true:

- a reserved decision is required (`constitution/AUTHORITY.md` §2);
- the canonical owner of a fact or file is unclear;
- two approved records conflict;
- unsafe data or credentials are encountered;
- an unvalidated claim is being presented as fact;
- product scope would expand beyond what is approved;
- an architecture-boundary change is implied;
- external communication, spending, release, merge, or push is requested;
- branch, HEAD, or remote state has changed unexpectedly.

---

## 3. Daily operating checklist

- [ ] Read the top of the current active milestone record under `memory/milestones/` — amendments there carry current authority.
- [ ] Confirm the highest-numbered file in `decisions/approvals/` — that is today's governing decision.
- [ ] Before any repository write: confirm branch, HEAD, working tree, staged files, remote divergence, and that no Git process is active (single-writer protocol).
- [ ] Classify and route any new Chairwoman intake (Steps 1–4).
- [ ] Advance any open decision packet toward `Chairwoman Decision Required` (Step 7), or toward approval if Gina is ready (Step 8).
- [ ] Check for inbound status/evidence from either product repository (Step 11).
- [ ] Stop on any escalation-trigger match — do not resolve it silently and do not proceed past it.

## 4. Weekly CEO review checklist

- [ ] Confirm/collect this period's venture updates under `inputs/venture-updates/<period>/`, conforming to `templates/venture-update.md`.
- [ ] Run `pnpm portfolio-review -- inputs/venture-updates/<period>/*.md` (or `pnpm demo` for the standing sample); fix any invalid input at its source — never patch the brief.
- [ ] CEO review pass per `skills/ceo/portfolio-review/SKILL.md` §4: add recommendations, produce the reviewed brief.
- [ ] Compile decisions-needed across the brief and any open packets (Step 6).
- [ ] Present to Gina for weekly decision review.
- [ ] For each decision Gina makes: write the approval record, the evidence record, and amend the milestone record (Step 12) — never overwrite history.
- [ ] Confirm the next review date (period end + 7 days, per `templates/weekly-board-brief.md`).

## 5. New-session recovery checklist

- [ ] Do not rely on this or any other conversation's memory — read files only.
- [ ] Read `CLAUDE.md` (repository root).
- [ ] Read `constitution/AUTHORITY.md`.
- [ ] Find the highest-numbered file in `decisions/approvals/` — that is the current governing decision.
- [ ] Read `memory/milestones/*.md`, checking the top of each file first for amendment blocks.
- [ ] Read `governance/venture-registry.yaml`, `governance/executive-registry.yaml`, `governance/status-model.yaml`.
- [ ] Check `git status --short --branch` and `git log` before assuming the working tree matches every decision on record — uncommitted or unpushed local state has happened before in this repository.
- [ ] If any two sources conflict, stop and surface it — do not silently pick one.
- [ ] State the current primary milestone and open decisions back to whoever opened the session, before doing anything else.

## 6. Example walkthrough — Decision 0007 as the dogfood case

This is not a hypothetical; it is what actually happened in this repository, mapped onto the 14 steps above.

1. **Intake:** Gina, in conversation, directed a change to the primary company milestone.
2–4. **Classification / source selection / routing:** classified as a reserved decision (venture reprioritization, `constitution/AUTHORITY.md` §2); sources selected were `decisions/approvals/0006-fast-track-product-delivery.md` and `memory/milestones/2026-07-12-fast-track-product-delivery.md`; routed to the CEO function (no CPO/CTO delegation needed for a portfolio-priority decision).
5. **Portfolio priority review:** the existing `...-reviewed.md` board brief was found to describe priorities already superseded by the new directive — flagged as stale rather than treated as current.
6. **Decisions-needed:** the reprioritization itself, plus follow-on questions (S6/S7 scope, PM Workflow preservation) were identified and listed — listing them was not treated as approval.
7. **Decision-packet preparation:** a full packet was drafted covering proposed wording, superseded scope, smallest credible v1.0, definition of done, reusable components, gaps, files, risks, sequencing, and open questions.
8. **Chairwoman approval:** Gina approved with modifications (S6 revised to a routing-activation model preserving all approved executive statuses; S7 constrained to prepare/render/validate/orchestrate only) — recorded as `decisions/approvals/0007-one-person-company-os-v1-reprioritization.md`.
9. **Outbound handoff:** not yet triggered by 0007 itself (0007 authorizes Studio-internal work; product-repo handoffs already existed from 0006 and remain in force where not superseded).
10. **Product-repository execution:** the PM Workflow Control Tower preservation was authorized (0007 §9) and executed as a local commit in `pm-workflow-copilot` (`f179334`, then `8c68ee7` for a `.gitignore` fix) — via Claude Code/native Mac, not the Studio repository.
11. **Inbound review:** the Studio session discovered, on re-inspection, that out-of-band commits had already landed in both repositories (`8550cbb` in Studio, `f179334`/`8c68ee7` in PM Workflow) — each was surfaced and reconciled rather than assumed away.
12. **Canonical writeback:** `decisions/approvals/0007-...md`, `evidence/records/0006-one-person-company-os-v1-reprioritization.md`, and an amendment (not an overwrite) to `memory/milestones/2026-07-12-fast-track-product-delivery.md` were written; a wording correction was staged, and — because the bridge environment had no configured Git identity and no network access — the commit and push were completed on the native Mac (`3a01c5c`), then verified from the bridge by reading the resulting Git state rather than trusting the report alone.
13. **Weekly review:** not yet run against this change; the next `pnpm demo`/`portfolio-review` cycle will pick it up.
14. **Continuation/recovery:** this file is itself part of making that recovery reliable — a fresh session reading `decisions/approvals/` (highest-numbered), the amended milestone record, and this runbook can reconstruct exactly what happened above without needing this conversation's history.

## 7. Definition of Done for S1

S1 is done when:

- `docs/OPERATING_LOOP.md` exists and defines all 14 steps with purpose, responsible role, tool/environment, canonical input, output artifact, canonical-or-derived status, human-approval requirement, and stop/escalation condition;
- all six mandatory-rule sections (repository boundaries; tool roles; single-writer protocol; Git and execution boundaries; source-of-truth rules; escalation triggers) are present;
- the daily, weekly, and recovery checklists are present and match the 14-step loop;
- the Decision-0007 walkthrough is present and cites real files/commits, not a hypothetical;
- no application code, registry, executive contract, governance YAML, milestone body text, or product-repository file was modified to produce this file;
- every file path referenced above exists as stated, except where explicitly marked **(pending S2/S3/S4)**;
- the Quick Start (Operator) section is present, approximately 30–50 lines, and covers: submitting an objective, seeing decisions needed, creating a handoff, reviewing inbound work, canonical writeback, new-session recovery, and stop/escalate conditions;
- the runbook remains model-agnostic (no hard-coded model names or version numbers);
- all S2–S8 capabilities remain explicitly marked **(pending SN)** where referenced;
- the living-document policy is present in the header and accurately scoped to the seven listed change types.

This file follows the living-document policy stated in the header: routine edits do not require a new approval; changes to authority boundaries, reserved-decision scope, repository ownership, approval flow, executive responsibility, commit/push/merge/release authority, or the canonical source hierarchy do.
