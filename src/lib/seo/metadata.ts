import type { Metadata } from "next";
import { SITE_URL, brand, defaultDescription } from "@/config/site";

type PageMeta = {
  /** Page title *without* the site suffix (the root layout template adds " | أحمد دومي — BTEC IT"). */
  title: string;
  description?: string;
  /** Path starting with "/" — becomes the canonical URL on the production host. */
  path: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  locale?: "ar_JO" | "en_US";
  /** hreflang alternates — only for pages that are genuinely equivalent translations. */
  languages?: Record<string, string>;
  modified?: string;
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description = defaultDescription,
  path,
  type = "website",
  noindex = false,
  locale = "ar_JO",
  languages,
  modified,
  absoluteTitle = false,
}: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`; // root canonical is "https://ahmaddomiedu.com/"
  const fullTitle = absoluteTitle ? title : `${title} | ${brand.siteName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: brand.siteName,
      locale,
      type,
      ...(modified && type === "article" ? { modifiedTime: modified } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
