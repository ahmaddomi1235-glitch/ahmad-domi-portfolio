import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { SITE_URL, brand, defaultDescription } from "@/config/site";

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

/**
 * Static root layout. The document language/direction is Arabic; the English subtree (/en) declares
 * lang="en" dir="ltr" on its own wrapper. Nothing here reads request headers, so every route can be
 * statically generated.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: brand.full, template: `%s | ${brand.siteName}` },
  description: defaultDescription,
  applicationName: brand.siteName,
  authors: [{ name: brand.nameEn, url: `${SITE_URL}/about` }],
  creator: brand.nameEn,
  openGraph: { siteName: brand.siteName, locale: "ar_JO", type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${plexArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-ink">{children}</body>
    </html>
  );
}
