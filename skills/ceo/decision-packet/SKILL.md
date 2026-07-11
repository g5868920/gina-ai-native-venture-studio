# SKILL: CEO Decision Packet

Version: 0.1.0
Status: Chairwoman Approved — see `decisions/approvals/0001-phase1-governance-kernel.md` (approved by Gina, 2026-07-12)
Type: Documentation and schema only. This skill is not an autonomous agent, has no model API integration, and initiates no external actions.

---

## 1. Purpose and Trigger

Prepare a decision-ready packet so the Chairwoman can make a reserved decision quickly and with full context.

Trigger: a matter is classified as a reserved decision (see `constitution/AUTHORITY.md`), or any executive deliverable reaches `Chairwoman Decision Required`.

## 2. Role and Required Inputs

Role: AI CEO (or any executor — Claude, ChatGPT, Codex, Gemini, script, or human — following this file).

Required inputs:

- the question requiring decision, stated in one sentence;
- relevant canonical sources (decision logs, status documents, briefs) with file paths;
- prior related Chairwoman decisions, if any;
- evidence available, missing, or conflicting.

If a required input is missing, list it as missing. Do not fabricate it.

## 3. Source Priority

Follow the authority order in `CLAUDE.md` (Source of Truth). Chairwoman-approved decision records outrank all generated outputs. Chat history is not canonical.

## 4. Procedure

1. State the decision question and why it is reserved.
2. Summarize situation and complication from canonical sources, citing file paths.
3. Separate confirmed facts, statements, assumptions, and evidence gaps.
4. Present 2–4 viable options, including defer/do-nothing where relevant.
5. For each option: consequences, risks, reversibility, effort.
6. State the CEO-preferred recommendation and rationale.
7. List open questions and exactly what the Chairwoman is being asked to decide.
8. Set packet status to `CEO Recommended`, then `Chairwoman Decision Required` when submitted.

## 5. Expected Outputs

One decision packet (Markdown) under `generated/decision-packets/`, containing the sections above plus the provenance header required by `CLAUDE.md` (Generated Outputs).

## 6. Evidence Requirements

Every material claim cites a repo file path or is labeled Assumption or Evidence Gap. Missing evidence remains visible in the packet.

## 7. Allowed and Prohibited Actions

Allowed: reading canonical repo sources; drafting the packet; flagging conflicts.

Prohibited: approving anything; editing canonical files; modifying external venture repositories; external communication; implying Gina's approval; resolving source conflicts silently.

## 8. Approval Boundary

The packet's final status from this skill is at most `Chairwoman Decision Required`. Only Gina, via an explicit approval record (see `constitution/AUTHORITY.md` §4), can move any item to `Chairwoman Approved`. `CEO Recommended` is never approval.

## 9. Escalation Conditions

Stop and escalate to Gina when: sources materially conflict; required evidence is missing for a high-stakes decision; the decision appears irreversible; or classification (reserved vs. delegated) is unclear.

## 10. Quality Checklist

- [ ] Decision question stated in one sentence
- [ ] Facts, assumptions, and gaps separated
- [ ] ≥2 real options with trade-offs and reversibility
- [ ] Recommendation distinct from decision
- [ ] All claims sourced or labeled
- [ ] Status ≤ `Chairwoman Decision Required`
- [ ] Provenance header present

## 11. Writeback Requirements

The packet is written only under `generated/` (safe automatic writeback). The resulting Chairwoman decision, once made, is recorded by Gina (or at her direction) as a canonical decision record — never by this skill automatically.

## 12. Version and Status

- 0.1.0 — initial version, created under Phase 1 (Governance Kernel). Execution tooling arrives in a later approved phase; until then this file is documentation for any executor.
