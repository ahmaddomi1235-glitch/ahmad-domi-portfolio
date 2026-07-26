import { Award } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function CertificationsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="certifications" className="bg-ivory py-24">
      <Container>
        <SectionHeading kicker={dict.certifications.kicker} heading={dict.certifications.heading} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.certifications.map((cert, i) => {
            const name = typeof cert.name === "string" ? cert.name : cert.name[locale];
            return (
              <Reveal key={name} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                    <Award size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{name}</p>
                    <p className="text-sm text-muted">{cert.category[locale]}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
