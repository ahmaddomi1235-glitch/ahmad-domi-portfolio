/**
 * normalize-transcript.ts
 *
 * Turns raw YouTube auto-caption files (sources/transcripts/raw/<id>.ar.vtt) into clean, timestamped text
 * (sources/transcripts/clean/<id>.json + .txt). The output is a *working source* for drafting and verification —
 * it is never published as-is (sources/ is git-ignored).
 *
 * Run:  node scripts/content/normalize-transcript.ts            # all videos
 *       node scripts/content/normalize-transcript.ts <videoId>  # one video
 *
 * Node >= 22.18 runs this file directly (type stripping) — no build step, no dependencies.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type Segment = { start: number; text: string };
export type Paragraph = { start: number; text: string };
export type CleanTranscript = {
  id: string;
  language: string;
  source: "youtube-auto-captions";
  wordCount: number;
  paragraphs: Paragraph[];
};

const TIMING = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3}) --> /;
const INLINE_TAG = /<\d{2}:\d{2}:\d{2}\.\d{3}>|<\/?c[^>]*>/g;

function toSeconds(h: string, m: string, s: string, ms: string): number {
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;
}

/**
 * YouTube "rolling" captions repeat each line across cues. The *new* text of every cue is the line that carries
 * inline word timestamps, so we keep only those lines and drop the repeated ones.
 */
export function parseVtt(vtt: string): Segment[] {
  const lines = vtt.replace(/\r/g, "").split("\n");
  const segments: Segment[] = [];
  let cueStart = 0;
  for (const line of lines) {
    const timing = TIMING.exec(line);
    if (timing) {
      cueStart = toSeconds(timing[1], timing[2], timing[3], timing[4]);
      continue;
    }
    if (!/<\d{2}:\d{2}:\d{2}\.\d{3}>/.test(line)) continue;
    const text = line.replace(INLINE_TAG, "").replace(/\s+/g, " ").trim();
    if (text) segments.push({ start: cueStart, text });
  }
  return segments;
}

export function toParagraphs(segments: Segment[], windowSeconds = 30): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  let current: Paragraph | null = null;
  for (const seg of segments) {
    if (!current || seg.start - current.start >= windowSeconds) {
      current = { start: seg.start, text: seg.text };
      paragraphs.push(current);
    } else {
      current.text += ` ${seg.text}`;
    }
  }
  return paragraphs;
}

export function formatTime(seconds: number): string {
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function normalizeFile(rawDir: string, id: string): CleanTranscript | null {
  const candidates = [`${id}.ar.vtt`, `${id}.ar-orig.vtt`];
  const file = candidates.map((c) => join(rawDir, c)).find((p) => existsSync(p));
  if (!file) return null;
  const segments = parseVtt(readFileSync(file, "utf8"));
  const paragraphs = toParagraphs(segments);
  const wordCount = paragraphs.reduce((n, p) => n + p.text.split(" ").length, 0);
  return { id, language: "ar", source: "youtube-auto-captions", wordCount, paragraphs };
}

function main() {
  const root = process.cwd();
  const rawDir = join(root, "sources", "transcripts", "raw");
  const outDir = join(root, "sources", "transcripts", "clean");
  if (!existsSync(rawDir)) {
    console.error(`No raw captions at ${rawDir}. Run scripts/content/import-youtube.ts first.`);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });

  const only = process.argv[2];
  const ids = only
    ? [only]
    : [...new Set(readdirSync(rawDir).filter((f) => f.endsWith(".vtt")).map((f) => f.split(".")[0]))];

  let done = 0;
  for (const id of ids) {
    const clean = normalizeFile(rawDir, id);
    if (!clean) {
      console.warn(`skip ${id}: no Arabic captions`);
      continue;
    }
    writeFileSync(join(outDir, `${id}.json`), JSON.stringify(clean, null, 2), "utf8");
    writeFileSync(
      join(outDir, `${id}.txt`),
      clean.paragraphs.map((p) => `[${formatTime(p.start)}] ${p.text}`).join("\n\n"),
      "utf8",
    );
    console.log(`ok   ${id}  ${clean.paragraphs.length} paragraphs, ${clean.wordCount} words`);
    done++;
  }
  console.log(`\nnormalized ${done}/${ids.length} transcripts → ${outDir}`);
}

const invokedDirectly = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop() ?? "");
if (invokedDirectly) main();
