"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { studentResults } from "@/content/studentResults";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StudentResultCard } from "@/components/results/StudentResultCard";
import { StudentResultLightbox } from "@/components/results/StudentResultLightbox";

export function StudentResultsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const results = studentResults.filter((r) => r.category === "result");
  const messages = studentResults.filter((r) => r.category === "message");

  return (
    <section id="results" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading kicker={dict.studentResults.kicker} heading={dict.studentResults.heading} intro={dict.studentResults.description} />

        {results.length > 0 && (
          <div className="mt-10">
            <Reveal>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.studentResults.groupResults}</h3>
            </Reveal>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((result, i) => {
                const globalIndex = studentResults.indexOf(result);
                return (
                  <Reveal key={result.id} delay={i * 0.05}>
                    <StudentResultCard result={result} locale={locale} onOpen={() => setOpenIndex(globalIndex)} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="mt-12">
            <Reveal>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">{dict.studentResults.groupMessages}</h3>
            </Reveal>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {messages.map((result, i) => {
                const globalIndex = studentResults.indexOf(result);
                return (
                  <Reveal key={result.id} delay={i * 0.05}>
                    <StudentResultCard result={result} locale={locale} onOpen={() => setOpenIndex(globalIndex)} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}

        {openIndex !== null && (
          <StudentResultLightbox
            results={studentResults}
            index={openIndex}
            locale={locale}
            dict={dict}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </Container>
    </section>
  );
}
