import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CardLink, Chip, Section } from "@/components/kb/Layout";
import { accounts, brand } from "@/config/site";
import { homeGraph } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getConceptsOfUnit, getQuestionIndex, getResources, getUnits, getVideos } from "@/lib/kb/queries";

export const metadata = pageMetadata({
  title: "أحمد دومي | Ahmad Domi — مدرّس BTEC IT في الأردن",
  absoluteTitle: true,
  description:
    "أحمد دومي مدرّس BTEC IT في الأردن. شرح بالعربي لوحدات الأمن السيبراني والذكاء الاصطناعي ونمذجة البيانات وإدارة مشاريع تكنولوجيا المعلومات، مع المصطلحات الإنجليزية ومصادر كل شرح.",
  path: "/",
});

export default function EntityHome() {
  const units = getUnits();
  const videos = getVideos();
  const resources = getResources();
  const questions = getQuestionIndex();
  const featured = ["threat-vulnerability-risk", "ai-vs-machine-learning-vs-deep-learning", "data-vs-information", "project-vs-routine-operations"];
  const picked = featured
    .map((id) => questions.find((q) => q.conceptId === id))
    .filter((q): q is NonNullable<typeof q> => !!q);

  return (
    <>
      <JsonLd data={homeGraph()} />

      <section className="bg-navy text-ivory">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-gold">
              {brand.nameAr} · <bdi lang="en" dir="ltr">{brand.nameEn}</bdi> — {brand.context}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              أحمد دومي
              <span lang="en" dir="ltr" className="mt-2 block text-start text-2xl font-semibold text-ivory/80 sm:text-3xl">
                Ahmad Domi — BTEC IT
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-ivory/90">
              أحمد دومي <strong>مدرّس BTEC IT في الأردن</strong>. يشرح وحدات الأمن السيبراني والذكاء الاصطناعي ونمذجة البيانات وإدارة مشاريع
              تكنولوجيا المعلومات بالعربي، ويضع المصطلح الإنجليزي بجانب كل مفهوم، ويذكر مصدر كل شرح.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/btec-it" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold/90">
                تصفّح قاعدة معرفة BTEC IT
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
              <Link href="/about" className="inline-flex min-h-[44px] items-center rounded-full border border-ivory/30 px-6 py-3 text-sm font-semibold hover:border-ivory">
                من هو أحمد دومي؟
              </Link>
            </div>
          </div>
          {/* Portrait first on small screens and top-aligned on desktop, so a web-font swap in the text can never move it (CLS). */}
          <div className="flex justify-center max-lg:order-first lg:justify-end">
            <Image
              src="/images/profile/ahmad-domi-profile.jpg"
              alt="أحمد دومي، مدرّس BTEC IT"
              width={280}
              height={280}
              priority
              sizes="(min-width: 1024px) 280px, 200px"
              className="h-52 w-52 rounded-full border border-gold/40 object-cover object-top sm:h-64 sm:w-64"
            />
          </div>
        </div>
      </section>

      <Section title="أسئلة يجيب عنها هذا الموقع" id="faq">
        <dl className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5">
            <dt className="font-semibold">من هو أحمد دومي؟</dt>
            <dd className="mt-2 leading-8 text-ink/85">
              مدرّس BTEC IT في الأردن، درّس طلبة الصف العاشر والأول الثانوي والتوجيهي، وعمل مدرّسًا لـ BTEC IT على منصة أساس التعليمية.{" "}
              <Link href="/about" className="font-medium text-navy underline decoration-gold underline-offset-4">
                التفاصيل في صفحة «عن أحمد»
              </Link>
              .
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <dt className="font-semibold">ماذا يدرّس؟</dt>
            <dd className="mt-2 leading-8 text-ink/85">
              وحدات BTEC IT:{" "}
              {units.map((u, i) => (
                <span key={u.id}>
                  <Link href={`/btec-it/${u.slug}`} className="font-medium text-navy underline decoration-gold underline-offset-4">
                    {u.title_ar}
                  </Link>
                  {i < units.length - 1 ? "، " : "."}
                </span>
              ))}
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <dt className="font-semibold">ما الحسابات الرسمية لأحمد دومي؟</dt>
            <dd className="mt-2 leading-8 text-ink/85">
              قناة{" "}
              <a rel="me noopener noreferrer" target="_blank" href={accounts.youtube} className="font-medium text-navy underline decoration-gold underline-offset-4">
                YouTube
              </a>{" "}
              (<bdi dir="ltr">@AhmadDomiedu</bdi>)، وحساب{" "}
              <a rel="me noopener noreferrer" target="_blank" href={accounts.instagram} className="font-medium text-navy underline decoration-gold underline-offset-4">
                Instagram
              </a>{" "}
              (<bdi dir="ltr">@ahmaddomiedu</bdi>)، وحسابا{" "}
              <a rel="me noopener noreferrer" target="_blank" href={accounts.github} className="font-medium text-navy underline decoration-gold underline-offset-4">
                GitHub
              </a>{" "}
              و{" "}
              <a rel="me noopener noreferrer" target="_blank" href={accounts.linkedin} className="font-medium text-navy underline decoration-gold underline-offset-4">
                LinkedIn
              </a>
              .
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <dt className="font-semibold">ما الموارد التعليمية المتاحة هنا؟</dt>
            <dd className="mt-2 leading-8 text-ink/85">
              {resources.length} ملفات تعليمية (<Link href="/resources" className="font-medium text-navy underline decoration-gold underline-offset-4">الملفات</Link>)،{" "}
              {videos.length} فيديو من قناته (<Link href="/videos" className="font-medium text-navy underline decoration-gold underline-offset-4">الفيديوهات</Link>)،{" "}
              <Link href="/btec-it/glossary" className="font-medium text-navy underline decoration-gold underline-offset-4">مصطلحات عربي — English</Link>، و
              <Link href="/btec-calculator" className="font-medium text-navy underline decoration-gold underline-offset-4"> حاسبة المعدل</Link>.
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 md:col-span-2">
            <dt className="font-semibold">ما هي بطاقة BTEC IT؟</dt>
            <dd className="mt-2 leading-8 text-ink/85">
              بطاقات تعليمية مدفوعة من أحمد دومي لوحدات BTEC IT، فيها شروحات مصوّرة ومواد دعم، ويمكنك مشاهدة أول فيديو مجانًا قبل الحجز.{" "}
              <Link href="/btec-it-card" className="font-medium text-navy underline decoration-gold underline-offset-4" data-track="card_click" data-track-id="home-faq">
                ما تغطيه البطاقة وكيف تحجزها
              </Link>
              .
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="وحدات BTEC IT" id="units" className="pt-0">
        <p className="mb-6 max-w-2xl leading-8 text-ink/80">
          كل وحدة تتفرع إلى مفاهيم، وكل مفهوم صفحة تبدأ بالجواب المختصر ثم الشرح والمصطلحات والمصدر. الصفحات المنشورة حاليًا هي ما توفّر له مصدر موثّق من مادة أحمد نفسها.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((u) => {
            const n = getConceptsOfUnit(u.id).length;
            return (
              <CardLink key={u.id} href={`/btec-it/${u.slug}`} title={u.title_ar} titleEn={u.title_en} meta={n ? `${n} مفاهيم` : "ملف شرح"}>
                {u.summary}
              </CardLink>
            );
          })}
        </div>
      </Section>

      <Section title="ابدأ من سؤال" id="start" className="pt-0">
        <ul className="grid gap-3 md:grid-cols-2">
          {picked.map((q) => (
            <li key={q.conceptId}>
              <Link
                href={`/btec-it/${q.unitSlug}/${q.conceptSlug}`}
                className="block rounded-2xl border border-line bg-white p-5 transition-colors hover:border-navy"
              >
                <span className="block font-semibold">{q.question}</span>
                <span className="mt-2 block text-sm text-muted">{q.unitTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <Link href="/btec-it/questions" className="font-medium text-navy underline decoration-gold underline-offset-4">
            كل الأسئلة والأجوبة ←
          </Link>
        </p>
      </Section>

      <Section id="tools" title="أدوات" className="pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <CardLink href="/btec-calculator" title="حاسبة معدل BTEC" titleEn="BTEC Grade Calculator — Jordan Tawjihi" meta="أداة مجانية">
            تحسب معدل التخصص والمعدل الكامل من نتائج U/P/M/D والساعات المعتمدة.
          </CardLink>
          <CardLink href="/btec-it-card" title="بطاقة BTEC IT" titleEn="BTEC IT Card" meta="مدفوعة — معاينة مجانية">
            شروحات مصوّرة ومواد دعم لوحدات الأمن السيبراني والذكاء الاصطناعي ونمذجة البيانات.
          </CardLink>
        </div>
      </Section>

      <div className="mx-auto w-full max-w-4xl px-5 pb-4 sm:px-8">
        <Chip tone="gold">كل صفحة تعليمية هنا تحمل اسم كاتبها ومصدرها وتاريخ آخر تحديث</Chip>
      </div>
    </>
  );
}
