import { SITE_URL, accounts, brand } from "@/config/site";
import { getConcepts, getConceptsOfUnit, getUnits, unitSlugOf } from "@/lib/kb/queries";

/**
 * /llms.txt — a plain-text orientation file for tools that read it. It is a convenience, not a ranking or citation
 * mechanism; the site's HTML, structured data and sitemap work without it. Generated from published content only.
 */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${brand.full}`, "");
  lines.push(
    `> Ahmad Domi (أحمد دومي) is a BTEC IT instructor in Jordan. This site explains BTEC IT units — cybersecurity, artificial intelligence, data modelling, IT project management — in Arabic with English technical terms. Every educational page names its author, cites its source (Ahmad Domi's own booklets and lesson videos) and separates his explanation from official Pearson text. Paid material is never published here.`,
    "",
  );
  lines.push("## About the author", `- [About Ahmad Domi](${SITE_URL}/about): biography, role, official accounts`, `- [English profile](${SITE_URL}/en)`, "");
  lines.push("## Units");
  for (const u of getUnits()) {
    lines.push(`- [${u.title_en} — ${u.title_ar}](${SITE_URL}/btec-it/${u.slug}): ${u.summary}`);
  }
  lines.push("", "## Concept pages (Arabic, with English terms)");
  for (const u of getUnits()) {
    for (const c of getConceptsOfUnit(u.id)) {
      lines.push(`- [${c.title_en} — ${c.title_ar}](${SITE_URL}/btec-it/${unitSlugOf(c.unit)}/${c.slug}): ${c.summary}`);
    }
  }
  lines.push(
    "",
    "## Tools and resources",
    `- [BTEC IT questions and short answers](${SITE_URL}/btec-it/questions)`,
    `- [Arabic–English glossary](${SITE_URL}/btec-it/glossary)`,
    `- [BTEC grade calculator (Jordan Tawjihi)](${SITE_URL}/btec-calculator)`,
    `- [Ahmad Domi's videos](${SITE_URL}/videos)`,
    `- [Downloadable teaching files](${SITE_URL}/resources)`,
    `- [BTEC IT Card (paid learning product)](${SITE_URL}/btec-it-card)`,
    "",
    "## Official accounts",
    `- YouTube: ${accounts.youtube}`,
    `- Instagram: ${accounts.instagram}`,
    `- GitHub: ${accounts.github}`,
    `- LinkedIn: ${accounts.linkedin}`,
    "",
    "## Notes",
    "- Pages are based on Ahmad Domi's own teaching material, not Pearson wording. Only Unit 11 (Cyber Security and Incident Management) has an official structure published (learning-aim titles and criterion codes, no criterion text); no other unit has an official mapping.",
    `- ${getConcepts().length} concept pages are currently published.`,
    "",
  );
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
