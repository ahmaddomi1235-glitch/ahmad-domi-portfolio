import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthorCard } from "@/components/kb/AuthorCard";
import { Blocks, tocOf } from "@/components/kb/Blocks";
import { Inline } from "@/components/kb/Inline";
import { Breadcrumbs } from "@/components/kb/Breadcrumbs";
import { Chip } from "@/components/kb/Layout";
import { VideoEmbed, formatDuration } from "@/components/kb/VideoEmbed";
import { absoluteUrl } from "@/config/site";
import { articleGraph } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getConcept, getConcepts, getUnit, getVideosOfConcept, linkedFrom, relatedConcepts, unitSlugOf } from "@/lib/kb/queries";

export const dynamicParams = false;

export function generateStaticParams() {
  return getConcepts().map((c) => ({ unit: unitSlugOf(c.unit), concept: c.slug }));
}

type Props = { params: Promise<{ unit: string; concept: string }> };

export async function generateMetadata({ params }: Props) {
  const { unit, concept } = await params;
  const c = getConcept(unit, concept);
  if (!c) return {};
  return pageMetadata({
    title: `${c.title_ar} (${c.title_en})`,
    description: c.summary,
    path: `/btec-it/${unit}/${c.slug}`,
    type: "article",
    modified: c.lastReviewed,
  });
}

export default async function ConceptPage({ params }: Props) {
  const { unit: unitSlug, concept } = await params;
  const unit = getUnit(unitSlug);
  const c = getConcept(unitSlug, concept);
  if (!unit || !c) notFound();

  const path = `/btec-it/${unit.slug}/${c.slug}`;
  const crumbs = [
    { name: "الرئيسية", path: "/" },
    { name: "BTEC IT", path: "/btec-it" },
    { name: unit.title_ar, path: `/btec-it/${unit.slug}` },
    { name: c.title_ar, path },
  ];
  const videos = getVideosOfConcept(c);
  const primary = videos[0];
  const toc = tocOf(c.body);
  const related = [...new Map([...relatedConcepts(c), ...linkedFrom(c)].map((r) => [r.id, r])).values()];

  return (
    <>
      <JsonLd
        data={articleGraph({
          path,
          headline: `${c.title_ar} (${c.title_en})`,
          description: c.summary,
          modified: c.lastReviewed,
          crumbs,
          about: { name: c.title_ar, alternateName: c.title_en },
          sources: c.sourceReferences.map((s) => ({ name: s.label, url: s.url ? absoluteUrl(s.url) : undefined })),
          video:
            primary && primary.uploadDate
              ? {
                  youtubeId: primary.youtubeId,
                  name: primary.conceptTitle_ar,
                  description: primary.summary,
                  uploadDate: primary.uploadDate,
                  durationSeconds: primary.duration,
                  chapters: primary.chapters,
                }
              : undefined,
        })}
      />

      <article>
        <header className="border-b border-line bg-white">
          <div className="mx-auto w-full max-w-3xl px-5 pb-8 pt-8 sm:px-8 sm:pt-10">
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Chip tone="navy">{c.type === "Comparison" ? "مقارنة" : "مفهوم"}</Chip>
              <Link href={`/btec-it/${unit.slug}`}>
                <Chip>{unit.title_ar}</Chip>
              </Link>
              <Chip tone="gold">مبني على مادة أحمد دومي</Chip>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">{c.title_ar}</h1>
            <p lang="en" dir="ltr" className="mt-2 text-start text-lg text-muted">
              {c.title_en}
            </p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8">
          <section aria-labelledby="short-answer" className="rounded-2xl border-2 border-navy bg-white p-6">
            <h2 id="short-answer" className="text-sm font-bold tracking-wide text-[#7a5c24]">
              الجواب المختصر
            </h2>
            <p className="mt-3 text-lg leading-9">
              <Inline text={c.shortAnswer} />
            </p>
          </section>

          {toc.length >= 3 && (
            <nav aria-label="محتويات الصفحة" className="mt-8 rounded-2xl border border-line bg-white p-5">
              <p className="mb-2 text-sm font-bold">على هذه الصفحة</p>
              <ol className="list-decimal space-y-1 ps-6 text-sm leading-7">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="underline decoration-line underline-offset-4 hover:decoration-gold">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-6">
            <Blocks blocks={c.body} />
          </div>

          {c.terminology.length > 0 && (
            <section aria-labelledby="terms" className="mt-12">
              <h2 id="terms" className="mb-4 text-2xl font-bold">
                المصطلحات: عربي ↔ English
              </h2>
              <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {c.terminology.map((t) => (
                  <div key={t.en} className="flex items-baseline justify-between gap-4 bg-white px-4 py-3">
                    <dt className="font-semibold">{t.ar}</dt>
                    <dd>
                      <bdi lang="en" dir="ltr" className="text-muted">
                        {t.en}
                      </bdi>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm">
                <Link href="/btec-it/glossary" className="font-medium text-navy underline decoration-gold underline-offset-4">
                  كل المصطلحات في القاموس ←
                </Link>
              </p>
            </section>
          )}

          {c.whyBtec && (
            <section aria-labelledby="why" className="mt-12 rounded-2xl border border-gold/40 bg-gold/10 p-6">
              <h2 id="why" className="text-xl font-bold">
                لماذا يهمّ هذا في BTEC؟
              </h2>
              <p className="mt-2 leading-8">{c.whyBtec}</p>
            </section>
          )}

          {c.learningAim && c.officialSource && unit.officialStructure && (
            <section aria-labelledby="official-map" className="mt-12 rounded-2xl border border-line bg-white p-6">
              <h2 id="official-map" className="text-xl font-bold">
                الربط الرسمي مقابل شرح أحمد دومي
              </h2>
              <p className="mt-2 leading-8">
                <strong>البنية الرسمية ({c.officialSource.publisher}):</strong> الوحدة {unit.officialStructure.unitNumber}، الهدف {c.learningAim} —{" "}
                {unit.officialStructure.aims.find((a) => a.letter === c.learningAim)?.title_ar}. ربط الموضوع بهذا الهدف اجتهاد من الموقع بحسب عنوان الهدف الرسمي، لا قائمة مواضيع رسمية. رموز المعايير الخاصة بهذا الهدف مذكورة في{" "}
                <Link href={`/btec-it/${unit.slug}#official`} className="font-medium text-navy underline decoration-gold underline-offset-4">
                  صفحة الوحدة
                </Link>
                .
              </p>
              <p className="mt-2 leading-8">
                <strong>شرح أحمد دومي:</strong> شرح هذه الصفحة مبني على مادة أحمد دومي وأُعدّ للنشر هنا بصياغة الموقع، وقد يتضمن أمثلة توضيحية ونصائح كتابة. وهو ليس نصًّا رسميًّا ولا حلًّا لمهمة.
              </p>
            </section>
          )}

          {c.questionsAnswered.length > 0 && (
            <section aria-labelledby="questions" className="mt-12">
              <h2 id="questions" className="mb-3 text-2xl font-bold">
                أسئلة تجيب عنها هذه الصفحة
              </h2>
              <ul className="list-disc space-y-1 ps-6 leading-8">
                {c.questionsAnswered.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </section>
          )}

          {primary && (
            <section aria-labelledby="video" className="mt-12">
              <h2 id="video" className="mb-4 text-2xl font-bold">
                الدرس المصوّر
              </h2>
              <VideoEmbed video={primary} />
              {primary.chapters.length > 0 && (
                <>
                  <h3 className="mb-2 mt-6 text-lg font-semibold">فصول الفيديو</h3>
                  <ol className="divide-y divide-line rounded-xl border border-line bg-white text-sm">
                    {primary.chapters.map((ch) => (
                      <li key={ch.t}>
                        <a
                          href={`https://www.youtube.com/watch?v=${primary.youtubeId}&t=${ch.t}s`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-11 items-center gap-4 px-4 py-2 hover:bg-ivory"
                        >
                          <span dir="ltr" className="w-12 shrink-0 text-start font-mono text-muted tabular-nums">
                            {formatDuration(ch.t)}
                          </span>
                          <span>
                            <Inline text={ch.title} />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-2 text-xs text-muted">توقيت الفصول تقريبي (±30 ثانية).</p>
                </>
              )}
              {videos.slice(1).map((v) => (
                <div key={v.id} className="mt-8">
                  <VideoEmbed video={v} />
                </div>
              ))}
            </section>
          )}

          {related.length > 0 && (
            <section aria-labelledby="related" className="mt-12">
              <h2 id="related" className="mb-4 text-2xl font-bold">
                مفاهيم مرتبطة
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/btec-it/${unitSlugOf(r.unit)}/${r.slug}`}
                      className="block rounded-xl border border-line bg-white p-4 hover:border-navy"
                    >
                      <span className="block font-semibold">{r.title_ar}</span>
                      <span className="mt-1 block text-sm leading-7 text-muted">{r.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {c.cardCta && (
            <aside aria-label="بطاقة BTEC IT" className="mt-12 rounded-2xl border border-line bg-white p-6">
              <p className="font-semibold">هل تريد المتابعة بشرح مصوّر أوسع؟</p>
              <p className="mt-2 leading-8 text-ink/85">
                هذه الصفحة تشرح المفهوم. وإن أردت شرحًا مصوّرًا أوسع ومواد دعم لهذه الوحدة، فتعرّف على{" "}
                <Link href="/btec-it-card" data-track="card_click" data-track-id={`concept-${c.slug}`} className="font-medium text-navy underline decoration-gold underline-offset-4">
                  بطاقة BTEC IT
                </Link>{" "}
                — ويمكنك مشاهدة أول فيديو منها مجانًا.
              </p>
            </aside>
          )}

          <div className="mt-12">
            <AuthorCard lastReviewed={c.lastReviewed} sources={c.sourceReferences} note={c.provenanceNote} />
          </div>
        </div>
      </article>
    </>
  );
}
