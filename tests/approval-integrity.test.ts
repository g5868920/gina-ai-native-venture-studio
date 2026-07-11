/**
 * Governance integrity tests — Phase 1.
 *
 * Proves, mechanically, the four Chairwoman-required properties:
 *  1. "CEO Recommended" cannot become "Chairwoman Approved" automatically;
 *  2. "Chairwoman Approved" requires an explicit approval record;
 *  3. unknown statuses fail validation;
 *  4. a generated recommendation is not a canonical decision.
 */
import { describe, expect, it } from "vitest";
import { loadStatusModel, STATUS_MODEL } from "../src/governance/status-model.js";
import {
  canServeAsCanonicalDecision,
  isKnownStatus,
  validateTransition,
  type ApprovalRecord,
} from "../src/governance/validate-status.js";

const VALID_RECORD: ApprovalRecord = {
  recordPath: "memory/decisions/0002-example-decision.md",
  approvedBy: "Gina",
  approvedOn: "2026-07-11",
};

describe("status model integrity", () => {
  it("loads the canonical model with exactly 10 statuses", () => {
    const model = loadStatusModel();
    expect(model.statuses).toHaveLength(10);
    expect(model.approval.status).toBe("Chairwoman Approved");
    expect(model.approval.approver).toBe("Gina");
  });

  it("defines no direct transition from CEO Recommended to Chairwoman Approved", () => {
    expect(STATUS_MODEL.transitions["CEO Recommended"]).not.toContain("Chairwoman Approved");
  });
});

describe("1. CEO Recommended cannot become Chairwoman Approved automatically", () => {
  it("rejects the transition with no approval record", () => {
    const result = validateTransition("CEO Recommended", "Chairwoman Approved");
    expect(result.ok).toBe(false);
  });

  it("rejects the transition even WITH a valid approval record (must pass through Chairwoman Decision Required)", () => {
    const result = validateTransition("CEO Recommended", "Chairwoman Approved", {
      approvalRecord: VALID_RECORD,
    });
    expect(result.ok).toBe(false);
  });

  it("allows CEO Recommended -> Chairwoman Decision Required (the only path toward approval)", () => {
    expect(validateTransition("CEO Recommended", "Chairwoman Decision Required").ok).toBe(true);
  });
});

describe("2. Chairwoman Approved requires an explicit approval record", () => {
  it("rejects approval without a record", () => {
    const result = validateTransition("Chairwoman Decision Required", "Chairwoman Approved");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain("approval record");
  });

  it("rejects approval when approvedBy is not Gina", () => {
    const result = validateTransition("Chairwoman Decision Required", "Chairwoman Approved", {
      approvalRecord: { ...VALID_RECORD, approvedBy: "AI CEO" },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects approval with an empty record path", () => {
    const result = validateTransition("Chairwoman Decision Required", "Chairwoman Approved", {
      approvalRecord: { ...VALID_RECORD, recordPath: "  " },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects approval with a malformed date", () => {
    const result = validateTransition("Chairwoman Decision Required", "Chairwoman Approved", {
      approvalRecord: { ...VALID_RECORD, approvedOn: "July 11, 2026" },
    });
    expect(result.ok).toBe(false);
  });

  it("accepts approval only with a complete, explicit record", () => {
    const result = validateTransition("Chairwoman Decision Required", "Chairwoman Approved", {
      approvalRecord: VALID_RECORD,
    });
    expect(result.ok).toBe(true);
  });
});

describe("3. unknown statuses fail validation", () => {
  it("rejects unknown source and target statuses", () => {
    expect(validateTransition("Approved", "Chairwoman Approved").ok).toBe(false);
    expect(validateTransition("In Progress", "Done").ok).toBe(false);
    expect(isKnownStatus("Shipped")).toBe(false);
  });

  it("still enforces the allowed-transition graph for known statuses", () => {
    expect(validateTransition("Not Started", "In Progress").ok).toBe(true);
    expect(validateTransition("Not Started", "CEO Recommended").ok).toBe(false);
  });
});

describe("4. a generated recommendation is not a canonical decision", () => {
  it("rejects generated-origin artifacts", () => {
    expect(
      canServeAsCanonicalDecision({
        origin: "generated",
        path: "generated/reports/ceo-recommendation.md",
      }),
    ).toBe(false);
  });

  it("rejects anything under generated/ regardless of claimed origin", () => {
    expect(
      canServeAsCanonicalDecision({ origin: "canonical", path: "generated/decision.md" }),
    ).toBe(false);
  });

  it("accepts canonical-origin records outside generated/", () => {
    expect(
      canServeAsCanonicalDecision({
        origin: "canonical",
        path: "memory/decisions/0002-example-decision.md",
      }),
    ).toBe(true);
  });
});
