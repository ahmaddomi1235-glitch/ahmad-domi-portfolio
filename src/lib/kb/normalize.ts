/** Arabic/English text normalisation shared by the search index builder, the client search and the validator. */

const DIACRITICS = /[ً-ٰٟۖ-ۭ]/g;
const TATWEEL = /ـ/g;

export function normalizeArabic(input: string): string {
  return input
    .normalize("NFKC")
    .replace(DIACRITICS, "")
    .replace(TATWEEL, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .toLowerCase();
}

/** Light stemming: drop the definite article and common one-letter prefixes so "المخاطرة" matches "مخاطرة". */
export function stemToken(token: string): string {
  let t = token;
  if (t.length > 4 && t.startsWith("وال")) t = t.slice(3);
  else if (t.length > 4 && (t.startsWith("بال") || t.startsWith("لل") || t.startsWith("كال") || t.startsWith("فال"))) t = t.slice(t.startsWith("لل") ? 2 : 3);
  else if (t.length > 3 && t.startsWith("ال")) t = t.slice(2);
  return t;
}

export function tokenize(input: string): string[] {
  return normalizeArabic(input)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .map(stemToken)
    .filter((t) => t.length > 1 || /\d/.test(t));
}

/** Common BTEC abbreviations → expansions used for query expansion (kept deliberately small and factual). */
export const ABBREVIATIONS: Record<string, string[]> = {
  pmd: ["pass", "merit", "distinction"],
  ai: ["artificial", "intelligence", "ذكاء", "اصطناعي"],
  ml: ["machine", "learning", "تعلم", "الاله"],
  dl: ["deep", "learning", "تعلم", "عميق"],
  nn: ["neural", "networks", "شبكات", "عصبيه"],
  pm: ["project", "management", "مشروع", "ادارة"],
  oop: ["object", "oriented"],
  btec: ["btec", "بيتك"],
  "بيتك": ["btec"],
};

export function expandQuery(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) for (const e of ABBREVIATIONS[t] ?? []) out.add(stemToken(normalizeArabic(e)));
  return [...out];
}
