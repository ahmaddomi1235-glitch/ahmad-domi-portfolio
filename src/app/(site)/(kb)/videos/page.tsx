import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader, Section } from "@/components/kb/Layout";
import { formatDuration } from "@/components/kb/VideoEmbed";
import { accounts } from "@/config/site";
import { videosGraph } from "@/lib/seo/jsonld";
import { seoMeta } from "@/lib/seo/intent";
import { getNode, getUnits, getVideos, urlFor } from "@/lib/kb/queries";

export const metadata = seoMeta("/videos");

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "الفيديوهات", path: "/videos" },
];

export default function VideosPage() {
  const videos = getVideos();
  const units = getUnits();
  const groups = [
    ...units.map((u) => ({ key: u.id, title: u.title_ar, list: videos.filter((v) => v.unitId === u.id) })),
    { key: "other", title: "أخرى", list: videos.filter((v) => !v.unitId) },
  ].filter((g) => g.list.length);

  return (
    <>
      <JsonLd
        data={videosGraph(
          videos.filter((v) => v.uploadDate).map((v) => ({ youtubeId: v.youtubeId, name: v.conceptTitle_ar, description: v.summary, uploadDate: v.uploadDate, durationSeconds: v.duration })),
          crumbs,
        )}
      />
      <PageHeader
        crumbs={crumbs}
        title="فيديوهات أحمد دومي"
        lead={
          <p>
            {videos.length} درسًا مصوّرًا من{" "}
            <a href={accounts.youtube} target="_blank" rel="me noopener noreferrer" className="text-navy underline decoration-gold underline-offset-4">
              قناة أحمد دومي على YouTube
            </a>
            ، مرتبة حسب الوحدة. العنوان هنا يبدأ بالمفهوم الذي يشرحه الدرس، وعنوان الفيديو على YouTube يظهر تحته. الدروس التي تحمل رابط «الشرح المكتوب» لها صفحة تلخّص الشرح بالنص.
          </p>
        }
      />
      {groups.map((g) => (
        <Section key={g.key} id={g.key} title={g.title}>
          <ul className="space-y-4">
            {g.list.map((v) => (
              <li key={v.id} id={v.youtubeId} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-white sm:flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`}
                  alt={`صورة درس «${v.conceptTitle_ar}» من أحمد دومي`}
                  width={320}
                  height={180}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover sm:w-64 sm:shrink-0"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-muted">{v.lessonLabel}</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{v.conceptTitle_ar}</h3>
                  <p className="mt-1 text-sm text-muted" lang="ar">
                    على YouTube: {v.originalTitle}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {formatDuration(v.duration)}
                    {v.uploadDate ? ` · ${v.uploadDate}` : ""}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <a
                      href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="video_click"
                      data-track-id={v.youtubeId}
                      className="inline-flex min-h-11 items-center font-semibold text-navy underline decoration-gold underline-offset-4"
                    >
                      شاهد على YouTube
                    </a>
                    {v.conceptIds.map((id) => {
                      const c = getNode(id);
                      return c ? (
                        <Link key={id} href={urlFor(c)} className="inline-flex min-h-11 items-center text-navy underline decoration-line underline-offset-4 hover:decoration-gold">
                          الشرح المكتوب: {c.title_ar}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </>
  );
}
