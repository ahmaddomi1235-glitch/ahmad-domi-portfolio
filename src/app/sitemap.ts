import type { MetadataRoute } from "next";
import { isIndexableProject, projects } from "@/content/projects";
import { SITE_URL } from "@/config/site";
import { allPublishedNodes, getConcepts, getUnits, urlFor } from "@/lib/kb/queries";

/**
 * Only canonical, indexable, published, useful pages. Excluded on purpose: /search (noindex), drafts, PAID nodes,
 * anchors (glossary terms, videos), project stubs without a case study (noindex) and anything not routed. lastModified comes from the content's own
 * `lastReviewed` date — never "now".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const nodes = allPublishedNodes();
  const latest = nodes.map((n) => n.lastReviewed).sort().at(-1) ?? "2026-10-04";
  const at = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const url = (p: string) => `${SITE_URL}${p}`;

  const entries: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: at(latest) },
    { url: url("/about"), lastModified: at(latest), alternates: { languages: { ar: url("/about"), en: url("/en") } } },
    { url: url("/en"), lastModified: at(latest), alternates: { languages: { ar: url("/about"), en: url("/en") } } },
    { url: url("/btec-it"), lastModified: at(latest) },
    ...getUnits().map((u) => ({ url: url(urlFor(u)), lastModified: at(u.lastReviewed) })),
    ...getConcepts().map((c) => ({ url: url(urlFor(c)), lastModified: at(c.lastReviewed) })),
    { url: url("/btec-it/questions"), lastModified: at(latest) },
    { url: url("/btec-it/glossary"), lastModified: at(latest) },
    { url: url("/btec-calculator"), lastModified: at(latest) },
    { url: url("/btec-it-card"), lastModified: at(latest) },
    { url: url("/videos"), lastModified: at(latest) },
    { url: url("/resources"), lastModified: at(latest) },
  ];

  for (const p of projects.filter(isIndexableProject)) {
    const ar = url(`/projects/${p.slug}`);
    const en = url(`/en/projects/${p.slug}`);
    entries.push({ url: ar, alternates: { languages: { ar, en } } }, { url: en, alternates: { languages: { ar, en } } });
  }
  return entries;
}
