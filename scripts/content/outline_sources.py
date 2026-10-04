#!/usr/bin/env python3
"""
outline_sources.py — derives a heading outline (section map) for every extracted source text.

    python scripts/content/outline_sources.py

Reads  sources/registry/source-registry.json + sources/extracted/*.txt
Writes sources/registry/outlines/<id>.json  — {headings:[{line, page, text}], pages, words}
Outlines hold only short heading strings (<= 90 chars) and positions, never body text, and live under sources/ (git-ignored).
Used to point concept drafts at exact sections of a source (page ranges) without copying the source.
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REG = ROOT / "sources" / "registry"
OUT = REG / "outlines"
OUT.mkdir(parents=True, exist_ok=True)
reg = json.loads((REG / "source-registry.json").read_text(encoding="utf-8"))

NUM = re.compile(r"^(?:\d+(?:\.\d+)*[\).\-–]?|[أابجد][\).\-–]|(?:أولا|ثانيا|ثالثا|رابعا|خامسا|سادسا|أولًا|ثانيًا|ثالثًا|رابعًا|خامسًا)[:ً]?)\s*\S")
LEAD = re.compile(r"^(الدرس|الوحدة|الجزء|الفصل|الحصة|الهدف|النشاط|مقدمة|خلاصة|ملخص|تمرين|مثال|Lesson|Unit|Part)\b", re.I)

def is_heading(line: str) -> bool:
    s = line.strip()
    if not (4 <= len(s) <= 90) or s.count(" ") > 12: return False
    if re.search(r"\.{4,}", s) or re.match(r"^[\d\s.\-–]+$", s): return False  # TOC leaders / bare numbers
    if s.endswith((".", "،", "؛")) and not NUM.match(s): return False
    return bool(NUM.match(s) or LEAD.match(s) or s.endswith(":") or (s.endswith("؟") and len(s) < 70))

n = 0
for rec in reg["records"]:
    if not rec.get("extracted_text"): continue
    text = (ROOT / rec["extracted_text"]).read_text(encoding="utf-8")
    pages = text.split("\n\f\n") if "\f" in text else [text]
    heads = []
    for pi, page in enumerate(pages, 1):
        for li, line in enumerate(page.splitlines()):
            if is_heading(line):
                heads.append({"page": pi if len(pages) > 1 else None, "line": li, "text": line.strip()})
    (OUT / f"{rec['id']}.json").write_text(json.dumps({"id": rec["id"], "pages": len(pages) if len(pages) > 1 else None, "words": rec["words"], "headings": heads[:400]}, ensure_ascii=False, indent=1), encoding="utf-8")
    n += 1
print(f"outlines written for {n} sources → {OUT}")
