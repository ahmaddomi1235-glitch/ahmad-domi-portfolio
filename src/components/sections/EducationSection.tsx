import { GraduationCap, Trophy } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function EducationSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="education" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading kicker={dict.education.kicker} heading={dict.education.heading} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-ivory p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-ivory">
                <GraduationCap size={22} aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-gold">{dict.education.educationLabel}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{profile.education.degree[locale]}</p>
              <p className="mt-1 text-muted">{profile.education.institution[locale]}</p>
              <p className="mt-3 text-sm text-muted">
                {dict.education.graduatedLabel}: <span className="tabular-nums">{profile.education.graduation}</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-line bg-ivory p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Trophy size={22} aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-gold">{dict.education.achievementLabel}</p>
              <ul className="mt-2 space-y-2">
                {profile.achievements.map((achievement) => (
                  <li key={achievement.en} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {achievement[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
