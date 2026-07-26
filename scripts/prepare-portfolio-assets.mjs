#!/usr/bin/env node
/**
 * Scans configured source folders for candidate student-result images and
 * copies ONLY the ones explicitly approved in `scripts/asset-approvals.json`
 * into `public/images/student-results/`.
 *
 * Safety rules (do not weaken these):
 *  - Original source files are NEVER moved, renamed, or deleted.
 *  - A file is copied ONLY if it has a matching, reviewed entry in
 *    asset-approvals.json (see the "approvals" array below). Being merely
 *    "found" by the scanner is not consent to publish.
 *  - Existing files in the destination are never overwritten; duplicate
 *    target names are skipped with a warning instead.
 *
 * Usage: node scripts/prepare-portfolio-assets.mjs
 */

import { readdirSync, statSync, copyFileSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SOURCE_DIRS = [join(ROOT, "images_source")];
const DEST_DIR = join(ROOT, "public", "images", "student-results");
const APPROVALS_FILE = join(ROOT, "scripts", "asset-approvals.json");
const REPORT_FILE = join(ROOT, "scripts", "asset-scan-report.json");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const RESULT_KEYWORDS = [
  "result", "results", "student", "students", "btec", "grade", "marks", "outcome",
  "نتائج", "نتيجة", "طالب", "طلاب", "علامات", "معدل",
];

function scanSourceDirs() {
  const found = [];
  for (const dir of SOURCE_DIRS) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      const fullPath = join(dir, name);
      if (statSync(fullPath).isDirectory()) continue;
      if (!IMAGE_EXTENSIONS.has(extname(name).toLowerCase())) continue;

      const lower = name.toLowerCase();
      const matchesKeyword = RESULT_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
      found.push({ path: fullPath, name, dir, matchesKeyword });
    }
  }
  return found;
}

function loadApprovals() {
  if (!existsSync(APPROVALS_FILE)) return [];
  try {
    const parsed = JSON.parse(readFileSync(APPROVALS_FILE, "utf-8"));
    return Array.isArray(parsed.approvals) ? parsed.approvals : [];
  } catch {
    console.warn(`Could not parse ${APPROVALS_FILE}; treating as no approvals.`);
    return [];
  }
}

function main() {
  const found = scanSourceDirs();
  const approvals = loadApprovals();
  const approvalByName = new Map(approvals.map((a) => [a.sourceFileName, a]));

  const report = { scannedAt: new Date().toISOString(), totalFound: found.length, copied: [], skipped: [] };

  if (found.length > 0 && !existsSync(DEST_DIR)) {
    mkdirSync(DEST_DIR, { recursive: true });
  }

  for (const file of found) {
    const approval = approvalByName.get(file.name);

    if (!approval) {
      report.skipped.push({
        file: file.name,
        reason: "No reviewed approval entry in scripts/asset-approvals.json — treated as not cleared for publication.",
        matchesKeyword: file.matchesKeyword,
      });
      continue;
    }

    if (!approval.privacyReviewed) {
      report.skipped.push({ file: file.name, reason: "Approval entry present but privacyReviewed is not true." });
      continue;
    }

    const destPath = join(DEST_DIR, approval.publishedFileName ?? basename(file.name));
    if (existsSync(destPath)) {
      report.skipped.push({ file: file.name, reason: `Destination already exists: ${destPath}` });
      continue;
    }

    copyFileSync(file.path, destPath);
    report.copied.push({ source: file.name, destination: destPath, id: approval.id });
  }

  writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), "utf-8");

  console.log(`Scanned ${found.length} candidate image(s).`);
  console.log(`Copied: ${report.copied.length}. Skipped: ${report.skipped.length}.`);
  console.log(`Full report written to ${REPORT_FILE}`);
  if (report.copied.length > 0) {
    console.log("Remember to add matching entries to src/content/studentResults.ts for each copied file.");
  }
}

main();
