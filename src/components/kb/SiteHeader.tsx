import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { brand, mainNav } from "@/config/site";

/** Server-rendered header. The mobile menu is a native <details>, so navigation works without client JavaScript. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${brand.nameAr} — ${brand.context}، الصفحة الرئيسية`}>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold tracking-wide text-ivory"
          >
            AD
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{brand.nameAr}</span>
            <span className="block text-xs text-muted">{brand.context}</span>
          </span>
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-navy/5 hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="بحث في قاعدة المعرفة"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-navy"
          >
            <Search size={18} aria-hidden="true" />
          </Link>
          <details className="group relative lg:hidden">
            <summary
              aria-label="القائمة"
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-line text-ink marker:hidden hover:border-navy [&::-webkit-details-marker]:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </summary>
            <nav
              aria-label="القائمة المنسدلة"
              className="absolute end-0 top-full mt-2 w-64 rounded-2xl border border-line bg-ivory p-2 shadow-lg"
            >
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="flex min-h-11 items-center rounded-lg px-4 text-base font-medium hover:bg-navy/5">
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
