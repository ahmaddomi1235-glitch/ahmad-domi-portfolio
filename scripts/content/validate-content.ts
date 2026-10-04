/**
 * validate-content.ts — content quality gate.
 *
 *   npm run validate            # exits 1 if any error-level rule fails
 *   npm run validate -- --json  # machine-readable report
 *
 * Rules live in src/lib/kb/validate.ts (shared with the site build, which refuses to build on errors).
 * Highlights: missing author/summary/source, invalid related ids, duplicate slugs/intents/terms, unpublished links,
 * thin bodies, PAID nodes published, PUBLIC pages containing paid-material markers, learningAim/criterion without an
 * official source, insecure/invalid URLs, generic-filler openings.
 */
import { loadAllNodes } from "../../src/lib/kb/load.ts";
import { summarize, validateNodes } from "../../src/lib/kb/validate.ts";

const json = process.argv.includes("--json");
const { nodes, files } = loadAllNodes();
const issues = validateNodes(nodes).map((i) => ({ ...i, file: files.get(i.id)?.replace(process.cwd(), "") }));
const { errors, warnings } = summarize(issues);

const by = (s: string) => nodes.filter((n) => n.status === s).length;
const types = [...new Set(nodes.map((n) => n.type))].map((t) => `${t}:${nodes.filter((n) => n.type === t).length}`).join("  ");

if (json) {
  console.log(JSON.stringify({ nodes: nodes.length, published: by("published"), draft: by("draft"), errors, warnings, issues }, null, 2));
} else {
  console.log(`Nodes: ${nodes.length}  (published ${by("published")}, reviewed ${by("reviewed")}, draft ${by("draft")})`);
  console.log(types);
  for (const i of issues) console.log(`${i.level === "error" ? "ERROR" : "warn "}  [${i.id}] ${i.message}${i.file ? `  — ${i.file}` : ""}`);
  console.log(`\n${errors} error(s), ${warnings} warning(s)`);
}
process.exit(errors ? 1 : 0);
