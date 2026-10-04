import { HomePage } from "@/components/HomePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Ahmad Domi — BTEC IT Instructor in Jordan",
  absoluteTitle: true,
  description:
    "Ahmad Domi is a BTEC IT instructor in Jordan. Teaching experience across Grade 10, first-year secondary and Tawjihi, teaching materials, student results, and projects in cybersecurity and AI. The knowledge base is in Arabic.",
  path: "/en",
  type: "profile",
  locale: "en_US",
  languages: { ar: "/about", en: "/en" },
});

export default function Page() {
  return <HomePage locale="en" />;
}
