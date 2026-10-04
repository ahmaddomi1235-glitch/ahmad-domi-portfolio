/**
 * import-youtube.ts
 *
 * Imports a channel's public videos into the content pipeline:
 *   1. lists the channel's videos and playlists with yt-dlp (public data only, no login),
 *   2. downloads Arabic captions + metadata into sources/transcripts/raw (git-ignored),
 *   3. writes DRAFT video nodes to content/_drafts/videos.import.json.
 *
 * Nothing is published by this script. A human curates drafts into content/videos/ (concept-first title,
 * verified unit/concept mapping, chapters) and flips `status` to "published".
 *
 * Requirements: yt-dlp on PATH.  Run:  node scripts/content/import-youtube.ts [@handle] [--force]
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { AUTHOR_ID, type VideoNode } from "../../src/lib/kb/types.ts";

const handle = process.argv.find((a) => a.startsWith("@")) ?? "@AhmadDomiedu";
const force = process.argv.includes("--force");
const channel = `https://www.youtube.com/${handle}`;
const root = process.cwd();
const rawDir = join(root, "sources", "transcripts", "raw");
const draftDir = join(root, "content", "_drafts");
mkdirSync(rawDir, { recursive: true });
mkdirSync(draftDir, { recursive: true });

function ytdlp(args: string[]): { ok: boolean; out: string; err: string } {
  const r = spawnSync("yt-dlp", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  return { ok: r.status === 0, out: r.stdout ?? "", err: r.stderr ?? "" };
}

type Flat = { id: string; title: string; duration?: number };

function listFlat(url: string): Flat[] {
  const r = ytdlp(["--flat-playlist", "--dump-json", url]);
  return r.out
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l) as Flat);
}

async function watchPage(id: string): Promise<{ date: string; length: number; playable: boolean }> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${id}`, { headers: { "Accept-Language": "en-US" } });
    const html = await res.text();
    const date = /"(?:uploadDate|publishDate)":"(\d{4}-\d{2}-\d{2})/.exec(html)?.[1] ?? "";
    const length = Number(/"lengthSeconds":"(\d+)"/.exec(html)?.[1] ?? 0);
    const status = /"playabilityStatus":\{"status":"([A-Z_]+)"/.exec(html)?.[1];
    return { date, length, playable: status === "OK" };
  } catch {
    return { date: "", length: 0, playable: false };
  }
}

console.log(`Listing ${channel}/videos …`);
const videos = listFlat(`${channel}/videos`);
console.log(`  ${videos.length} videos`);

// playlist membership
const membership = new Map<string, string>();
const playlistTitles = new Map<string, string>();
const plRaw = ytdlp(["--flat-playlist", "--dump-json", `${channel}/playlists`]);
for (const line of plRaw.out.split("\n").filter(Boolean)) {
  const pl = JSON.parse(line) as { id: string; title: string; url?: string };
  playlistTitles.set(pl.id, pl.title);
  const members = listFlat(pl.url ?? `https://www.youtube.com/playlist?list=${pl.id}`);
  for (const m of members) if (!membership.has(m.id)) membership.set(m.id, pl.id);
}
console.log(`  ${playlistTitles.size} playlists`);

const drafts: VideoNode[] = [];
for (const v of videos) {
  const infoFile = join(rawDir, `${v.id}.info.json`);
  if (force || !existsSync(infoFile)) {
    console.log(`  fetching ${v.id}`);
    ytdlp([
      "--skip-download",
      "--write-auto-subs",
      "--write-subs",
      "--sub-langs",
      "ar.*,ar",
      "--sub-format",
      "vtt",
      "--write-info-json",
      "-o",
      join(rawDir, "%(id)s"),
      `https://www.youtube.com/watch?v=${v.id}`,
    ]);
    // A missing caption track makes the call above fail before metadata is written — fetch metadata on its own.
    if (!existsSync(infoFile)) {
      ytdlp(["--skip-download", "--write-info-json", "-o", join(rawDir, "%(id)s"), `https://www.youtube.com/watch?v=${v.id}`]);
    }
  }
  const hasInfo = existsSync(infoFile);
  let info = hasInfo ? (JSON.parse(readFileSync(infoFile, "utf8")) as { upload_date?: string; duration?: number; description?: string }) : {};
  let playable = hasInfo;
  if (!hasInfo) {
    // yt-dlp's extractor can fail on some public videos (e.g. no JS runtime installed). Fall back to the public watch
    // page, which states upload date, length and playability.
    const page = await watchPage(v.id);
    playable = page.playable;
    info = { upload_date: page.date.replaceAll("-", ""), duration: page.length };
  }
  const hasTranscript = existsSync(join(rawDir, `${v.id}.ar.vtt`)) || existsSync(join(rawDir, `${v.id}.ar-orig.vtt`));
  const d = info.upload_date ?? "";
  drafts.push({
    id: `video-${v.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`.replace(/-+$/g, ""),
    type: "Video",
    title_ar: v.title,
    title_en: v.title,
    slug: `video-${v.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`.replace(/-+$/g, ""),
    summary: `فيديو من قناة أحمد دومي: ${v.title}`,
    unit: null,
    learningAim: null,
    criterion: null,
    concepts: [],
    questions: [],
    sourceType: "ahmad-video",
    sourceReferences: [{ kind: "video", label: v.title, url: `https://www.youtube.com/watch?v=${v.id}` }],
    youtubeId: v.id,
    author: AUTHOR_ID,
    lastReviewed: new Date().toISOString().slice(0, 10),
    visibility: "PUBLIC",
    related: [],
    officialSource: null,
    status: "draft", // imports are always drafts
    originalTitle: v.title,
    conceptTitle_ar: v.title, // to be rewritten concept-first by a human
    duration: info.duration ?? v.duration ?? 0,
    uploadDate: d ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : "",
    playlistId: membership.get(v.id) ?? null,
    unitId: null,
    conceptIds: [],
    hasTranscript,
    availability: playable ? "public" : "unavailable",
    chapters: [],
  });
}

writeFileSync(join(draftDir, "videos.import.json"), JSON.stringify({ playlists: Object.fromEntries(playlistTitles), videos: drafts }, null, 2), "utf8");
console.log(`\nWrote ${drafts.length} draft nodes → content/_drafts/videos.import.json`);
console.log(`With captions: ${drafts.filter((d) => d.hasTranscript).length}; unavailable: ${drafts.filter((d) => d.availability === "unavailable").length}`);
console.log("Next: node scripts/content/normalize-transcript.ts, then curate drafts into content/videos/.");
