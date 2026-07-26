import { Mail } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { LanguageSwitch } from "./LanguageSwitch";
import { SocialGlyph, type SocialPlatform } from "@/components/ui/SocialGlyph";
import { formatTemplate } from "@/lib/utils";

export function Footer({ locale, dict, switchHref }: { locale: Locale; dict: Dictionary; switchHref: string }) {
  const year = new Date().getFullYear();

  const socialLinks: { href: string; label: string; platform?: SocialPlatform }[] = [
    { href: `mailto:${profile.email}`, label: "Email" },
    { href: profile.social.linkedin, label: "LinkedIn", platform: "linkedin" },
    { href: profile.social.github, label: "GitHub", platform: "github" },
    { href: profile.social.youtube, label: "YouTube", platform: "youtube" },
    { href: profile.social.instagram, label: "Instagram", platform: "instagram" },
  ];

  return (
    <footer className="bg-navy text-ivory">
      <Container className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold">{profile.name[locale]}</p>
            <p className="mt-1 text-sm text-ivory/70">{dict.hero.title}</p>
            <p className="mt-1 text-sm text-ivory/70">{profile.location[locale]}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, platform }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory hover:border-gold hover:text-gold transition-colors"
                >
                  {platform ? <SocialGlyph platform={platform} /> : <Mail size={18} aria-hidden="true" />}
                </a>
              ))}
            </div>
            <LanguageSwitch locale={locale} switchHref={switchHref} label={dict.nav.langSwitch} tone="dark" />
          </div>
        </div>

        <div className="mt-10 border-t border-ivory/15 pt-6 text-sm text-ivory/60">
          <p>{formatTemplate(dict.footer.rightsTemplate, { year })}</p>
        </div>
      </Container>
    </footer>
  );
}
