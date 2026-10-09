import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthorCard } from "@/components/kb/AuthorCard";
import { ContactCta } from "@/components/kb/ContactCta";
import { PageHeader, Section } from "@/components/kb/Layout";
import { cardGraph } from "@/lib/seo/jsonld";
import { seoMeta } from "@/lib/seo/intent";
import { getProduct, getUnit, getUnitById } from "@/lib/kb/queries";
import { cardName, lessonsPath, services } from "@/config/services";

export const metadata = seoMeta("/btec-it-card");

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "بطاقة أحمد دومي التعليمية — BTEC IT", path: "/btec-it-card" },
];

export default function CardPage() {
  const p = getProduct("btec-it-card")!;
  const purchaseUrl = p.howToGet[0]?.url;
  const commercial = p.showPrice && p.priceJOD != null && purchaseUrl ? { priceJOD: p.priceJOD, purchaseUrl } : undefined;

  return (
    <>
      <JsonLd data={cardGraph({ name: cardName, description: p.summary, crumbs, commercial })} />
      <PageHeader
        crumbs={crumbs}
        title="بطاقة أحمد دومي التعليمية — BTEC IT"
        titleEn="Ahmad Domi BTEC IT Card"
        lead={
          <p>
            بطاقة تعليمية مدفوعة لطلبة BTEC IT: شروحات مصوّرة بالعربي مع المصطلحات الإنجليزية ومواد دعم، وسعرها <strong>{services.card.priceJOD} دينارًا أردنيًا</strong>،
            و<strong>مراجعة تقارير الطلاب مشمولة مع البطاقة</strong>.
          </p>
        }
      />

      <Section title="الخلاصة" id="summary">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <div className="bg-white p-5">
            <dt className="text-sm text-muted">المنتج</dt>
            <dd className="mt-1 font-semibold">بطاقة أحمد دومي التعليمية — BTEC IT</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-sm text-muted">السعر</dt>
            <dd className="mt-1 font-semibold">
              {services.card.priceJOD} دينارًا أردنيًا (<bdi dir="ltr">{services.card.priceJOD} JOD</bdi>)
            </dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-sm text-muted">مراجعة تقارير الطلاب</dt>
            <dd className="mt-1 font-semibold">مشمولة مع البطاقة</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-sm text-muted">المقدِّم</dt>
            <dd className="mt-1 font-semibold">
              <Link href="/about" className="text-navy underline decoration-gold underline-offset-4">
                أحمد دومي
              </Link>
              ، مدرّس BTEC IT في الأردن
            </dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-sm text-muted">قبل الحجز</dt>
            <dd className="mt-1 font-semibold">أول فيديو مجاني من البطاقة</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-sm text-muted">الموقع الرسمي</dt>
            <dd className="mt-1 font-semibold">
              <bdi dir="ltr">ahmaddomiedu.com</bdi>
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="ما هي البطاقة؟" id="what" className="pt-0">
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

      <Section title="الوحدات التي لها بطاقات" id="units" className="pt-0">
        <ul className="grid gap-4 sm:grid-cols-2">
          {p.includes.map((i) => {
            const unit = getUnitById(i.unit) ?? getUnit(i.unit);
            return (
              <li key={i.unit} className="rounded-2xl border border-line bg-white p-5">
                <p className="font-semibold">{i.title_ar}</p>
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
        {p.excluded.map((e) => (
          <p key={e} className="mt-3 text-sm text-muted">
            {e}
          </p>
        ))}
      </Section>

      <Section title="مراجعة تقارير الطلاب" id="report-review" className="pt-0">
        <div className="kb-prose">
          <p>
            <strong>مراجعة تقارير الطلاب مشمولة مع البطاقة</strong>، وليست خدمة منفصلة مدفوعة. هي مراجعة وملاحظات تعليمية على عمل الطالب تساعده على فهم المطلوب وتحسين تقريره.
          </p>
          <p>
            المراجعة إرشاد وتعليق تعليمي: لا تضمن علامة معيّنة (Pass أو Merit أو Distinction)، ولا تعني كتابة العمل المقيَّم نيابة عن الطالب، وليست خدمة معتمدة من Pearson. للتعرّف على
            كيفية كتابة التقارير مجانًا اقرأ <Link href="/btec-it/assessment">دليل كتابة تقارير BTEC</Link>.
          </p>
        </div>
      </Section>

      <Section title="كيف تحصل عليها؟" id="how" className="pt-0">
        <ol className="list-decimal space-y-2 ps-6 leading-8">
          <li>شاهد أول فيديو مجانًا من البطاقة التي تهمّك لتتأكد أن أسلوب الشرح مناسب لك.</li>
          <li>إن ناسبك الأسلوب فاحجز البطاقة عبر فريق الدعم على واتساب من منصة البطاقات.</li>
        </ol>
        <p className="mt-4 text-sm text-muted">
          لا تتناول هذه الصفحة مدة البطاقة ولا عدد مرات المراجعة ولا طرق الدفع ولا سياسة الاسترجاع؛ للاستفسار عنها تواصل قبل الحجز.
        </p>
        <div className="mt-6">
          <ContactCta id="contact" track="card-page" />
        </div>
        <p className="mt-6 leading-8 text-ink/85">
          تفضّل شرحًا مباشرًا؟ يقدّم أحمد أيضًا{" "}
          <Link href={lessonsPath} className="font-medium text-navy underline decoration-gold underline-offset-4">
            دروسًا خصوصية في BTEC IT
          </Link>{" "}
          أونلاين ووجاهيًا.
        </p>
      </Section>

      <Section id="author" className="pt-0">
        <AuthorCard lastReviewed={p.lastReviewed} sources={p.sourceReferences} />
      </Section>
    </>
  );
}
