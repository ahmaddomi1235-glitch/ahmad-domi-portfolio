import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { CardLink, PageHeader, Section } from "@/components/kb/Layout";
import { collectionGraph } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getConceptsOfUnit, getGlossary, getUnits, getVideosOfUnit } from "@/lib/kb/queries";

export const metadata = pageMetadata({
  title: "قاعدة معرفة BTEC IT بالعربي",
  description:
    "وحدات BTEC IT مشروحة بالعربي مع المصطلحات الإنجليزية: الأمن السيبراني، الذكاء الاصطناعي، نمذجة البيانات، إدارة المشاريع، تطوير المواقع ومدخل إلى التطبيقات — بقلم أحمد دومي.",
  path: "/btec-it",
});

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "BTEC IT", path: "/btec-it" },
];

export default function BtecHub() {
  const units = getUnits();
  const items = units.map((u) => ({ name: u.title_ar, path: `/btec-it/${u.slug}` }));
  const pending = [
    { ar: "الرسومات والرسوم المتحركة (Graphics and Animation)", note: "لا توجد مادة مصدرية منشورة لها بعد" },
    { ar: "التعامل مع الحوادث الأمنية وجمع الأدلة الجنائية (الهدف D في الوحدة 11)", note: "تنتظر مادة مصدرية قبل النشر" },
  ];
  return (
    <>
      <JsonLd data={collectionGraph({ path: "/btec-it", name: "قاعدة معرفة BTEC IT", description: "وحدات BTEC IT مشروحة بالعربي", crumbs, items })} />
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

      <Section title="مراجع سريعة" id="quick" className="pt-0">
        <div className="grid gap-4 sm:grid-cols-3">
          <CardLink href="/btec-it/questions" title="الأسئلة والأجوبة" meta="مجمّعة حسب المفهوم">
            أسئلة الطلبة بصياغاتها المختلفة، كل مجموعة تقود إلى شرح واحد.
          </CardLink>
          <CardLink href="/btec-it/glossary" title="المصطلحات" titleEn="Glossary" meta={`${getGlossary().length} مصطلحًا`}>
            عربي ↔ English لكل مصطلح مع تعريفه ومفهومه.
          </CardLink>
          <CardLink href="/btec-calculator" title="حاسبة المعدل" meta="أداة مجانية">
            حساب معدل التخصص والمعدل الكامل.
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
