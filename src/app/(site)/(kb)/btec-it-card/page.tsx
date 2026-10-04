import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthorCard } from "@/components/kb/AuthorCard";
import { PageHeader, Section } from "@/components/kb/Layout";
import { cardGraph } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getProduct, getUnit, getUnitById } from "@/lib/kb/queries";

export const metadata = pageMetadata({
  title: "بطاقة BTEC IT — أحمد دومي",
  description:
    "بطاقات تعليمية من أحمد دومي لوحدات BTEC IT: شروحات مصوّرة ومواد دعم وإرشاد للواجبات. شاهد أول فيديو مجانًا قبل الحجز. ما تغطيه البطاقة ولمن تناسب وكيف تحجزها.",
  path: "/btec-it-card",
});

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "بطاقة BTEC IT", path: "/btec-it-card" },
];

export default function CardPage() {
  const p = getProduct("btec-it-card")!;
  const first = p.includes.find((i) => i.priceJOD != null);
  const commercial = p.showPrice && p.howToGet[0] && first?.priceJOD != null ? { priceJOD: first.priceJOD, purchaseUrl: p.howToGet[0].url } : undefined;
  const reportReview =
    p.reportReview === "included"
      ? "تشمل البطاقة مراجعة التقارير."
      : p.reportReview === "not-included"
        ? "لا تشمل البطاقة مراجعة التقارير."
        : "للسؤال عن مراجعة التقارير تواصل مع فريق الدعم قبل الحجز؛ لا نعد بها هنا.";

  return (
    <>
      <JsonLd data={cardGraph({ name: p.title_ar, description: p.summary, crumbs, commercial })} />
      <PageHeader crumbs={crumbs} title="بطاقة BTEC IT" titleEn="BTEC IT Card — Ahmad Domi" lead={<p>{p.description}</p>} />

      <Section title="ما هي البطاقة؟" id="what">
        <div className="kb-prose">
          <p>
            البطاقة مادة تعليمية مدفوعة يقدّمها أحمد دومي لطلبة BTEC IT. تجمع شرحًا مصوّرًا للوحدة بالعربي مع المصطلحات الإنجليزية، ومواد دعم، وإرشادًا لمتطلبات الواجبات، ومتابعة للاستفسارات.
          </p>
          <p>
            الصفحات العامة في هذا الموقع (<Link href="/btec-it">قاعدة معرفة BTEC IT</Link>) شرح تعليمي مستقل ومجاني. أما محتوى البطاقة نفسه فلا يُنشر هنا.
          </p>
        </div>
      </Section>

      <Section title="لمن تناسب؟" id="who" className="pt-0">
        <ul className="list-disc space-y-2 ps-6 leading-8">
          {p.audience.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>

      <Section title="الوحدات المتاحة" id="units" className="pt-0">
        <ul className="grid gap-4 sm:grid-cols-2">
          {p.includes.map((i) => {
            const unit = getUnitById(i.unit) ?? getUnit(i.unit);
            return (
              <li key={i.unit} className="rounded-2xl border border-line bg-white p-5">
                <p className="font-semibold">{i.title_ar}</p>
                {p.showPrice && i.priceJOD != null && <p className="mt-1 text-sm text-muted">{i.priceJOD} د.أ</p>}
                {unit && (
                  <p className="mt-3 text-sm">
                    <Link href={`/btec-it/${unit.slug}`} className="font-medium text-navy underline decoration-gold underline-offset-4">
                      اقرأ شروحات هذه الوحدة المجانية ←
                    </Link>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="ماذا تتضمن؟" id="includes" className="pt-0">
        <ul className="list-disc space-y-2 ps-6 leading-8">
          {p.support.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl border border-line bg-white p-4 leading-8">{reportReview}</p>
        {p.excluded.map((e) => (
          <p key={e} className="mt-3 text-sm text-muted">
            {e}
          </p>
        ))}
      </Section>

      <Section title="كيف تحصل عليها؟" id="how" className="pt-0">
        <ol className="list-decimal space-y-2 ps-6 leading-8">
          <li>شاهد أول فيديو مجانًا من البطاقة التي تهمّك لتتأكد أن أسلوب الشرح مناسب لك.</li>
          <li>إن ناسبك الأسلوب فاحجز البطاقة عبر فريق الدعم على واتساب من المنصة نفسها.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.howToGet.map((h) => (
            <a
              key={h.url}
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track="card_click"
              data-track-id="card-page-preview"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-ivory hover:bg-navy-surface"
            >
              {h.label}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
        {!p.showPrice && <p className="mt-4 text-sm text-muted">الأسعار والعروض الحالية تظهر على منصة البطاقات قبل الحجز، ولذلك لا نثبّت رقمًا هنا.</p>}
      </Section>

      <Section id="author" className="pt-0">
        <AuthorCard lastReviewed={p.lastReviewed} sources={p.sourceReferences} />
      </Section>
    </>
  );
}
