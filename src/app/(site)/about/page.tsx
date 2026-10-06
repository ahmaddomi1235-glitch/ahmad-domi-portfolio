import { HomePage } from "@/components/HomePage";
import { seoMeta } from "@/lib/seo/intent";

/** Arabic portfolio / author page. Equivalent translation of /en, so hreflang is declared between the two. */
export const metadata = seoMeta("/about", {
  type: "profile",
  languages: { ar: "/about", en: "/en" },
});

export default function Page() {
  return <HomePage locale="ar" />;
}
