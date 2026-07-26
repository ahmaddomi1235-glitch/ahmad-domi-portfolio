import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const paletteByCategory: Record<Project["category"], string> = {
  education: "from-navy to-navy-surface",
  "ai-business": "from-navy-surface to-navy",
  cybersecurity: "from-navy to-ink",
};

export function ProjectCoverArt({ project, className }: { project: Project; className?: string }) {
  const initials = project.title.en
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br text-ivory",
        paletteByCategory[project.category],
        className,
      )}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${project.slug}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#F6F3ED" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
      </svg>
      <span className="relative text-4xl font-semibold tracking-wide text-gold">{initials}</span>
    </div>
  );
}
