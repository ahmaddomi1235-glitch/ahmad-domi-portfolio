# One-off patch (Phase 6B): replace the /btec-it-card copy and add /btec-it/private-lessons to the hand-written static pages
# in build_intent_map.py. Idempotent: running it twice changes nothing.
import io, os

p = os.path.join(os.path.dirname(__file__), "build_intent_map.py")
s = io.open(p, encoding="utf-8").read()
lines = s.split("\n")
out = []
done_card = done_lessons = False
for ln in lines:
    if ln.strip().startswith('"/btec-it-card": ("COMMERCIAL"'):
        out.append(
            '        "/btec-it-card": ("COMMERCIAL", "BOFU", "بطاقة BTEC IT", ["بطاقة أحمد دومي التعليمية", "بطاقة BTEC IT سعر", "مراجعة تقارير BTEC"], '
            '"بطاقة BTEC IT التعليمية: 85 دينارًا مع مراجعة التقارير | أحمد دومي", '
            '"بطاقة أحمد دومي التعليمية لـ BTEC IT بسعر 85 دينارًا أردنيًا: شروحات مصوّرة بالعربي ومواد دعم، ومراجعة تقارير الطلاب مشمولة مع البطاقة. أول فيديو مجاني.", '
            '"بطاقة أحمد دومي التعليمية — BTEC IT"),'
        )
        out.append(
            '        "/btec-it/private-lessons": ("COMMERCIAL", "BOFU", "دروس خصوصية BTEC IT", ["مدرس BTEC IT الأردن", "خصوصي BTEC IT", "دروس BTEC IT أونلاين", "BTEC IT private tutor Jordan", "BTEC IT online lessons"], '
            '"دروس خصوصية BTEC IT: أونلاين 25 د.أ ووجاهي 35 د.أ | أحمد دومي", '
            '"دروس خصوصية في BTEC IT مع أحمد دومي، مدرّس BTEC IT في الأردن: أونلاين بـ 25 دينارًا للساعة ووجاهي بـ 35 دينارًا للساعة، بالعربي مع المصطلحات الإنجليزية.", '
            '"دروس خصوصية BTEC IT مع أحمد دومي — أونلاين ووجاهي"),'
        )
        done_card = done_lessons = True
        continue
    if ln.strip().startswith('"/btec-it/private-lessons"'):
        continue  # drop any previous copy (idempotent)
    out.append(ln)
assert done_card
io.open(p, "w", encoding="utf-8", newline="\n").write("\n".join(out))
print("patched")
