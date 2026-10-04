"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LanguageSwitch } from "./LanguageSwitch";
import { cn } from "@/lib/utils";

/** `anchor` marks an in-page section (scroll-spy); items without one are plain links to other pages. */
type NavItem = { href: string; anchor?: string; label: string };

export function Header({
  locale,
  dict,
  switchHref,
  homeHref,
}: {
  locale: Locale;
  dict: Dictionary;
  switchHref: string;
  homeHref: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Section links are prefixed with the portfolio page path so they also work from project case-study pages.
  const base = locale === "ar" ? "/about" : "/en";
  const section = (anchor: string, label: string): NavItem => ({ href: `${base}${anchor}`, anchor, label });
  const navItems: NavItem[] = [
    { href: "/btec-it", label: locale === "ar" ? "قاعدة معرفة BTEC IT" : "BTEC IT knowledge base (Arabic)" },
    section("#experience", dict.nav.experience),
    section("#results", dict.nav.studentResults),
    section("#work-samples", dict.nav.workSamples),
    section("#educational-content", dict.nav.educationalContent),
    section("#projects", dict.nav.projects),
    section("#certifications", dict.nav.certifications),
    section("#contact", dict.nav.contact),
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = navItems
      .map((item) => (item.anchor ? document.querySelector(item.anchor) : null))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-ivory/95 backdrop-blur border-b border-line shadow-sm" : "bg-transparent border-b border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href={homeHref} className="flex items-center gap-2 font-semibold text-ink" aria-label={dict.nav.home}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-ivory text-sm font-bold tracking-wide">
            AD
          </span>
          <span className="hidden sm:inline text-sm font-semibold">{profile.shortName[locale]}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label={dict.nav.home}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-ink",
                item.anchor && activeSection === item.anchor && "text-ink",
              )}
              aria-current={item.anchor && activeSection === item.anchor ? "true" : undefined}
            >
              {item.label}
              {item.anchor && activeSection === item.anchor && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold" aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitch locale={locale} switchHref={switchHref} label={dict.nav.langSwitch} />
          {profile.cvUrl && (
            <Button href={profile.cvUrl} download={profile.cvFileName} variant="secondary" className="text-xs px-4 py-2">
              {dict.nav.downloadCv}
            </Button>
          )}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink"
          aria-label={menuOpen ? dict.nav.menuClose : dict.nav.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute inset-x-0 top-full bg-ivory border-b border-line shadow-lg"
        >
          <Container className="flex flex-col gap-1 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-ink hover:bg-navy/5 min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              <LanguageSwitch locale={locale} switchHref={switchHref} label={dict.nav.langSwitch} />
              {profile.cvUrl && (
                <Button href={profile.cvUrl} download={profile.cvFileName} variant="secondary" onClick={() => setMenuOpen(false)}>
                  {dict.nav.downloadCv}
                </Button>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
