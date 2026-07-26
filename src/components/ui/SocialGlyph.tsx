import { cn } from "@/lib/utils";

export type SocialPlatform = "linkedin" | "github" | "youtube" | "instagram";

const glyphs: Record<SocialPlatform, string> = {
  linkedin: "in",
  github: "gh",
  youtube: "yt",
  instagram: "ig",
};

/**
 * lucide-react removed trademarked brand icons; a plain typographic monogram
 * keeps the same minimal, non-decorative line-icon spirit without
 * reproducing any platform's logo.
 */
export function SocialGlyph({ platform, size = 18, className }: { platform: SocialPlatform; size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size + 4, height: size + 4, fontSize: size * 0.62 }}
      className={cn("inline-flex items-center justify-center rounded-full border border-current font-bold uppercase leading-none", className)}
    >
      {glyphs[platform]}
    </span>
  );
}
