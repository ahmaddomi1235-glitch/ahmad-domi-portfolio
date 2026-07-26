import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function ExperienceSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="experience" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading kicker={dict.teachingExperience.kicker} heading={dict.teachingExperience.heading} />

        <div className="mt-6 max-w-3xl space-y-4">
          <Reveal>
            <p className="text-base leading-relaxed text-muted sm:text-lg">{dict.teachingExperience.intro}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">{dict.teachingExperience.paragraph2}</p>
          </Reveal>
        </div>

        <ol className="relative mt-12 space-y-8 ps-8 before:absolute before:top-2 before:bottom-2 before:start-[7px] before:w-px before:bg-line">
          {profile.experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <li className="relative">
                <span className="absolute -start-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-ivory" aria-hidden="true" />
                <div className="rounded-2xl border border-line bg-ivory p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{item.role[locale]}</p>
                      <p className="text-sm text-muted">{item.org[locale]}</p>
                    </div>
                    <Badge tone="gold">{item.duration[locale]}</Badge>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {item.points[locale].map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-navy/40" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
