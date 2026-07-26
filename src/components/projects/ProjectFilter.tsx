"use client";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/content/projects";

export type FilterValue = "all" | ProjectCategory;

export function ProjectFilter({
  value,
  onChange,
  labels,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  labels: { all: string; education: string; aiBusiness: string; cybersecurity: string };
}) {
  const options: { value: FilterValue; label: string }[] = [
    { value: "all", label: labels.all },
    { value: "education", label: labels.education },
    { value: "ai-business", label: labels.aiBusiness },
    { value: "cybersecurity", label: labels.cybersecurity },
  ];

  return (
    <div role="group" aria-label={labels.all} className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[44px]",
            value === opt.value ? "border-navy bg-navy text-ivory" : "border-line text-ink hover:border-navy",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
