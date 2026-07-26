import type { Dictionary } from "@/content/dictionary";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ProfessionalSummarySection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-line bg-white py-14 sm:py-16">
      <Container>
        <Reveal>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.professionalSummary.heading}</h2>
        </Reveal>
        <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {dict.professionalSummary.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.05}>
              <div className="border-t-2 border-gold pt-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{fact.label}</dt>
                <dd className="mt-1.5 text-sm font-medium leading-snug text-ink">{fact.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
