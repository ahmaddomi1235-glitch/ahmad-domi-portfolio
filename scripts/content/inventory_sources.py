#!/usr/bin/env python3
"""
inventory_sources.py — READ-ONLY inventory of a private source library.

    python scripts/content/inventory_sources.py "C:\\Users\\ahmad\\Desktop\\شغل"

Guarantees
  * never writes, moves, renames or deletes anything under the source folder (files are opened 'rb' only);
  * never copies the originals — output goes to sources/registry/ and sources/extracted/ (both git-ignored);
  * records only derived data: SHA-256, size, type, page/word counts, marker counts, PII *counts* (never the values),
    a short proposed classification, and extracted text (private, git-ignored) for later review.

Requires PyMuPDF (pip install pymupdf). Optional: ffprobe on PATH for media duration.
"""
import hashlib, json, os, re, shutil, subprocess, sys, zipfile
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

try:
    import pymupdf as fitz
except ImportError:  # older name
    import fitz  # type: ignore

SRC = Path(sys.argv[1]).resolve()
ROOT = Path(__file__).resolve().parents[2]
REG = ROOT / "sources" / "registry"
EXT = ROOT / "sources" / "extracted"
REG.mkdir(parents=True, exist_ok=True)
EXT.mkdir(parents=True, exist_ok=True)
assert SRC.is_dir(), f"not a folder: {SRC}"
assert ROOT not in SRC.parents and SRC != ROOT, "source folder must be outside the repository"

AR = re.compile(r"[\u0600-\u06FF]")
PHONE = re.compile(r"(?<!\d)(?:\+?962|0)7[789]\d{7}(?!\d)")
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
URL = re.compile(r"https?://[^\s)>\]]+")
MARKERS = {
    "pearson": re.compile(r"pearson|بيرسون", re.I),
    "btec": re.compile(r"btec|بيتك", re.I),
    "learning_aim": re.compile(r"learning aim|هدف التعلم|الهدف\s*[أابجد]", re.I),
    "criteria_pmd": re.compile(r"\b[PMD]\d{1,2}\b"),
    "distinction": re.compile(r"distinction|merit|تميز|امتياز", re.I),
    "official_brief": re.compile(r"المهمة الرسمية|المهمه الرسميه|official assignment|assignment brief|ورقة المهمة", re.I),
    "student_work": re.compile(r"اسم الطالب|student name|رقم الطالب|student id", re.I),
    "solution_markers": re.compile(r"جاهز|حل نموذجي|إجابة نموذجية|اجابة نموذجية|model answer|ready[- ]to[- ]submit", re.I),
    "copyright": re.compile(r"©|copyright|all rights reserved|جميع الحقوق", re.I),
    "author_ahmad": re.compile(r"احمد دومي|أحمد دومي|ahmad dou?mi", re.I),
}

def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()

def docx_text(p: Path):
    """Read only word/document.xml from the zip (works for very large docx without loading media)."""
    info = {"images": 0, "tables": 0}
    with zipfile.ZipFile(p, "r") as z:
        names = z.namelist()
        info["images"] = sum(1 for n in names if n.startswith("word/media/"))
        info["media_mb"] = round(sum(z.getinfo(n).file_size for n in names if n.startswith("word/media/")) / 1048576, 1)
        xml = z.read("word/document.xml").decode("utf8", "ignore")
    info["tables"] = xml.count("<w:tbl>")
    paras = re.findall(r"<w:p[ >].*?</w:p>", xml, flags=re.S)
    lines = []
    for para in paras:
        t = "".join(re.findall(r"<w:t[^>]*>(.*?)</w:t>", para, flags=re.S))
        t = re.sub(r"&amp;", "&", re.sub(r"&lt;", "<", re.sub(r"&gt;", ">", t))).strip()
        if t:
            lines.append(t)
    return "\n".join(lines), info

def pdf_text(p: Path):
    doc = fitz.open(p)
    pages = [pg.get_text() for pg in doc]
    images = sum(len(pg.get_images()) for pg in doc)
    return "\n\f\n".join(pages), {"pages": len(doc), "images": images}

def xlsx_info(p: Path):
    out = {"sheets": []}
    with zipfile.ZipFile(p, "r") as z:
        wb = z.read("xl/workbook.xml").decode("utf8", "ignore")
        out["sheets"] = re.findall(r'<sheet [^>]*name="([^"]+)"', wb)
        for n in z.namelist():
            if n.startswith("xl/worksheets/sheet"):
                head = z.read(n)[:4000].decode("utf8", "ignore")
                m = re.search(r'<dimension ref="([^"]+)"', head)
                if m:
                    out.setdefault("dimensions", []).append(m.group(1))
    return "", out

def media_info(p: Path):
    if shutil.which("ffprobe"):
        try:
            r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)], capture_output=True, text=True, timeout=30)
            return "", {"duration_s": round(float(r.stdout.strip()), 1)}
        except Exception:
            pass
    return "", {}

def zip_info(p: Path):
    with zipfile.ZipFile(p, "r") as z:
        entries = [(i.filename, i.file_size) for i in z.infolist()]
    return "", {"entries": len(entries), "sample": [e[0] for e in entries[:12]], "total_mb": round(sum(e[1] for e in entries) / 1048576, 1)}

STEM_KEYS = [
    ("official_assignment", ["المهمة الرسمية", "المهمه الرسميه", "المهمة المحددة", "المهمة التجريبية", "مهمة الامن السيبراني الرسمية", "مهمة الذكاء الاصطناعي الرسمية", "لهدف د المهمة", "مهمة الرسومات", "النشاط"]),
    ("ready_made_or_final_work", ["جاهز", "الملف النهائي", "النتيجة", "ملف التعديلات", "توركار", "نهاية الهدف", "تقرير شامل", "كل تهديد أكتب", "ريماس", "السيناريو", "BTEC_Report"]),
    ("pearson_or_criteria", ["بيرسون", "معيار P"]),
    ("third_party_lecture", ["ARIMA", "Bayesian", "SVM", "الانحدار", "الشبكات العصبية +", "مقدّمة في الذكاء الاصطناعي (AI)", "مقارنة بين لغات البرمجة", "التطوير + المفسّر"]),
    ("author_booklet_or_unit_book", ["احمد دومي", "ادارة مشاريع", "ادارة المشاريع", "تاسيس", "معتمد", "الوحدة", "المحاضر", "البرمجة", "الصف العاشر", "تطوير المواقع", "الامن السيبراني", "ذكاء اصطناعي"]),
    ("dataset", [".xlsx"]),
    ("media", [".mp4", ".png", ".lnk"]),
]

def classify(name: str, ext: str, markers: dict, words: int):
    n = name
    for cat, keys in STEM_KEYS:
        for k in keys:
            if k in n or (k.startswith(".") and ext == k):
                return cat
    return "unclassified"

def main():
    files = sorted(p for p in SRC.rglob("*") if p.is_file())
    recs, by_hash = [], defaultdict(list)
    public_pdfs = {}
    pub = ROOT / "public" / "documents"
    if pub.exists():
        for p in pub.rglob("*.pdf"):
            public_pdfs[sha256(p)] = str(p.relative_to(ROOT)).replace("\\", "/")
    for i, p in enumerate(files, 1):
        rel = str(p.relative_to(SRC)).replace("\\", "/")
        ext = p.suffix.lower()
        st = p.stat()
        rec = {"id": f"src-{i:03d}", "path": rel, "ext": ext, "bytes": st.st_size,
               "mtime": datetime.fromtimestamp(st.st_mtime, timezone.utc).isoformat(timespec="seconds"), "sha256": sha256(p)}
        text, meta = "", {}
        try:
            if ext == ".pdf": text, meta = pdf_text(p)
            elif ext == ".docx": text, meta = docx_text(p)
            elif ext == ".xlsx": text, meta = xlsx_info(p)
            elif ext == ".zip": text, meta = zip_info(p)
            elif ext in (".mp4", ".mov"): text, meta = media_info(p)
        except Exception as e:
            meta = {"error": f"{type(e).__name__}: {e}"}
        words = len(text.split())
        ar_ratio = round(len(AR.findall(text)) / max(len(re.findall(r"\w", text)), 1), 2) if text else None
        mk = {k: len(rx.findall(text)) for k, rx in MARKERS.items()} if text else {}
        rec.update({
            "meta": meta, "words": words, "arabic_ratio": ar_ratio, "markers": mk,
            "pii_counts": {"phones": len(set(PHONE.findall(text))), "emails": len(set(EMAIL.findall(text)))} if text else {},
            "urls": sorted(set(URL.findall(text)))[:15],
            "scanned_no_text": ext == ".pdf" and words < 30 and meta.get("pages", 0) > 0,
            "category_guess": classify(rel, ext, mk, words),
            "already_public_copy": public_pdfs.get(rec["sha256"]),
            "extracted_text": None,
        })
        if text.strip():
            out = EXT / f"{rec['id']}.txt"
            out.write_text(text, encoding="utf-8")
            rec["extracted_text"] = f"sources/extracted/{out.name}"
            rec["head"] = " ".join(text.split())[:300]
        by_hash[rec["sha256"]].append(rec["id"])
        recs.append(rec)
        print(f"[{i:3d}/{len(files)}] {rec['category_guess']:<28} {words:>6}w  {rel}", file=sys.stderr)
    dups = [v for v in by_hash.values() if len(v) > 1]
    stems = defaultdict(list)
    for r in recs:
        stems[re.sub(r"\.[^.]+$", "", r["path"])].append(r["id"])
    pairs = [v for v in stems.values() if len(v) > 1]
    reg = {"generated": datetime.now(timezone.utc).isoformat(timespec="seconds"), "source_root": str(SRC), "files": len(recs),
           "exact_duplicates": dups, "same_stem_pairs": pairs, "records": recs}
    (REG / "inventory.json").write_text(json.dumps(reg, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nwrote {REG/'inventory.json'}  ({len(recs)} files, {len(dups)} exact-duplicate groups)", file=sys.stderr)

if __name__ == "__main__":
    main()
