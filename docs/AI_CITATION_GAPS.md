# AI Citation Gaps — where engines get BTEC evidence, and where ahmaddomiedu.com is absent

Source: Perplexity (99 completed answers, full source lists), ChatGPT/Gemini/AI Mode (partial: see AI_VISIBILITY_BENCHMARK.md limitations). "Observed" = seen in data; "Hypothesis" = plausible, unproven. We do not know any model's ranking algorithm.

## 1. What the engines cite (observed, Perplexity, answers containing the domain)

| Role | Domains (count) |
|---|---|
| Official | qualifications.pearson.com 36, btec.moe.gov.jo 14, moe.gov.jo 3 |
| Community / messaging | **t.me 29** (almost all `t.me/s/it_for_btec`), facebook.com 3, reddit 3 |
| Document-sharing | studocu.com 22, scribd.com 20, askfilo.com 6 |
| Jordan BTEC sites/platforms | jis.edu.jo 17, btec.jo 16, tawjihihub.com 11, btec-jo-support.com 10, qf-btecit.web.app 9, btec-jo.com 8, al-maher.net 8, dbtec.top 6, afbtec.net 5, jo.ostathi.com 5, btechub.com 3 |
| Video / social | youtube.com 10, instagram.com 6, linkedin.com 4 |
| General tech explainers | ibm.com 13, geeksforgeeks.org 6, bakkah.com 6, academy.hsoub.com 6 |
| Tutor marketplaces | teacherprivate.com, edujordan.com, apprentus.com, universitytutor.com, mytutorsource.com (3 each) |
| **Ahmad Domi** | **ahmaddomiedu.com 1** (P040) |

## 2. General-explanation sources vs provider-recommendation sources (separate, per brief)

- General explanations (P/M/D, cyber, AI, data, PM): Pearson, StuDocu, Scribd, IBM, Woolwich, thebusiness.school, GeeksforGeeks, Hsoub Academy, UK school sites. Arabic-language sources are rare except Hsoub, Mawdoo3, Edraak, Bakkah.
- Provider/teacher recommendations: Telegram `it_for_btec`, jis.edu.jo, btec.jo, btec.moe.gov.jo, edujordan, teacherprivate, Apprentus, askfilo, OpenSooq, Facebook groups/pages, Ostathi, LinkedIn profiles, Asas/Teqani/Watad/JoAcademy platform pages. (AI Mode source cards for P001–P011 are almost entirely OpenSooq, Facebook tutor pages, Instagram LTUC, Teqani, JIS, Watad, PrivateJo.)

## 3. YouTube citations (checked via oEmbed on every YouTube URL in the Perplexity sources; some were unavailable (HTTP 404))

Creators cited, with counts: م. حازم الركيبات (Hazem Al-Rukibat) 4 answers, Mohammad Nasrallah | BTEC IT 3, Teqani Platform 2, Pearson BTEC & Apprenticeships 2, ABC Horizon 2, plus one-offs. **Ahmad Domi's channel: 1 answer (P085)**, with the video "مقارنة البرمجة الإجرائية والكائنية والمعتمدة على الأحداث".

## 4. Gap table (observed vs hypothesis)

| Prompt(s) | Observed answer sources | Existing Ahmad URL | Gap (observed) | Hypotheses (unproven) | Action | Priority | Confidence |
|---|---|---|---|---|---|---|---|
| P031–P045 P/M/D, command verbs | Pearson, Woolwich, StuDocu, thebusiness.school; one Perplexity answer cited his /btec-it/assessment | /btec-it/assessment/pass-merit-distinction, explain-level-p-writing, analyse-level-m-writing, evaluate-level-d-writing, command-verbs-… | Pages are indexed (GSC, 2026-10-07) but cited 1 of ~15 relevant answers | Newly indexed → retrieval lag; Pearson authority outranks; no third-party links | Add worked examples (the cited one was an example prompt); earn links from Jordan BTEC community | High | Medium |
| P046–P060 Cyber | IBM, NIST, Splunk, Kaspersky, Pearson | /btec-it/cyber-security/* (49 pages) | 0 citations in 15 answers | Engines treated these as generic security questions; BTEC-specific pages not matched to generic phrasing | Create student-phrased entry pages that bridge "BTEC IT cyber assignment" with generic concept queries | Medium | Low–Medium |
| P061–P075 AI | IBM, Google, StuDocu, qf-btecit, Teqani video lessons | /btec-it/artificial-intelligence/* (38 pages) | 0 citations; Teqani videos win P073 | Same as above; video-first intent | Align YouTube metadata + link to matching page | Medium | Medium |
| P076, P077, P079, P081, P082 Programming/Data/PM | Seneca, learncpp, Mawdoo3, YouTube (Turab Math, Software ArchTalks) | /btec-it/programming/programming-paradigms, /btec-it/data-modelling/data-vs-information, /btec-it/it-project-management/project-vs-routine-operations | Three target pages were "discovered, not indexed" in GSC on 2026-10-07 | Not-indexed pages cannot be retrieved | Confirm indexing (quota-limited manual requests pending) | High | High (indexing state is observed) |
| P045 calculator | dbtec.top, btec-engineer.com, qf-btecit, Eduva (ChatGPT) | /btec-calculator (indexed) | Not cited by any engine | Weak topical match to "من 35" Jordan phrasing; no mentions | Check page copy vs phrasing "حاسبة معدل BTEC"; earn mentions | Medium | Low |
| P016/P017/P018/P020/P021 Arabic resources | Telegram, al-maher.net, afbtec, tawjihihub, btec-jo-support | /btec-it/, /btec-it/glossary, /btec-it/questions | Telegram channel dominates; none of his hubs retrieved | Community corroboration weighs more than a new site | Outreach to the channel/admins for a legitimate resource mention | High | Medium |
| P025 social | Instagram @ahmaddomiedu cited | Instagram | Winning here | — | Keep profile/bio consistent with site | Low | High |

## 5. Not observed
BTEC Pro never appeared. ChatGPT and Gemini mostly answered from parametric knowledge plus a few named platforms; their citations were largely not exposed to the scraper.
