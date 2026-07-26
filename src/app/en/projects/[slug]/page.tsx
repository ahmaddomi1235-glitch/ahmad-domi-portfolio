import { ProjectCaseStudy, generateProjectStaticParams } from "@/components/projects/ProjectCaseStudy";

export function generateStaticParams() {
  return generateProjectStaticParams();
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectCaseStudy locale="en" slug={slug} />;
}
