import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthorCard } from "@/components/kb/AuthorCard";
import { ContactCta } from "@/components/kb/ContactCta";
import { PageHeader, Section } from "@/components/kb/Layout";
import { serviceGraph } from "@/lib/seo/jsonld";
import { intentFor, seoMeta } from "@/lib/seo/intent";
import { getUnits } from "@/lib/kb/queries";
import { lessonsPath, services } from "@/config/services";

export const metadata = seoMeta(lessonsPath);

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "BTEC IT", path: "/btec-it" },
  { name: "دروس خصوصية BTEC IT", path: lessonsPath },
];

const { inPersonPerHourJOD: inPerson, onlinePerHourJOD: online } = services.privateLessons;

export default function PrivateLessonsPage() {
  const intent = intentFor(lessonsPath)!;
  const units = getUnits();
  const description = `دروس خصوصية في BTEC IT مع أحمد دومي، مدرّس BTEC IT في الأردن: وجاهي ${inPerson} دينارًا أردنيًا للساعة وأونلاين ${online} دينارًا أردنيًا للساعة، بالعربي مع المصطلحات الإنجليزية.`;

  return (
    <>
      <JsonLd
        data={serviceGraph({
          path: lessonsPath,
          name: "دروس خصوصية BTEC IT مع أحمد دومي",
          description,
          serviceType: "Private tutoring: BTEC IT (in person and online)",
          crumbs,
          offers: [
            { name: "درس خصوصي BTEC IT وجاهي (للساعة)", pricePerHourJOD: inPerson },
            { name: "درس خصوصي BTEC IT أونلاين (للساعة)", pricePerHourJOD: online },
          ],
        })}
      />
      <PageHeader
        crumbs={crumbs}
        title={intent.h1}
        titleEn="BTEC IT private lessons with Ahmad Domi — online and in person"
        lead={
          <p>
            أحمد دومي مدرّس BTEC IT من إربد في الأردن، يقدّم دروسًا خصوصية في BTEC IT بالعربي مع المصطلحات الإنجليزية: <strong>وجاهيًا بسعر {inPerson} دينارًا أردنيًا للساعة</strong>، و
            <strong>أونلاين بسعر {online} دينارًا أردنيًا للساعة</strong>.
          </p>
        }
      />

      <Section title="الأسعار" id="prices">
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[420px] text-start">
            <caption className="sr-only">أسعار الدروس الخصوصية في BTEC IT</caption>
            <thead className="bg-ivory text-sm text-muted">
              <tr>
                <th scope="col" className="p-4 text-start">نوع الدرس</th>
                <th scope="col" className="p-4 text-start">السعر</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <th scope="row" className="p-4 text-start font-semibold">وجاهي</th>
                <td className="p-4">
                  {inPerson} دينارًا أردنيًا للساعة (<bdi dir="ltr">{inPerson} JOD / hour</bdi>)
                </td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="p-4 text-start font-semibold">أونلاين</th>
                <td className="p-4">
                  {online} دينارًا أردنيًا للساعة (<bdi dir="ltr">{online} JOD / hour</bdi>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          لا تحدد هذه الصفحة مكان الدرس الوجاهي ولا المواعيد ولا مدة الحصة الدنيا؛ للاستفسار عنها تواصل قبل الحجز.
        </p>
      </Section>

      <Section title="ماذا يشرح أحمد؟" id="subjects" className="pt-0">
        <p className="mb-4 max-w-3xl leading-8 text-ink/85">
          المجالات التي يشرحها أحمد دومي هي وحدات BTEC IT التي تغطيها شروحاته المنشورة هنا، مع فهم مصطلحات التقييم وكتابة التقارير. هذه قائمة بمجالات التدريس وليست وعدًا بتوفّر كل موضوع
          للحجز الفوري؛ لتأكيد الوحدة والمستوى المطلوبين تواصل قبل الحجز.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {units.map((u) => (
            <li key={u.id} className="rounded-xl border border-line bg-white p-4 leading-7">
              <Link href={`/btec-it/${u.slug}`} className="font-medium text-navy underline decoration-gold underline-offset-4">
                {u.title_ar}
              </Link>
              <span lang="en" dir="ltr" className="block text-sm text-muted">
                {u.title_en}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="من هو المدرّس؟" id="teacher" className="pt-0">
        <div className="kb-prose">
          <p>
            أحمد دومي (<bdi lang="en" dir="ltr">Ahmad Domi</bdi>) مدرّس BTEC IT في إربد، الأردن. عمل مدرّسًا لـ BTEC IT على منصة أساس التعليمية وكمدرّب مستقل لطلبة BTEC IT، وهو حاصل على بكالوريوس في الأمن
            السيبراني من جامعة آل البيت. تفاصيل خبرته في صفحة <Link href="/about">عن أحمد دومي</Link>، وشروحاته المجانية في <Link href="/btec-it">قاعدة معرفة BTEC IT</Link> وعلى قناته في YouTube.
          </p>
        </div>
      </Section>

      <Section title="حدود الدروس" id="limits" className="pt-0">
        <ul className="list-disc space-y-2 ps-6 leading-8">
          <li>الدروس شرح وإرشاد تعليمي؛ لا تُكتب فيها الأعمال المقيَّمة نيابة عن الطالب.</li>
          <li>لا تضمن الدروس علامة معيّنة (Pass أو Merit أو Distinction).</li>
          <li>الدروس ليست معتمدة من Pearson ولا مرتبطة بها رسميًا.</li>
        </ul>
      </Section>

      <Section title="البطاقة التعليمية" id="card" className="pt-0">
        <p className="leading-8 text-ink/85">
          إن كنت تفضّل شرحًا مصوّرًا تعود إليه في أي وقت فتعرّف على{" "}
          <Link href="/btec-it-card" className="font-medium text-navy underline decoration-gold underline-offset-4">
            بطاقة أحمد دومي التعليمية لـ BTEC IT
          </Link>
          : سعرها {services.card.priceJOD} دينارًا أردنيًا، ومراجعة تقارير الطلاب مشمولة معها. وللتعرّف على أسلوب الشرح قبل الحجز شاهد{" "}
          <Link href="/videos" className="font-medium text-navy underline decoration-gold underline-offset-4">
            فيديوهاته المجانية
          </Link>{" "}
          أو اقرأ <Link href="/btec-it/assessment" className="font-medium text-navy underline decoration-gold underline-offset-4">دليل التقييم وكتابة التقارير</Link>.
        </p>
      </Section>

      <Section title="التواصل والحجز" id="contact" className="pt-0">
        <ContactCta track="lessons-page" showPlatform={false} />
      </Section>

      <Section id="author" className="pt-0">
        <AuthorCard lastReviewed="2026-10-09" sources={[]} />
      </Section>
    </>
  );
}
