import type { Metadata } from "next";
import { SITE_URL, brand, defaultDescription, officialPortrait } from "@/config/site";

/** Identity and service pages that carry the official portrait as their social/preview image. Educational pages keep no preview image. */
const PORTRAIT_PATHS = new Set(["/", "/about", "/en", "/btec-it", "/btec-it/private-lessons", "/btec-it-card"]);

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
  const portrait = PORTRAIT_PATHS.has(path)
    ? [{ url: officialPortrait.url, width: officialPortrait.width, height: officialPortrait.height, alt: locale === "en_US" ? officialPortrait.altEn : officialPortrait.altAr }]
    : undefined;
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
      ...(portrait ? { images: portrait } : {}),
      ...(modified && type === "article" ? { modifiedTime: modified } : {}),
    },
    twitter: {
      card: portrait ? "summary" : "summary_large_image",
      title: fullTitle,
      description,
      ...(portrait ? { images: [{ url: officialPortrait.url, alt: portrait[0].alt }] } : {}),
    },
  };
}
