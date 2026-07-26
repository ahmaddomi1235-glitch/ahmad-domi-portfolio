import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialGlyph, type SocialPlatform } from "@/components/ui/SocialGlyph";

export function EducationalContentSection({ dict }: { dict: Dictionary }) {
  const channels: (typeof dict.educationalContent.youtube & { href: string; platform: SocialPlatform })[] = [
    { ...dict.educationalContent.youtube, href: profile.social.youtube, platform: "youtube" },
    { ...dict.educationalContent.instagram, href: profile.social.instagram, platform: "instagram" },
  ];

  return (
    <section id="educational-content" className="bg-ivory py-20 sm:py-24">
      <Container>
        <SectionHeading kicker={dict.educationalContent.kicker} heading={dict.educationalContent.heading} intro={dict.educationalContent.description} />
        <Reveal delay={0.08}>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{dict.educationalContent.paragraph2}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 max-w-2xl border-s-4 border-gold ps-4 text-sm font-medium leading-relaxed text-ink">
            {dict.educationalContent.audienceNote}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {channels.map((channel, i) => (
            <Reveal key={channel.title} delay={i * 0.08}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-7 transition-colors hover:border-navy"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-ivory">
                    <SocialGlyph platform={channel.platform} size={20} />
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-lg font-semibold text-ink">
                    {channel.title}
                    <span className="sr-only"> {dict.educationalContent.externalLinkNote}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{channel.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
