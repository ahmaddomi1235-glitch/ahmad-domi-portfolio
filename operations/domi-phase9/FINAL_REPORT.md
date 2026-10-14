# Phase 9 final report (2026-10-14)

1. **Intents mapped:** 50 (`reports/agentA_intent_map.md`); 30 frozen in `prompts_phase9_frozen_v1.json` (hash 3547694fb160cb64). Coverage: COVERED 25, PARTIAL 20, GAP 5. Outside help genuinely useful: YES 6, MAYBE 15, NO 29.
2. **Existing pages improved:** 9 assessment pages (see `IMPLEMENTATIONS.md`).
3. **New pages:** none, and that is justified: the top gap has no verified source.
4. **Educational examples added:** 7 invented mini-examples and 9 sets of review questions (bakery, dental clinic, clinic USB drive).
5. **Verified attribution:** the pages keep the author card and the source line «منهجية كتابة تقرير BTEC — إعداد أحمد دومي (مبادئ عامة فقط)». The Phase 9 sections are labelled as the site's own illustrations and general study advice, not claimed as his method. No slogans and no instruction to models.
6. **Retrieval gaps corrected:** none demonstrated. Titles, H1, canonicals and author attribution on the assessment pages were already correct. The verified gap was missing application guidance, which the new sections address. A hub-level Person JSON-LD node stays deferred until E1 and E2 close.
7. **Tests:** verify (lint, typecheck, validate, 26 unit tests, build); Playwright 61 of 62 plus an isolated rerun of the flaky test; live HTML check on all 9 pages; scan of the added text for prices, criterion codes, grade promises and Pearson wording (clean).
8. **Named recommendations before and after:** before, 0 of 89 (ChatGPT 0 of 30, Gemini 0 of 29, Perplexity 0 of 30). After: not measured. The change was deployed today and no recrawl is verified, so this is not an improvement claim.
9. **Citation changes:** none yet. The baseline citation is only Perplexity chips on Q19 and Q20.
10. **Remaining limitations:** raw answers were not stored in full; Perplexity sources are hidden; Google AI Mode is behind a CAPTCHA; Gemini Q04 did not finish; one run per prompt; the ChatGPT stale-price leak (`../domi-recommendation-engine/BLOCKERS.md` B11); owner confirmations still needed (evidence definition, source for reading the criteria table, centre rules on resubmission and AI-tool use, the site-originated teaching items).
11. **Top five next actions:**
    1. Re-run the frozen 30 on all three engines on or after 2026-10-17, and only after Bing or Google show a recrawl of the 9 pages.
    2. Close E1 (the AI hub was recrawled on 2026-10-13) after one more run, then add the AI and Cyber method pages (classification metrics, Cyber D comparison) and the hub Person node.
    3. After E2 is recrawled and measured, add the brief-reading page, if the owner supplies his own source for reading criteria.
    4. Owner decisions: resubmission and AI-use policy wording, and the evidence definition.
    5. Address the stale-price leak (B11) and the wrong-image association.
