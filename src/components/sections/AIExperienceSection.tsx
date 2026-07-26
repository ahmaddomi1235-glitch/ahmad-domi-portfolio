import type { Dictionary } from "@/content/dictionary";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function AIExperienceSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="ai-experience" className="bg-ivory py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeading kicker={dict.aiExperience.kicker} heading={dict.aiExperience.heading} intro={dict.aiExperience.description} />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{dict.aiExperience.paragraph2}</p>
          </Reveal>
        </div>

        <ul className="grid gap-3">
          {dict.aiExperience.capabilities.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <li className="rounded-xl border border-line bg-white px-5 py-4 text-sm leading-relaxed text-ink">{item}</li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
