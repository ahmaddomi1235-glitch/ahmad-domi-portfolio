# Gemini breakthrough — causal hypotheses, ranked by evidence (Phase 7B)

Rule used: a change that happened before a mention is not proof that it caused the mention. No claim is made about Gemini's internal reasoning. Strength = how much of the evidence is **observed** rather than inferred. Dates are UTC (repo clock UTC−3).

Observed fact base: Oct 8 ~02:20 UTC Gemini named him in 0 of 18 matched prompts; Oct 10 first pass 4 of the same 18 (3 text, 1 chip) and 7 of 30 overall; repeat runs 13 of 22 named in text, 20 of 30 including first pass. Every Oct 10 run showed "Searching the web".

| Rank | Hypothesis | Evidence for | Evidence against / gaps | Strength |
|---|---|---|---|---|
| 1 | **Google indexed his pages (14 of 15 priority URLs by Oct 10; 1 of 15 on Oct 6) and Gemini's search grounding now retrieves them** | Gemini's text repeats live page wording: «دوسيات التأسيس وكتب الوحدات» appears on `/btec-it` and in P018; AI vs ML vs DL vs neural-network wording matches the AI unit page (P069); card details (paid, filmed explanations, units, WhatsApp support) match the card page published Oct 9 (P097 run 1); `ahmaddomiedu.com/btec-it` was exposed as a link (P018 run 2); on Oct 6, when 14 pages were unindexed, no mention was possible through Google | Per-page crawl and index dates could not be read (the Page Indexing report is stale); we do not know how many of the 15 pages were indexed at Oct 8 02:20 UTC; Gemini may not have searched on Oct 8 (not recorded) | **Strongest** (mechanism plus content match; timing unproven) |
| 2 | **Gemini changed what it does** (search used more often, new model snapshot or retrieval update) | all 22 repeat runs searched; Oct 8 record says search "unknown/auto"; the same prompts produced different competing names across runs, showing the system is not static | no way to test the past; the label (Flash-Lite) is identical; no public change log was found; would not explain why only his prompts moved | Plausible, **untestable** |
| 3 | **Phase 6 homepage and identity edits (Oct 8 ≈12:20)**: visible Q&A (teacher in Arabic, Irbid, name forms), Person `sameAs`/`knowsAbout`, canonical YouTube handle | P001 wording follows the homepage title «مدرّس BTEC IT في الأردن»; chips labelled «أحمد دومي \| Ahmad Domi» appear next to unit lists that match the hub | Perplexity's Phase 6 smoke-test hit cited a page that Phase 6 did **not** change; no run exposed the homepage Q&A as a source; P009 (Irbid) still loses 0 of 3 even though Irbid is on the homepage | Medium-weak |
| 4 | **Card and private-lessons pages (Oct 9 ≈11:22)** | P097 run 1 matches the card page on four details; P097 was 0 on Oct 8 | P097 repeats: 1 of 3; `/private-lessons` is not on Google and no run cited it; two of three repeats say no official card exists | Medium for P097 only; **nil for other prompts** |
| 5 | **Oct 6 title/description/hub rewrite (before baseline)** | hub titles contain the target phrases («شرح BTEC IT بالعربي», «مدرّس BTEC IT»); the 7 winning prompts match those phrases | the rewrite preceded the baseline by ~35 h and Gemini still had 0 of 18, so the rewrite alone was not sufficient; it may matter only once pages were indexed (links to hypothesis 1) | Contributing at most, not an independent cause |
| 6 | **Manual indexing requests and IndexNow** | indexed share rose from 1 of 15 to 14 of 15 after the requests; Bing/Google discovery routes | cannot separate requests from Google's own scheduling; IndexNow reaches Bing and others, not Google | Probable accelerator of #1 |
| 7 | **YouTube metadata rewrites** | the channel appears in P017 answers | the video shown in P001 run 2 still has the old title pattern; no dated record of the edits; Gemini surfaced competing channels with their own old titles | Weak |
| 8 | **Pricing removal (Oct 9 ≈15:12)** | none | no run mentioned a price either way; nothing in the winners depends on it | No evidence |
| 9 | **`llms.txt` update** | none | no run cited it; no evidence that Gemini consults it | No evidence |
| 10 | **Run-to-run randomness** | P016 lost then won in 2 of 2 control runs; P019, P069, P097 flip across runs | P001 5 of 5 and P061 4 of 4 are far outside what a 0 of 1 baseline plus noise would predict (but the baseline is a single run) | Explains prompt-level flips, **not** P001 or P061 |
| 11 | **Owner's personalization** | – | all runs logged-out; the signed-in Oct 8 run was excluded | Ruled out |

## What would settle it

1. Per-URL Google crawl and index timestamps for `/`, `/btec-it`, the AI unit hub, the card page (GSC URL Inspection, read-only). If the pages were indexed only after Oct 8 02:20 UTC, hypothesis 1 gains a fixed order of events.
2. Gemini's source URLs, not labels: the UI exposed real links in only 4 of 22 runs.
3. A control: the same prompt set on a topic where no page changed.
4. Repeat the cohort on Oct 13 and Oct 17 with 5 runs per prompt: if rates hold with no site change, a Gemini-side shift is more likely than noise.

## Risks to keep in mind

- Gemini's superlatives («أبرز وأشهر») are its own wording, not a site claim; do not copy them into the site.
- Answers named him with details the site does not support («بالتعاون مع المنصات»). Monitor for invented facts, especially about the card (price, availability).
