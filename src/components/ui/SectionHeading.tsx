import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  kicker,
  heading,
  intro,
  align = "start",
  tone = "light",
  headingId,
}: {
  kicker?: string;
  heading: string;
  intro?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  headingId?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {kicker && (
        <Reveal>
          <p
            className={cn(
              "mb-3 text-sm font-semibold tracking-wide uppercase",
              tone === "dark" ? "text-gold" : "text-[#7a5c24]", // darker gold keeps ≥4.5:1 on light backgrounds
            )}
          >
            {kicker}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          id={headingId}
          className={cn(
            "text-3xl sm:text-4xl font-semibold leading-tight text-balance",
            tone === "dark" ? "text-ivory" : "text-ink",
          )}
        >
          {heading}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-base sm:text-lg leading-relaxed",
              tone === "dark" ? "text-ivory/75" : "text-muted",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
