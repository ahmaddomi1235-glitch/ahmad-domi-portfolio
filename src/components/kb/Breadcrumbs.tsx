import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Crumb } from "@/lib/seo/jsonld";

/** Visible, semantic breadcrumb trail. The same `crumbs` array feeds the BreadcrumbList JSON-LD on the page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="مسار التنقل" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-medium text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="underline-offset-4 hover:text-ink hover:underline">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronLeft size={14} aria-hidden="true" className="text-line" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
