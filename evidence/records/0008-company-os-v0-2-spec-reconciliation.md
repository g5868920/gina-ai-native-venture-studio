# Evidence Record 0008 — Company OS v0.2 Specification Reconciliation

Date: 2026-09-01
Decision: `decisions/approvals/0008-company-os-v0-2-ai-native-operating-model.md`
Type: Specification and governance migration. **No product functionality implemented.**
Public-use status: Internal. Portfolio-eligible as a governance/architecture case study; contains no external validation claim.

---

## 1. Before state

Company OS v0.1: file-based, approval-gated decision preparation. Studio repository at `main`,
clean, synced with `origin/main`, HEAD `a2a455a`; `pnpm verify` green (typecheck + 42 tests /
3 suites). Ventures registered as `pm-workflow` and `twinko`. Autonomous agents prohibited
(`CLAUDE.md` v0.1); web dashboard out of scope; no autonomy model, structured state, event
model, or Control Tower. Twinko recorded across both venture handoffs as the first internal
customer / dogfooding case for PM Workflow.

## 2. Problem and constraints

Every unit of AI work terminated at a human approval, so Founder attention scaled linearly with
company activity. Gina directed a move to exception-based management with bounded autonomous
agents, two independent ventures (Twinko, Nodi), and a P0 Founder Control Tower — without
losing the governance kernel, history, or portability.

Constraints: preserve history rather than delete it; do not silently resolve consequential
ambiguity; do not implement; do not introduce speculative infrastructure.

## 3. Gina's framing, constraints, and decision

Gina supplied the full v0.2 operating direction in writing (23 numbered sections, 2026-09-01),
including: the target org model; the venture decoupling; the requirement that Nodi not become a
third venture; the accountable-orchestration constraint against swarms; the Skills principle;
the Claude Code boundary; the Agent SDK as reversible working direction; the Control Tower
question set; the dashboard data principle; the autonomy factors; the escalation model; the
event/daily-brief model; the MCP and n8n deferrals; and the requirement that one thin loop be
proven before expansion.

Gina also directed the method: audit first, produce a migration report before editing, prefer
supersession over deletion, and flag ambiguity rather than invent structure.

## 4. AI contribution

Read-only audit of three repositories (Studio, `pm-workflow-copilot`, `twinko-app`); the
KEEP/MODIFY/SUPERSEDE/ADD/REMOVE classification; the reuse assessment; the 18-row architecture
delta; the file-level migration plan; the autonomy model's level definitions, resolution rule,
and conservative initial action classes; the amendment wording that preserves history; and the
identification of the ambiguities in §7.

## 5. Alternatives considered

- **Rewrite the governance kernel for autonomy.** Rejected — the kernel's invariants are what
  make autonomy safe; rebuilding would have discarded 42 mechanical proofs for no gain.
- **Rename the `pm-workflow` venture id to `nodi` outright.** Rejected — it would have
  invalidated the historical W28 venture updates. Retained as a superseded alias instead.
- **Create a parallel agent org alongside the executive roles.** Rejected — `0007` §7 S6
  forbids instantiating roles without a Chairwoman decision, and two org models would have
  produced two sources of accountability.
- **Define all ten structured-state schemas now.** Rejected — over-engineering ahead of the
  first slice; entities are specified, schemas deferred to implementation.
- **Delete the stale duplicate Studio clone.** Rejected — destructive and out of scope for a
  specification pass; flagged for Gina.

## 6. Implementation

Files added: `docs/migration/COMPANY_OS_V0_2_MIGRATION_REPORT.md`,
`docs/COMPANY_OS_ARCHITECTURE_V0_2.md`, `governance/autonomy-model.yaml`,
`decisions/approvals/0008-*.md`, `prompts/founding/FOUNDING_ENGINEER_PROMPT_V0_2.md`, this record.

Files modified: `CLAUDE.md`, `constitution/AUTHORITY.md` (v0.2.0, additive),
`governance/venture-registry.yaml` (v0.2.0), `executives/EXECUTIVE_OPERATING_MATRIX.md`
(amendment header), `executives/HANDOFF_RULES.md` §5, `docs/OPERATING_LOOP.md` (amendment
header), `README.md`, `tests/portfolio-review.test.ts` (one assertion, for consistency with the
registry change).

Files deliberately not modified: `decisions/approvals/0001`–`0007`; `evidence/records/0001`–`0007`;
`memory/milestones/*`; `handoffs/**`; `inputs/**`; `samples/**`; `skills/**`; `src/**`;
`executives/*/OPERATING_CONTRACT.md`; both product repositories.

## 7. Unresolved risks and open questions

Recorded in `0008` §Remaining Founder Decisions and expanded in the migration report §E:

1. Agent ↔ executive mapping beyond Product/Engineering (Research/Strategy split; Design,
   Growth, Data, Finance/Ops, Legal/Trust unmapped).
2. `pm-workflow-copilot` still names itself "AI-Native Product Workflow Copilot" in its own
   `CLAUDE.md` and `docs/architecture-boundaries.md` while `docs/v2/nodi/` is current — that
   repository's own reserved decision.
3. Repository topology for the Control Tower and agent runtime.
4. Structured state store: file-backed records vs. embedded database.
5. Initial Autopilot boundary — nothing starts at Autopilot today.
6. The stale duplicate Studio clone at `../gina-ai-native-venture-studio 2/`.
7. No new active milestone record was written; the July milestone still reads as active. This
   is surfaced, not silently resolved, and is the first act of the implementation phase.
8. `src/governance/venture-registry.ts` does not yet enforce `lifecycle` or `project_id`, so
   the supersession of `pm-workflow` is documented but not mechanically guaranteed.

## 8. Tests and validation

```bash
pnpm verify   # pnpm typecheck && vitest run
```

Baseline before changes: typecheck clean; **42 tests, 3 suites, all passing**.
After changes: re-run and report the exact result in the completion report. No test was
weakened; the one assertion changed was widened to match the new registry and still asserts
`read-only` on every venture.

## 9. Human–AI ownership

Gina framed the problem, supplied the entire target operating model and its constraints, set
the method (audit before editing, supersede rather than delete, flag rather than infer), and
made every decision recorded in `0008`. The AI performed the repository audit, produced the
migration analysis, drafted the specification set, and identified the ambiguities — and
resolved none of the consequential ones. No percentage attribution.

## 10. What changes next

Nothing is implemented. The next step is Founder review of this specification set, then a
bounded authorization for the first vertical slice, beginning with registry enforcement.
