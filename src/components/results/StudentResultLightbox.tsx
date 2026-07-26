"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { StudentResult } from "@/content/studentResults";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionary";
import { formatTemplate } from "@/lib/utils";

export function StudentResultLightbox({
  results,
  index,
  locale,
  dict,
  onClose,
  onNavigate,
}: {
  results: StudentResult[];
  index: number;
  locale: Locale;
  dict: Dictionary;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const current = results[index];

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % results.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + results.length) % results.length);
      if (e.key === "Tab") e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, results.length, onClose, onNavigate]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.caption[locale]}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label={dict.studentResults.lightbox.close}
        className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory hover:border-gold hover:text-gold"
      >
        <X size={20} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => onNavigate((index - 1 + results.length) % results.length)}
        aria-label={dict.studentResults.lightbox.prev}
        className="absolute start-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 text-ivory hover:border-gold hover:text-gold rtl:rotate-180"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      <div className="flex max-h-[80vh] w-full max-w-3xl flex-col items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image src={current.image} alt={current.alt[locale]} fill sizes="100vw" className="object-contain" />
        </div>
        <p className="mt-4 text-center text-sm text-ivory/80">{current.caption[locale]}</p>
        <p className="mt-1 text-xs tabular-nums text-ivory/50">
          {formatTemplate(dict.studentResults.lightbox.counterTemplate, { current: index + 1, total: results.length })}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onNavigate((index + 1) % results.length)}
        aria-label={dict.studentResults.lightbox.next}
        className="absolute end-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 text-ivory hover:border-gold hover:text-gold rtl:rotate-180"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
