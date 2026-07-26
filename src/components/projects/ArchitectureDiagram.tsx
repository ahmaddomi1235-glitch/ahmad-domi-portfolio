import type { Locale } from "@/lib/i18n";
import type { Project } from "@/content/projects";

const label = { ar: "البنية", en: "Architecture" };

export function ArchitectureDiagram({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  if (!project.subsystems || project.subsystems.length === 0) return null;

  return (
    <div className="rounded-2xl border border-line bg-navy p-6 sm:p-10" aria-label={label[locale]}>
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-xl border border-gold/40 bg-navy-surface px-6 py-4 text-center">
          <p className="text-sm font-semibold text-gold">{project.title[locale]}</p>
          <p className="text-xs text-ivory/60">{label[locale]}</p>
        </div>

        <div aria-hidden="true" className="h-8 w-px bg-ivory/20" />

        <div className="grid w-full gap-4 sm:grid-cols-3">
          {project.subsystems.map((sub) => (
            <div key={sub.slug} className="rounded-xl border border-ivory/15 bg-navy-surface p-4 text-center">
              <p className="text-sm font-semibold text-ivory">{sub.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-ivory/60">{sub.role[locale]}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="sr-only">
        {project.title[locale]}: {project.subsystems.map((s) => `${s.name} — ${s.role[locale]}`).join(". ")}
      </p>
    </div>
  );
}
