/**
 * Canonical project identity resolution and the project-isolation invariant.
 * Phase 0A — decisions/approvals/0010-*.md; architecture §4.
 *
 * THE INVARIANT (docs/COMPANY_OS_ARCHITECTURE_V0_2.md §4):
 *   Every operational project-scoped state mutation must resolve to exactly one
 *   active canonical project_id.
 *
 * Two deliberate design choices, both load-bearing:
 *
 * 1. NAVIGATION AND WRITE ARE DIFFERENT QUESTIONS. `resolveIdentity` answers
 *    "what is this identity?" and will happily tell you that `pm-workflow` is
 *    superseded by `nodi`. `resolveProjectScopeForWrite` answers "may I write
 *    here?" and refuses. Knowing the successor is not authorization to use it.
 *
 * 2. NO SILENT REWRITING. A write against a superseded identity is REJECTED, and
 *    the caller is told the canonical successor so it can re-issue the request
 *    explicitly. Rewriting `pm-workflow` to `nodi` on the caller's behalf would
 *    conceal incorrect project context — which is exactly the failure this
 *    module exists to prevent.
 *
 * Everything here is deterministic: no I/O beyond the already-loaded registry,
 * no model calls, no clock, no environment.
 */
import {
  VENTURE_REGISTRY,
  activeVentures,
  assertVentureRegistryIntegrity,
  findVentureById,
  type Venture,
  type VentureRegistry,
} from "./venture-registry.js";

/** What an identity string turns out to be. */
export type IdentityResolution =
  | { kind: "active"; ventureId: string; projectId: string; name: string }
  | {
      kind: "superseded";
      ventureId: string;
      /** The canonical successor's venture id. Navigation only — never authorization. */
      supersededBy: string;
      /** The successor's canonical project_id. */
      canonicalProjectId: string;
      supersededOn?: string;
      supersededByDecision?: string;
    }
  | { kind: "unknown"; requested: string }
  | { kind: "missing" };

function normalize(identity: string | null | undefined): string | null {
  if (typeof identity !== "string") return null;
  const trimmed = identity.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Resolve any identity — venture id or active project_id — to what it actually is.
 *
 * Lookup order is venture id first, then active project_id. Venture ids are unique
 * (enforced by the registry loader) and only ACTIVE ventures are matched by
 * project_id, so this is unambiguous by construction rather than by convention.
 */
export function resolveIdentity(
  identity: string | null | undefined,
  registry: VentureRegistry = VENTURE_REGISTRY,
): IdentityResolution {
  assertVentureRegistryIntegrity(registry);
  const requested = normalize(identity);
  if (requested === null) return { kind: "missing" };

  const byId = findVentureById(requested, registry);
  const venture: Venture | undefined =
    byId ?? activeVentures(registry).find((v) => v.project_id === requested);

  if (venture === undefined) return { kind: "unknown", requested };

  if (venture.lifecycle === "superseded") {
    // Guaranteed present and active by the registry integrity checks.
    const successor = findVentureById(venture.superseded_by as string, registry) as Venture;
    return {
      kind: "superseded",
      ventureId: venture.id,
      supersededBy: successor.id,
      canonicalProjectId: successor.project_id,
      ...(venture.superseded_on === undefined ? {} : { supersededOn: venture.superseded_on }),
      ...(venture.superseded_by_decision === undefined
        ? {}
        : { supersededByDecision: venture.superseded_by_decision }),
    };
  }

  return {
    kind: "active",
    ventureId: venture.id,
    projectId: venture.project_id,
    name: venture.name,
  };
}

/** Resolve only an active canonical project_id. Venture ids are not aliases here. */
function resolveCanonicalProjectId(
  projectId: string,
  registry: VentureRegistry,
): Extract<IdentityResolution, { kind: "active" }> | Extract<IdentityResolution, { kind: "unknown" }> {
  assertVentureRegistryIntegrity(registry);
  const venture = activeVentures(registry).find((candidate) => candidate.project_id === projectId);
  return venture === undefined
    ? { kind: "unknown", requested: projectId }
    : { kind: "active", ventureId: venture.id, projectId: venture.project_id, name: venture.name };
}

export type WriteRejectionCode =
  | "missing_identity"
  | "unknown_identity"
  | "superseded_identity"
  | "conflicting_identity";

export type ProjectScopeResult =
  | { ok: true; projectId: string; ventureId: string }
  | {
      ok: false;
      code: WriteRejectionCode;
      reason: string;
      /**
       * Present only for `superseded_identity`. The caller must re-issue the write
       * against this identity explicitly; nothing here does it for them.
       */
      canonicalSuccessor?: string;
    };

export interface WriteScopeRequest {
  /** A venture id or an active project_id. */
  identity?: string | null;
  /** An explicit project_id, when the caller carries both. Must agree with `identity`. */
  projectId?: string | null;
}

/**
 * Resolve the project scope of an operational write. Fails closed.
 *
 * Rejects: no identity at all; an unknown identity; a superseded identity; and two
 * identities that disagree (the "write Twinko state through a Nodi identifier" case).
 */
export function resolveProjectScopeForWrite(
  request: WriteScopeRequest,
  registry: VentureRegistry = VENTURE_REGISTRY,
): ProjectScopeResult {
  const identity = normalize(request.identity);
  const explicitProjectId = normalize(request.projectId);

  if (identity === null && explicitProjectId === null) {
    return {
      ok: false,
      code: "missing_identity",
      reason:
        "Project identity is required for an operational write. Project scope is never inferred, defaulted, or omitted.",
    };
  }

  const resolutions: { input: string; source: "identity" | "project_id"; resolution: IdentityResolution }[] = [];
  if (identity !== null) {
    resolutions.push({ input: identity, source: "identity", resolution: resolveIdentity(identity, registry) });
  }
  if (explicitProjectId !== null) {
    resolutions.push({
      input: explicitProjectId,
      source: "project_id",
      resolution: resolveCanonicalProjectId(explicitProjectId, registry),
    });
  }

  for (const { input, source, resolution } of resolutions) {
    if (resolution.kind === "unknown") {
      return {
        ok: false,
        code: "unknown_identity",
        reason:
          source === "project_id"
            ? `Unknown active canonical project_id "${input}" — not in governance/venture-registry.yaml.`
            : `Unknown project identity "${input}" — not in governance/venture-registry.yaml.`,
      };
    }
    if (resolution.kind === "superseded") {
      return {
        ok: false,
        code: "superseded_identity",
        reason:
          `"${input}" is a superseded identity (superseded by "${resolution.supersededBy}") and cannot be the target of a new operational write. ` +
          `Re-issue this write explicitly against project_id "${resolution.canonicalProjectId}". ` +
          "The request is not rewritten automatically — a silently redirected write would conceal incorrect project context.",
        canonicalSuccessor: resolution.canonicalProjectId,
      };
    }
  }

  const active = resolutions
    .map((r) => r.resolution)
    .filter((r): r is Extract<IdentityResolution, { kind: "active" }> => r.kind === "active");

  const distinctProjects = new Set(active.map((r) => r.projectId));
  if (distinctProjects.size > 1) {
    return {
      ok: false,
      code: "conflicting_identity",
      reason:
        `Conflicting project identity: the request resolves to more than one active project (${[...distinctProjects].sort().join(", ")}). ` +
        "An operational write must resolve to exactly one canonical project_id.",
    };
  }

  const resolved = active[0] as Extract<IdentityResolution, { kind: "active" }>;
  return { ok: true, projectId: resolved.projectId, ventureId: resolved.ventureId };
}

/** Thrown when a write cannot be scoped to exactly one active canonical project. */
export class ProjectScopeError extends Error {
  readonly code: WriteRejectionCode;
  readonly canonicalSuccessor: string | undefined;

  constructor(result: Extract<ProjectScopeResult, { ok: false }>) {
    super(result.reason);
    this.name = "ProjectScopeError";
    this.code = result.code;
    this.canonicalSuccessor = result.canonicalSuccessor;
  }
}

/**
 * The enforcement point. Any operational project-scoped mutation calls this first
 * and uses the returned project_id — never the caller-supplied string.
 */
export function assertProjectScopeForWrite(
  request: WriteScopeRequest,
  registry: VentureRegistry = VENTURE_REGISTRY,
): string {
  const result = resolveProjectScopeForWrite(request, registry);
  if (!result.ok) throw new ProjectScopeError(result);
  return result.projectId;
}

/**
 * Collapse a set of identities to the single active canonical project they all
 * belong to. Rejects an empty set, and rejects any set spanning two projects —
 * this is what stops Nodi and Twinko state from being implicitly combined.
 */
export function resolveSingleProjectScope(
  identities: readonly (string | null | undefined)[],
  registry: VentureRegistry = VENTURE_REGISTRY,
): ProjectScopeResult {
  const present = identities.map(normalize).filter((v): v is string => v !== null);
  if (present.length === 0) {
    return {
      ok: false,
      code: "missing_identity",
      reason:
        "No project identity supplied. A project-scoped mutation must name its project; scope is never inherited or assumed.",
    };
  }

  let first: Extract<ProjectScopeResult, { ok: true }> | undefined;
  for (const identity of present) {
    const result = resolveProjectScopeForWrite({ identity }, registry);
    if (!result.ok) return result;
    if (first === undefined) {
      first = result;
    } else if (first.projectId !== result.projectId) {
      return {
        ok: false,
        code: "conflicting_identity",
        reason:
          `Project scope spans more than one active project ("${first.projectId}" and "${result.projectId}"). ` +
          "Ventures are operationally independent: their state may not be combined in one mutation.",
      };
    }
  }

  return first as Extract<ProjectScopeResult, { ok: true }>;
}
