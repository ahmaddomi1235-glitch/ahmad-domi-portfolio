import type { Locale } from "./i18n";

export function projectHref(locale: Locale, slug: string): string {
  return locale === "en" ? `/en/projects/${slug}` : `/projects/${slug}`;
}
