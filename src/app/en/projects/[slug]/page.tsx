import { ProjectCaseStudy, generateProjectStaticParams } from "@/components/projects/ProjectCaseStudy";
import { getProjectBySlug } from "@/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return generateProjectStaticParams();
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title.en} | Ahmad Domi — Portfolio`,
    absoluteTitle: true,
    description: p.summary.en,
    path: `/en/projects/${slug}`,
    locale: "en_US",
    languages: { ar: `/projects/${slug}`, en: `/en/projects/${slug}` },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProjectCaseStudy locale="en" slug={slug} />;
}
