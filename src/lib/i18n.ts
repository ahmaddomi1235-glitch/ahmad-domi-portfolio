import { ar } from "@/content/ar";
import { en } from "@/content/en";
import type { Dictionary } from "@/content/dictionary";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeConfig: Record<Locale, { dir: "rtl" | "ltr"; label: string; nativeLabel: string; path: string }> = {
  ar: { dir: "rtl", label: "Arabic", nativeLabel: "العربية", path: "/" },
  en: { dir: "ltr", label: "English", nativeLabel: "English", path: "/en" },
};

/** Given a pathname (as seen on either the ar or en tree), return the equivalent path in the other locale. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const rest = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;

  if (target === "en") {
    return rest === "/" ? "/en" : `/en${rest}`;
  }
  return rest === "" ? "/" : rest;
}

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
