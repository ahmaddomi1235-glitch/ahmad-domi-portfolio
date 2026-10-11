# GEO next actions after the Gemini breakthrough (Phase 7B)

Primary KPI: unprompted mentions and relevant recommendations of Ahmad Domi for BTEC IT in Jordan.
Constraints respected: prices stay hidden and are never recommended; the card and private lessons stay public; no mass-produced articles; no repeat of finished work; no soliciting reviews or mentions. Nothing was changed in this phase.

## Ten highest-value actions (smallest legitimate step each)

| # | Action | Why (evidence) | Cost | Owner needed |
|---|---|---|---|---|
| 1 | **Read per-URL crawl/index dates** in Search Console (read-only URL Inspection) for `/`, `/btec-it`, the AI hub, the card page, `/btec-it/private-lessons`, and record them | The ranking hypothesis (indexing → Gemini grounding) is untested for lack of these dates; it could not be read in this session | 15 min | no |
| 2 | **Re-run the 30-prompt Gemini cohort with 5 runs per prompt on Oct 13 and Oct 17** (logged-out, fresh chats, same wording), saving full text and any real URLs | Today's rates rest on 3–5 runs per prompt and one Oct 8 baseline run; two later points show whether the gain holds with no site change | 2–3 h each | no |
| 3 | **Get `/btec-it/private-lessons` crawled** (it is the one priority page not on Google): check it is linked from the home body and the card page, then wait for Google; do not request indexing repeatedly | It is not indexed and no Gemini run could have seen it; local-tutor prompts (P002, P003, P009) lose 0 of 7 | 10 min | no |
| 4 | **For local-tutor prompts (Irbid, Amman, online), state on the private-lessons page only the facts the owner confirms** (where lessons are given, online or in person) in one visible sentence | Gemini answers P009 from PrivateJo, Apprentus, Facebook groups and schools; Irbid is on the home page but P009 still lost 0 of 3 | 20 min | yes: confirm availability |
| 5 | **Add a visible «من يشرح هذه الوحدة؟» line to the AI unit hub** that names Ahmad and links to the unit explanations, using the exact facts already on the page | P069 (who explains the AI unit in Jordan) named him in only 2 of 5 runs although the AI pages match the wording; the line makes the person-to-unit link explicit and also serves as the treatment in the experiment below | 15 min | no |
| 6 | **Put the card page link in the YouTube channel description and a pinned comment on the AI and cyber videos** (owner's own assets) | P097: Gemini named the card in 2 of 4 runs and said "no official card" in two others; a second owned page repeating the same facts gives retrieval another consistent source | 15 min | yes |
| 7 | **Retest ChatGPT and Perplexity on Oct 12–14 when their anonymous limits reset**, same 30 prompts, recording sources | They are the least measured engines (ChatGPT 0 of 30 today, Perplexity 1 of 30); Perplexity once cited `/btec-it/assessment` for P009 | 2 h | no |
| 8 | **Finish the Google AI Mode prompts** (7 left, including all 4 commercial) once the CAPTCHA is cleared by the owner, from a clean window | AI Mode named him 0 of 23 and favors marketplaces and social groups for tutor intent; this is the engine with the biggest gap | 30 min | yes: solve the CAPTCHA |
| 9 | **Treat chip labels as weak evidence**: in every future run open the chips and record the real URL | Only 4 of 22 runs exposed a URL; the label «أحمد دومي \| Ahmad Domi» may be the channel or the site | 0 | no |
| 10 | **Check Gemini for invented card facts** each week (price, availability, "cooperation with platforms") and correct the page copy only if a claim comes from ambiguous wording | Gemini added «مشهورة» and «بالتعاون مع المنصات»; WhatsApp support is real. A wrong price in an answer would conflict with the hidden-price policy | 20 min | no |

## What Gemini's successes say can transfer to other engines

| Success pattern | Existing page already answers it | Video | Missing evidence | Other engines |
|---|---|---|---|---|
| Resource discovery in Arabic (P016, P017, P018, P061) | `/btec-it`, glossary, unit hubs | yes | none | Perplexity cited the assessment page once; transfer unproven |
| Unit-specific (AI) | AI hub and concept pages | yes | explicit "who explains" line (action 5) | AI Mode answered AI prompts from other platforms |
| Generic head "best BTEC IT teacher in Jordan" (P001) | home and about | channel | independent corroboration | AI Mode and Perplexity name other people and directories |
| Card | `/btec-it-card` | the card's first video | consistent mention on YouTube/Instagram (action 6) | other engines not yet shown the card |

Independent corroboration (a listing on a platform he does not control) would help the engines that rank directories, but it must not be solicited from competitors or students. The only legitimate route is a profile on a platform where he actually teaches and which he controls himself.

## Do NOT repeat

- Rewriting all YouTube titles or the channel description again (the video found in P001 still has the old pattern, so it is not a bottleneck).
- Rebuilding the knowledge base or adding pages for topics already covered; mass-producing articles.
- Re-submitting IndexNow with no content change; clicking Request Indexing repeatedly.
- Restoring or publishing any price, or implying one.
- Adding superlatives («الأفضل», «الأشهر») to the site: Gemini produced them on its own.
- Asking students or competitors to promote him; buying reviews.
- Editing `llms.txt` again (no evidence any engine used it).
- Reading Gemini results from the owner's signed-in account.

## Controlled follow-up experiment (one change, one control)

**Question:** does an explicit unit-level "who explains this" line increase Gemini's naming of Ahmad on that unit's prompts?

- **Treatment:** AI unit prompts: P061, P069 (add the line to the AI hub only, action 5).
- **Control:** cyber unit prompts: P049, P057 (no change), plus P001 as a stability anchor.
- **Design:** 5 fresh logged-out Gemini runs per prompt on Oct 13 and Oct 17 (before, no change), then apply the single edit on Oct 17 after the second run, then 5 runs per prompt on Oct 20 and Oct 24 (after). Same wording, fresh chats, full text and source URLs saved, same network.
- **Success:** the treatment prompts' text-mention rate rises by at least 30 points over its own before-rate while the control moves by less than 15, in both after-dates. With 10 runs per cell this is directional only (Fisher exact test); a smaller change is reported as no result.
- **Stop rules:** no CAPTCHA bypass; skip a day if rate limits appear; log any Gemini UI/model-label change.
- **Guardrails:** no other site, YouTube or Instagram change during the window; price stays hidden; if the owner cannot confirm the wording facts, skip the edit rather than invent them.
