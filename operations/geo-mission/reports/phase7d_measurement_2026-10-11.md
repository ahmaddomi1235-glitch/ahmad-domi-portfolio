# Phase 7D — live check of experiment E1 (read-only), 2026-10-11 ~21:00-22:30 UTC

No site change, no deploy, no indexing request, no account change in this phase.

## 1. State checks
- AI hub (`/btec-it/artificial-intelligence`) live: contains «من يشرح هذه الوحدة؟» = YES. Cyber hub (`/btec-it/cyber-security`): section absent = YES (control unchanged). Diff of commit 1900fc7: one file, 20 lines.
- Prompt set recovered: `prompts_assignment_help_v1.json`, hash prefix 5df1584d0adc1c08 (unchanged since freeze).
- Time since deploy: about 21 hours (deploy ~2026-10-11T00:39Z).

## 2. Was the AI hub recrawled? (step 9)
- Bing URL Inspection (read today): `/btec-it/artificial-intelligence` = "Discovered but not crawled", discovered 06 Oct. **Bing has not crawled the page at all**, so it cannot have the new section.
- Google: per-URL crawl date could not be read in this session (inspection UI not drivable); no Google AI Mode test possible (CAPTCHA earlier).
- Evidence from answers: none of the 24 ChatGPT answers (12 per unit) quoted the new section's wording.
- **Verdict: experiment premature for any index-based retrieval.** Results below are a post-deploy snapshot, not a test of the treatment.

## 3. Completed tests
| Platform | Planned | Completed (valid) | Why not |
|---|---:|---:|---|
| ChatGPT (anonymous, fresh chat per run) | 24 core runs (8 prompts x 3) | **24** | – |
| Gemini | 9 | **0** | the app pane was hidden by the OS (`visibilityState: hidden`); Gemini did not render answers; 4 attempts yielded empty text and are discarded |
| Perplexity | 9 | **1** (AI1) | answer text only rendered once; later prompt submissions did not go through while hidden (6 attempts discarded) |
| Google AI Mode | – | 0 | CAPTCHA (not bypassed) |

ChatGPT mode difference vs baseline: same anonymous consumer chat; the pane viewport was 1280x800 this time and prompts were submitted through the page's composer instead of typed. The baseline pane size is unknown, so mode is similar, not identical.

## 4. ChatGPT results (primary KPI = named recommendation in answer text)
| Group | Prompt | Before (Oct 10) | After (Oct 11) | Sources after |
|---|---|---|---|---|
| AI treatment, assignment-help | AI1 | 0/1 | **0/3** | 0 links |
| AI treatment, assignment-help | AI2 | 0/1 | **0/3** | 0 links |
| Cyber control, assignment-help | CY1 | 0/1 | **0/3** | 0 links |
| Cyber control, assignment-help | CY2 | 0/1 | **0/3** | 0 links |
| AI treatment, resource | P061 | 1/1 | **3/3** | AI hub URL each time |
| AI treatment, teacher | P069 | 1/1 | **3/3** | AI hub + private-lessons |
| Cyber control, teacher | P049 | 1/1 | **3/3** | private-lessons (+ card) |
| Cyber control, resource | P057 | 1/1 | **3/3** | card page |

- Assignment-help: treatment 0/6 vs 0/6 before-equivalent; control 0/6. **No difference**, and every one of the 12 answers cited no source at all (ChatGPT answered from general knowledge).
- Retrieval prompts: treatment 6/6, control 6/6, same as before. **Ceiling effect**: nothing to improve.
- Name mentions without a recommendation: 0. Website citations on assignment-help: 0. Price figures for him: 0.
- Winning prompts: P061, P069, P049, P057 only (resource/teacher intent). No assignment-help prompt won.
- Perplexity (1 valid run, AI1): not named, no ahmaddomiedu.com source (the pre-change run had cited `/btec-it/assessment`; one run each, not comparable).

## 5. Does the evidence support an improvement?
**No.** Neither a gain nor a loss is shown. Floor effect (0 before and after, no retrieval by ChatGPT on these prompts) and ceiling effect (100 percent before and after) make ChatGPT unable to reveal the treatment. The page was not recrawled by Bing; Google status unknown. Sample sizes are 3 runs per prompt, one day, one network. No causation can be claimed in either direction.

## 6. Limits
Hidden pane blocked Gemini and most Perplexity runs; baseline had 1 run per prompt; mode not identical; full answer texts were not stored (length, name context, links only).

## 7. Next decision
1. Do not expect ChatGPT assignment-help gains from page attribution (it does not retrieve for these prompts).
2. Re-measure when (a) Bing/Google show the AI hub crawled after Oct 11 and (b) the app window is visible, on Gemini and Perplexity, which do retrieve for assignment-help (3 runs per prompt, AI vs cyber).
3. Keep E1 in place; no rollout to other hubs until that result.
