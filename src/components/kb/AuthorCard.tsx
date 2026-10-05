import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/site";
import type { SourceRef } from "@/lib/kb/types";

const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

export function arabicDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Author + provenance block. Makes it explicit that this is Ahmad Domi's own explanation, not an official Pearson text. */
export function AuthorCard({ lastReviewed, sources, note }: { lastReviewed: string; sources?: SourceRef[]; note?: string }) {
  return (
    <section aria-labelledby="author-heading" className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <h2 id="author-heading" className="sr-only">
        عن كاتب الصفحة
      </h2>
      <div className="flex items-center gap-4">
        <Image
          src="/images/profile/ahmad-domi-profile.jpg"
          alt={`${brand.nameAr} — ${brand.nameEn}`}
          width={64}
          height={64}
          sizes="64px"
          className="h-16 w-16 shrink-0 rounded-full border border-gold/40 object-cover object-top"
        />
        <div>
          <p className="text-base font-semibold">
            <Link href="/about" rel="author" className="hover:text-gold">
              {brand.nameAr} · <bdi lang="en" dir="ltr">{brand.nameEn}</bdi>
            </Link>
          </p>
          <p className="text-sm text-muted">
            {brand.jobTitleAr} · الأردن
          </p>
        </div>
      </div>
      <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">نوع المحتوى</dt>
          <dd className="font-medium">شرح مبني على مادة أحمد دومي — وليس نصًّا رسميًّا من Pearson</dd>
        </div>
        <div>
          <dt className="text-muted">آخر مراجعة</dt>
          <dd className="font-medium">
            <time dateTime={lastReviewed}>{arabicDate(lastReviewed)}</time>
          </dd>
        </div>
        {note && (
          <div className="sm:col-span-2">
            <dt className="text-muted">ملاحظة على المصدر</dt>
            <dd className="font-medium">{note}</dd>
          </div>
        )}
        {sources && sources.length > 0 && (
          <div className="sm:col-span-2">
            <dt className="text-muted">المصدر</dt>
            <dd className="font-medium">
              <ul className="list-inside list-disc">
                {sources.map((s, i) => (
                  <li key={i}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">
                        {s.label}
                      </a>
                    ) : (
                      s.label
                    )}
                    {s.ref ? <span className="text-muted"> — {s.ref}</span> : null}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}
