import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionary";
import { Badge } from "@/components/ui/Badge";
import { ProjectCoverArt } from "./ProjectCoverArt";
import { projectHref } from "@/lib/projectHref";

export function ProjectCard({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  const href = projectHref(locale, project.slug);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <ProjectCoverArt project={project} className="rounded-none rounded-t-2xl" />
      <div className="flex flex-1 flex-col p-6">
        <Badge>{project.categoryLabel[locale]}</Badge>
        <h3 className="mt-3 text-lg font-semibold text-ink">{project.title[locale]}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary[locale]}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">{project.contribution[locale]}</p>

        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="text-xs font-medium text-ink/60">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          {project.detailsPending ? (
            <span className="text-sm font-medium text-muted">{dict.projectsSection.detailsPending}</span>
          ) : (
            <a href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold">
              {dict.projectsSection.projectDetails}
              <ArrowUpRight size={16} aria-hidden="true" className="rtl:-scale-x-100" />
            </a>
          )}
          {project.privateProject && !project.detailsPending && (
            <span className="text-xs text-muted">{dict.projectsSection.privateProject}</span>
          )}
        </div>
      </div>
    </div>
  );
}
