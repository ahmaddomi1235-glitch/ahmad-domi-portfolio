import { HomePage } from "@/components/HomePage";
import { pageMetadata } from "@/lib/seo/metadata";

/** Arabic portfolio / author page. Equivalent translation of /en, so hreflang is declared between the two. */
export const metadata = pageMetadata({
  title: "عن أحمد دومي | Ahmad Domi — مدرّس BTEC IT",
  absoluteTitle: true,
  description:
    "السيرة المهنية لأحمد دومي: مدرّس BTEC IT في الأردن، خبرته في تدريس الصف العاشر والأول الثانوي والتوجيهي، المواد التي أعدّها، نتائج وطلبته، ومشاريعه في الأمن السيبراني والذكاء الاصطناعي.",
  path: "/about",
  type: "profile",
  languages: { ar: "/about", en: "/en" },
});

export default function Page() {
  return <HomePage locale="ar" />;
}
