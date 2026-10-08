# AI Recommendation Gaps — teacher / product recommendation visibility

Kept separate from citation visibility on purpose: an engine can use a page to explain a concept without recommending the teacher, and vice versa.

## 1. Observed recommendation outcomes

| Intent | Prompts | Completed tests | Ahmad recommended | Who was recommended instead (observed) |
|---|---|---:|---:|---|
| Teacher in Jordan | P001–P015 | 15 PPLX + 15 AIM + 15 GPT + 14 GEM | 0 | Masar Academy, JIS schools, Ostathi tutor listings, Telegram `it_for_btec`, Apprentus ("Bilal"), edujordan/teacherprivate, OpenSooq/Facebook tutor pages, Teqani, Watad (Ahmad Al-Saleh), JoAcademy, PrivateJo, BTECHub/Eduva/TawjihiHub (ChatGPT), Rima Abu Laoui (Gemini) |
| Arabic resources | P016–P030 | 15+15+15+5 | 1 (P025, AI Mode, listed Instagram account) | BTEC JO, al-maher.net, AF BTEC, QF BTEC IT, TawjihiHub, Telegram, BTEC بالعربي YouTube, Eduva, BTECHub |
| Programming in Arabic | P085 | PPLX 1 | 1 (P085, Perplexity) | Shadi Jaber, "BTEC بالعربي", Ahmad Al-Faqih, Qutaiba Shtayat |
| Commercial | P091–P100 | 9 PPLX + 10 AIM + 4 GEM | **0** | OpenSooq/Facebook tutors, PrivateJo, Apprentus, BTECHub, JoAcademy, Ostathi, Teqani; Perplexity and AI Mode quoted unsourced price ranges |

Of the three platforms with commercial data, none mentioned the BTEC IT Card or Ahmad's lessons/report review. Two engines (Perplexity P096, P091) simply asked the user to send their report or city and offered to review it themselves. No incorrect Ahmad-specific price or claim was observed because he never appeared; the generic prices they stated (Perplexity: 10–25 JOD per private hour; AI Mode: 15–25 JOD per hour, 25–50 JOD per card) are unsourced estimates.

## 2. Recommendation with evidence vs without

| Test | Status | Evidence the engine used |
|---|---|---|
| P085 Perplexity | named + recommended | A YouTube video by "Ahmad Domi" and a description tying him to Asas; **not** ahmaddomiedu.com |
| P025 AI Mode | named, listed (not a "best teacher" claim) | Instagram profile card "Ahmad Ra'ed Domi || معلم BTEC IT (@ahmaddomiedu)" |
| P040 Perplexity | cited, not named | ahmaddomiedu.com/btec-it/assessment as a source |

Pattern (observed, n=3): his recognition came from **YouTube/Instagram/Asas**, not from the website. Hypothesis: the website does not yet carry the entity signals (clear Person/Teacher identity, service pages) that the engines weigh for "who teaches this", or it has too little third-party corroboration.

## 3. Missing-evidence checklist per opportunity

| Opportunity | Prompt(s) | Observed competing evidence | Likely missing evidence (hypothesis) | Existing Ahmad URL | Action | Priority | Confidence |
|---|---|---|---|---|---|---|---|
| "Best BTEC IT teacher in Jordan" | P001, P002, P005, P006, P012, P015 | Platform listings and Telegram/Facebook/OpenSooq pages; engines also refuse to name a single "best" | Third-party reviews/mentions; consistent profile on listing platforms | / , /about/ | Create/complete profiles on the listing sources the engines use; collect genuine student reviews where allowed | High | Medium |
| Online lessons / private tutoring + price | P003, P008, P091, P092, P099, P100 | OpenSooq, PrivateJo, Ostathi, BTECHub (Perplexity P092), Apprentus | Published, verifiable service/pricing page; owner has not approved prices | /about/ (no service pages live) | Owner decision on what facts can be published; then service page + profile consistency | High | Medium |
| Assignment help (cyber / AI) | P049, P093, P094 | Perplexity: qf-btecit, btecai.com; AI Mode: JIS, Google Play app | Clear "guidance, not solution" service statement + Arabic cyber/AI hubs retrieved | /btec-it/cyber-security, /btec-it/artificial-intelligence | Make the hubs answer student phrasing; align YouTube lessons with those hubs | Medium | Low–Medium |
| Report review | P095, P096 | Engines explain internal verification or offer to review themselves | A named "report review" offer | none found in sitemap | Owner decision (is the service real, what is the scope) | Medium | Low |
| BTEC IT Card | P097 | Gemini: "no official card exists"; Perplexity: Telegram/Pearson | A product page that engines can match to "كرت/بطاقة BTEC IT" | /btec-it-card/ (indexed) | Ensure page language matches phrasing "بطاقة/كرت BTEC IT"; keep claims within owner's brief (hidden prices policy) | Medium | Low |
| Arabic explainer channel | P016, P017, P073 | Hazem Al-Rukibat, Mohammad Nasrallah, Teqani lead YouTube citations | Videos whose titles/descriptions match student queries and link to site pages | YouTube @AhmadDomiedu | YouTube metadata alignment (owner approval required) | High | Medium |

## 4. Multi-prompt fixes first (not one-off keyword tricks)

1. One consistent entity identity (name form, Irbid, "BTEC IT teacher", links) across site, YouTube, Instagram, Asas, LinkedIn.
2. Presence on the 5–6 community/listing sources already used by the engines (Telegram, BTEC JO, TawjihiHub, Ostathi, OpenSooq, Facebook).
3. Approved service/pricing facts published once, then referenced everywhere.
4. Indexing completion for the pages that still were not indexed.
5. Re-measure in 2–4 weeks with a fully persisted raw log and the platforms that were rate-limited.
