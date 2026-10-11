# EXPERIMENTS

## Observation O1 (2026-10-10, before any change)
On 6 assignment-help prompts (AI1, AI2, CY1, CY2, GH1, GH2) ChatGPT answered from general knowledge: 0 named, 0 links. On teacher/resource prompts for the same units (P061, P069, P049, P057) it searched and named Ahmad in 4/4. => For assignment-help questions the limiting factor is NOT page attribution; ChatGPT does not retrieve any page. Hypothesis H1: adding an educator-attribution section to a hub will not change assignment-help answers unless the model decides to search. Experiment will therefore measure two things separately: (a) retrieval-triggering prompts (resource/teacher), (b) assignment-help prompts (expected null).
Agent 8 note: AI hub (37 concepts, 2269 words) and cyber hub (48, 3034) are not size-matched => judge before/after change within each hub, not the gap between them.

## Experiment E1 — educator attribution on one unit hub
- Treatment: `/btec-it/artificial-intelligence` gets a visible section «من يشرح هذه الوحدة؟» (src/app/(site)/(kb)/btec-it/[unit]/page.tsx, constant EDUCATOR_ATTRIBUTION_UNIT). Text is factual: Ahmad Domi, مدرّس BTEC IT في الأردن, explains the unit in Arabic with English terms through the concept pages, video lessons and downloadable files; educational, no ready-made answers; links to /about and /btec-it/assessment. No superiority claims, no instructions aimed at models.
- Control: `/btec-it/cyber-security`, unchanged. Only change in the repo for this experiment: that one section.
- Known asymmetry (Agent 7/8): hubs differ in size, videos, inbound links; judge each hub against ITS OWN before/after, not against the other.
- Baseline (before): ChatGPT assignment-help 0/6 named with 0 sources; Gemini AI1, AI2, CY1 not named; Perplexity AI1, GH2 cite `/btec-it/assessment` without naming him; resource/teacher prompts P061, P069, P049, P057 named in ChatGPT.
- Success definition: named recommendation in answer text on the fixed prompts (file prompts_assignment_help_v1.json). Site citation, source labels and mentions are secondary.
- Honest expectation (H1): near-null for ChatGPT assignment-help because it does not retrieve; the plausible effect is on Perplexity/Gemini where the hub page or assessment page is already retrieved but the author is not surfaced.
- Not changed in this experiment: JSON-LD, /about wording, other hubs, YouTube.
