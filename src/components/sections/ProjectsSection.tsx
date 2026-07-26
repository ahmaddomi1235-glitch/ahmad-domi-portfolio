"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter, type FilterValue } from "@/components/projects/ProjectFilter";

export function ProjectsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <section id="projects" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading kicker={dict.projectsSection.kicker} heading={dict.projectsSection.heading} intro={dict.projectsSection.description} />

        <Reveal delay={0.05} className="mt-8">
          <ProjectFilter value={filter} onChange={setFilter} labels={dict.projectsSection.filters} />
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
