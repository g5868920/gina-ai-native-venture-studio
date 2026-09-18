/**
 * Canonical-repository preflight. Phase 0A — decisions/approvals/0010-*.md §10.
 *
 * The stale duplicate that motivated this check has been deleted (Founder decision,
 * 2026-09-01, remediating F-02). These rules are retained deliberately: they guard
 * against ANY future copy, which is a recurring hazard on a developer machine, not
 * only against the one that has been removed.
 *
 * This module is deliberately minimal and read-only: it asserts what the canonical
 * checkout looks like and never deletes, moves, or modifies anything.
 *
 * Independent signals, any failure of which is sufficient:
 *   1. Directory name — a duplicate is named "… 2", "… copy", "_ARCHIVED…", and so on.
 *   2. Marker files — all were added at or after Company OS v0.2, so a clone that
 *      predates v0.2 cannot have them.
 *   3. Git origin — checked ONLY when it can be read, and only for a MISMATCH.
 *
 * On (3): a copy of this repository carries an IDENTICAL origin — as the now-deleted
 * duplicate did — so origin cannot discriminate the threat this check exists for;
 * signals (1) and (2) do. Treating an unreadable origin as a failure would have made
 * git a hard runtime dependency and would reject legitimate checkouts that have no
 * `.git` at all (an export, an archive, a copied tree), while catching nothing extra.
 * So a missing origin is inconclusive, not disqualifying; a mismatched one still fails.
 *
 * Deterministic: local filesystem and local Git metadata only; no network or clock.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z } from "zod";

const AssertionSchema = z
  .object({
    version: z.string(),
    status: z.string(),
    canonical: z
      .object({
        repository_name: z.string().min(1),
        remote: z.string().min(1),
        marker_files: z.array(z.string().min(1)).min(1),
      })
      .strict(),
    stale_directory_suffixes: z.array(z.string().min(1)).min(1),
    stale_directory_prefixes: z.array(z.string().min(1)).min(1),
    known_stale_copies: z.array(z.record(z.string(), z.unknown())),
  })
  .strict();

export type CanonicalRepoAssertion = z.infer<typeof AssertionSchema>;

/** Repository root, derived from this module's own location — not from cwd. */
export const REPO_ROOT = fileURLToPath(new URL("../../", import.meta.url));

const ASSERTION_PATH = join(REPO_ROOT, "governance/canonical-repository.yaml");

export function loadCanonicalRepoAssertion(path: string = ASSERTION_PATH): CanonicalRepoAssertion {
  return AssertionSchema.parse(parse(readFileSync(path, "utf8")));
}

/**
 * True when a directory path looks like a duplicated copy rather than the
 * canonical checkout. Pure string predicate — safe to test without a filesystem.
 */
export function isStaleCopyPath(
  path: string,
  suffixes: readonly string[] = loadCanonicalRepoAssertion().stale_directory_suffixes,
  prefixes: readonly string[] = loadCanonicalRepoAssertion().stale_directory_prefixes,
): boolean {
  const name = basename(path.replace(/[/\\]+$/, ""));
  return suffixes.some((suffix) => name.endsWith(suffix)) || prefixes.some((prefix) => name.startsWith(prefix));
}

function normalizeRemote(remote: string): string {
  const trimmed = remote.trim().replace(/\/$/, "").replace(/\.git$/, "");
  const ssh = /^git@([^:]+):(.+)$/.exec(trimmed);
  return ssh === null ? trimmed : `https://${ssh[1]}/${ssh[2]}`;
}

function readOriginRemote(root: string): string | null {
  try {
    return execFileSync("git", ["-C", root, "remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

export interface CanonicalRepoCheck {
  ok: boolean;
  root: string;
  errors: string[];
}

/**
 * Check whether `root` is the canonical Studio checkout. Fails closed: any signal
 * of a stale copy is an error, never a warning to be scrolled past.
 */
export function checkCanonicalRepository(
  root: string = REPO_ROOT,
  assertion: CanonicalRepoAssertion = loadCanonicalRepoAssertion(),
): CanonicalRepoCheck {
  const errors: string[] = [];

  if (isStaleCopyPath(root, assertion.stale_directory_suffixes, assertion.stale_directory_prefixes)) {
    errors.push(
      `Directory name "${basename(root.replace(/[/\\]+$/, ""))}" matches a duplicated-copy pattern. ` +
        `The canonical Studio repository is named "${assertion.canonical.repository_name}" ` +
        `(${assertion.canonical.remote}). A stale copy carries superseded governance — stop and switch to the canonical checkout.`,
    );
  }

  // Inconclusive when unreadable (see the module docstring); disqualifying when it
  // actively contradicts the approved canonical remote.
  const origin = readOriginRemote(root);
  if (origin !== null && normalizeRemote(origin) !== normalizeRemote(assertion.canonical.remote)) {
    errors.push(
      `Git origin "${origin}" does not match the approved canonical remote "${assertion.canonical.remote}".`,
    );
  }

  const missing = assertion.canonical.marker_files.filter((rel) => !existsSync(join(root, rel)));
  if (missing.length > 0) {
    errors.push(
      `Missing Company OS v0.2 marker file(s): ${missing.join(", ")}. ` +
        "A checkout without these predates Company OS v0.2 and its governance is superseded.",
    );
  }

  return { ok: errors.length === 0, root, errors };
}

/**
 * Preflight for any entry point that acts on repository state. Prints the reason
 * and returns false rather than throwing, so a CLI can exit non-zero cleanly.
 */
export function preflightCanonicalRepository(root: string = process.cwd()): boolean {
  const check = checkCanonicalRepository(root);
  if (check.ok) return true;
  console.error("REFUSING TO RUN — this does not look like the canonical Studio repository.");
  for (const error of check.errors) console.error(`  - ${error}`);
  console.error(`  Checked: ${check.root}`);
  console.error("  See governance/canonical-repository.yaml. Nothing was read or written.");
  return false;
}
