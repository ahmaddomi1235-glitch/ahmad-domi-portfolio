"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { expandQuery, normalizeArabic, tokenize } from "@/lib/kb/normalize";

type Doc = { id: string; u: string; y: string; t: string; e: string; s: string; k: string };

const SUGGESTIONS = ["مخاطرة", "threat", "تعلم الآلة", "stakeholders", "PMD", "هاكرز", "data quality"];

function score(doc: Doc, required: string[], expanded: string[]): number {
  const title = normalizeArabic(`${doc.t} ${doc.e}`);
  const summary = normalizeArabic(doc.s);
  let total = 0;
  for (const tok of required) {
    const inTitle = title.includes(tok);
    const inKeys = doc.k.includes(tok);
    const inSummary = summary.includes(tok);
    if (!inTitle && !inKeys && !inSummary) return 0; // every typed word must match somewhere
    total += (inTitle ? 6 : 0) + (inKeys ? 3 : 0) + (inSummary ? 1 : 0);
  }
  for (const tok of expanded) if (!required.includes(tok) && (title.includes(tok) || doc.k.includes(tok))) total += 1;
  return total;
}

export function SearchBox() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [error, setError] = useState(false);
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration of the query from the URL
    if (initial) setQ(initial);
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Doc[]) => setDocs(d))
      .catch(() => setError(true));
    input.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!docs) return [];
    const required = tokenize(q);
    if (!required.length) return [];
    const expanded = expandQuery(required);
    return docs
      .map((d) => ({ d, s: score(d, required, expanded) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30);
  }, [docs, q]);

  const onChange = (v: string) => {
    setQ(v);
    const url = new URL(window.location.href);
    if (v) url.searchParams.set("q", v);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  };

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor="kb-search" className="sr-only">
          ابحث في قاعدة المعرفة
        </label>
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          ref={input}
          id="kb-search"
          type="search"
          value={q}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ابحث بالعربي أو الإنجليزي: مخاطرة، threat، PMD…"
          autoComplete="off"
          className="min-h-[52px] w-full rounded-2xl border border-line bg-white ps-11 pe-4 text-base"
        />
      </form>

      {!q && (
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
          جرّب:
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => onChange(s)} className="min-h-9 rounded-full border border-line bg-white px-3 hover:border-navy">
              {s}
            </button>
          ))}
        </p>
      )}

      <div aria-live="polite" className="mt-6">
        {error && <p className="rounded-xl border border-line bg-white p-4">تعذّر تحميل فهرس البحث. جرّب تحديث الصفحة.</p>}
        {q && docs && results.length === 0 && (
          <p className="rounded-xl border border-line bg-white p-4 leading-8">
            لا توجد نتائج لـ «{q}». جرّب كلمة أخرى بالعربي أو الإنجليزي، أو تصفّح <Link href="/btec-it" className="text-navy underline decoration-gold underline-offset-4">وحدات BTEC IT</Link> و<Link href="/btec-it/glossary" className="text-navy underline decoration-gold underline-offset-4">المصطلحات</Link>.
          </p>
        )}
        {results.length > 0 && (
          <>
            <p className="mb-3 text-sm text-muted">{results.length} نتيجة</p>
            <ul className="space-y-3">
              {results.map(({ d }) => (
                <li key={d.id}>
                  <Link href={d.u} className="block rounded-2xl border border-line bg-white p-5 hover:border-navy" data-track="search_result_click" data-track-id={d.id}>
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-bold">{d.t}</span>
                      <span className="flex items-center gap-2 text-sm text-muted">
                        <bdi lang="en" dir="ltr">{d.e}</bdi>
                        <span className="rounded-full border border-line px-2 py-0.5 text-xs">{d.y}</span>
                      </span>
                    </span>
                    <span className="mt-2 block text-sm leading-7 text-ink/80">{d.s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
