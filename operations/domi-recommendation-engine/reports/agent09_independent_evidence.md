# Agent 09: Independent Evidence and Distribution (read-only, 2026-10-12)

Method: WebSearch and WebFetch only. No logins, no contact, nothing posted. Limits: LinkedIn returned HTTP 999 (not verifiable), the YouTube About tab did not render links, and Asas instructor-finder pages 1 and 6-11 were not checked (he was found on page 3).

## 1. What exists today

| # | URL | What it says about him | He controls it? | Names ahmaddomiedu.com? |
|---|-----|------------------------|-----------------|-------------------------|
| 1 | https://asas4edu.net/users/884634/profile | Listed as "أ. أحمد دومي" in the Asas instructor finder (page 3). 11 courses, mostly IT (AI, cybersecurity, data modelling, website development, IT project management, intro to applications). Badges: Loyal User (1 year), Expert Vendor, King Seller. Bio field reads "instructor bio not available". 4 followers, 0 reviews. | Platform-controlled. Unknown whether he can edit the bio. | No. No site, YouTube or Instagram link. |
| 2 | https://www.instagram.com/ahmaddomiedu/ | "Ahmad Ra'ed Domi \|\| معلم BTEC IT". Bio: BTEC IT teacher from Jordan, cyber security / AI / programming, explains assignments in Arabic. About 16.8K followers. | Yes | Yes, link in bio is ahmaddomiedu.com |
| 3 | https://www.youtube.com/@AhmadDomiedu | Channel name "Ahmad Domi \| أحمد دومي – BTEC IT". About-tab text and links could not be read. | Yes | Unverified |
| 4 | https://github.com/ahmaddomi1235-glitch | 11 repos (DomiExploit-Cyber-Scanner, asasbtec, calcasas, asasmehani, ahmad-domi-portfolio, others). No display name, bio, website or location set. | Yes | Not on the profile page |
| 5 | https://github.com/ahmaddomi1235-glitch/ahmad-domi-portfolio | README calls ahmaddomiedu.com the online home of Ahmad Domi, BTEC IT instructor in Jordan. About-box website is ahmaddomiporfolio.vercel.app (spelled "porfolio"). | Yes | Yes (README). The About-box URL is a different, misspelled vercel host. |
| 6 | linkedin.com/in/ahmad-domi (linked from his own site) | Could not be fetched, so unverified. | Presumably yes | Unknown |
| 7 | https://ahmaddomiedu.com/ and /en, /about | His own site. Self-reported: BTEC IT teacher in Irbid, about 8 months at Asas, then freelance, Bachelor of Cybersecurity (Al al-Bayt, 2026), CEH, eJPTv2, CCNA. Links to YouTube, Instagram, LinkedIn, GitHub. Names Asas without a link. No JSON-LD seen by the fetcher. | Yes | n/a |

Search results for the name forms in Arabic and English, for "Ahmad Raed Domi" and for "ahmaddomiedu" returned no news, student, directory or academic pages about him. The only independent-looking hit was the GitHub portfolio repo, which he owns. Name collisions seen and excluded: Ahmed Douma (Egyptian activist), Hassan Bani Domi (Mutah University), Domi Bani Domi, Asas instructors أحمد نصر الله, أحمد القواسمي, غازي الفقيه. Asas is also confused with the IREX "ASAS" early-grade project, which is unrelated.

## 2. Evidence gaps
- There is no third-party page that names both the person and the website. The Asas profile is the only page not authored by him, and it does not link to the site.
- Linking the Asas profile to him is probable but not proven on-page. The evidence is his own site's Asas claim, matching course subjects, and his repos named asasbtec and calcasas. The profile's photo was not visible to the fetcher.
- Possible inconsistency: his site says he "worked" at Asas for about 8 months, but the profile still lists courses dated up to July 2026. Confirm the current status before any wording is published.
- The YouTube and LinkedIn pages could not be read, so nothing is claimed about them.

## 3. Legitimate owner-authorized opportunities

| Action | Change | Why it adds verifiable identity evidence | Risk | Factual confirmation needed? |
|---|---|---|---|---|
| A. GitHub profile | Set display name "Ahmad Raed Domi", bio, location "Irbid, Jordan", and Website = https://ahmaddomiedu.com. Fix the portfolio repo About URL. | A GitHub profile is a high-trust, crawlable page he fully controls. A reciprocal link (site to GitHub is already live) closes the identity loop. | Low | Name spelling and public location only |
| B. Profile README | Create a repo named ahmaddomi1235-glitch with a short README: role, site link, YouTube, Instagram. | Gives GitHub a canonical self-description with the site URL. | Low. Do not list unverified certifications. | Role wording |
| C. YouTube About | Add ahmaddomiedu.com, Instagram and LinkedIn under channel links. Use the same name forms as the site. | Channel to site link, matching the Instagram link, with an Arabic and English name. | Low | None beyond the links |
| D. Instagram | Already links the site. Optionally add the LinkedIn link in the contact or links field, and keep the bio wording identical to the site. | Consistency is the signal. This is already the strongest platform-controlled link. | Low | None |
| E. LinkedIn | Headline "BTEC IT Instructor and Cybersecurity Engineer, Irbid, Jordan". Add the site under Contact info and Featured. Add certifications with credential IDs only if he holds them. | LinkedIn is a major identity node. Credential IDs let third parties verify. | Medium. Over-claiming (the 2026 degree, CTF rank) is a reputational risk if it cannot be proven. | Yes: degree and graduation date, each certification, the Asas dates |
| F. Asas instructor profile | Ask Asas support, or use the instructor dashboard if he has one, to fill the empty bio with a neutral line and add the site link, if platform rules allow it. | It is the only independent platform page on him. A bio plus a link makes Asas a third-party corroboration of the Asas claim. | Medium. It may breach the platform's rules on external links, or conflict with his employer or partner terms. The business reason may be to keep students inside Asas. | Yes: confirm his current Asas status, whether external links are allowed, and the contractual terms |
| G. Site-side corroboration | Link the Asas profile URL from /about or /en, labelled "profile on the Asas platform". Add LinkedIn, GitHub, YouTube, Instagram and the Asas URL to Person `sameAs`. Add credential verification links where public ones exist. | This makes the claim checkable by humans and crawlers. It is inbound evidence he controls. | Low. Only the Asas link carries the status caveat above. | Asas status wording |
| H. Public credential records | If he holds them, link the Credly, Cisco, EC-Council, eJPT or CryptoHack public verification pages from the site and LinkedIn. | These are third-party-issued records. They are the strongest independent evidence available to him. | Low | Yes: only if the public records exist |
| I. Google Business Profile | Do not create one unless he truly offers a service at a fixed, publicly stated location. Online and home-visit tutoring is likely to violate Google's guidelines. | Not applicable by default. | High if misrepresented. | Yes. Default: skip. |

## 4. Priority order
1. G, A, C (quick, low risk, he controls them).
2. E and H, after he confirms the facts.
3. F, after he confirms Asas terms and status.
4. B, then D tweaks.

Excluded by design: paid or undisclosed endorsements, fake reviews, sockpuppets, community spam, and asking students or competitors to promote him. Genuine third-party coverage should only come from earned, unsolicited sources.
