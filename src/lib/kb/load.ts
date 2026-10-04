/**
 * Reads /content/**\/*.json into typed nodes. Server-only (build time / scripts).
 *
 * A file may hold:
 *   - one node,
 *   - an array of nodes, or
 *   - `{ "$defaults": {...}, "items": [ {...}, ... ] }` — shared fields merged into every item
 *     (keeps large collections such as the glossary and the video list compact).
 *
 * Folders/files beginning with "_" are ignored (`_drafts` = generated drafts, never routed).
 * A few derived fields are filled in for GlossaryTerm and Video items so authors do not repeat themselves.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { KbNode } from "./types.ts";

export function contentRoot(): string {
  return join(process.cwd(), "content");
}

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name.startsWith("_")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".json")) out.push(full);
  }
  return out;
}

type Raw = Record<string, unknown>;

function derive(item: Raw): Raw {
  const n = { ...item };
  if (n.type === "GlossaryTerm") {
    n.title_ar ??= n.term_ar;
    n.title_en ??= n.term_en;
    n.summary ??= n.definition_ar;
    n.slug ??= n.id;
  }
  if (n.type === "Video") {
    n.title_ar ??= n.conceptTitle_ar;
    n.title_en ??= n.originalTitle;
    n.slug ??= n.id;
    n.unit ??= n.unitId ?? null;
    n.concepts ??= n.conceptIds ?? [];
    n.sourceReferences ??= [
      { kind: "video", label: String(n.originalTitle ?? n.conceptTitle_ar), url: `https://www.youtube.com/watch?v=${n.youtubeId}` },
    ];
  }
  return n;
}

export function loadAllNodes(root = contentRoot()): { nodes: KbNode[]; files: Map<string, string> } {
  const nodes: KbNode[] = [];
  const files = new Map<string, string>();
  for (const file of walk(root).sort()) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      throw new Error(`Invalid JSON in ${file}: ${(e as Error).message}`);
    }
    let list: Raw[];
    if (Array.isArray(parsed)) list = parsed as Raw[];
    else if (parsed && typeof parsed === "object" && Array.isArray((parsed as Raw).items)) {
      const defaults = ((parsed as Raw).$defaults ?? {}) as Raw;
      list = ((parsed as Raw).items as Raw[]).map((i) => ({ ...defaults, ...i }));
    } else list = [parsed as Raw];
    for (const raw of list) {
      const item = derive(raw) as unknown as KbNode;
      nodes.push(item);
      files.set(item.id, file);
    }
  }
  return { nodes, files };
}
