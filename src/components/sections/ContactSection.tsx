"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialGlyph, type SocialPlatform } from "@/components/ui/SocialGlyph";

export function ContactSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the visible mailto link still works.
    }
  };

  const socials: { href: string; label: string; platform: SocialPlatform }[] = [
    { href: profile.social.linkedin, label: "LinkedIn", platform: "linkedin" },
    { href: profile.social.github, label: "GitHub", platform: "github" },
    { href: profile.social.youtube, label: "YouTube", platform: "youtube" },
    { href: profile.social.instagram, label: "Instagram", platform: "instagram" },
  ];

  return (
    <section id="contact" className="bg-navy py-24 text-ivory">
      <Container>
        <SectionHeading kicker={dict.contact.kicker} heading={dict.contact.heading} intro={dict.contact.description} tone="dark" />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-ivory/60">{dict.contact.emailLabel}</p>
                    <a href={`mailto:${profile.email}`} className="font-medium hover:text-gold break-all">
                      {profile.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? undefined : "Copy email address"}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory hover:border-gold hover:text-gold"
                  >
                    {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  </button>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-ivory/60">{dict.contact.phoneLabel}</p>
                  <a href={`tel:${profile.phone}`} className="font-medium hover:text-gold tabular-nums">
                    {profile.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-ivory/60">{dict.contact.locationLabel}</p>
                  <p className="font-medium">{profile.location[locale]}</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-sm font-semibold uppercase tracking-wide text-ivory/60">{dict.contact.socialLabel}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map(({ href, label, platform }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-5 py-3 text-sm font-medium hover:border-gold hover:text-gold min-h-[44px]"
                >
                  <SocialGlyph platform={platform} size={16} />
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
