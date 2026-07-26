"use client";

import Image from "next/image";
import type { StudentResult } from "@/content/studentResults";
import type { Locale } from "@/lib/i18n";

export function StudentResultCard({
  result,
  locale,
  onOpen,
}: {
  result: StudentResult;
  locale: Locale;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex aspect-[4/5] w-full items-center overflow-hidden rounded-2xl border border-line bg-navy/[0.03] text-start focus-visible:outline-offset-4"
    >
      <Image
        src={result.image}
        alt={result.alt[locale]}
        width={result.width}
        height={result.height}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-3">
        <p className="text-xs font-medium text-ivory">{result.caption[locale]}</p>
      </div>
    </button>
  );
}
