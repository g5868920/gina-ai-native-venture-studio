# Evidence Record 0009 — Cross-Model Deliberation and Independent Engineering Review

Date: 2026-09-01
Decision: `decisions/approvals/0009-cross-model-deliberation-and-independent-engineering-review.md`
Type: Additive specification amendment (Company OS v0.2.0 → v0.2.1). **No runtime functionality implemented.**
Public-use status: Internal. Portfolio-eligible as an AI-governance case study; contains no external validation claim.

---

## 1. Before state

Company OS v0.2.0, recorded the same day (`0008`, evidence `0008`). Single-provider by
assumption: the Claude Agent SDK was the sole runtime candidate and no specification addressed
cross-provider reasoning. Architecture §10 required that "the agent that produced an output does
not score it", but that principle had no named instance and no enforcement anywhere — including
in how the Company OS itself would be built. No engineering review gate existed; Claude Code
would have implemented and self-reviewed its own work.

## 2. Problem and constraints

Two distinct self-review risks:

1. **Decision quality.** A single model's reasoning on a material issue has no independent
   challenger, and the AI CEO would synthesize from one perspective.
2. **Engineering quality.** The model that writes the code would be the only thing checking it.

Constraints from the Chairwoman: additive amendment, not a rewrite; not a new department; not
an uncontrolled multi-agent discussion; no second orchestration framework; specification only;
autonomy and merge authority unchanged; preserve existing history.

## 3. Gina's framing, constraints, and decision

Gina approved the v0.2 specification and supplied the amendment in writing (11 numbered
sections): the canonical council pattern with independent-first-pass ordering; bounded
deliberation defaults; that consensus is not approval and disagreement is not automatic
escalation; the trigger criteria; the structured CEO synthesis fields; the engineering review
flow; the Claude/Codex role separation and its explicit rationale of reducing self-review bias;
the review schema fields and three states; the merge gate severity policy; the high-risk areas
still needing human review; the Control Tower implications with drill-down-only defaults; and
the instruction to update only the minimum governing files.

Mid-task, Gina further confirmed that this amendment **does not displace the Phase 0A structural
hardening prerequisites** — canonical nodi/twinko identity, superseded pm-workflow handling,
project-write isolation, registry enforcement, and duplicate-repository safety remain the next
implementation prerequisite. That instruction is recorded in `0009` §Sequencing and in the
founding prompt §2b, so the amendment cannot be read as reordering the queue.

## 4. AI contribution

Placement of the two requirements into the existing architecture without renumbering or
rewriting it; reconciliation of the council against three existing invariants that it could
have appeared to contradict (§5 below); the machine-readable policy and schema files; the
conservative autonomy entries; and identification of the four open questions the direction did
not resolve (`0009` Remaining Founder Decisions 7–10).

## 5. Conflicts identified and how each was reconciled

Three places where the amendment could have read as contradicting v0.2.0. All were resolved by
stating the boundary explicitly rather than by weakening either side:

1. **"No additional orchestration frameworks" (§14) vs. adding OpenAI.** Reconciled: OpenAI is a
   *peer reasoning provider* reached through a provider adapter (§11.2.1), not a second
   orchestration stack. The prohibition is restated and tightened, not relaxed.
2. **"No autonomous agent-to-agent chains" (§1) vs. models critiquing each other.** Reconciled:
   the critique round is a fixed-length, CEO-framed, CEO-terminated protocol between reasoning
   providers — not agents delegating, not an open channel, and unable to start itself (§15.5).
3. **"Generation separated from evaluation" (§10) vs. the two new layers.** No conflict — both
   are instances of that principle, and §10 now names them.

One further tension is recorded rather than resolved: `constitution/AUTHORITY.md` §1 reserves
approval to Gina, while the merge gate permits "CTO/CEO risk acceptance" for Medium findings —
and those executives are AI functions. A recorded AI risk acceptance is not a human sign-off.
Left as open Founder decision 10.

## 6. Alternatives considered

- **Amend `constitution/AUTHORITY.md` with the high-risk engineering areas.** Rejected — the
  direction says to use the existing Founder-reserved framework, and §2 already covers them at
  the right altitude. Listing them in the gate policy keeps the constitution stable.
- **Renumber the architecture to insert the new sections mid-document.** Rejected — it would
  have broken existing cross-references for cosmetic ordering. Appended as §15/§16 with a
  pointer from §14.
- **Fold the schemas into the architecture prose.** Rejected — the direction asked for
  machine-processable results, and `schemas/` already has an established field-spec convention.
- **Add a `council` agent to the org chart.** Rejected — explicitly not a department.
- **Put the council in the first vertical slice.** Not decided — that is Gina's call, recorded
  as open decision 7 rather than assumed.

## 7. Implementation

Files added: `decisions/approvals/0009-*.md`, `governance/decision-council-policy.yaml`,
`governance/engineering-review-gate.yaml`, `schemas/council-synthesis.schema.yaml`,
`schemas/engineering-review.schema.yaml`, this record.

Files modified: `docs/COMPANY_OS_ARCHITECTURE_V0_2.md` (→v0.2.1: §§15–16 added; marked
insertions in §8.1, §10, §11.2, §14), `CLAUDE.md`, `governance/autonomy-model.yaml`,
`prompts/founding/FOUNDING_ENGINEER_PROMPT_V0_2.md`, `README.md`,
`docs/migration/COMPANY_OS_V0_2_MIGRATION_REPORT.md` (amendment note only).

Not modified: `constitution/AUTHORITY.md`; `decisions/approvals/0001`–`0008`;
`evidence/records/0001`–`0008`; `executives/**`; `docs/OPERATING_LOOP.md`; `governance/venture-registry.yaml`;
`governance/status-model.yaml`; `governance/executive-registry.yaml`; `skills/**`; `src/**`;
`tests/**`; both product repositories.

## 8. Tests and validation

```bash
pnpm verify   # pnpm typecheck && vitest run
```

Result recorded in the completion report. No source file and no test was touched by this
amendment, so no behaviour change is possible; the run confirms that rather than assumes it.
All four new/modified YAML files were additionally parsed with the repository's own `yaml`
loader — one genuine indentation defect was found in
`governance/decision-council-policy.yaml` (a mapping key following a sequence) and fixed before
the file was accepted.

## 9. Human–AI ownership

Gina approved the v0.2 specification, supplied both new architectural requirements in full
detail including the canonical patterns and the review schema, set the constraints, and gave the
sequencing correction that keeps Phase 0A first. The AI placed the requirements into the
existing architecture, wrote the policy and schema specifications, surfaced the three
reconciliations in §5 and the constitutional tension, and left every open question open. No
percentage attribution.

## 10. What changes next

Nothing is implemented. **Phase 0A structural hardening remains the next implementation
prerequisite**, to be built under the §16 engineering gate once bounded authorization is given.
The runtime council and provider adapter follow, subject to open Founder decision 7.
