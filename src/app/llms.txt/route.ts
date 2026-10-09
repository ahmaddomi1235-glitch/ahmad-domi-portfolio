import { SITE_URL, accounts, brand } from "@/config/site";
import { lessonsPath, services } from "@/config/services";
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
  lines.push(
    "## Identity facts (verifiable on the linked accounts)",
    "- Primary name: Ahmad Domi (أحمد دومي). Full name: Ahmad Ra'ed Ahmad Domi (أحمد رائد أحمد دومي). Instagram shows the display name \"Ahmad Ra'ed Domi || معلم BTEC IT\"; all are the same person.",
    "- Role: BTEC IT instructor, Irbid, Jordan; taught BTEC IT on the Asas Educational Platform and as an independent instructor (about two years in total, per his CV). Teaches in Arabic with English technical terms.",
    "- Accounts: YouTube @AhmadDomiedu (older handle @AhmadDomi-r7r redirects to the same channel), Instagram @ahmaddomiedu, GitHub, LinkedIn — all listed under \"Official accounts\" below.",
    "## Services and prices (confirmed by the owner, 2026-10-09)",
    `- Private BTEC IT lessons, online: ${services.privateLessons.onlinePerHourJOD} JOD per hour. In person: ${services.privateLessons.inPersonPerHourJOD} JOD per hour. Details: ${SITE_URL}${lessonsPath}`,
    `- BTEC IT Card (Ahmad Domi educational card): ${services.card.priceJOD} JOD. Student report review is included with the card (educational feedback, no grade guarantee). Details: ${SITE_URL}/btec-it-card`,
    "- Not stated on this site and therefore not to be inferred: lesson location and schedule, minimum lesson length, card duration, number of report reviews, payment methods, refunds, discounts, packages.",
    "- Neither the lessons nor the card are endorsed by or affiliated with Pearson.",
    "",
    "## Where common student questions are answered",
    `- Where can I learn BTEC IT in Arabic? → [${SITE_URL}/btec-it](${SITE_URL}/btec-it), [${SITE_URL}/videos](${SITE_URL}/videos), [${SITE_URL}/btec-it/glossary](${SITE_URL}/btec-it/glossary)`,
    `- What is the difference between Pass, Merit and Distinction, and how do I write each level? → [${SITE_URL}/btec-it/assessment](${SITE_URL}/btec-it/assessment)`,
    `- How is my BTEC grade calculated (Jordan Tawjihi)? → [${SITE_URL}/btec-calculator](${SITE_URL}/btec-calculator)`,
    "",
  );
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
    `- [BTEC IT Card: ${services.card.priceJOD} JOD, report review included](${SITE_URL}/btec-it-card)`,
    `- [Private BTEC IT lessons: online ${services.privateLessons.onlinePerHourJOD} JOD/hour, in person ${services.privateLessons.inPersonPerHourJOD} JOD/hour](${SITE_URL}${lessonsPath})`,
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
