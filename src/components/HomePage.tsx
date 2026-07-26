import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { personJsonLd } from "@/lib/structuredData";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProfessionalSummarySection } from "@/components/sections/ProfessionalSummarySection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { BtecLevelsSection } from "@/components/sections/BtecLevelsSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { StudentResultsSection } from "@/components/sections/StudentResultsSection";
import { WorkSamplesSection } from "@/components/sections/WorkSamplesSection";
import { EducationalContentSection } from "@/components/sections/EducationalContentSection";
import { AIExperienceSection } from "@/components/sections/AIExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProfessionalProfileSection } from "@/components/sections/ProfessionalProfileSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const switchHref = locale === "ar" ? "/en" : "/";
  const homeHref = locale === "ar" ? "/" : "/en";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />
      <Header locale={locale} dict={dict} switchHref={switchHref} homeHref={homeHref} />
      <main id="main-content">
        <HeroSection dict={dict} />
        <ProfessionalSummarySection dict={dict} />
        <ExperienceSection locale={locale} dict={dict} />
        <BtecLevelsSection dict={dict} />
        <StatisticsSection dict={dict} />
        <StudentResultsSection locale={locale} dict={dict} />
        <WorkSamplesSection locale={locale} dict={dict} />
        <EducationalContentSection dict={dict} />
        <AIExperienceSection dict={dict} />
        <ProjectsSection locale={locale} dict={dict} />
        <CertificationsSection locale={locale} dict={dict} />
        <EducationSection locale={locale} dict={dict} />
        <ProfessionalProfileSection locale={locale} dict={dict} />
        <ContactSection locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} switchHref={switchHref} />
      <BackToTop label={dict.common.backToTop} />
    </>
  );
}
