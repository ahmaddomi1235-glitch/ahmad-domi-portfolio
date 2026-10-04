# YouTube GEO migration — قناة أحمد دومي

Owner action required: every change below is made in YouTube Studio by the channel owner. Nothing here can be applied from the repository. Last verified against the live channel on 2026-10-04 (26 public videos, 3 playlists, channel `UCdZ35Tf0PAG62WQLa17vJDg`).

## 1. What the audit found

| Finding | Detail |
| --- | --- |
| Handle | Already **`@AhmadDomiedu`** (the repo still linked the old `@AhmadDomi-r7r`; fixed in `src/config/site.ts` and `src/content/profile.ts`). `@AhmadDomiBTEC` is the fallback only if the current one is ever lost. |
| Channel title | Shown as "Ahmad Domi". Recommended: **Ahmad Domi \| أحمد دومي – BTEC IT** |
| Titles | Mostly *lesson-number-first* with repeated noise ("الاستاذ احمد دومي", "منصة اساس التعليمية", "\|\|"). The concept the video explains is not in the title. |
| **Swapped lesson titles** | Verified from captions: `1fQ9n-o_G1s` is titled "الحصة السادسة" but its content is the **first** AI lesson; `KWk2JLTwGUk` is titled "الحصة الخامسة" but its content is the **second** (AI around us). The two numbers are swapped. |
| Captions | Only 15 of 26 videos have Arabic auto-captions; auto-captions are noisy (Levantine dialect). They were used to *verify* topics, never published. |
| Playlists | 3 exist ("نمذجة البيانات 2011", "إدارة المشاريع -توجيهي", "الصف العاشر ، مدخل إلى التطبيقات"); the cyber / AI foundation lessons are in none. |

## 2. Channel identity

- **Name:** `Ahmad Domi | أحمد دومي – BTEC IT`
- **Handle:** `@AhmadDomiedu` (keep).
- **Description (paste):**

```
أحمد دومي — مدرّس BTEC IT في الأردن.
شرح بالعربي لوحدات الأمن السيبراني والذكاء الاصطناعي ونمذجة البيانات وإدارة مشاريع تكنولوجيا المعلومات، مع المصطلحات الإنجليزية.

📚 الشروحات المكتوبة والمصطلحات والأسئلة: https://ahmaddomiedu.com/btec-it
🧮 حاسبة المعدل: https://ahmaddomiedu.com/btec-calculator
🎓 بطاقة BTEC IT (أول فيديو مجاني): https://ahmaddomiedu.com/btec-it-card
📸 Instagram: https://www.instagram.com/ahmaddomiedu/
👤 من هو أحمد دومي: https://ahmaddomiedu.com/about

Ahmad Domi — BTEC IT instructor in Jordan. Arabic explanations of BTEC IT units with English terminology.
```

- **Channel links (About tab):** website `https://ahmaddomiedu.com`, Instagram, and the Asas profile once its URL is available. Put the website **first** (YouTube shows the first links under the banner).
- **Banner / avatar:** same portrait as the site (`/images/profile/ahmad-domi-profile.jpg`) so the face and name match across platforms.

## 3. Playlist architecture (one playlist per unit)

| Playlist | Contents |
| --- | --- |
| الأمن السيبراني — تأسيس جيل 2009 | `LhwsFbsgrZQ`, `EJGiUOACZmY`, `WKGvNc6JKPs`, `45CuJDDJcls`, `qVjvVT-YxEk` |
| الذكاء الاصطناعي — تأسيس ووحدة | `1fQ9n-o_G1s`, `KWk2JLTwGUk`, `sNTljXGYnpQ`, `KlWePP5FCtQ` |
| نمذجة البيانات — تأسيس جيل 2011 (existing) | `QRrdUSIJW5g`, `I_1Yr31BPlU`, `jw6aMr_Oq0c` |
| إدارة مشاريع أنظمة تكنولوجيا المعلومات | `0mI5rQfzvLA`, `zQk-eUIrbM0`, `PezRTAzFM7E`, `rttCQ82X5M4`, `se7rDDbFCBg`, `HkZ6hQS2r0k`, `EWNtIquhbW8` |
| مدخل إلى التطبيقات — الصف العاشر (existing) | `flmp7bTBjhc`, `a2zEfc3Z2is`, `rxf9ZptcFxE`, `QwWOrUDeXUM`, `AjVXictrHjU` |

Generation/year ("جيل 2009", "جيل 2011", "الصف العاشر", "توجيهي") is **not removed** — it moves into the playlist title and the description, where students who search for it will still find it.

## 4. Title migration (concept first)

Pattern: **`<concept question or name> (<English term>) – <unit> BTEC IT | أحمد دومي`**. Generation and lesson number go in the description's first line.

Rows 1–14 and 26 are based on the video's own captions. Rows 15–25 are only **title-level** (no captions exist to verify the exact topic) — rewrite them concept-first after you re-watch, or run `node scripts/content/generate-content-draft.ts <id>` once captions exist.

| # | Video ID | العنوان الحالي على YouTube | العنوان المقترح (مفهوم أولًا) |
|---|---|---|---|
| 1 | `LhwsFbsgrZQ` | تأسيس جيل 2009 \|\| طلاب BTEC IT \|\| الاستاذ احمد دومي \|\| منصة اساس التعليمية | مقدمة تأسيس جيل 2009: خطة دوسية الأمن السيبراني والذكاء الاصطناعي – الأمن السيبراني BTEC IT \| أحمد دومي |
| 2 | `EJGiUOACZmY` | الحصة الأولى \|\| تأسيس جيل 2009 \|\| تكنولوجيا المعلومات الأمن السيبراني \|\| | رحلة البيانات: لماذا أصبحت البيانات الهدف الأول في الأمن السيبراني؟ – الأمن السيبراني BTEC IT \| أحمد دومي |
| 3 | `WKGvNc6JKPs` | الحصة الثانية \|\| تأسيس جيل 2009 \|\| طلاب BTEC IT \|\| الاستاذ احمد دومي \|\| منصة اساس التعليمية | أنواع الهاكرز ودوافعهم: من يقف خلف الشاشة؟ – الأمن السيبراني BTEC IT \| أحمد دومي |
| 4 | `45CuJDDJcls` | الحصة الثالثة \|\| تأسيس جيل 2009 \|\| طلاب BTEC IT \|\| الاستاذ احمد دومي \|\| منصة اساس التعليمية | ماذا يستطيع المهاجم أن يفعل عندما يصل إلى جهازك؟ – الأمن السيبراني BTEC IT \| أحمد دومي |
| 5 | `qVjvVT-YxEk` | الحصة الرابعة تأسيس أمن سيبراني BTEC IT 2009\|\| الاستاذ احمد دومي | الفرق بين التهديد والثغرة والمخاطرة (Threat vs Vulnerability vs Risk) – الأمن السيبراني BTEC IT \| أحمد دومي |
| 6 | `1fQ9n-o_G1s` | حصص التأسيس الحصة السادسة \|\| الذكاء الاصطناعي \| جيل 2009 \|\| الاستاذ احمد دومي \|\| منصة اساس التعليمية | كيف يتعلم الذكاء الاصطناعي؟ البيانات والخوارزمية والنموذج وتعلّم الآلة – الذكاء الاصطناعي BTEC IT \| أحمد دومي |
| 7 | `KWk2JLTwGUk` | الحصة الخامسة تأسيس جيل 2009 BTEC IT \|\| الاستاذ احمد دومي | الذكاء الاصطناعي من حولنا: التطبيقات والفوائد والتحديات – الذكاء الاصطناعي BTEC IT \| أحمد دومي |
| 8 | `QRrdUSIJW5g` | تأسيس جيل 2011 BTEC IT \|\| نمذجة البيانات الحصة الأولى \|\| الاستاذ احمد دومي | رحلة البيانات: كيف تتحول البيانات الخام إلى معلومات؟ – نمذجة البيانات BTEC IT \| أحمد دومي |
| 9 | `I_1Yr31BPlU` | تأسيس جيل 2011 BTEC IT \|\| نمذجة البيانات \|\| احمد دومي | من أين تأتي البيانات؟ مصادر البيانات وجودتها – نمذجة البيانات BTEC IT \| أحمد دومي |
| 10 | `jw6aMr_Oq0c` | BTEC IT Class of 2011 Foundation \|\| Lesson 3 \|\| Data Modeling \|\| Mr. Ahmad Doumi | ما هي نمذجة البيانات؟ كيف تتنبأ المؤسسات بالمستقبل – نمذجة البيانات BTEC IT \| أحمد دومي |
| 11 | `sNTljXGYnpQ` | مقدمة في الذكاء الاصطناعي - BTEC IT - منصة اساس التعليمية | مقدمة وحدة مقدمة في الذكاء الاصطناعي (BTEC IT) – الذكاء الاصطناعي BTEC IT \| أحمد دومي |
| 12 | `KlWePP5FCtQ` | BTEC IT - الحصة الاولى البيانات في الذكاء الاصطناعي - منصة اساس التعليمية | أنواع البيانات في الذكاء الاصطناعي: مهيكلة وشبه مهيكلة وغير مهيكلة – الذكاء الاصطناعي BTEC IT \| أحمد دومي |
| 13 | `0mI5rQfzvLA` | منصة اساس التعليمية - BTEC IT - مقدمة في ادارة مشاريع انظمة تكنولوجيا المعلومات | مقدمة وحدة إدارة مشاريع أنظمة تكنولوجيا المعلومات – إدارة مشاريع تكنولوجيا المعلومات BTEC IT \| أحمد دومي |
| 14 | `zQk-eUIrbM0` | الحصة الاولى - ادارة المشاريع - مفهوم المشروع - BTEC IT - منصة اساس التعليمية | مفهوم المشروع: الفرق بين المشروع والعمل الروتيني، وأصحاب المصلحة والنطاق والقيود والمخاطر – إدارة مشاريع تكنولوجيا المعلومات BTEC IT \| أحمد دومي |
| 15 | `PezRTAzFM7E` | المقدمة -ادارة مشاريع أنظمة تكنولوجيا المعلومات - الاستاذ احمد دومي | إدارة مشاريع أنظمة تكنولوجيا المعلومات — المقدمة – إدارة مشاريع تكنولوجيا المعلومات BTEC IT \| أحمد دومي |
| 16 | `rttCQ82X5M4` | الحصة الأولى -ادارة مشاريع أنظمة تكنولوجيا المعلومات - الاستاذ احمد دومي | إدارة مشاريع أنظمة تكنولوجيا المعلومات — الحصة الأولى – إدارة مشاريع تكنولوجيا المعلومات BTEC IT \| أحمد دومي |
| 17 | `se7rDDbFCBg` | الحصة الثانية - ادارة مشاريع أنظمة تكنولوجيا المعلومات - الاستاذ احمد دومي | إدارة مشاريع أنظمة تكنولوجيا المعلومات — الحصة الثانية – إدارة مشاريع تكنولوجيا المعلومات BTEC IT \| أحمد دومي |
| 18 | `HkZ6hQS2r0k` | الحصة الثالثة - ادارة مشاريع أنظمة تكنولوجيا المعلومات - الاستاذ احمد دومي | إدارة مشاريع أنظمة تكنولوجيا المعلومات — الحصة الثالثة – إدارة مشاريع تكنولوجيا المعلومات BTEC IT \| أحمد دومي |
| 19 | `EWNtIquhbW8` | الحصة الرابعة - ادارة مشاريع أنظمة تكنولوجيا المعلومات - الاستاذ احمد دومي | إدارة مشاريع أنظمة تكنولوجيا المعلومات — الحصة الرابعة – إدارة مشاريع تكنولوجيا المعلومات BTEC IT \| أحمد دومي |
| 20 | `flmp7bTBjhc` | مدخل إلى التطبيقات - الصف العاشر - المقدمة. الاستاذ احمد دومي ، منصة اساس التعليمية . | مدخل إلى التطبيقات (الصف العاشر) — المقدمة – مدخل إلى التطبيقات BTEC IT \| أحمد دومي |
| 21 | `a2zEfc3Z2is` | مدخل إلى التطبيقات- الصف العاشر- الحصة الأولى منصة اساس التعليمية - الاستاذ احمد دومي | مدخل إلى التطبيقات (الصف العاشر) — الحصة الأولى – مدخل إلى التطبيقات BTEC IT \| أحمد دومي |
| 22 | `rxf9ZptcFxE` | الحصة الثانية -مدخل إلى التطبيقات - الصف العاشر -منصة اساس التعليمية -الاستاذ احمد دومي | مدخل إلى التطبيقات (الصف العاشر) — الحصة الثانية – مدخل إلى التطبيقات BTEC IT \| أحمد دومي |
| 23 | `QwWOrUDeXUM` | الحصة الثالثة - مدخل إلى التطبيقات - الصف العاشر - منصة اساس التعليمية - الاستاذ احمد دومي | مدخل إلى التطبيقات (الصف العاشر) — الحصة الثالثة – مدخل إلى التطبيقات BTEC IT \| أحمد دومي |
| 24 | `AjVXictrHjU` | المهمة الرسمية - مدخل إلى التطبيقات -الصف العاشر - الاستاذ احمد دومي | المهمة الرسمية في مدخل إلى التطبيقات (الصف العاشر) – مدخل إلى التطبيقات BTEC IT \| أحمد دومي |
| 25 | `-PepVttNazM` | مهمة العاشر برمجة BTEC IT | مهمة الصف العاشر: البرمجة في BTEC IT \| أحمد دومي |
| 26 | `kVPRVk6Fb-0` | أ. أحمد دومي جاهز لتدريس طلاب ال BTEC لمواد تكنولوجيا المعلومات 📡 | تعريف بأحمد دومي ودروس BTEC IT على منصة أساس التعليمية \| أحمد دومي |

> Fix the swapped numbering at the same time: rows 6 and 7 (`1fQ9n-o_G1s` is AI lesson **1**, `KWk2JLTwGUk` is AI lesson **2**).

## 5. Description template (per video)

```
{short answer — 1–2 sentences stating the direct explanation}

📖 الشرح المكتوب مع المصطلحات والمصدر: {https://ahmaddomiedu.com/btec-it/<unit>/<concept>}
🎓 {تأسيس جيل 2009 | تأسيس جيل 2011 | الصف العاشر | التوجيهي} — {الحصة / الوحدة}
📚 الدوسية (PDF): {https://ahmaddomiedu.com/documents/teaching-materials/<file>.pdf}

الفصول:
{chapter list — see §7}

المصطلحات: {عربي — English, …}

أحمد دومي — مدرّس BTEC IT | https://ahmaddomiedu.com
Instagram: https://www.instagram.com/ahmaddomiedu/
```

Every description should link to the **specific concept page**, not only the home page — that is what ties the video to a retrievable written answer.

## 6. Transcript plan

1. Raw auto-captions are already saved privately in `sources/transcripts/raw/` (git-ignored) and cleaned by `scripts/content/normalize-transcript.ts`.
2. For the videos that matter most (the 5 cyber lessons, AI lesson 1, the 3 data lessons, PM lesson 1) **upload corrected Arabic captions** in YouTube Studio (Subtitles → Arabic → edit the auto-generated track). Correct the systematic Levantine mis-hearings first (e.g. the CC track spells «الامن السبراني» for «الأمن السيبراني»).
3. Do **not** paste raw transcripts as site pages. The site turns each lesson into a structured written explanation (short answer, explanation, terminology, why it matters in BTEC, chapters, source) — see `docs/CONTENT_PIPELINE.md`.

## 7. Chapters (ready to paste)

Timings are taken from caption paragraphs and are accurate to about ±30 s; adjust against the video. YouTube requires the first chapter at `00:00`, at least three chapters, and each at least 10 s long.

#### رحلة البيانات: لماذا أصبحت البيانات الهدف الأول في الأمن السيبراني؟
`EJGiUOACZmY` — تأسيس جيل 2009 — الحصة الأولى

```
00:00 لماذا البيانات أهم من الأجهزة؟
02:38 البيانات هي النفط الجديد
03:10 ما المقصود بالبيانات؟
04:44 رحلة البيانات: من الإنشاء إلى الاسترجاع
06:19 حالات البيانات: التخزين والنقل والمعالجة
08:57 على أرض الواقع: هجوم WannaCry
10:37 لماذا يهتم الأمن السيبراني بالبيانات؟
```

#### أنواع الهاكرز ودوافعهم: من يقف خلف الشاشة؟
`WKGvNc6JKPs` — تأسيس جيل 2009 — الحصة الثانية

```
00:00 من هو الهاكر؟ وهل كل الهاكرز مجرمون؟
00:32 القبعة البيضاء (White Hat)
03:10 القبعة السوداء (Black Hat)
04:13 القبعة الرمادية (Grey Hat)
05:15 المبتدئ (Script Kiddie)
05:46 الهاكر المدعوم من دولة
06:18 الهاكر الناشط (Hacktivist)
06:51 على أرض الواقع: Stuxnet
07:55 هل جميع الهاكرز متشابهون؟
```

#### ماذا يستطيع المهاجم أن يفعل عندما يصل إلى جهازك؟
`45CuJDDJcls` — تأسيس جيل 2009 — الحصة الثالثة

```
00:00 برمجيات خبيثة تعمل بصمت
01:02 ماذا يستطيع الهاكر أن يفعل؟
01:33 الوصول إلى الملفات الشخصية
02:06 سرقة كلمات المرور ومراقبة النشاط
03:08 انتحال الهوية
03:40 تشفير البيانات وطلب فدية
04:12 تحويل الجهاز إلى أداة للهجوم
04:43 على أرض الواقع: WannaCry
05:14 هل كل هذه الأفعال تُعدّ هجومًا؟
```

#### الفرق بين التهديد والثغرة والمخاطرة (Threat vs Vulnerability vs Risk)
`qVjvVT-YxEk` — تأسيس جيل 2009 — الحصة الرابعة

```
00:00 مقدمة: لماذا تختلف المفاهيم الثلاثة؟
00:35 ثغرات معروفة لم تُعالَج
01:39 ما هو التهديد (Threat)؟
02:44 ما هي الثغرة (Vulnerability)؟
03:45 ما هي المخاطرة (Risk)؟
04:49 العلاقة بين المفاهيم الثلاثة: مثال الجامعة
05:53 على أرض الواقع: WannaCry
06:23 لماذا تُقيِّم المؤسسات المخاطر؟
07:26 الأسئلة الأربعة لتقييم المخاطر
07:58 مثال: تكلفة إغلاق الثغرة مقابل حجم الخسارة
10:06 الخلط الشائع في الواجبات
10:37 كيف يبدأ خبير الأمن تقريره؟
11:41 ملخص الدوسية
```

#### كيف يتعلم الذكاء الاصطناعي؟ البيانات والخوارزمية والنموذج وتعلّم الآلة
`1fQ9n-o_G1s` — تأسيس جيل 2009 — مبادئ الذكاء الاصطناعي: الحصة الأولى

```
00:00 ما هو الذكاء الاصطناعي؟
01:08 البرمجة التقليدية مقابل الذكاء الاصطناعي
02:41 مراحل تعلّم الذكاء الاصطناعي
04:18 الخوارزمية والنموذج
04:50 تعلّم الآلة (Machine Learning)
05:22 التعلم العميق والشبكات العصبية
06:56 معالجة اللغة الطبيعية (NLP)
07:26 الرؤية الحاسوبية (Computer Vision)
08:30 الأنظمة الخبيرة (Expert Systems)
09:00 الخلاصة
```

#### مفهوم المشروع: الفرق بين المشروع والعمل الروتيني، وأصحاب المصلحة والنطاق والقيود والمخاطر
`zQk-eUIrbM0` — إدارة المشاريع — الحصة الأولى

```
00:00 تعريف المشروع: عمل مؤقت له بداية ونهاية
06:47 المشروع مقابل العمل التشغيلي اليومي
14:14 أصحاب المصلحة (Stakeholders)
24:11 دور مدير المشروع: الموازنة بين الأطراف
25:13 نطاق المشروع وتوسّع النطاق (Scope Creep)
30:05 القيود الثلاثة: الوقت والميزانية والجودة
35:21 المخاطر (Risks)
37:59 المشكلات (Issues) والفرق بينها وبين المخاطر
40:36 خلاصة الحصة
```

## 8. Checklist

- [ ] Rename channel to `Ahmad Domi | أحمد دومي – BTEC IT`
- [ ] Paste the description in §2; website link first
- [ ] Create/merge the five playlists in §3
- [ ] Retitle the 26 videos (§4) and fix the swapped AI lesson numbers
- [ ] Add the per-video description (§5) with a link to its concept page
- [ ] Paste chapters (§7) and correct captions for priority videos (§6)
- [ ] After DNS goes live: confirm every link in the descriptions resolves
