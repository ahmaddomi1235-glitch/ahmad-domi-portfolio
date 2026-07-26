import type { Dictionary } from "@/content/dictionary";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function StatisticsSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="statistics" className="bg-navy py-20 text-ivory sm:py-24">
      <Container>
        <SectionHeading kicker={dict.statistics.kicker} heading={dict.statistics.heading} tone="dark" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="h-full rounded-2xl border border-ivory/15 bg-navy-surface p-6">
              <p className="text-sm font-semibold text-gold">{dict.statistics.followersQualifier}</p>
              <p className="mt-1 text-4xl font-semibold">
                <AnimatedCounter value={10400} ariaLabel={`${dict.statistics.followersQualifier} 10,400`} />
              </p>
              <p className="mt-2 text-sm font-medium text-ivory/80">{dict.statistics.followersLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">{dict.statistics.followersNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-ivory/15 bg-navy-surface p-6">
              <p className="text-sm font-semibold text-gold">{dict.statistics.reachQualifier}</p>
              <p className="mt-1 text-4xl font-semibold">
                <AnimatedCounter value={850000} ariaLabel={`${dict.statistics.reachQualifier} 850,000`} />
              </p>
              <p className="mt-2 text-sm font-medium text-ivory/80">{dict.statistics.reachLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">{dict.statistics.reachNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-2xl border border-ivory/15 bg-navy-surface p-6">
              <p className="mt-1 text-4xl font-semibold">{dict.statistics.outcomesValue}</p>
              <p className="mt-2 text-sm font-medium text-ivory/80">{dict.statistics.outcomesLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">{dict.statistics.outcomesNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="h-full rounded-2xl border border-ivory/15 bg-navy-surface p-6">
              <p className="mt-1 text-4xl font-semibold">
                <AnimatedCounter value={3} ariaLabel={`3 ${dict.statistics.levelsLabel}`} />
              </p>
              <p className="mt-2 text-sm font-medium text-ivory/80">{dict.statistics.levelsLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">{dict.statistics.levelsNote}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
