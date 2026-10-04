import { Info, Lightbulb, TriangleAlert, ListChecks } from "lucide-react";
import type { Block } from "@/lib/kb/types";
import { Inline } from "./Inline";
import { cn } from "@/lib/utils";

const CALLOUT = {
  tip: { icon: Lightbulb, label: "فكّر", cls: "border-gold/40 bg-gold/10" },
  warning: { icon: TriangleAlert, label: "انتبه", cls: "border-red-300/60 bg-red-50" },
  example: { icon: ListChecks, label: "مثال", cls: "border-navy/20 bg-navy/5" },
  note: { icon: Info, label: "ملاحظة", cls: "border-line bg-white" },
} as const;

export type TocItem = { id: string; text: string };

/** h2 anchors are positional (s1, s2 …) so they stay stable if Arabic headings are reworded. */
export function tocOf(blocks: Block[]): TocItem[] {
  let n = 0;
  const out: TocItem[] = [];
  for (const b of blocks) {
    if (b.t === "h2") out.push({ id: `s${++n}`, text: b.text.replace(/\*\*|\[\[[^\]|]+\|?|\]\]/g, "") });
  }
  return out;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  let h = 0;
  return (
    <div className="kb-prose">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={`s${++h}`}>
                <Inline text={b.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i}>
                <Inline text={b.text} />
              </h3>
            );
          case "ul":
          case "ol": {
            const Tag = b.t;
            return (
              <Tag key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </Tag>
            );
          }
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-line bg-white">
                <table className="w-full min-w-[34rem] border-collapse text-start text-[0.95rem] leading-7">
                  {b.caption && <caption className="p-3 text-start text-sm text-muted">{b.caption}</caption>}
                  <thead className="bg-navy text-ivory">
                    <tr>
                      {b.head.map((c, j) => (
                        <th key={j} scope="col" className="px-4 py-3 text-start font-semibold">
                          <Inline text={c} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className={cn("align-top", j % 2 ? "bg-ivory/60" : "")}>
                        {r.map((c, k) => (
                          <td key={k} className={cn("border-t border-line px-4 py-3", k === 0 && "font-semibold")}>
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout": {
            const c = CALLOUT[b.kind];
            const Icon = c.icon;
            return (
              <aside key={i} className={cn("rounded-xl border p-5", c.cls)}>
                <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-ink">
                  <Icon size={16} aria-hidden="true" />
                  {b.title ?? c.label}
                </p>
                <p className="leading-8">
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          }
          case "terms":
            return (
              <dl key={i} className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {b.items.map((t, j) => (
                  <div key={j} className="flex items-baseline justify-between gap-4 bg-white px-4 py-3">
                    <dt className="font-semibold">{t.ar}</dt>
                    <dd>
                      <bdi lang="en" dir="ltr" className="text-muted">
                        {t.en}
                      </bdi>
                    </dd>
                  </div>
                ))}
              </dl>
            );
        }
      })}
    </div>
  );
}
