import { FileText, Download, ExternalLink } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { teachingMaterials } from "@/content/teachingMaterials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WorkSamplesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="work-samples" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading kicker={dict.workSamples.kicker} heading={dict.workSamples.heading} intro={dict.workSamples.description} />
        <Reveal delay={0.08}>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{dict.workSamples.paragraph2}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachingMaterials.map((material, i) => (
            <Reveal key={material.id} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ivory p-6">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-ivory">
                    <FileText size={18} aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-muted">
                    {locale === "ar" ? material.categoryAr : material.categoryEn}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold leading-snug text-ink">
                  {locale === "ar" ? material.titleAr : material.titleEn}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {locale === "ar" ? material.descriptionAr : material.descriptionEn}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">
                  {material.fileType} · {material.fileSize}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-4">
                  <a
                    href={material.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    {dict.workSamples.viewFile}
                  </a>
                  <a
                    href={material.filePath}
                    download
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold"
                  >
                    <Download size={15} aria-hidden="true" />
                    {dict.workSamples.download}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
