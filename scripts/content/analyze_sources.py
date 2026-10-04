#!/usr/bin/env python3
"""
analyze_sources.py — derives the classified source registry from the read-only inventory.

    python scripts/content/inventory_sources.py "<source folder>"      # 1) inventory (read-only)
    python scripts/content/analyze_sources.py                           # 2) analysis + registry + report

Inputs : sources/registry/inventory.json, sources/extracted/*.txt, public/documents/**/*.pdf
         optional sources/registry/overrides.json  {"<id>": {"category":…, "visibility":…, "unit":…, "note":…}}
Outputs: sources/registry/source-registry.json   (per-file decision record)
         sources/registry/REPORT.md              (human summary)
Everything lives under sources/ (git-ignored). The overrides hold the per-file editorial decisions so that file names
of private material never enter the public repository.

Default policy: anything not explicitly cleared is `visibility: PRIVATE` and `status: draft`.
"""
import json, re, sys, io
from collections import defaultdict
from pathlib import Path

try:
    import pymupdf as fitz
except ImportError:
    import fitz  # type: ignore

ROOT = Path(__file__).resolve().parents[2]
REG = ROOT / "sources" / "registry"
inv = json.loads((REG / "inventory.json").read_text(encoding="utf-8"))
overrides = json.loads((REG / "overrides.json").read_text(encoding="utf-8")) if (REG / "overrides.json").exists() else {}

CRIT = re.compile(r"\b([A-D])\.(P|M|D)(\d{1,2})\b")           # e.g. C.P6, B.M3
CRIT_SHORT = re.compile(r"(?<![A-Za-z0-9.])([PMD])(\d{1,2})(?![A-Za-z0-9])")  # P1, M2, D1
UNIT_NO = re.compile(r"(?:الوحدة|unit|وحدة)\s*[:\-]?\s*(\d{1,2})", re.I)

def norm_words(t: str):
    t = re.sub(r"[ً-ٰٟ]", "", t)
    t = t.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا").replace("ة", "ه").replace("ى", "ي")
    return re.findall(r"[\w]+", t.lower())

def shingles(words, k=6):
    return {" ".join(words[i:i + k]) for i in range(0, max(len(words) - k + 1, 0))}

def jaccard(a, b):
    if not a or not b: return 0.0
    return len(a & b) / len(a | b)

def containment(a, b):  # how much of the smaller set is inside the larger
    if not a or not b: return 0.0
    return len(a & b) / min(len(a), len(b))

recs = inv["records"]
sh = {}
for r in recs:
    if r.get("extracted_text") and r["words"] >= 150:
        sh[r["id"]] = shingles(norm_words((ROOT / r["extracted_text"]).read_text(encoding="utf-8")))

# already-published PDFs (text overlap, not just hash)
pub_sh = {}
for p in (ROOT / "public" / "documents").rglob("*.pdf"):
    d = fitz.open(p)
    pub_sh[str(p.relative_to(ROOT)).replace("\\", "/")] = shingles(norm_words("\n".join(pg.get_text() for pg in d)))

# version clusters (union-find over strong overlap)
ids = list(sh)
parent = {i: i for i in ids}
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]; x = parent[x]
    return x
pairs = []
for i, a in enumerate(ids):
    for b in ids[i + 1:]:
        c, j = containment(sh[a], sh[b]), jaccard(sh[a], sh[b])
        if j >= 0.5 or c >= 0.85:
            parent[find(a)] = find(b); pairs.append((a, b, round(j, 2), round(c, 2)))
clusters = defaultdict(list)
for i in ids: clusters[find(i)].append(i)
clusters = [sorted(v) for v in clusters.values() if len(v) > 1]

by_id = {r["id"]: r for r in recs}
out = []
for r in recs:
    text = (ROOT / r["extracted_text"]).read_text(encoding="utf-8") if r.get("extracted_text") else ""
    crit = sorted({f"{a}.{b}{c}" for a, b, c in CRIT.findall(text)})
    crit_short = sorted({f"{a}{b}" for a, b in CRIT_SHORT.findall(text)}, key=lambda s: (s[0], int(s[1:])))
    units = sorted(set(UNIT_NO.findall(text)), key=int)[:6]
    overlap = None
    if r["id"] in sh:
        best = max(((containment(sh[r["id"]], v), k) for k, v in pub_sh.items()), default=(0, None))
        if best[0] >= 0.25: overlap = {"published_file": best[1], "containment": round(best[0], 2)}
    o = overrides.get(r["id"], {})
    out.append({
        "id": r["id"], "path": r["path"], "ext": r["ext"], "bytes": r["bytes"], "sha256": r["sha256"],
        "words": r["words"], "pages": r["meta"].get("pages"), "needs_ocr": r["scanned_no_text"],
        "category": o.get("category", r["category_guess"]),
        "unit": o.get("unit"), "visibility": o.get("visibility", "PRIVATE"), "status": "draft",
        "publication": o.get("publication", "not cleared"),
        "note": o.get("note", ""),
        "criteria_codes_full": crit, "criteria_codes_short": crit_short, "unit_numbers_mentioned": units,
        "overlap_with_published": overlap,
        "version_cluster": next((i for i, c in enumerate(clusters) if r["id"] in c), None),
        "phone_in_text": bool(r["pii_counts"].get("phones")) if r.get("pii_counts") else False,
        "extracted_text": r.get("extracted_text"),
    })

(REG / "source-registry.json").write_text(json.dumps({"clusters": clusters, "cluster_pairs": pairs, "records": out}, ensure_ascii=False, indent=1), encoding="utf-8")

# ---- human report -------------------------------------------------------------------------
vis = defaultdict(list); cat = defaultdict(list)
for o in out: vis[o["visibility"]].append(o); cat[o["category"]].append(o)
L = ["# Source library report (private — git-ignored)", "", f"Files: {len(out)}  |  version clusters: {len(clusters)}  |  need OCR: {sum(o['needs_ocr'] for o in out)}", ""]
L += ["## By proposed visibility", ""] + [f"- **{k}**: {len(v)}" for k, v in sorted(vis.items())] + ["", "## By category", ""] + [f"- {k}: {len(v)}" for k, v in sorted(cat.items())]
L += ["", "## Version clusters (same material, several files — pick one canonical)", ""]
for i, c in enumerate(clusters):
    L.append(f"{i}. " + " · ".join(f"{x[4:]}:{by_id[x]['path'][:34]}" for x in c))
L += ["", "## Overlap with files already published on the site", ""]
for o in out:
    if o["overlap_with_published"]: L.append(f"- {o['id'][4:]} {o['path'][:40]} ≈ {o['overlap_with_published']['published_file']} ({o['overlap_with_published']['containment']})")
L += ["", "## Criteria codes found (evidence only; NOT official mappings)", ""]
for o in out:
    if o["criteria_codes_full"]: L.append(f"- {o['id'][4:]} {o['path'][:38]}: {', '.join(o['criteria_codes_full'])}")
(REG / "REPORT.md").write_text("\n".join(L), encoding="utf-8")
print(f"clusters={len(clusters)} pairs={len(pairs)} overrides={len(overrides)}")
