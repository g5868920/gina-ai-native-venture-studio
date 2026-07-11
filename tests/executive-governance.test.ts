/**
 * Executive System v0.1 — governance integrity tests.
 *
 * Proves the six Chairwoman-required properties:
 *  1. all seven executives are uniquely registered;
 *  2. activation states are valid (and match the approved assignment);
 *  3. no executive can approve reserved decisions;
 *  4. UX/UI ownership belongs to the CPO;
 *  5. technical privacy and legal privacy responsibilities remain separate;
 *  6. recommendations cannot become canonical approvals automatically.
 */
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  EXECUTIVE_REGISTRY,
  loadExecutiveRegistry,
  mayApproveReservedDecisions,
  ownerOf,
} from "../src/governance/executive-registry.js";
import {
  canServeAsCanonicalDecision,
  validateApprovalRecord,
  validateTransition,
} from "../src/governance/validate-status.js";

describe("1. all seven executives are uniquely registered", () => {
  it("registers exactly ceo, cpo, cto, cmo, cbo, cfo, clo with unique ids", () => {
    const ids = EXECUTIVE_REGISTRY.executives.map((e) => e.id);
    expect(ids).toHaveLength(7);
    expect(new Set(ids).size).toBe(7);
    for (const id of ["ceo", "cpo", "cto", "cmo", "cbo", "cfo", "clo"]) {
      expect(ids).toContain(id);
    }
  });

  it("every registered contract file exists", () => {
    for (const exec of EXECUTIVE_REGISTRY.executives) {
      expect(existsSync(exec.contract)).toBe(true);
    }
  });

  it("loader enforces integrity (registry loads without error)", () => {
    expect(loadExecutiveRegistry().version).toBe("0.1.0");
  });
});

describe("2. activation states are valid", () => {
  it("uses only declared activation states", () => {
    for (const exec of EXECUTIVE_REGISTRY.executives) {
      expect(EXECUTIVE_REGISTRY.activation_states).toContain(exec.activation);
    }
  });

  it("matches the approved assignment: CEO/CPO/CTO Active, CMO/CBO Standby, CFO/CLO Limited", () => {
    const activation = Object.fromEntries(
      EXECUTIVE_REGISTRY.executives.map((e) => [e.id, e.activation]),
    );
    expect(activation["ceo"]).toBe("Active");
    expect(activation["cpo"]).toBe("Active");
    expect(activation["cto"]).toBe("Active");
    expect(activation["cmo"]).toBe("Standby");
    expect(activation["cbo"]).toBe("Standby");
    expect(activation["cfo"]).toBe("Limited");
    expect(activation["clo"]).toBe("Limited");
  });
});

describe("3. no executive can approve reserved decisions", () => {
  it("may_approve_reserved_decisions is false for every executive", () => {
    for (const exec of EXECUTIVE_REGISTRY.executives) {
      expect(mayApproveReservedDecisions(exec.id)).toBe(false);
    }
  });

  it("an approval record signed by any executive title is rejected", () => {
    for (const exec of EXECUTIVE_REGISTRY.executives) {
      const result = validateApprovalRecord({
        recordPath: "decisions/approvals/fake.md",
        approvedBy: exec.title,
        approvedOn: "2026-07-12",
      });
      expect(result.ok).toBe(false);
    }
  });

  it("the executive output ceiling is below the approval status", () => {
    expect(EXECUTIVE_REGISTRY.output_ceiling).toBe("CEO Recommended");
  });
});

describe("4. UX/UI ownership belongs to CPO", () => {
  it("cpo owns ux-ui and usability; no one else does", () => {
    expect(ownerOf("ux-ui")).toBe("cpo");
    expect(ownerOf("usability")).toBe("cpo");
  });

  it("cto owns technical-feasibility, not UX", () => {
    expect(ownerOf("technical-feasibility")).toBe("cto");
    const cto = EXECUTIVE_REGISTRY.executives.find((e) => e.id === "cto");
    expect(cto?.owns ?? []).not.toContain("ux-ui");
  });
});

describe("5. technical privacy and legal privacy remain separate", () => {
  it("cto owns technical-privacy-controls; clo owns privacy-law", () => {
    expect(ownerOf("technical-privacy-controls")).toBe("cto");
    expect(ownerOf("privacy-law")).toBe("clo");
  });

  it("no single executive owns both sides", () => {
    for (const exec of EXECUTIVE_REGISTRY.executives) {
      const ownsBoth =
        exec.owns.includes("technical-privacy-controls") && exec.owns.includes("privacy-law");
      expect(ownsBoth).toBe(false);
    }
  });
});

describe("6. recommendations cannot become canonical approvals automatically", () => {
  it("CEO Recommended -> Chairwoman Approved is rejected", () => {
    expect(validateTransition("CEO Recommended", "Chairwoman Approved").ok).toBe(false);
  });

  it("a generated executive recommendation is not a canonical decision", () => {
    expect(
      canServeAsCanonicalDecision({
        origin: "generated",
        path: "generated/reviews/cpo-roadmap-recommendation.md",
      }),
    ).toBe(false);
  });
});
