import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const now = new Date();

  const staticRoutes = ["/", "/en"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.9,
  }));

  const projectRoutes = projects
    .filter((p) => !p.detailsPending)
    .flatMap((p) => [
      { url: `${siteUrl}/projects/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
      { url: `${siteUrl}/en/projects/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    ]);

  return [...staticRoutes, ...projectRoutes];
}
