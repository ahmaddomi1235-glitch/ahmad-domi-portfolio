# Gemini winning prompts — evidence record (Phase 7B)

Measured 2026-10-10. Read-only investigation: nothing on the site, YouTube, Instagram, Search Console or Bing was changed.
Gemini = web UI, logged-out, label "Flash-Lite", Jordan network, fresh chat per prompt. "Searching the web" appeared in every run recorded today.

## How much of the original evidence survived

| Item | Status |
|---|---|
| Oct 10 first-pass answers (the seven "wins") | **Excerpts only**: the sentence(s) around Ahmad's name and the first 150–300 characters. The full answers were not saved (logged-out Gemini chats cannot be reopened). Stored in `sources/audit/phase7/raw_gemini_2026-10-10.txt`. |
| Source URLs behind the first-pass answers | **Not preserved.** Only the chip labels visible in the extract (`ahmaddomiedu.com` for P001, P018 and P061; «أحمد دومي \| Ahmad Domi» for P017, P019, P069, P097). |
| Repeat runs done in this phase | **Full visible text preserved** for all 22 fresh runs plus 7 control runs: `sources/audit/phase7/repeat_gemini_runs.md`. |
| Oct 8 baseline | Per-prompt record in `data/ai-visibility-benchmark/results.json` (excerpt, entities, answer length). Full text was not stored. |

Nothing below is reconstructed from memory. Where a URL was not exposed, it says so.

**Caveat on chip labels.** Gemini draws the source name next to a sentence, but the labels are positioned loosely (a chip can sit before or after the text it supports, and «+ N» hides further sources). The label «أحمد دومي \| Ahmad Domi» is also the name shown for his YouTube channel on video cards, so it cannot by itself tell the website from the channel. Only `ahmaddomiedu.com` shown as a label, as text, or as a link is counted as a website citation.

## The seven first-pass wins (Oct 10)

| # | ID | Exact prompt | Ahmad's role in the answer | Position | Sources visible | Own assets | Card? | Commercial service recommended? | Independently verifiable |
|---|---|---|---|---|---|---|---|---|---|
| 1 | P001 | مين أفضل مدرس BTEC IT بالأردن؟ | **Named as the top teacher**: «يُعد الأستاذ أحمد دومي (Ahmad Domi) من أبرز وأشهر الأسماء المتخصصة في هذا المجال» | first, opening sentence | chip `ahmaddomiedu.com` | website | no | no | answer text only partly: the "most famous" wording is Gemini's, the site makes no such claim |
| 2 | P017 | أفضل قناة يوتيوب عربية لشرح BTEC IT | Named as a **YouTube channel**: «قناة الأستاذ أحمد دومي (Ahmad Domi): شروحات مميزة ودورات تأسيسية ... بالتعاون مع المنصات التعليمية» | listed after the other channels (عبادة عبدالعال was first) | not preserved | channel | no | no | channel exists (488 subscribers on Oct 8); "in cooperation with platforms" is unsupported detail |
| 3 | P018 | مواقع عربية تشرح مواد BTEC تكنولوجيا المعلومات | **Named as website #1**: «موقع وتراس أحمد دومي (BTEC IT)», link text `ahmaddomiedu.com/btec-it` | 1 | chip «أحمد دومي \| Ahmad Domi», text URL `ahmaddomiedu.com/btec-it` | website (hub) | no | no | yes: the hub URL is a real page. The same answer also listed `btec-jo-support.com` |
| 4 | P019 | BTEC IT explained in Arabic website | **Source only, not named in the text**: the only match is the chip «أحمد دومي \| Ahmad Domi» | n/a | chip only | website or channel (ambiguous) | no | no | no: no recommendation was made |
| 5 | P061 | أفضل مصدر عربي لمهمة الذكاء الاصطناعي BTEC؟ | **Named as a resource**: «موقع أحمد دومي (BTEC IT بالعربي): ... شرحاً مفصلاً لوحدات ومفاهيم BTEC IT باللغة العربية مع ربطها بالمصطلحات» | not preserved | text `ahmaddomiedu.com` | website | no | no | yes in substance: the site has the AI unit hub, glossary and concept pages |
| 6 | P069 | مين بشرح وحدة الذكاء الاصطناعي BTEC بالأردن؟ | **Named as a platform**: «منصة أحمد دومي (BTEC IT بالعربي): توفر شروحات مفصلة مقسّمة حسب الوحدات والمفاهيم» | not preserved | chip «أحمد دومي \| Ahmad Domi» | website (probable) | no | no | yes in substance |
| 7 | P097 | في كرت أو بطاقة تعليمية لـ BTEC IT بالأردن؟ | **Card named**: «بطاقات الأستاذ أحمد دومي (BTEC IT Cards): مواد تعليمية مدفوعة ومشهورة بين الطلبة في الأردن، شروحات مصورة ...» | first item | chip «أحمد دومي \| Ahmad Domi» | card (page or channel) | **yes** | a paid product was described, no price shown in the preserved excerpt | the card page says «تعليمية مدفوعة», «مصوّرة», units, WhatsApp support (verified live); "famous among students" is not claimed by the site |

**Named in text and recommended-in-context: 6 of 7. Citation only: 1 of 7 (P019).** None of the seven stated a price. The commercial service (private lessons) was not recommended in any of them; only the card was named (P097).

## The four newly winning prompts that are directly comparable with Oct 8

Prompts Gemini completed on both days (18) — Oct 8 absent → Oct 10 present: **P001, P017, P019, P097.** P018, P061 and P069 were not run on Oct 8, so they cannot be called "new wins"; they are only a baseline-free observation.
Strict reading: P001, P017 and P097 changed to a text mention; **P019 changed to a source chip only.**

## Repeatability (3 fresh runs per prompt; P069 got 4)

Same wording, fresh chat each time, no account. Include the first-pass run for the "all runs" column.

| ID | New runs named in text | New runs chip-only | First pass | All runs named in text | Notes |
|---|---:|---:|---|---:|---|
| P001 | **3 / 3** | 0 | named (+1 repeat earlier today, also named) | **5 / 5** | rank 1 each time; own-site chip in 1 of 3 new runs; own YouTube video card in 1 |
| P017 | 2 / 3 | 0 | named | 3 / 4 | rank 1 in both hits; run 2 also says «ستجد ضالتك عند أحمد دومي» for theory and terminology |
| P018 | 2 / 3 | 0 | named | 3 / 4 | rank 1 and rank 3; `ahmaddomiedu.com/btec-it` link exposed in 1 run |
| P019 | 1 / 3 | 2 | chip only | 1 / 4 text (4 / 4 any appearance) | text mention only in the last section |
| P061 | **3 / 3** | 0 | named | **4 / 4** | rank 3, 4, 1 |
| P069 | 1 / 4 | 0 | named | 2 / 5 | the one hit is an explicit teacher recommendation with AI-unit detail |
| P097 | 1 / 3 | 0 | named | 2 / 4 | the two misses say "no official card exists" and cite other platforms |
| **Total** | **13 / 22 (59%)** | 2 | 6 of 7 text | **20 / 30 (67%)** | any appearance incl. chip-only: 15 / 22 new (68%), 23 / 30 all |

Other frequencies over the 22 new runs: website visibly cited **4 / 22 (18%)** (P001 run 2 chip, P018 runs 1–2, P061 run 1); own YouTube video shown 1 / 22; commercial item (card) recommended 1 / 22 (1 of 3 for P097); private lessons recommended 0 / 22. When he was named inside a list, he was rank 1 in 8 of 13 runs.
One extra P069 run was made by mistake (4 instead of 3); it is included and disclosed.

**Reading it honestly:** P001 and P061 are stable. P017 and P018 are likely but not certain. P019, P069 and P097 are coin-flips. The set of "winners" is not fixed: **P016 lost on the first pass but named him in 2 of 2 control runs.** Losing prompts that stayed lost: P009 (Irbid) 0/3, P002 (Amman, private) 0/2, P003 (online tutor) 0/2.

## What Gemini said that the site does not support

- «أبرز وأشهر» (most prominent and famous), «مشهورة» (famous): editorial wording by Gemini; the site's own copy avoids superlatives (a homepage test forbids them in the FAQ).
- «بالتعاون مع المنصات التعليمية» (P017, first pass): not stated on the site.
- Card details in P097 run 1 (paid, filmed, units, WhatsApp support) **match the live card page**; no price was stated in any run.

## Files

Raw: `sources/audit/phase7/raw_gemini_2026-10-10.txt`, `sources/audit/phase7/repeat_gemini_runs.md` (private, git-ignored).
