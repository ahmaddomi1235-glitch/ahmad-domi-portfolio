import Link from "next/link";
import type { ReactNode } from "react";
import { getNode, urlFor } from "@/lib/kb/queries";

/**
 * Inline markup used in content JSON:
 *   [[concept-id]] or [[concept-id|label]]  → internal link, resolved at build time (validator guarantees the target is published)
 *   **text**                                 → <strong>
 * Runs of Latin text ("Machine Learning", "P/M/D") are wrapped in <bdi lang="en" dir="ltr"> so English technical
 * terms keep their own direction and typography inside Arabic sentences.
 */
const TOKEN = /(\[\[[a-z0-9-]+(?:\|[^\]]+)?\]\])|(\*\*[^*]+\*\*)/g;
const LATIN_RUN = /[A-Za-z][A-Za-z0-9]*(?:[ \-'’./&+][A-Za-z0-9]+)*/g;

function latin(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(LATIN_RUN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    out.push(
      <bdi key={`${keyPrefix}-l${i++}`} lang="en" dir="ltr">
        {m[0]}
      </bdi>,
    );
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(...latin(text.slice(last, idx), `t${i}`));
    const token = m[0];
    if (token.startsWith("[[")) {
      const [id, label] = token.slice(2, -2).split("|");
      const node = getNode(id);
      const href = node ? urlFor(node) : "#";
      out.push(
        <Link key={`k${i}`} href={href}>
          {latin(label ?? node?.title_ar ?? id, `k${i}`)}
        </Link>,
      );
    } else {
      out.push(<strong key={`k${i}`}>{latin(token.slice(2, -2), `k${i}`)}</strong>);
    }
    last = idx + token.length;
    i++;
  }
  if (last < text.length) out.push(...latin(text.slice(last), `t${i}`));
  return <>{out}</>;
}
