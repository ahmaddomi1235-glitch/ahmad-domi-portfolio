import { profile } from "@/content/profile";
import type { Locale } from "./i18n";

export function personJsonLd(locale: Locale) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name[locale],
      jobTitle: locale === "ar" ? "مدرب BTEC IT ومهندس أمن سيبراني" : "BTEC IT Instructor and Cybersecurity Engineer",
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: locale === "ar" ? "إربد" : "Irbid",
        addressCountry: "JO",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: profile.education.institution[locale],
      },
      knowsLanguage: ["ar", "en"],
      sameAs: [profile.social.linkedin, profile.social.github, profile.social.youtube, profile.social.instagram],
      url: locale === "ar" ? siteUrl : `${siteUrl}/en`,
    },
  };
}
