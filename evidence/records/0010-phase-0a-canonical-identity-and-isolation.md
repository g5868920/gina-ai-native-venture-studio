# Evidence Record 0010 — Phase 0A: Canonical Identity, Registry Hardening, Project Isolation

Date: 2026-09-01
Decision: `decisions/approvals/0010-phase-0a-canonical-identity-and-registry-hardening.md`
Type: **First code-bearing implementation phase.** Bounded structural hardening.
Public-use status: Internal. Portfolio-eligible as a governance-engineering case study.
Merge-readiness: **NOT merge-ready** — see the Amendment below, which supersedes §8.

---

## Amendment 2 — 2026-09-01: F-02 closed by deletion of the stale checkout

Round-2 independent review returned **BLOCKED**, with F-02 (the archived checkout's own
pre-Phase-0A CLI had no preflight and remained executable) unresolvable from inside this
repository: no change here can alter code in another checkout.

Gina authorized **Option 1 — delete the stale checkout**, scoped explicitly as targeted removal
of a known stale and unsafe checkout, not general cleanup authorization.

Executed 2026-09-01. Re-verified immediately before deletion: no commits absent from canonical,
only branch `main`, no stashes, and the three untracked paths were two earlier drafts of files
already committed here plus the warning file added during archiving. After deletion both the
archived path and the original `../gina-ai-native-venture-studio 2` path were confirmed absent,
and the full suite passes with the sibling gone — nothing in this repository read or depended on
it. The copy-detection rules and the preflight are retained on purpose: they guard any *future*
copy, which is the recurring hazard, not just the one removed.

The other round-2 findings were remediated in code: **NF-01** (portfolio coverage counted input
rows, so two Nodi updates rendered "2 of 2 active") and **NF-02** (documented entrypoints built
before the preflight could refuse). **F-06**'s three documentation inconsistencies were
corrected. **F-05** was partially addressed, with two suggested tests declined on the record.
Full detail: `evidence/reviews/2026-09-01-phase-0a-independent-review-002.yaml`.

---

## Amendment 1 — 2026-09-01: the review gate ran, and its role separation was violated

**§8 below is superseded and must not be read as current.** Its text is preserved because it
was accurate when written; what actually happened afterwards is this:

1. **An independent Codex session did review Phase 0A** and produced findings **F-01–F-06**.
2. **That same session then implemented its own remediation**, which `0009` §6 prohibits
   ("Codex does not implement its own review findings by default") and which defeats the
   separation the gate exists to create.
3. **No structured review record was persisted.** `schemas/engineering-review.schema.yaml`
   defines the required result shape; no such record exists in the repository, and F-01–F-06
   are not written down anywhere. They were reconstructed from the diff for this amendment —
   that reconstruction is inference, not the reviewer's own words.
4. **Implementation ownership returned to Claude Code**, which independently re-inspected the
   remediation rather than assuming it correct because the suite was green.

### What that re-inspection found

Most of the remediation was sound and was kept: splitting historical reads from operational
writes into structurally different return types (a historical result carries no `projectId`, so
it *cannot* authorize a write — stronger than the option-flag design it replaced); restricting
`projectId` input to active canonical project_ids; enforcing registry integrity on
caller-supplied registries; the slug constraint on identifiers; the id/project_id namespace
collision rule; and keeping superseded identities out of the operational portfolio.

Two defects were found and corrected:

- **The CLI entry guard could silently do nothing.** It compared `process.argv[1]` verbatim to
  `fileURLToPath(import.meta.url)`. Node makes `argv[1]` absolute but does not resolve symlinks,
  so invoking the CLI through a symlink skipped `main` entirely — **exit 0, no output, nothing
  done**. Reproduced directly. Fixed by comparing real paths with a URL fallback, and locked in
  by three regression tests.
- **The Git-origin check was a false-positive machine that could not detect the actual threat.**
  Treating an unreadable origin as a hard failure made `git` a runtime dependency and rejected a
  legitimate checkout that had every marker file but no `.git` — reproduced directly. Meanwhile
  the archived duplicate is a clone of this same repository and its origin is **byte-identical**
  to canonical, so origin never discriminated it at all; the directory-name and marker-file
  signals do. Fixed so a missing origin is inconclusive and a mismatched origin still fails.

### Standing conclusion

**Phase 0A still has no clean independent review.** The only review it has received was
performed by a session that then modified the code under review. A fresh, read-only Codex
session must review the final state. Not merge-ready.

---

## 1. Before state

Company OS v0.2.2 specification complete (`0008`, `0009`), zero implementation. The registry
recorded `project_id`, `lifecycle`, and `superseded_by` as prose, but
`src/governance/venture-registry.ts` validated only four fields and Zod **stripped the rest** —
so the supersession of `pm-workflow` was documented and unenforced (migration report §E-6).
Nothing prevented a write against a superseded identity. Nothing enforced project isolation. A
stale duplicate clone existed with no mechanical protection (§E-7). Baseline: 42 tests, 3 suites,
green.

## 2. Problem and constraints

Autonomous agent execution cannot be made safe on top of an identity model that is advisory.
Three concrete failure modes: a write landing under a superseded id; a mutation silently
combining Nodi and Twinko state; a session operating in the stale clone and reading superseded
governance as current.

Constraints: smallest mechanism that establishes the invariant; no database, event bus, runtime,
Control Tower, MCP, n8n, or provider integration; do not rewrite history; do not rename the Nodi
product repository; do not delete the duplicate.

## 3. Gina's framing, constraints, and decision

Gina authorized Phase 0A with a 19-section brief specifying the canonical project model, the
supersession representation, required registry fields, the resolution contract, the
no-silent-rewrite rule, the isolation invariant and its six prohibited outcomes, the
duplicate-repository constraint (protect, do not delete), fourteen required test behaviours, an
explicit anti-scope list, and the requirement that the independent review gate run before
merge-readiness.

Gina also resolved the governance tension `0009` had left open, supplying the bounded-risk
envelope for AI disposition of Medium findings and the binding rule that it is never described
as human approval.

## 4. AI contribution

Implementation of the loader hardening and its six integrity rules; the identity-resolution
module and its navigation/write split; the write-scope guard and isolation resolver; the
canonical-repository assertion and preflight; the operational/historical intent boundary on the
venture-update path; 36 tests; and identification of the failure modes in §7 that the brief did
not enumerate.

## 5. Design decisions worth recording

- **Navigation and authorization are separate questions.** `resolveIdentity` will say
  `pm-workflow → nodi`. `resolveProjectScopeForWrite` refuses. Knowing the successor is not
  permission to use it — this is what makes §6 of the brief mean something.
- **`operational` is the default intent.** A caller that has not thought about whether it is
  reading history or writing new state gets the refusing answer.
- **No supersession chains.** A successor must itself be active, so resolution is one hop and
  can never cycle. Enforced at load, not at call time.
- **A superseded identity must carry its successor's `project_id`.** This is why
  `pm-workflow.project_id` is `nodi` rather than `pm-workflow`: a historical record still
  resolves to a real active project instead of a dangling one.
- **The duplicate is detected two independent ways** — directory-name pattern and missing v0.2
  marker files. Either alone suffices; a clone predating v0.2 cannot fabricate the markers.

## 6. Alternatives considered

- **Rename the `pm-workflow` id to `nodi` and migrate the W28 records.** Rejected — it would
  falsify history. The brief and `CLAUDE.md` both forbid rewriting historical records for
  terminology.
- **Auto-redirect `pm-workflow` writes to `nodi`.** Rejected, and explicitly so by the brief:
  a silently redirected write conceals incorrect project context.
- **Make the CLI historical by default** to avoid touching `pnpm demo`. Rejected — the safe
  default matters more than the convenient one. `pnpm demo` now passes `--historical`, which is
  also a more honest description of what it does.
- **Delete or rename the duplicate clone.** Deletion: rejected — destructive and not
  authorized, and it stays rejected. Renaming: rejected *at the time of this record*, then
  actually performed later in the same day by the reviewing session, non-destructively and with
  a root warning file. See the Amendment at the top of this record; `governance/canonical-repository.yaml`
  holds the current path. Recorded here so this section does not read as if the archive were
  still at its original name.
- **Introduce a structured-state store to hang the invariant on.** Rejected as premature; the
  guard plus its tests establish the invariant without one.

## 7. Failure modes found during implementation

- **An existing error-message contract broke.** Routing unknown ventures through the generic
  identity resolver changed `Unknown venture …` to `Unknown project identity …`, failing an
  existing test. Fixed in the code, not by editing the test: `venture-update.ts` keeps its own
  vocabulary and passes supersession messages through unchanged.
- **One of my own new tests was weak.** The first duplicate-id test re-implemented the check
  inline, so it asserted on the test's logic rather than the loader's. Rewritten to write a
  tampered registry to a scratch path and load it through the real loader; five further
  integrity tests were added the same way.

## 8. Independent review gate — NOT EXECUTED — **SUPERSEDED by the Amendment above**

> Preserved as written on 2026-09-01, before an independent Codex session ran. Do not act on
> this section; read the Amendment at the top of this record instead.

`0009` §5 and `0010` §12 require that the implementing model not be the sole reviewer.

**No `codex` executable is present on this machine** (`which codex` → not found; `gh` is also
absent). The independent review gate therefore **could not be executed by the implementing
session**, and this session must not substitute its own review for it — doing so is precisely
the self-review bias the gate exists to prevent.

Consequently: **Phase 0A is complete as an implementation and NOT merge-ready as a change.**
`review_status` is not `PASS`, `PASS_WITH_FINDINGS`, or `BLOCKED` — it has not been produced.
Everything needed to run it exists: the diff is uncommitted in the working tree, and
`schemas/engineering-review.schema.yaml` defines the result shape. Tracked as `0010` Remaining
Founder Decision §12 and `0009` §9.

## 9. Tests and validation

```bash
pnpm verify   # typecheck + vitest
```

**78 tests, 4 suites, all passing** (42 pre-existing + 36 new). Typecheck clean. Exact results
in the completion report. Behavioural verification was additionally run through the real CLI —
operational rejection of `pm-workflow`, operational acceptance of `twinko`, historical read of
both, and the preflight against the real duplicate directory.

## 10. Human–AI ownership

Gina authorized the phase, specified its scope and anti-scope, enumerated the required
behaviours, and resolved the Medium-finding governance tension. The AI implemented, tested,
self-reviewed, found and fixed two defects in its own work, and declared the review gate
unexecuted rather than claiming a pass. No percentage attribution.

## 11. What changes next

An independent reviewer must run against this diff. If it produces Critical or High findings,
Phase 0A is not complete: remediation, re-verification, and re-review follow. Vertical Slice 01
does not begin until the gate passes.
