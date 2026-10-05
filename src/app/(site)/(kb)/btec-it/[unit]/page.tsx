import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthorCard } from "@/components/kb/AuthorCard";
import { Blocks } from "@/components/kb/Blocks";
import { CardLink, Chip, PageHeader, Section } from "@/components/kb/Layout";
import { formatDuration } from "@/components/kb/VideoEmbed";
import { collectionGraph } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { getConceptsOfUnit, getResourcesOfUnit, getUnit, getUnits, getVideosOfUnit } from "@/lib/kb/queries";

export const dynamicParams = false;

export function generateStaticParams() {
  return getUnits().map((u) => ({ unit: u.slug }));
}

type Props = { params: Promise<{ unit: string }> };

export async function generateMetadata({ params }: Props) {
  const { unit: slug } = await params;
  const unit = getUnit(slug);
  if (!unit) return {};
  return pageMetadata({
    title: `${unit.title_ar} (${unit.title_en}) — BTEC IT`,
    description: unit.summary,
    path: `/btec-it/${unit.slug}`,
    modified: unit.lastReviewed,
  });
}

export default async function UnitPage({ params }: Props) {
  const { unit: slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();

  const concepts = getConceptsOfUnit(unit.id);
  const resources = getResourcesOfUnit(unit.id);
  const videos = getVideosOfUnit(unit.id);
  const crumbs = [
    { name: "الرئيسية", path: "/" },
    { name: "BTEC IT", path: "/btec-it" },
    { name: unit.title_ar, path: `/btec-it/${unit.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={collectionGraph({
          path: `/btec-it/${unit.slug}`,
          name: `${unit.title_ar} — BTEC IT`,
          description: unit.summary,
          crumbs,
          items: concepts.map((c) => ({ name: c.title_ar, path: `/btec-it/${unit.slug}/${c.slug}` })),
        })}
      />
      <PageHeader
        crumbs={crumbs}
        title={unit.title_ar}
        titleEn={unit.title_en}
        badge={<Chip tone="navy">وحدة BTEC IT</Chip>}
        lead={<p>{unit.description}</p>}
      />

      <Section id="intro">
        <Blocks blocks={unit.intro} />
      </Section>

      {concepts.length > 0 && (
        <Section title="المفاهيم" id="concepts" className="pt-0">
          <ol className="grid gap-4 sm:grid-cols-2">
            {concepts.map((c) => (
              <li key={c.id}>
                <CardLink href={`/btec-it/${unit.slug}/${c.slug}`} title={c.title_ar} titleEn={c.title_en} meta={c.type === "Comparison" ? "مقارنة" : "مفهوم"}>
                  {c.summary}
                </CardLink>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {unit.officialStructure && unit.officialSource && (
        <Section title="البنية الرسمية للوحدة (Pearson)" id="official" className="pt-0">
          <p className="leading-8 text-ink/85">
            هذا القسم يذكر <strong>الهيكل الرسمي فقط</strong>: رقم الوحدة وعناوين أهداف التعلم ورموز المعايير كما وردت في {unit.officialSource.publisher}. لا يتضمن
            نصوص المعايير نفسها؛ شرح الأفكار في صفحات المفاهيم مبني على مادة أحمد دومي.
          </p>
          <p className="mt-3 text-sm text-muted">
            الوحدة {unit.officialStructure.unitNumber}: {unit.officialStructure.unitTitle_ar} — {unit.officialStructure.assessmentMode}
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[34rem] text-start text-sm">
              <caption className="sr-only">أهداف التعلم الرسمية ورموز المعايير في الوحدة {unit.officialStructure.unitNumber}</caption>
              <thead className="bg-ivory">
                <tr>
                  <th scope="col" className="p-3 text-start">الهدف</th>
                  <th scope="col" className="p-3 text-start">Pass</th>
                  <th scope="col" className="p-3 text-start">Merit</th>
                  <th scope="col" className="p-3 text-start">Distinction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {unit.officialStructure.aims.map((a) => (
                  <tr key={a.letter}>
                    <th scope="row" className="p-3 text-start font-semibold">
                      {a.letter}: {a.title_ar}
                    </th>
                    <td className="p-3" dir="ltr">{a.criteria.pass.join(" · ")}</td>
                    <td className="p-3" dir="ltr">{a.criteria.merit.join(" · ")}</td>
                    <td className="p-3" dir="ltr">{a.criteria.distinction.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl border border-line bg-ivory p-4 text-sm leading-7 text-muted">
            <strong className="text-ink">{unit.officialStructure.verifiedAgainst}</strong> للنص الكامل للمعايير ارجع إلى مواصفات الوحدة الصادرة عن Pearson ومعلّمك.
          </p>
        </Section>
      )}

      {unit.axes.length > 0 && (
        <Section title="محاور الوحدة كما يعرضها أحمد دومي" id="axes" className="pt-0">
          <ul className="space-y-3">
            {unit.axes.map((a) => (
              <li key={a.label} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-bold text-ivory">
                  {a.label}
                </span>
                <div>
                  <p className="font-semibold">{a.title_ar}</p>
                  <p className="mt-1 text-sm leading-7 text-ink/80">{a.summary_ar}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl border border-line bg-ivory p-4 text-sm leading-7 text-muted">
            <strong className="text-ink">تنبيه:</strong> {unit.axesSource} لا تعتمد على هذا الترتيب كمرجع رسمي لأهداف التعلم؛ ارجع إلى مواصفات الوحدة الصادرة عن Pearson ومعلّمك.
          </p>
        </Section>
      )}

      {videos.length > 0 && (
        <Section title="الدروس المصوّرة" id="videos" className="pt-0">
          <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
            {videos.map((v) => (
              <li key={v.id} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{v.conceptTitle_ar}</p>
                  <p className="text-sm text-muted">
                    {v.lessonLabel} · {formatDuration(v.duration)}
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="video_click"
                  data-track-id={v.youtubeId}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-navy underline decoration-gold underline-offset-4"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  YouTube
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {resources.length > 0 && (
        <Section title="الملفات التعليمية" id="resources" className="pt-0">
          <ul className="grid gap-4 sm:grid-cols-2">
            {resources.map((r) => (
              <li key={r.id} className="flex flex-col rounded-2xl border border-line bg-white p-5">
                <p className="font-semibold">{r.title_ar}</p>
                <p className="mt-2 flex-1 text-sm leading-7 text-ink/80">{r.summary}</p>
                <a
                  href={r.material.filePath}
                  download
                  data-track="resource_download"
                  data-track-id={r.materialId}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-navy underline decoration-gold underline-offset-4"
                >
                  <Download size={14} aria-hidden="true" />
                  تحميل {r.material.fileType} ({r.material.fileSize})
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {unit.comingSoon.length > 0 && (
        <Section title="قيد الإعداد في هذه الوحدة" id="soon" className="pt-0">
          <ul className="list-disc space-y-1 ps-6 leading-8 text-ink/80">
            {unit.comingSoon.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">تُنشر كصفحات مستقلة عندما يكتمل توثيق مصدرها.</p>
        </Section>
      )}

      {unit.cardId && (
        <Section id="card" className="pt-0">
          <aside className="rounded-2xl border border-gold/40 bg-gold/10 p-6">
            <p className="font-semibold">هل تريد شرحًا مصوّرًا أوسع لهذه الوحدة؟</p>
            <p className="mt-2 leading-8 text-ink/85">
              تتوفر بطاقة تعليمية من أحمد دومي لهذه الوحدة، ويمكنك مشاهدة أول فيديو منها مجانًا قبل أن تقرر.{" "}
              <Link href="/btec-it-card" data-track="card_click" data-track-id={`unit-${unit.slug}`} className="font-medium text-navy underline decoration-navy underline-offset-4">
                تعرّف على البطاقة
              </Link>
              .
            </p>
          </aside>
        </Section>
      )}

      <Section id="author" className="pt-0">
        <AuthorCard lastReviewed={unit.lastReviewed} sources={unit.sourceReferences} />
      </Section>
    </>
  );
}
