import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { getProjectBySlug, projects } from "@/content/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCoverArt } from "./ProjectCoverArt";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function ProjectCaseStudy({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProjectBySlug(slug);
  const dict = getDictionary(locale);

  if (!project) notFound();

  const switchHref = locale === "ar" ? `/en/projects/${slug}` : `/projects/${slug}`;
  const homeHref = locale === "ar" ? "/" : "/en";
  // Projects live on the portfolio page: /about (ar) or /en (en) — "/" is now the entity home.
  const backHref = `${locale === "ar" ? "/about" : "/en"}#projects`;

  return (
    <>
      <Header locale={locale} dict={dict} switchHref={switchHref} homeHref={homeHref} />
      <main id="main-content">
        <section className="bg-navy py-14 text-ivory sm:py-16">
          <Container>
            <a href={backHref} className="inline-flex items-center gap-2 text-sm font-medium text-ivory/70 hover:text-gold">
              <ArrowLeft size={16} aria-hidden="true" className="rtl:rotate-180" />
              {dict.projectsSection.backToProjects}
            </a>
            <Reveal delay={0.05}>
              <Badge tone="gold" className="mt-6">
                {project.categoryLabel[locale]}
              </Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">{project.title[locale]}</h1>
            </Reveal>
            {project.liveUrl && (
              <Reveal delay={0.15}>
                <div className="mt-6">
                  <Button href={project.liveUrl} external variant="gold" icon={<ArrowUpRight size={16} aria-hidden="true" />}>
                    {dict.projectsSection.liveSite}
                  </Button>
                </div>
              </Reveal>
            )}
          </Container>
        </section>

        {project.detailsPending || !project.caseStudy ? (
          <section className="bg-ivory py-16">
            <Container>
              <Reveal>
                <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
                  <p className="text-lg font-semibold text-ink">{dict.projectsSection.detailsPending}</p>
                  <p className="mt-2 text-sm text-muted">{dict.projectsSection.detailsOnRequest}</p>
                </div>
              </Reveal>
            </Container>
          </section>
        ) : (
          <section className="bg-ivory py-16">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                <div className="space-y-8">
                  <Reveal>
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.projectsSection.overviewLabel}</h2>
                      <p className="mt-3 leading-relaxed text-muted">{project.caseStudy.overview[locale]}</p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.projectsSection.problemLabel}</h2>
                      <p className="mt-3 leading-relaxed text-muted">{project.caseStudy.problem[locale]}</p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.projectsSection.roleLabel}</h2>
                      <p className="mt-3 leading-relaxed text-muted">{project.caseStudy.role[locale]}</p>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.05}>
                  {project.subsystems ? (
                    <ArchitectureDiagram project={project} locale={locale} />
                  ) : (
                    <ProjectCoverArt project={project} />
                  )}
                </Reveal>
              </div>

              <Reveal delay={0.05} className="mt-14">
                <div className="rounded-2xl border border-line bg-white p-7 sm:p-8">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.projectsSection.howItWorksLabel}</h2>
                  <p className="mt-3 leading-relaxed text-ink/85">{project.caseStudy.howItWorks[locale]}</p>
                </div>
              </Reveal>

              <div className="mt-14 grid gap-10 lg:grid-cols-2">
                <Reveal>
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.projectsSection.implementedLabel}</h2>
                    <ul className="mt-4 space-y-2">
                      {project.caseStudy.implemented[locale].map((c) => (
                        <li key={c} className="flex gap-2 text-sm leading-relaxed text-ink/80">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.projectsSection.technologiesLabel}</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.projectsSection.statusLabel}</h2>
                      <p className="mt-3 leading-relaxed text-ink">{project.caseStudy.status[locale]}</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="mt-14">
                <a href={backHref} className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold">
                  <ArrowLeft size={16} aria-hidden="true" className="rtl:rotate-180" />
                  {dict.projectsSection.backToProjects}
                </a>
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer locale={locale} dict={dict} switchHref={switchHref} />
    </>
  );
}

export function generateProjectStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
