import Link from "next/link";
import { Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitch({
  switchHref,
  label,
  tone = "light",
}: {
  locale: Locale;
  switchHref: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={switchHref}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium min-h-[44px] transition-colors",
        tone === "light"
          ? "border-line text-ink hover:border-navy"
          : "border-ivory/25 text-ivory hover:border-gold hover:text-gold",
      )}
    >
      <Globe size={16} aria-hidden="true" />
      {label}
    </Link>
  );
}
