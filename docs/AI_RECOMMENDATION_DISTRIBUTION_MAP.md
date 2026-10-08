# AI Recommendation Distribution Map (Phase 6)

Where the AI engines actually find BTEC IT educators and resources, and which of those places Ahmad can legitimately use. Evidence = Phase 5 benchmark (297 answers) plus the public checks done on 2026-10-08. No outreach to students or competitors was made, and none is proposed. Nothing here asks a third party to promote Ahmad.

Classes: **A** Ahmad-owned and directly editable. **B** public profiles/directories where Ahmad can truthfully register himself. **C** independent editorial/community sources that may mention useful resources voluntarily (observe only; do not solicit). **D** competitor- or student-owned (do not approach).

## 1. Observed retrieval landscape

| Surface | Evidence from the benchmark | Class |
|---|---|---|
| Telegram channel "تكنولوجيا المعلومات - BTEC" (`t.me/s/it_for_btec`, 771 subscribers on 2026-10-08, 46 links, 39 files) | Cited in 29 of 99 Perplexity answers; is the most-cited non-official source. Crawlable text posts. Does not mention Ahmad. | D (student/community-run) |
| qualifications.pearson.com, btec.moe.gov.jo, moe.gov.jo | Cited in 36 / 14 / 3 answers | Official, not applicable |
| jis.edu.jo, brighttouch-jo.com, masaryacademy.com | Schools/academies named for "teacher" prompts | D |
| btec.jo, btec-jo.com, btec-jo-support.com, tawjihihub.com, al-maher.net, qf-btecit.web.app, afbtec.net, dbtec.top, btechub.com, eduva | Arabic resource sites cited/named for resource prompts | C (editorial) / D (competing resource owners) |
| jo.ostathi.com, edujordan.com, teacherprivate.com, apprentus.com, OpenSooq, PrivateJo, Facebook tutor groups | Marketplaces and listings used for "teacher/price" prompts | B (self-registration where truthful) |
| Teqani, Watad, JoAcademy, Asas platform pages | Platforms named for teacher/YouTube prompts | D, except Asas (B: Ahmad's own teacher profile) |
| YouTube creators: Hazem Al-Rukibat (4 answers), Mohammad Nasrallah (3), Teqani (2), Pearson BTEC (2) | Cited video lessons | D |
| **Ahmad's own YouTube video** | Cited once (programming paradigms, P085) | A |
| **Ahmad's Instagram @ahmaddomiedu** | Named once (AI Mode P025); ~17K followers visible on the public profile | A |
| **ahmaddomiedu.com** | Cited once (P040) | A |

## 2. Class A — Ahmad-owned (what is done, what only he can edit)

| Asset | Public state checked 2026-10-08 | Done in this phase / owner action |
|---|---|---|
| Website | 228 URLs in the sitemap; indexed (GSC, 2026-10-07) | Done: homepage answers "is there a BTEC IT teacher in Jordan / where to learn BTEC IT in Arabic / how his name is written / lessons"; YouTube handle fixed in the footer; channel URL added to schema `sameAs`; `llms.txt` identity facts |
| YouTube `@AhmadDomiedu` | Name "Ahmad Domi \| أحمد دومي – BTEC IT"; 488 subscribers; 26 videos; description names units and links the site and `/btec-it`; old handle `@AhmadDomi-r7r` resolves to the same channel; the 15 newest videos have intent-first titles and a site link | Owner decision (proposed diff only): older videos still use the old title pattern (the cited P085 video is titled "أحمد دومي – BTEC IT \| مقارنة البرمجة ..."); see section 5 |
| Instagram `@ahmaddomiedu` | Display name "Ahmad Ra'ed Domi \|\| معلم BTEC IT"; bio "مدرّس BTEC IT 🇯🇴 \| خبرة +2 سنوات ... بطاقة BTEC IT"; link `ahmaddomiedu.com` | Owner action: pick one display-name form across Instagram/YouTube (the homepage now documents both honestly) |
| LinkedIn, GitHub | Listed in schema `sameAs` | Owner action: reciprocal links to the site (`docs/SOCIAL_ENTITY_CHANGES.md`) |
| Card platform `ahmaddomi-edu.vercel.app` | Not on the brand domain | Owner decision: `cards.ahmaddomiedu.com` |

## 3. Class B — public profiles/directories where he can register truthfully

Only if the facts are true and he genuinely wants the listing.

| Place | Why | Requirement from the owner |
|---|---|---|
| Asas Educational Platform teacher profile | Perplexity tied his name to Asas in P085; the public Facebook page "المعلم أحمد دومي" (337 followers, "معلم BTEC IT في منصة أساس التعليمية") is platform-operated, **not Ahmad-owned**, and lists a different phone number and the site `jokernel.net` | Send the Asas profile URL (adds to `thirdPartyProfiles`/`sameAs`); put the same name form and `ahmaddomiedu.com` on the profile |
| Ostathi / edujordan / OpenSooq tutor listings | These are the sources behind most "teacher + price" answers | A decision that he is actually available, where, and at what terms; listing text must match the confirmed facts |
| His own Facebook page | A Facebook page for the identity he controls | Only if wanted; do not reuse the platform-operated page |
| Google Business Profile | Only valid for a real, verifiable service-area business | Owner decision; skip if it does not qualify |

## 4. Class C — independent sources that may mention useful resources (observe only)

BTEC JO, TawjihiHub, al-maher.net, qf-btecit, AFBTEC and similar sites decide for themselves what to link. The only legitimate lever is making Ahmad's pages worth linking (worked examples, glossary, calculator once its rule source is confirmed). No solicitation, no template emails, no paid links. Re-check these sources monthly to see whether they cite `ahmaddomiedu.com` on their own.

## 5. Class D — do not approach

Teqani, Watad, JoAcademy, BTECHub, Eduva, D.BTEC, AFBTEC, Hazem Al-Rukibat, Mohammad Nasrallah, the `it_for_btec` Telegram channel and any student-run project. Not asked for mentions, not scraped for contact details, not used as `sameAs`. An independently operated student project is not an Ahmad-owned asset.

## 6. Proposed YouTube diff (needs separate authorization; not applied)

Scope is limited to what the 30-prompt cohort needs. Do not redo all 26 videos.
1. Programming: the video cited in P085 ("مقارنة البرمجة الإجرائية والكائنية والمعتمدة على الأحداث") — retitle in the same intent-first pattern as the migrated videos (e.g. "الفرق بين البرمجة الإجرائية والكائنية والمعتمدة على الأحداث | البرمجة BTEC IT") and link `/btec-it/programming/programming-paradigms` in the description; confirm the description states its real subject.
2. Videos still carrying the old pattern: list them from YouTube Studio and apply the same pattern only if their subject matches a cohort prompt (P/M/D, calculator, unit hubs).
3. Two AI lesson videos with swapped titles (`1fQ9n-o_G1s`, `KWk2JLTwGUk`) — already listed in `docs/OWNER_ACTIONS.md` item 9; their titles in the public feed currently match the descriptive pattern, so re-verify before touching.
4. Add chapters only where captions exist and have been verified against audio.
