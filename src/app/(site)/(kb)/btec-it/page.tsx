import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { CardLink, PageHeader, Section } from "@/components/kb/Layout";
import { collectionGraph } from "@/lib/seo/jsonld";
import { intentFor, seoMeta } from "@/lib/seo/intent";
import { getConcept, getConceptsOfUnit, getGlossary, getUnits, getVideosOfUnit } from "@/lib/kb/queries";

export const metadata = seoMeta("/btec-it");

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "BTEC IT", path: "/btec-it" },
];

/** Pages students most often start from: one per unit plus the assessment basics. Anchor text = the question they actually ask. */
const START_PAGES: [string, string][] = [
  ["cyber-security", "what-is-cyber-security"],
  ["cyber-security", "threat-vulnerability-risk"],
  ["artificial-intelligence", "ai-vs-machine-learning-vs-deep-learning"],
  ["data-modelling", "data-vs-information"],
  ["it-project-management", "project-vs-routine-operations"],
  ["programming", "programming-paradigms"],
  ["introduction-to-applications", "mobile-app-types"],
  ["assessment", "pass-merit-distinction"],
];

export default function BtecHub() {
  const units = getUnits();
  const starts = START_PAGES.flatMap(([u, c]) => {
    const concept = getConcept(u, c);
    const path = `/btec-it/${u}/${c}`;
    return concept ? [{ path, label: intentFor(path)?.primaryQuery ?? concept.title_ar, concept }] : [];
  });
  const items = units.map((u) => ({ name: u.title_ar, path: `/btec-it/${u.slug}` }));
  const pending = [
    { ar: "الرسومات والرسوم المتحركة (Graphics and Animation)", note: "لا توجد مادة مصدرية منشورة لها بعد" },
    { ar: "التعامل مع الحوادث الأمنية وجمع الأدلة الجنائية (الهدف D في الوحدة 11)", note: "تنتظر مادة مصدرية قبل النشر" },
  ];
  return (
    <>
      <JsonLd data={collectionGraph({ path: "/btec-it", name: "قاعدة معرفة BTEC IT", description: "وحدات BTEC IT مشروحة بالعربي", crumbs, items, aboutName: "BTEC IT" })} />
      <PageHeader
        crumbs={crumbs}
        title="BTEC IT: وحدات ومفاهيم بالعربي"
        titleEn="BTEC IT — units and concepts in Arabic"
        lead={
          <p>
            BTEC IT مسار دراسي في تكنولوجيا المعلومات يُدرَّس في الأردن. هنا تجد كل وحدة مفصّلة إلى مفاهيم، وكل مفهوم يبدأ بالجواب المختصر ويضع المصطلح العربي والإنجليزي معًا ويذكر مصدره. الشرح مبني على مادة أحمد دومي، وليس نصًّا رسميًّا من Pearson.
          </p>
        }
      />

      <Section title="الوحدات" id="units">
        <div className="grid gap-4 sm:grid-cols-2">
          {units.map((u) => {
            const concepts = getConceptsOfUnit(u.id);
            const videos = getVideosOfUnit(u.id);
            const meta = [concepts.length ? `${concepts.length} مفاهيم` : null, videos.length ? `${videos.length} فيديو` : null].filter(Boolean).join(" · ") || "ملف شرح";
            return (
              <CardLink key={u.id} href={`/btec-it/${u.slug}`} title={u.title_ar} titleEn={u.title_en} meta={meta}>
                {u.summary}
              </CardLink>
            );
          })}
        </div>
      </Section>

      <Section title="من أين أبدأ؟" id="start" className="pt-0">
        <p className="mb-4 leading-8 text-ink/85">
          إن كنت جديدًا على BTEC IT فابدأ بسؤال واحد من هذه الأسئلة؛ كل صفحة تعطيك الجواب المختصر أولًا ثم الشرح والمصطلحات العربية والإنجليزية:
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {starts.map((s) => (
            <li key={s.path} className="rounded-xl border border-line bg-white p-4 leading-7">
              <Link href={s.path} className="font-medium text-navy underline decoration-gold underline-offset-4">
                {s.label}
              </Link>
              <p className="mt-1 text-sm text-muted">{s.concept.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 leading-8 text-ink/85">
          تكتب تقريرًا؟ اقرأ <Link href="/btec-it/assessment" className="font-medium text-navy underline decoration-gold underline-offset-4">دليل كتابة التقارير في BTEC</Link>. تريد معرفة معدلك؟ استخدم{" "}
          <Link href="/btec-calculator" className="font-medium text-navy underline decoration-gold underline-offset-4">حاسبة معدل BTEC</Link>. تفضّل الفيديو؟ شاهد{" "}
          <Link href="/videos" className="font-medium text-navy underline decoration-gold underline-offset-4">دروس أحمد دومي على YouTube</Link>.
        </p>
      </Section>

      <Section title="مراجع سريعة" id="quick" className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardLink href="/btec-it/questions" title="الأسئلة والأجوبة" meta="مجمّعة حسب المفهوم">
            أسئلة الطلبة بصياغاتها المختلفة، كل مجموعة تقود إلى شرح واحد.
          </CardLink>
          <CardLink href="/btec-it/glossary" title="المصطلحات" titleEn="Glossary" meta={`${getGlossary().length} مصطلحًا`}>
            عربي ↔ English لكل مصطلح مع تعريفه ومفهومه.
          </CardLink>
          <CardLink href="/btec-calculator" title="حاسبة المعدل" meta="أداة مجانية">
            حساب معدل التخصص والمعدل الكامل.
          </CardLink>
          <CardLink href="/resources" title="الملفات التعليمية" meta="PDF مجانية">
            دوسيات التأسيس وكتب الوحدات وملفات الشرح للتحميل.
          </CardLink>
        </div>
      </Section>

      <Section title="قيد الإعداد" id="pending" className="pt-0">
        <p className="mb-4 leading-8 text-ink/80">
          لا ننشر صفحة إلا عندما يتوفر لها مصدر موثّق. هذه المواضيع جزء من BTEC IT لكنها غير منشورة بعد:
        </p>
        <ul className="list-disc space-y-2 ps-6 leading-8">
          {pending.map((p) => (
            <li key={p.ar}>
              <strong>{p.ar}</strong> — <span className="text-muted">{p.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          هل تريد أن تعرف من أين يأتي هذا الشرح؟ اقرأ <Link href="/about" className="underline decoration-gold underline-offset-4">عن أحمد دومي</Link>.
        </p>
      </Section>
    </>
  );
}
