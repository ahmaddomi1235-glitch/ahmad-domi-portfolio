# Social and third-party entity changes (owner actions)

These accounts cannot be edited from the repository, and no authorised integration exists for them, so nothing here was changed automatically. The goal is **one consistent identity** everywhere: **Ahmad Domi | أحمد دومي — BTEC IT**, linking to `https://ahmaddomiedu.com`.

The website already declares these accounts in the Person schema `sameAs` (`src/config/site.ts`). Search and answer engines trust the link more when the profile links **back** to the site, so reciprocal links matter.

## 1. Instagram — `@ahmaddomiedu`

| Field | Recommended value |
| --- | --- |
| Name | `Ahmad Domi \| أحمد دومي BTEC IT` |
| Username | `ahmaddomiedu` (keep) |
| Website (the only clickable link) | `https://ahmaddomiedu.com` |
| Category | Educator (or Education) |

**Bio (143 characters, within Instagram's 150 limit):**

```
مدرّس BTEC IT 🇯🇴
أمن سيبراني • ذكاء اصطناعي • نمذجة بيانات • إدارة مشاريع IT
شروحات بالعربي مع المصطلحات الإنجليزية
📚 موارد وبطاقة BTEC IT ↓
```

**Your original concept** had the line `شرح Learning Aims ومعايير P/M/D بالعربي`. I replaced it on purpose: the site does **not** yet publish Learning-Aim or P/M/D pages (they need an official Pearson source or your own assessment material — see `docs/OWNER_ACTIONS.md`). A bio that promises them while the linked site doesn't deliver them weakens the match between profile and site. Switch to your original line the day those pages go live.

Other Instagram changes:

- Pin three posts that map to site pages (e.g. threat vs vulnerability vs risk; AI vs ML vs DL; data vs information) and put the page URL in the caption's first line.
- Highlight covers named by unit: الأمن السيبراني · الذكاء الاصطناعي · نمذجة البيانات · إدارة المشاريع · النتائج.
- In every educational caption, name the concept in Arabic **and** English (the same pairing used on the site's glossary).

## 2. YouTube — `@AhmadDomiedu`

See `docs/YOUTUBE_GEO_MIGRATION.md` (rename, description, playlists, 26 retitles, chapters, captions).

## 3. Asas Educational Platform (teacher profile)

The repository states an Asas BTEC IT instructor role (CV) and the site links the affiliation as text, but **no Asas profile URL has been provided**, so it is not in `sameAs` yet.

1. Open your teacher profile on Asas and copy its public URL.
2. Add it to `thirdPartyProfiles` in `src/config/site.ts` (one line); it flows into the Person schema automatically.
3. On the Asas profile itself, use the same name and wording: `Ahmad Domi | أحمد دومي — BTEC IT`, and add `https://ahmaddomiedu.com` in any "website/links" field the platform offers.
4. Only link what Asas genuinely displays; do not claim endorsements the platform did not give.

## 4. LinkedIn — `linkedin.com/in/ahmad-domi`

(Taken from the CV data already in the repo; confirm it is the live URL.)

- Headline: `BTEC IT Instructor | Cybersecurity · AI · Data Modelling | Jordan`
- Add `https://ahmaddomiedu.com` under Contact info → Website, and to the About section.
- Keep the experience entries identical to the CV in the repo (Asas Educational Platform; freelance BTEC IT instruction).

## 5. GitHub — `ahmaddomi1235-glitch`

- Profile README (a repo named `ahmaddomi1235-glitch`): two lines — who you are, and the site link.
- Pin `asasbtec` (the calculator) and describe it: "BTEC grade calculator — Jordan Tawjihi. Live: https://ahmaddomiedu.com/btec-calculator".
- Set the repository **website** field of `ahmad-domi-portfolio` to `https://ahmaddomiedu.com`.

## 6. Consistency table

| | Name | Handle | Link back to site |
| --- | --- | --- | --- |
| Website | Ahmad Domi · أحمد دومي | — | — |
| YouTube | Ahmad Domi \| أحمد دومي – BTEC IT | @AhmadDomiedu | yes (first link) |
| Instagram | Ahmad Domi \| أحمد دومي BTEC IT | @ahmaddomiedu | yes (profile link) |
| LinkedIn | Ahmad Domi (headline as above) | /in/ahmad-domi | yes |
| GitHub | ahmaddomi1235-glitch | — | yes (pinned/repo website) |
| Asas | Ahmad Domi \| أحمد دومي — BTEC IT | (provide URL) | yes, if the platform allows |

## 7. What not to do

Don't buy backlinks, post fabricated reviews, or claim credentials/awards not in the CV. Corroboration works because the profiles are real and agree with each other.
