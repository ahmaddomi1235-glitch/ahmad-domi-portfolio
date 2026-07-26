import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ProfessionalProfileSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const facts = [
    { label: dict.professionalProfile.facts.locationLabel, value: profile.location[locale] },
    { label: dict.professionalProfile.facts.roleLabel, value: dict.hero.title },
    {
      label: dict.professionalProfile.facts.educationLabel,
      value: `${profile.education.degree[locale]} — ${profile.education.institution[locale]} — ${profile.education.graduation}`,
    },
    { label: dict.professionalProfile.facts.areasLabel, value: dict.professionalProfile.facts.areasValue },
    {
      label: dict.professionalProfile.facts.languagesLabel,
      value: profile.languages.map((l) => `${l.name[locale]}: ${l.level[locale]}`).join(" — "),
    },
  ];

  return (
    <section id="profile" className="bg-ivory py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-gold">{dict.professionalProfile.kicker}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">{dict.professionalProfile.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-base text-muted">{dict.hero.title}</p>
          </Reveal>
          {profile.cvUrl && (
            <Reveal delay={0.15}>
              <div className="mt-6">
                <Button href={profile.cvUrl} download={profile.cvFileName} variant="secondary">
                  {dict.nav.downloadCv}
                </Button>
              </div>
            </Reveal>
          )}
        </div>

        <div>
          <div className="space-y-4">
            {dict.professionalProfile.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
