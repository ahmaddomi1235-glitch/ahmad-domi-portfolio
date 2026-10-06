import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader, Section } from "@/components/kb/Layout";
import { glossaryGraph } from "@/lib/seo/jsonld";
import { seoMeta } from "@/lib/seo/intent";
import { getGlossary, getNode, getUnits, urlFor } from "@/lib/kb/queries";

export const metadata = seoMeta("/btec-it/glossary");

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "BTEC IT", path: "/btec-it" },
  { name: "المصطلحات", path: "/btec-it/glossary" },
];

export default function GlossaryPage() {
  const terms = getGlossary();
  const units = getUnits();
  return (
    <>
      <JsonLd data={glossaryGraph(terms.map((t) => ({ slug: t.slug, ar: t.term_ar, en: t.term_en, definition: t.definition_ar })), crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="مصطلحات BTEC IT"
        titleEn="BTEC IT Glossary — Arabic ↔ English"
        lead={<p>كل مصطلح بالعربي والإنجليزي مع تعريف مختصر مبني على مادة أحمد دومي، ورابط إلى المفهوم الذي يشرحه. المصطلحات مجمّعة حسب الوحدة.</p>}
      />
      {units.map((u) => {
        const list = terms.filter((t) => t.unit === u.id);
        if (!list.length) return null;
        return (
          <Section key={u.id} id={u.slug} title={u.title_ar}>
            <dl className="grid gap-4">
              {list.map((t) => {
                const concept = t.conceptId ? getNode(t.conceptId) : undefined;
                return (
                  <div key={t.id} id={t.slug} className="scroll-mt-24 rounded-2xl border border-line bg-white p-5">
                    <dt className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-lg font-bold">{t.term_ar}</span>
                      <bdi lang="en" dir="ltr" className="text-muted">
                        {t.term_en}
                      </bdi>
                    </dt>
                    <dd className="mt-2 leading-8 text-ink/90">
                      {t.definition_ar}
                      {concept && (
                        <>
                          {" "}
                          <Link href={urlFor(concept)} className="font-medium text-navy underline decoration-gold underline-offset-4">
                            اقرأ الشرح: {concept.title_ar}
                          </Link>
                        </>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Section>
        );
      })}
    </>
  );
}
