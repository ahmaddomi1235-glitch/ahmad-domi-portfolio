/**
 * Single source of truth for the canonical identity of the site.
 *
 * SITE_URL is intentionally a constant, not an environment variable: Vercel preview deployments and the legacy
 * *.vercel.app host must still emit canonical URLs that point at the production domain.
 */
export const SITE_URL = "https://ahmaddomiedu.com";

export const brand = {
  nameEn: "Ahmad Domi",
  nameAr: "أحمد دومي",
  context: "BTEC IT",
  /** Visible, consistent identity string. */
  full: "Ahmad Domi | أحمد دومي — BTEC IT",
  siteName: "أحمد دومي — BTEC IT",
  tagline: "مدرّس BTEC IT في الأردن: شرح الوحدات بالعربي مع المصطلحات بالإنجليزي",
  jobTitleEn: "BTEC IT Instructor",
  jobTitleAr: "مدرّس BTEC IT",
} as const;

/** Names that exist only so machines can reconcile the entity. They are never displayed prominently. */
export const alternateNames = ["Ahmad Raed Ahmad Domi", "Ahmad Ra'ed Domi", "Ahmad Doumi", "احمد دومي", "أ. أحمد دومي"];

export const accounts = {
  youtube: "https://www.youtube.com/@AhmadDomiedu",
  instagram: "https://www.instagram.com/ahmaddomiedu/",
  github: "https://github.com/ahmaddomi1235-glitch",
  linkedin: "https://linkedin.com/in/ahmad-domi",
  /** Card preview + booking platform (free first video, booking over WhatsApp). */
  cardPlatform: "https://ahmaddomi-edu.vercel.app",
} as const;

/**
 * Third-party profiles that corroborate the identity. Add the Asas teacher-profile URL here once it is provided
 * (see docs/SOCIAL_ENTITY_CHANGES.md) — it flows into the Person schema automatically.
 */
export const thirdPartyProfiles: string[] = [];

export const sameAs: string[] = [
  accounts.youtube,
  accounts.instagram,
  accounts.github,
  accounts.linkedin,
  ...thirdPartyProfiles,
];

export const knowsAbout = [
  "BTEC IT",
  "Cybersecurity",
  "Artificial Intelligence",
  "Data Modelling",
  "IT Project Management",
  "Website Development",
  "Introduction to Applications",
];

export const profileImage = `${SITE_URL}/images/profile/ahmad-domi-profile.jpg`;

export const defaultDescription =
  "أحمد دومي مدرّس BTEC IT في الأردن. شرح بالعربي لوحدات الأمن السيبراني والذكاء الاصطناعي ونمذجة البيانات وإدارة المشاريع، مع المصطلحات الإنجليزية والمصادر.";

export const mainNav = [
  { href: "/btec-it", label: "BTEC IT" },
  { href: "/btec-it/questions", label: "الأسئلة" },
  { href: "/btec-it/glossary", label: "المصطلحات" },
  { href: "/videos", label: "الفيديوهات" },
  { href: "/btec-calculator", label: "حاسبة المعدل" },
  { href: "/btec-it-card", label: "بطاقة BTEC IT" },
  { href: "/about", label: "عن أحمد" },
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path}`;
}
