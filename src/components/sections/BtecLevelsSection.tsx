import type { Dictionary } from "@/content/dictionary";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function BtecLevelsSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="btec-levels" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading kicker={dict.btecLevels.kicker} heading={dict.btecLevels.heading} intro={dict.btecLevels.description} />
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{dict.btecLevels.paragraph2}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.btecLevels.levels.map((level, i) => (
            <Reveal key={level.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-ivory p-6">
                <h3 className="text-lg font-semibold text-ink">{level.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{level.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 border-s-4 border-gold ps-4 text-sm font-medium leading-relaxed text-ink">
            {dict.btecLevels.closingNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
