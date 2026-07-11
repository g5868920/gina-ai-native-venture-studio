---
# Venture update — fill every field; schema: schemas/venture-update.schema.yaml
# Missing facts go under assumptions_unknowns as unknown. Never guess.
venture: pm-workflow # or: twinko (must match governance/venture-registry.yaml)
reporting_period:
  start: 2026-01-01
  end: 2026-01-07
current_status: "One-line honest status."
completed:
  - "Done item with evidence reference where available."
in_progress:
  - "Item currently being worked."
next_priorities:
  - "Priority for the coming period."
decisions_needed:
  - "Decision required from Gina (listing it here is not approval)."
risks:
  - "Risk, stated plainly."
blockers:
  - "Blocker — what is missing and who owns resolution."
dependencies:
  - "Dependency (name the other venture explicitly if cross-venture)."
evidence_references:
  - "path/or/link supporting the claims above"
assumptions_unknowns:
  - "Anything not known — recorded as unknown, never invented."
---

Free-text notes below the frontmatter are optional and are NOT parsed into the brief.
