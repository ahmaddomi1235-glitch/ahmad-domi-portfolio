import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function HeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F6F3ED 1px, transparent 1px), linear-gradient(to bottom, #F6F3ED 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Container className="relative grid gap-10 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <Reveal>
            <p className="mb-4 text-sm font-semibold tracking-wide text-gold">{dict.hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{dict.hero.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">{dict.hero.description}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#experience" variant="onDark">
                {dict.hero.ctaTeaching}
              </Button>
              <Button href="#projects" variant="onDark">
                {dict.hero.ctaProjects}
              </Button>
              {profile.cvUrl && (
                <Button href={profile.cvUrl} download={profile.cvFileName} variant="ghostOnDark">
                  {dict.hero.ctaCv}
                </Button>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex justify-center lg:justify-end">
          <div className="relative h-44 w-44 overflow-hidden rounded-full border border-gold/30 bg-navy-surface sm:h-52 sm:w-52">
            <Image
              src="/images/profile/ahmad-domi-profile.jpg"
              alt={dict.hero.portraitAlt}
              fill
              sizes="(min-width: 640px) 208px, 176px"
              className="object-cover object-top"
              priority
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
