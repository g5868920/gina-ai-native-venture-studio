# Decision 0010 — Phase 0A: Canonical Project Identity, Registry Hardening, Project Isolation

status: Chairwoman Approved
approvedBy: Gina
approvedDate: 2026-09-01
amends: 0009 (closes its Remaining Founder Decision §10). 0008 and 0009 otherwise stand in full.
recordPath: decisions/approvals/0010-phase-0a-canonical-identity-and-registry-hardening.md

---

## Amendment — 2026-09-01 (execution record, no change to the decision)

This decision is unchanged. Two facts about how it was **carried out** differ from what §10
and §12 anticipated, and are recorded here rather than by editing them:

0. **The stale duplicate has since been DELETED** (Founder decision, 2026-09-01, Option 1 for
   review finding F-02). Removal was explicitly authorized and scoped as targeted removal of a
   known stale and unsafe checkout, **not** a general repository-cleanup authorization.
   Immediately before deletion it was re-verified to hold no commits absent from canonical, only
   branch `main`, no stashes, and no unique content. Both the archived path and the original
   `../gina-ai-native-venture-studio 2` path were confirmed absent afterwards, and the full
   suite passes with the sibling gone. §10 below said the duplicate "is not deleted"; that was
   accurate when written and is now superseded by this clause. The copy-detection rules and the
   preflight are deliberately retained — they guard any *future* copy.

1. **Before that, the duplicate was archived in place rather than merely documented.** It was renamed
   `../gina-ai-native-venture-studio 2` → `../_ARCHIVED_DO_NOT_USE__gina-ai-native-venture-studio_2`
   and a root `STALE_REPOSITORY_DO_NOT_USE.md` warning was added inside it. **Nothing was
   deleted**: Git history, tracked files, and the two untracked drafts are intact, and the
   checkout still reports HEAD `7722ddb`. This is within §10's "explicit path warning" latitude,
   but it is a filesystem mutation **outside the authorized worktree**, so it is recorded
   explicitly. `governance/canonical-repository.yaml` carries the new path, the archived-from
   path, and the warning-file name. Whether to retain or remove the archive remains Gina's call.

2. **The independent review gate ran, but its role separation was violated.** An independent
   Codex session reviewed Phase 0A and produced findings F-01–F-06 — then **implemented its own
   remediation**, which `0009` §6 prohibits ("Codex does not implement its own review findings
   by default"). Implementation ownership was returned to Claude Code, which independently
   re-inspected that remediation, kept what was sound, and corrected two defects (see
   `evidence/records/0010-*.md` Amendment). **Phase 0A therefore still has no clean independent
   review and is NOT merge-ready.** A fresh, read-only Codex session must review the final state.

---

## Basis

Chairwoman written direction of 2026-09-01, "Company OS v0.2 — Implementation Phase 0A:
Canonical Project Identity + Registry Hardening + Project Isolation", which approves v0.2 and
v0.2.1 and authorizes the first bounded implementation phase.

This is the **first decision in this repository that authorizes code**, and it is deliberately
narrow: make project identity and project isolation mechanically reliable *before* any
autonomous agent execution exists.

---

## Decision

### 1. Phase 0A implementation is authorized

Bounded scope: canonical active-project model, registry schema and loader hardening, canonical
identity resolution, new-write protection, the project-isolation invariant, duplicate-repository
safety, and their tests.

### 2. The active canonical projects are `nodi` and `twinko`

Each exposes a stable canonical `project_id`. They are the only active projects.

### 3. Historical PM Workflow identities remain available for lineage, never as a third venture

`pm-workflow` is retained with `lifecycle: superseded` and `superseded_by: nodi`. Historical
decisions, evidence, and records are **not** rewritten to change terminology — historical truth
stays historically accurate.

### 4. The registry mechanically recognizes `project_id`, `lifecycle`, and `superseded_by`

The venture schema is strict: an unrecognized field is a loud failure, not a silent drop. The
loader additionally fails closed on duplicate ids, duplicate active `project_id`s, a superseded
entry without a successor, a successor that does not exist or is not itself active
(no supersession chains), a superseded entry whose `project_id` disagrees with its successor's,
and an active entry that declares supersession.

### 5. Canonical resolution is deterministic

Any identity resolves to exactly one of: an **active** project, a **superseded** identity naming
its canonical successor, **unknown**, or **missing**. A superseded alias may identify its
successor for navigation or migration — that is **not** authorization to write under it.

### 6. New operational writes against a superseded identity are rejected, never rewritten

A write targeting `pm-workflow` is refused. The caller is told the canonical successor and must
re-issue the request explicitly against `nodi`. **The request is never silently redirected** —
a silently rewritten write would conceal incorrect project context, which is the exact failure
this phase exists to prevent.

Historical reads remain available under an explicit `historical` intent. Operational intent is
the default, so a caller that has not considered the question gets the safe answer.

### 7. The project-isolation invariant is enforced mechanically

> Every operational project-scoped state mutation must resolve to exactly one active canonical
> `project_id`.

A mutation may never resolve to multiple projects, omit project identity where project scope is
required, implicitly combine Nodi and Twinko state, inherit a historical dogfood relationship,
write Twinko state through a Nodi or PM Workflow identifier, or write Nodi state through a
Twinko identifier. **Ambiguous identity fails closed.**

Only the smallest mechanism required is built. The full structured-state platform is not.

### 8. Twinko historical data is preserved

Historical dogfood references are not deleted or rewritten. The v0.2 supersession decisions
remain the historical authority. Phase 0A only ensures those historical relationships cannot
create a **current operational** state dependency between Twinko and Nodi. The ventures are
operationally independent.

### 9. No mass rename of the Nodi product repository

`pm-workflow-copilot` is not renamed and Nodi product specifications are not rewritten. For
Company OS purposes it is sufficient that the canonical venture/project is `nodi`. Product-level
identity migration inside that repository remains a separate future task.

### 10. Duplicate-repository safety is established non-destructively

The stale duplicate at `../gina-ai-native-venture-studio 2/` is **not deleted**. The canonical
repository is made explicitly identifiable by `governance/canonical-repository.yaml` plus a
preflight check that refuses to run from a directory that looks like a copy or that lacks the
Company OS v0.2 marker files. Findings about the duplicate's contents are documented for later
Founder review.

### 11. Medium engineering-finding authority — closes the v0.2.1 ambiguity

`0009` recorded an unresolved tension: the merge gate permitted "CTO/CEO risk acceptance" for
Medium findings while `constitution/AUTHORITY.md` §1 reserves approval to Gina. Resolved by this
approved operating principle:

> The AI CTO / CEO may perform a **policy-based operational disposition** of a Medium
> engineering finding when it falls entirely within an already approved bounded-risk envelope.
> **This is not equivalent to human approval.**

A Medium finding may be dispositioned without Founder escalation only when **all** of the
following hold: internal-only impact · reversible · no Founder-reserved decision involved · no
legal implication · no privacy implication · no safety implication · no sensitive-data
implication · no material security implication · no payment or pricing implication · no material
financial commitment · no external customer or partner commitment · no public claim · no
production high-blast-radius change · no irreversible data migration · within approved product
scope · within approved architecture · residual risk explicitly documented.

If **any** condition is not satisfied, the finding escalates to the Founder or to qualified human
review.

**Terminology is binding.** An AI disposition is recorded as a *bounded policy disposition* or
*risk acceptance under previously approved governance*. It must never be described as
"human approval", "Founder approval", or "formal sign-off".

`constitution/AUTHORITY.md` is **not** amended: this principle operates strictly below §2 and
creates no new approval authority.

### 12. The Independent Engineering Review Gate is active from Phase 0A

Claude Code must not be the sole reviewer of its own implementation. Phase 0A is **not
merge-ready** until the independent review gate has been executed. Critical and High findings
are blocking. Low/nit findings are non-blocking unless several together indicate a material
systemic issue.

---

## Scope and Limits

Phase 0A does **not** build: the AI CEO runtime, the Cross-Model Decision Council runtime, the
Founder Control Tower, the full structured-state system, a database, an event bus, MCP, n8n, any
additional orchestration framework, the Claude Agent SDK or OpenAI runtime, functional-agent
runtimes, scheduled jobs, autonomous writes, or Autopilot. No OpenAI credentials, provider
adapter runtime, or cross-model deliberation is configured.

It authorizes no commit, push, merge, release, spend, or external communication.

---

## Definition of Done

- `nodi` and `twinko` load as active canonical projects with distinct `project_id`s.
- `pm-workflow` is readable, recognized as superseded, and names `nodi` as its successor.
- New operational writes against a superseded identity are rejected without rewriting.
- Project scope resolves to exactly one active project, or fails closed.
- The canonical repository is mechanically distinguishable from a stale copy.
- Existing v0.1 / v0.2 verification remains green.
- **The independent review gate has been executed** and no unresolved Critical or High finding
  remains.

---

## Remaining Founder Decisions

Carried from `0008` (1–6) and `0009` (7–9); `0009` §10 is closed by §11 above.

11. ~~Disposition of the archived duplicate.~~ **CLOSED 2026-09-01** — Gina authorized removal;
    the checkout was deleted and both paths verified absent (Amendment §0).
12. **Where the independent reviewer runs, and how its separation is enforced.** No `codex`
    executable is available to the implementing session, so it cannot run the gate itself. When
    a Codex session did review, it also remediated — violating `0009` §6. The gate needs an
    operating mechanism that keeps the reviewer read-only, not only a policy that says so.
    Tracked with `0009` Remaining Founder Decision §9.
