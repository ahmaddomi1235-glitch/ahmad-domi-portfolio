import { cn } from "@/lib/utils";

export function Badge({ children, tone = "default", className }: { children: React.ReactNode; tone?: "default" | "gold" | "navy"; className?: string }) {
  const toneClasses = {
    default: "bg-ink/5 text-ink border-line",
    gold: "bg-gold/10 text-gold border-gold/30",
    navy: "bg-navy text-ivory border-navy",
  }[tone];

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", toneClasses, className)}>
      {children}
    </span>
  );
}
