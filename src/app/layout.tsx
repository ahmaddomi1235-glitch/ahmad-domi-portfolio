import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { getDictionary, localeConfig, type Locale } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-en",
  subsets: ["latin"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ar",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dict = getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: locale === "ar" ? "/" : "/en",
      languages: { ar: "/", en: "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "ar" ? "ar_JO" : "en_US",
      type: "website",
      url: locale === "ar" ? "/" : "/en",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

async function getRequestLocale(): Promise<Locale> {
  const headerList = await headers();
  const locale = headerList.get("x-locale");
  return locale === "en" ? "en" : "ar";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const dict = getDictionary(locale);
  const dir = localeConfig[locale].dir;

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${plexArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <a href="#main-content" className="skip-link">
          {dict.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
