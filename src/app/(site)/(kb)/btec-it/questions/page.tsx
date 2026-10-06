import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Inline } from "@/components/kb/Inline";
import { PageHeader, Section } from "@/components/kb/Layout";
import { collectionGraph } from "@/lib/seo/jsonld";
import { seoMeta } from "@/lib/seo/intent";
import { getConcepts, getUnits, getUnitById } from "@/lib/kb/queries";

export const metadata = seoMeta("/btec-it/questions");

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "BTEC IT", path: "/btec-it" },
  { name: "الأسئلة والأجوبة", path: "/btec-it/questions" },
];

export default function QuestionsPage() {
  const units = getUnits();
  const concepts = getConcepts();
  return (
    <>
      <JsonLd data={collectionGraph({ path: "/btec-it/questions", name: "أسئلة وأجوبة BTEC IT", description: "أسئلة الطلبة مجمّعة حسب المفهوم", crumbs })} />
      <PageHeader
        crumbs={crumbs}
        title="أسئلة وأجوبة BTEC IT"
        lead={<p>الأسئلة التي تحمل المعنى نفسه مجمّعة تحت جواب واحد، ثم رابط إلى الصفحة التي تشرح الموضوع كاملًا. لا نكرر الصفحة نفسها بصياغات مختلفة للسؤال.</p>}
      />
      {units.map((u) => {
        const list = concepts.filter((c) => c.unit === u.id && c.questionsAnswered.length);
        if (!list.length) return null;
        return (
          <Section key={u.id} id={u.slug} title={u.title_ar}>
            <div className="space-y-5">
              {list.map((c) => {
                const unit = getUnitById(c.unit ?? "");
                return (
                  <article key={c.id} className="rounded-2xl border border-line bg-white p-6">
                    <h3 className="text-lg font-bold">
                      <Link href={`/btec-it/${unit?.slug}/${c.slug}`} className="hover:text-navy">
                        {c.title_ar}
                      </Link>
                    </h3>
                    <ul className="mt-3 list-disc space-y-1 ps-6 leading-8 text-ink/90">
                      {c.questionsAnswered.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                    <p className="mt-4 rounded-xl bg-ivory p-4 leading-8">
                      <strong>الجواب المختصر: </strong>
                      <Inline text={c.shortAnswer} />
                    </p>
                    <p className="mt-3 text-sm">
                      <Link href={`/btec-it/${unit?.slug}/${c.slug}`} className="font-medium text-navy underline decoration-gold underline-offset-4">
                        الشرح الكامل ←
                      </Link>
                    </p>
                  </article>
                );
              })}
            </div>
          </Section>
        );
      })}
    </>
  );
}
