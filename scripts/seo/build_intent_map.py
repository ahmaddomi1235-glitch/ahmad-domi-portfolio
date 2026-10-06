# -*- coding: utf-8 -*-
"""Builds data/seo-intent-map.json (the single source for SEO titles/descriptions/intent) and docs/SEO_INTENT_MAP.md.

Inputs: content/concepts/*/*.json (real questionsAnswered + terminology), content/units/*.json, scripts/seo/seo_copy.py
(hand-written title/meta/primary query). Run:  python scripts/seo/build_intent_map.py
"""
import glob, io, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from seo_copy import C

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SITE = "https://ahmaddomiedu.com"
BRAND = "أحمد دومي"

# Shorter display cores (the long hand-written core is kept in meta text; titles need <= ~55 chars before the suffix).
SHORT = {
    "threat-vulnerability-risk": "الفرق بين التهديد والثغرة والمخاطرة",
    "risk-vs-issue": "الفرق بين الخطر Risk والمشكلة Issue",
    "app-map-wireframe-prototype": "خريطة التطبيق والمخطط الشبكي والنموذج الأولي",
    "xai-and-data-drift": "الذكاء الاصطناعي القابل للتفسير XAI وانحراف البيانات",
    "web-scraping-for-ai-data": "Web Scraping: استخراج بيانات الويب للذكاء الاصطناعي",
    "project-execution-monitoring-closure": "تنفيذ المشروع ومراقبته وإغلاقه",
    "ai-tools-and-frameworks": "أدوات الذكاء الاصطناعي ومنصات السحابة",
    "train-validation-test-sets": "مجموعات التدريب والتحقق والاختبار",
    "primary-vs-secondary-data": "الفرق بين البيانات الأساسية والخارجية",
    "dashboard-kpis": "مؤشرات الأداء KPIs في لوحة المعلومات",
    "brainstorming-and-mind-maps": "العصف الذهني والخرائط الذهنية للمشروع",
    "report-consistency-and-repetition": "تجنّب التناقض والتكرار في تقرير BTEC",
    "designing-an-app-for-a-need": "كيف تصمم تطبيقًا يلبي حاجة حقيقية؟",
    "legal-ethical-aspects-it-projects": "الجوانب القانونية والأخلاقية لمشاريع IT",
    "classification-vs-regression": "الفرق بين التصنيف والانحدار",
    "what-attackers-can-do": "ماذا يفعل المهاجم عند وصوله إلى جهازك؟",
    "internal-vs-external-threats": "الفرق بين التهديد الداخلي والخارجي",
    "user-persona-and-stories": "شخصية المستخدم وقصص المستخدم",
    "ide-and-maintainability": "بيئات التطوير IDE وأداة Git للإصدارات",
    "ai-project-lifecycle": "مراحل مشروع الذكاء الاصطناعي",
    "workbook-structure-and-import": "تنظيم المصنف واستيراد CSV في Excel",
    "project-scope": "نطاق المشروع وتوسّع النطاق (Scope Creep)",
    "programming-language-comparison-criteria": "كيف نقارن لغات البرمجة؟",
    "iot-devices-as-ai-data-sources": "إنترنت الأشياء كمصدر بيانات للذكاء الاصطناعي",
    "ecommerce-business-models-and-data": "نماذج التجارة الإلكترونية B2C وB2B وC2C",
    "choosing-a-programming-language": "كيف تختار لغة البرمجة المناسبة؟",
    "what-is-cyber-security": "ما هو الأمن السيبراني (Cyber Security)؟",
    "smart-assistant-data-pipeline": "كيف يعمل المساعد الصوتي الذكي؟",
    "decision-trees": "أشجار القرار (Decision Trees)",
    "choosing-reliable-ai-data-sources": "كيف تختار مصادر بيانات موثوقة للذكاء الاصطناعي؟",
    "sorting-and-filtering": "الفرق بين الفرز والتصفية في Excel",
    "ide-vs-jupyter-notebook": "الفرق بين IDE وJupyter Notebook",
    "website-types-by-purpose": "أنواع المواقع الإلكترونية بحسب الغرض",
    "programming-data-types": "أنواع البيانات الأساسية في البرمجة",
    "linear-regression-mse": "الانحدار الخطي (Linear Regression) وMSE",
    "knn-anomaly-detection": "كشف الشذوذ بالجيران الأقرب KNN",
    "functional-vs-non-functional-requirements": "الفرق بين المتطلبات الوظيفية وغير الوظيفية",
    "choosing-app-platform": "اختيار المنصة المناسبة للتطبيق",
    "apis-and-json-data": "ما هي API وبيانات JSON؟",
    "lookup-functions": "دوال البحث VLOOKUP وXLOOKUP وINDEX MATCH",
    "file-permissions-least-privilege": "أذونات الملفات ومبدأ أقل صلاحية",
}

HIGH = set("""threat-vulnerability-risk what-is-cyber-security hacker-types what-attackers-can-do why-data-is-the-target data-states phishing
firewalls two-factor-authentication malware-types social-engineering encryption-basics network-types data-protection-gdpr
ai-vs-machine-learning-vs-deep-learning types-of-ai supervised-vs-unsupervised-learning neural-networks-uses-and-limits ai-bias
what-is-data-modelling data-vs-information data-quality pivot-tables lookup-functions if-and-or-not-functions
project-vs-routine-operations project-lifecycle project-stakeholders project-scope project-methodologies risk-vs-issue project-constraints
pass-merit-distinction command-verbs-explain-analyse-evaluate report-writing-principles explain-level-p-writing analyse-level-m-writing evaluate-level-d-writing
programming-paradigms procedural-programming object-oriented-programming event-driven-programming compiler-vs-interpreter flowchart-symbols
mobile-app-types ux-vs-ui api-library-sdk mobile-operating-systems app-development-stages""".split())
LOW = set("""arima-time-series bayesian-methods knn-anomaly-detection pca-dimensionality-reduction svm-classifier k-means-clustering embedded-device-programming
spreadsheet-macros creativity-in-web-design remote-access-and-network-services network-operating-systems-and-directory transmission-media
ecommerce-business-models-and-data missing-values-time-series-cleaning protecting-ai-data runtime-vs-development-requirements""".split())

# Pairs that share part of an intent. Resolution is always keep + differentiate + cross-link (no merge justified).
FAMILIES = [
    ({"external-threats", "internal-vs-external-threats", "insider-threats"}, "MEDIUM",
     "head term «التهديدات الداخلية والخارجية» -> internal-vs-external-threats; external-threats = types of external threat; insider-threats = types of insider threat"),
    ({"data-quality", "data-accuracy-and-age", "data-reliability-checks"}, "MEDIUM",
     "head term «جودة البيانات» -> data-quality; the other two answer narrower questions (accuracy/age, reliability checks)"),
    ({"project-execution-monitoring-closure", "project-closure-and-lessons-learned", "project-monitoring-indicators"}, "MEDIUM",
     "head term «تنفيذ المشروع ومراقبته وإغلاقه» -> the overview; closure and monitoring indicators are deeper dives"),
    ({"programming-paradigms", "procedural-programming", "object-oriented-programming", "event-driven-programming"}, "MEDIUM",
     "head term «نماذج البرمجة» -> programming-paradigms (parent); each paradigm page owns its own name"),
    ({"data-sources", "ai-data-sources", "choosing-reliable-ai-data-sources"}, "MEDIUM",
     "head term «مصادر البيانات» -> data-sources (organisations); ai-data-sources = sources for AI projects; choosing-... = how to choose"),
    ({"flowchart-symbols", "flowchart-dfd-erd"}, "MEDIUM",
     "«مخطط الانسياب» symbols/how-to-draw -> flowchart-symbols; «DFD وERD» comparison -> flowchart-dfd-erd"),
    ({"functional-vs-non-functional-requirements", "project-requirements-specification"}, "MEDIUM",
     "app-focused definition vs project specification document"),
    ({"network-vulnerabilities", "system-vulnerability-types", "software-vulnerabilities"}, "MEDIUM",
     "system-vulnerability-types is the overview; network and software pages go deeper"),
    ({"choosing-a-programming-language", "programming-language-comparison-criteria", "programming-language-types"}, "MEDIUM",
     "choose = how to pick; criteria = how to compare; types = classification"),
    ({"pass-merit-distinction", "command-verbs-explain-analyse-evaluate", "explain-level-p-writing", "analyse-level-m-writing", "evaluate-level-d-writing"}, "MEDIUM",
     "head term «Pass Merit Distinction» -> pass-merit-distinction; command verbs and the three writing pages are separate how-to intents"),
    ({"authentication-methods", "authentication-vs-access-control", "two-factor-authentication", "strong-passwords"}, "LOW",
     "distinct queries (methods / difference / 2FA / passwords)"),
]


def short_of(slug, core, unit):
    if slug in SHORT:
        return SHORT[slug]
    c = core.replace(" – BTEC IT", "")
    if ":" in c:
        c = c.split(":")[0]
    return c.strip()


def make_title(slug, core, unit):
    if unit == "assessment":
        return f"{core.strip()} | {BRAND}"
    s = short_of(slug, core, unit)
    ctx = " في BTEC IT" if s.startswith("الفرق بين") else " – BTEC IT"
    return f"{s}{ctx} | {BRAND}"


def classify(unit, slug, title_ar, title_en):
    if unit == "assessment":
        return "ASSESSMENT"
    if re.search(r"^الفرق بين|الفرق بين| vs |مقابل|أم ", title_ar + " " + title_en):
        return "COMPARISON"
    return "INFORMATIONAL"


def funnel(intent, slug):
    if intent == "ASSESSMENT":
        return "MOFU"
    if intent == "COMPARISON":
        return "MOFU"
    if slug.startswith("what-is") or slug in {"why-data-is-the-target"}:
        return "TOFU"
    return "TOFU"


def variants(primary, title_en, terms, short):
    ar = [primary]
    m = re.match(r"^ما (هو|هي) (.+)$", primary)
    if m:
        ar += [f"تعريف {m.group(2)}", f"شرح {m.group(2)}"]
    elif primary.startswith("الفرق بين"):
        ar += [primary.replace("الفرق بين", "مقارنة بين", 1)]
    elif not primary.startswith(("كيف", "لماذا", "متى", "أي")):
        ar += [f"شرح {primary}"]
    en = [title_en.strip()]
    mixed = []
    for t in terms[:2]:
        if t.get("ar") and t.get("en"):
            mixed.append(f"{t['ar']} {t['en']}")
    mixed.append(f"{short} BTEC IT" if len(short) < 60 else short)
    return ar, en, mixed


def load_concepts():
    out = {}
    for f in sorted(glob.glob(os.path.join(ROOT, "content", "concepts", "*", "*.json"))):
        d = json.load(io.open(f, encoding="utf-8"))
        out[d["slug"]] = d
    return out


def write_doc(pages):
    import collections
    by_intent = collections.Counter(v["intent"] for v in pages.values())
    by_pri = collections.Counter(v.get("priority", "MEDIUM") for v in pages.values())
    L = []
    A = L.append
    A("# SEO intent map")
    A("")
    A("Source of truth: `data/seo-intent-map.json` (generated by `scripts/seo/build_intent_map.py` from the hand-written copy in `scripts/seo/seo_copy.py` plus each page's real `questionsAnswered` and `terminology`). Pages read their title and meta description from it through `seoMeta()` (`src/lib/seo/intent.ts`); `tests/unit/seo.test.ts` fails if a published concept has no entry, a title/meta is duplicated or out of range, or a title/meta makes an official/superlative claim.")
    A("")
    A(f"**{len(pages)} canonical pages mapped.** Intent: " + ", ".join(f"{k} {v}" for k, v in sorted(by_intent.items())) + ". Priority: " + ", ".join(f"{k} {v}" for k, v in sorted(by_pri.items())) + ".")
    A("")
    A("## Rules")
    A("")
    A("- **Primary query** = the natural Arabic phrase the page answers; **secondary queries** = the real student questions already extracted for that page (`questionsAnswered`) — nothing is invented.")
    A("- **Arabic / English / mixed variants** come from the page's own title, its `title_en` and its glossary pairs (e.g. `التهديد Threat`). No separate English pages: Arabic pages carry both terms, which is how people search.")
    A("- **H1 is unchanged** (`title_ar` in the content file). It is already descriptive and answer-first; titles and descriptions are the layer tuned for the results page. Recommended H1 = current H1.")
    A("- **Anchors**: use the short title or the primary query as link text, never «اقرأ المزيد» / «هنا».")
    A("")
    A("## Title framework (CTR)")
    A("")
    for kind, pat, ex in [
        ("Concept", "[مفهوم (English)] – BTEC IT | أحمد دومي", "التصيّد الاحتيالي (Phishing) – BTEC IT | أحمد دومي"),
        ("Comparison", "الفرق بين X وY في BTEC IT | أحمد دومي", "الفرق بين التهديد والثغرة والمخاطرة في BTEC IT | أحمد دومي"),
        ("Assessment", "[كيف تكتب / شرح] [فعل الأمر] في BTEC: [فائدة] | أحمد دومي", "كيف تكتب مستوى التحليل Analyse (M) في تقرير BTEC | أحمد دومي"),
        ("Unit hub", "[الوحدة] BTEC IT: شرح الوحدة بالعربي | أحمد دومي", "الأمن السيبراني BTEC IT: شرح الوحدة بالعربي | أحمد دومي"),
        ("Commercial", "بطاقة BTEC IT: … (الخدمة الفعلية + المؤلف)", "بطاقة BTEC IT: شروحات مصوّرة بالعربي من أحمد دومي"),
        ("Tool", "حاسبة معدل BTEC … | أحمد دومي", "حاسبة معدل BTEC للتوجيهي الأردني | أحمد دومي"),
    ]:
        A(f"- **{kind}** — pattern: `{pat}` — example: `{ex}`")
    A("")
    A("Titles: intent first, then topic, then BTEC context, then the author. Budget ≤ 75 characters (median 54), meta 70–160 (median ≈ 130), answer first, Arabic + English terms, no clickbait, no superlatives.")
    A("")
    A("## Pages")
    A("")
    order = ["home", "static", "hub", "unit-hub", "concept"]
    A("| Path | Primary query | Intent | Stage | Priority | Cannibalisation | Title |")
    A("|---|---|---|---|---|---|---|")
    items = sorted(pages.items(), key=lambda kv: (order.index(kv[1]["kind"]) if kv[1]["kind"] in order else 9, kv[0]))
    for p, v in items:
        c = v["cannibalization"]["risk"]
        A(f"| `{p}` | {v['primaryQuery']} | {v['intent']} | {v['funnel']} | {v.get('priority','MEDIUM')} | {c} | {v['title'].replace('|', chr(92) + '|')} |")
    A("")
    A("## Cannibalisation families")
    A("")
    for members, level, note in FAMILIES:
        A(f"- **{level}** — {', '.join('`' + m + '`' for m in sorted(members))}: {note}.")
    A("")
    A("Decision: **no merges.** A semantic scan of all 196 concept pages (TF-IDF on title, short answer and student questions) found one pair above 0.3 (`external-threats` ↔ `internal-vs-external-threats`, 0.38); both answer different queries (types of external threat vs. the internal/external comparison), so they stay, with distinct titles and cross-links. Phase 2C had already merged the three genuine duplicates (308 redirects).")
    A("")
    io.open(os.path.join(ROOT, "docs", "SEO_INTENT_MAP.md"), "w", encoding="utf-8", newline="\n").write("\n".join(L) + "\n")


def main():
    concepts = load_concepts()
    units = {}
    for f in glob.glob(os.path.join(ROOT, "content", "units", "*.json")):
        u = json.load(io.open(f, encoding="utf-8"))
        units[u["slug"]] = u
    crawl_path = os.path.join(ROOT, "sources", "audit", "seo_crawl.json")
    crawl = json.load(io.open(crawl_path, encoding="utf-8"))["pages"] if os.path.exists(crawl_path) else {}

    risk = {}
    for members, level, note in FAMILIES:
        for s in members:
            cur = risk.setdefault(s, {"level": "LOW", "with": [], "notes": []})
            if level == "MEDIUM":
                cur["level"] = "MEDIUM"
            cur["with"] += sorted(members - {s})
            cur["notes"].append(note)

    pages = {}
    for slug, d in concepts.items():
        unit = d["unit"]
        path = f"/btec-it/{unit}/{slug}"
        core, meta, primary = C[slug]
        title = make_title(slug, core, unit)
        intent = classify(unit, slug, d["title_ar"], d["title_en"])
        short = short_of(slug, core, unit)
        ar, en, mixed = variants(primary, d["title_en"], d.get("terminology", []), short)
        r = risk.get(slug, {"level": "LOW", "with": [], "notes": []})
        cur = crawl.get(SITE + path, {})
        pages[path] = {
            "kind": "concept", "slug": slug, "unit": unit, "contentType": d["type"],
            "primaryQuery": primary,
            "secondaryQueries": d.get("questionsAnswered", []),
            "arabicVariants": ar, "englishVariants": en, "mixedVariants": mixed,
            "intent": intent, "funnel": funnel(intent, slug), "parentTopic": units[unit]["title_ar"],
            "cannibalization": {"risk": r["level"], "sharesIntentWith": sorted(set(r["with"])), "resolution": "keep + differentiate + cross-link" if r["with"] else "none needed", "notes": sorted(set(r["notes"]))},
            "title": title, "metaDescription": meta, "h1": d["title_ar"],
            "recommendedAnchors": [short, primary] if short != primary else [short],
            "priority": "HIGH" if slug in HIGH else "LOW" if slug in LOW else "MEDIUM",
            "before": {"title": cur.get("title"), "titleLen": len(cur.get("title", "")), "descLen": len(cur.get("description", ""))},
        }

    # ---- non-concept pages (hand-written) ----
    extra = {
        "/": ("TOFU", "NAVIGATIONAL", "أحمد دومي مدرس BTEC IT", ["أحمد دومي", "مدرس BTEC IT في الأردن", "Ahmad Domi BTEC IT"], None),
    }
    pages["/"] = {
        "kind": "home", "primaryQuery": "أحمد دومي مدرس BTEC IT",
        "secondaryQueries": ["مدرس BTEC IT الأردن", "BTEC IT teacher Jordan", "Ahmad Domi BTEC IT"],
        "arabicVariants": ["أحمد دومي", "مدرس BTEC IT في الأردن"], "englishVariants": ["Ahmad Domi", "BTEC IT instructor Jordan"], "mixedVariants": ["أحمد دومي BTEC IT"],
        "intent": "NAVIGATIONAL", "funnel": "BOFU", "parentTopic": "—",
        "cannibalization": {"risk": "LOW", "sharesIntentWith": ["/about"], "resolution": "home = brand + hub entry; /about = biography", "notes": []},
        "title": "أحمد دومي | Ahmad Domi — مدرّس BTEC IT في الأردن",
        "metaDescription": "أحمد دومي مدرّس BTEC IT في الأردن: شرح الأمن السيبراني والذكاء الاصطناعي ونمذجة البيانات وإدارة المشاريع بالعربي مع المصطلحات الإنجليزية.",
        "h1": "أحمد دومي Ahmad Domi — BTEC IT", "recommendedAnchors": ["أحمد دومي", "Ahmad Domi"], "priority": "HIGH",
    }
    pages["/btec-it"] = {
        "kind": "hub", "primaryQuery": "شرح BTEC IT بالعربي",
        "secondaryQueries": ["وحدات BTEC IT", "BTEC IT بالعربي", "مصطلحات BTEC IT"],
        "arabicVariants": ["شرح BTEC IT بالعربي", "شرح مواد BTEC IT"], "englishVariants": ["BTEC IT in Arabic", "BTEC IT units Arabic"], "mixedVariants": ["BTEC IT شرح عربي مع المصطلحات الإنجليزية"],
        "intent": "INFORMATIONAL", "funnel": "TOFU", "parentTopic": "BTEC IT",
        "cannibalization": {"risk": "LOW", "sharesIntentWith": [], "resolution": "none needed", "notes": []},
        "title": "شرح BTEC IT بالعربي: وحدات ومفاهيم ومصطلحات | أحمد دومي",
        "metaDescription": "شرح وحدات BTEC IT بالعربي مع المصطلحات الإنجليزية: الأمن السيبراني، الذكاء الاصطناعي، نمذجة البيانات، إدارة المشاريع، البرمجة وتطوير المواقع.",
        "h1": "BTEC IT: وحدات ومفاهيم بالعربي", "recommendedAnchors": ["شرح BTEC IT بالعربي", "قاعدة معرفة BTEC IT"], "priority": "HIGH",
    }
    unit_copy = {
        "cyber-security": ("الأمن السيبراني BTEC IT (الوحدة 11): شرح بالعربي", "شرح وحدة الأمن السيبراني وإدارة الحوادث (الوحدة 11) في BTEC IT بالعربي: التهديدات والثغرات والشبكات والتشفير والحماية والقوانين.", "شرح الأمن السيبراني BTEC", ["BTEC Cyber Security", "BTEC Unit 11 Cyber Security", "الأمن السيبراني للتوجيهي BTEC"]),
        "artificial-intelligence": ("الذكاء الاصطناعي BTEC IT: شرح الوحدة بالعربي", "شرح وحدة الذكاء الاصطناعي في BTEC IT بالعربي: أنواع الذكاء الاصطناعي والبيانات وتعلّم الآلة والنماذج والخصوصية، مع المصطلحات الإنجليزية.", "شرح الذكاء الاصطناعي BTEC", ["BTEC AI", "الذكاء الاصطناعي BTEC IT"]),
        "data-modelling": ("نمذجة البيانات BTEC IT: شرح الوحدة بالعربي", "شرح وحدة نمذجة البيانات وجداول البيانات في BTEC IT بالعربي: البيانات والمعلومات، الجودة، الدوال، المخططات ولوحات المعلومات.", "شرح نمذجة البيانات BTEC", ["BTEC Data Modelling", "Excel BTEC IT"]),
        "it-project-management": ("إدارة المشاريع BTEC IT: شرح الوحدة بالعربي", "شرح وحدة إدارة مشاريع تكنولوجيا المعلومات في BTEC IT بالعربي: النطاق والقيود والمخاطر ودورة الحياة والتخطيط والتنفيذ والإغلاق.", "شرح إدارة المشاريع BTEC", ["BTEC IT Project Management", "إدارة المشاريع للتوجيهي BTEC"]),
        "programming": ("البرمجة BTEC IT: شرح الوحدة بالعربي", "شرح وحدة البرمجة في BTEC IT بالعربي: التفكير الحاسوبي، نماذج البرمجة، لغات البرمجة، أنواع البيانات، المخططات والاختبار.", "شرح البرمجة BTEC", ["BTEC Programming", "نماذج البرمجة BTEC"]),
        "website-development": ("تطوير المواقع BTEC IT: شرح الوحدة بالعربي", "شرح مبادئ تطوير المواقع في BTEC IT بالعربي: أنواع المواقع ومتطلباتها ومبادئ التصميم والظهور في البحث وأداء الموقع.", "شرح تطوير المواقع BTEC", ["BTEC Website Development", "تصميم المواقع BTEC IT"]),
        "introduction-to-applications": ("مدخل إلى التطبيقات BTEC IT: شرح الوحدة بالعربي", "شرح وحدة مدخل إلى التطبيقات في BTEC IT بالعربي: أنواع التطبيقات، تصميم تطبيق يلبي حاجة، المتطلبات، النموذج الأولي والاختبار.", "شرح مدخل إلى التطبيقات BTEC", ["BTEC Introduction to Applications", "تصميم تطبيق BTEC IT"]),
        "assessment": ("كتابة تقارير BTEC: Pass وMerit وDistinction وأفعال الأمر", "كيف تكتب تقرير BTEC: معنى Pass وMerit وDistinction، أفعال الأمر Explain وAnalyse وEvaluate، المقدمة والخاتمة والربط بين الفقرات. شرح بالعربي.", "كتابة تقرير BTEC", ["BTEC report writing", "شرح Pass Merit Distinction"]),
    }
    for slug, (t, m, primary, sec) in unit_copy.items():
        u = units[slug]
        pages[f"/btec-it/{slug}"] = {
            "kind": "unit-hub", "slug": slug, "primaryQuery": primary, "secondaryQueries": sec,
            "arabicVariants": [primary], "englishVariants": [u["title_en"] + " BTEC"], "mixedVariants": [f"{u['title_ar']} {u['title_en']}"],
            "intent": "ASSESSMENT" if slug == "assessment" else "INFORMATIONAL", "funnel": "MOFU", "parentTopic": "BTEC IT",
            "cannibalization": {"risk": "LOW", "sharesIntentWith": [], "resolution": "hub owns the unit name; concept pages own specific topics", "notes": []},
            "title": f"{t} | {BRAND}", "metaDescription": m, "h1": u["title_ar"],
            "recommendedAnchors": [u["title_ar"], primary], "priority": "HIGH",
        }
    static = {
        "/btec-calculator": ("TOOL", "BOFU", "حاسبة معدل BTEC", ["حاسبة معدل BTEC الأردن", "حساب معدل BTEC للتوجيهي", "BTEC grade calculator Jordan"], "حاسبة معدل BTEC للتوجيهي الأردني | أحمد دومي", "حاسبة مجانية لمعدل طالب BTEC في الأردن: تحوّل نتائج U/P/M/D والساعات المعتمدة إلى معدل التخصص من 35 والمعدل الكامل من 100.", "حاسبة معدل BTEC (مسار التوجيهي الأردني)"),
        "/btec-it-card": ("COMMERCIAL", "BOFU", "بطاقة BTEC IT", ["بطاقة BTEC IT أحمد دومي", "شروحات BTEC IT مصورة", "مدرس BTEC IT"], "بطاقة BTEC IT: شروحات مصوّرة بالعربي من أحمد دومي", "بطاقات تعليمية من أحمد دومي لوحدات BTEC IT: شروحات مصوّرة ومواد دعم وإرشاد للواجبات. شاهد أول فيديو مجانًا قبل الحجز.", "بطاقة BTEC IT"),
        "/btec-it/questions": ("INFORMATIONAL", "TOFU", "أسئلة BTEC IT", ["أسئلة وأجوبة BTEC IT", "أسئلة الطلبة في BTEC IT"], "أسئلة وأجوبة BTEC IT بالعربي: أسئلة الطلبة الشائعة | أحمد دومي", "أسئلة الطلبة الشائعة في BTEC IT مجمّعة حسب المفهوم، لكل مجموعة جواب مختصر ورابط إلى الشرح الكامل.", "أسئلة وأجوبة BTEC IT"),
        "/btec-it/glossary": ("INFORMATIONAL", "TOFU", "مصطلحات BTEC IT", ["مصطلحات BTEC IT عربي إنجليزي", "قاموس مصطلحات BTEC"], "مصطلحات BTEC IT: قاموس عربي ↔ English | أحمد دومي", "قاموس ثنائي اللغة لمصطلحات BTEC IT: التهديد Threat، الثغرة Vulnerability، تعلّم الآلة Machine Learning، أصحاب المصلحة Stakeholders وغيرها.", "مصطلحات BTEC IT"),
        "/videos": ("NAVIGATIONAL", "MOFU", "فيديوهات شرح BTEC IT", ["أحمد دومي يوتيوب BTEC IT", "شرح BTEC IT فيديو"], "فيديوهات شرح BTEC IT بالعربي على YouTube | أحمد دومي", "دروس أحمد دومي المصوّرة على YouTube مرتبة حسب وحدة BTEC IT، مع رابط الشرح المكتوب لكل درس.", "فيديوهات أحمد دومي"),
        "/resources": ("INFORMATIONAL", "MOFU", "ملفات BTEC IT", ["ملفات شرح BTEC IT PDF", "دوسية BTEC IT"], "ملفات وكتب شرح BTEC IT للتحميل PDF | أحمد دومي", "دوسيات التأسيس وكتب الوحدات وملفات الشرح التي أعدّها أحمد دومي لطلبة BTEC IT، قابلة للتحميل مجانًا بصيغة PDF.", "الملفات التعليمية"),
        "/about": ("NAVIGATIONAL", "BOFU", "من هو أحمد دومي", ["أحمد دومي مدرس BTEC IT", "Ahmad Domi BTEC"], "عن أحمد دومي: مدرّس BTEC IT ومهندس أمن سيبراني من إربد | أحمد دومي", "السيرة المهنية لأحمد دومي: مدرّس BTEC IT في الأردن، خبرته في تدريس الصف العاشر والأول الثانوي والتوجيهي، والمواد ومشاريعه.", "مدرب BTEC IT ومهندس أمن سيبراني"),
    }
    for p, (intent, fun, primary, sec, t, m, h1) in static.items():
        pages[p] = {
            "kind": "static", "primaryQuery": primary, "secondaryQueries": sec, "arabicVariants": [primary], "englishVariants": [], "mixedVariants": [],
            "intent": intent, "funnel": fun, "parentTopic": "BTEC IT", "cannibalization": {"risk": "LOW", "sharesIntentWith": [], "resolution": "none needed", "notes": []},
            "title": t, "metaDescription": m, "h1": h1, "recommendedAnchors": [primary], "priority": "HIGH" if intent in ("TOOL", "COMMERCIAL") else "MEDIUM",
        }
    pages["/btec-calculator"]["cannibalization"] = {"risk": "MEDIUM", "sharesIntentWith": ["/projects/btec-grade-calculator"], "resolution": "the tool page owns «حاسبة معدل BTEC»; the portfolio case study is retitled as a project write-up", "notes": []}

    out = {"generated": "by scripts/seo/build_intent_map.py", "titleSuffix": f" | {BRAND}", "pages": pages}
    path = os.path.join(ROOT, "data", "seo-intent-map.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    io.open(path, "w", encoding="utf-8", newline="\n").write(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
    tl = [len(v["title"]) for v in pages.values()]
    ml = [len(v["metaDescription"]) for v in pages.values()]
    write_doc(pages)
    print(f"pages {len(pages)}; title max {max(tl)} median {sorted(tl)[len(tl)//2]} >75: {sum(x>75 for x in tl)}; meta max {max(ml)}")


if __name__ == "__main__":
    main()
