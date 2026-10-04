import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "@/lib/seo/jsonld";
import { cn } from "@/lib/utils";

/** Standard knowledge-page header: breadcrumbs, H1, optional English title and lead paragraph. */
export function PageHeader({
  crumbs,
  title,
  titleEn,
  lead,
  badge,
  children,
}: {
  crumbs?: Crumb[];
  title: string;
  titleEn?: string;
  lead?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto w-full max-w-4xl px-5 pb-10 pt-8 sm:px-8 sm:pt-10">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {badge && <div className="mt-5 flex flex-wrap items-center gap-2">{badge}</div>}
        <h1 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">{title}</h1>
        {titleEn && (
          <p lang="en" dir="ltr" className="mt-2 text-start text-lg text-muted">
            {titleEn}
          </p>
        )}
        {lead && <div className="mt-5 text-lg leading-9 text-ink/85">{lead}</div>}
        {children}
      </div>
    </header>
  );
}

export function Section({ title, id, children, className }: { title?: string; id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className={cn("mx-auto w-full max-w-4xl px-5 py-10 sm:px-8", className)}>
      {title && (
        <h2 id={id ? `${id}-h` : undefined} className="mb-5 text-2xl font-bold">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "gold" | "navy" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tone === "default" && "border-line bg-ivory text-ink",
        tone === "gold" && "border-gold/40 bg-gold/10 text-[#7a5c24]",
        tone === "navy" && "border-navy bg-navy text-ivory",
      )}
    >
      {children}
    </span>
  );
}

export function CardLink({ href, title, titleEn, children, meta }: { href: string; title: string; titleEn?: string; children?: ReactNode; meta?: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-colors hover:border-navy focus-visible:outline-gold"
    >
      <span className="text-lg font-semibold leading-snug group-hover:text-navy">{title}</span>
      {titleEn && (
        <span lang="en" dir="ltr" className="mt-1 text-start text-sm text-muted">
          {titleEn}
        </span>
      )}
      {children && <span className="mt-3 flex-1 text-sm leading-7 text-ink/80">{children}</span>}
      <span className="mt-4 flex items-center justify-between gap-3 text-sm font-medium text-navy">
        <span className="text-muted">{meta}</span>
        <span className="inline-flex items-center gap-1">
          اقرأ
          <ArrowLeft size={14} aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
