import Link from "next/link";
import { accounts, brand } from "@/config/site";
import { getUnits } from "@/lib/kb/queries";

export function SiteFooter() {
  const units = getUnits();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 bg-navy text-ivory">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold">
            {brand.nameAr} · <bdi lang="en" dir="ltr">{brand.nameEn}</bdi>
          </p>
          <p className="mt-1 text-sm text-ivory/70">{brand.jobTitleAr} — الأردن</p>
          <p className="mt-3 text-sm leading-7 text-ivory/70">
            شرح وحدات BTEC IT بالعربي مع المصطلحات الإنجليزية. الشرح هنا شرح أحمد دومي، وليس نصًّا رسميًّا من Pearson.
          </p>
        </div>

        <nav aria-label="وحدات BTEC IT">
          <p className="mb-3 text-sm font-semibold text-gold">وحدات BTEC IT</p>
          <ul className="space-y-2 text-sm">
            {units.map((u) => (
              <li key={u.id}>
                <Link href={`/btec-it/${u.slug}`} className="text-ivory/80 hover:text-gold">
                  {u.title_ar}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="موارد">
          <p className="mb-3 text-sm font-semibold text-gold">موارد</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/btec-it/questions" className="text-ivory/80 hover:text-gold">أسئلة وأجوبة</Link></li>
            <li><Link href="/btec-it/glossary" className="text-ivory/80 hover:text-gold">مصطلحات عربي — English</Link></li>
            <li><Link href="/videos" className="text-ivory/80 hover:text-gold">الفيديوهات</Link></li>
            <li><Link href="/resources" className="text-ivory/80 hover:text-gold">الملفات التعليمية</Link></li>
            <li><Link href="/btec-calculator" className="text-ivory/80 hover:text-gold">حاسبة المعدل</Link></li>
            <li><Link href="/btec-it-card" className="text-ivory/80 hover:text-gold">بطاقة BTEC IT</Link></li>
            <li><Link href="/about" className="text-ivory/80 hover:text-gold">عن أحمد دومي</Link></li>
          </ul>
        </nav>

        <nav aria-label="الحسابات الرسمية">
          <p className="mb-3 text-sm font-semibold text-gold">الحسابات الرسمية</p>
          <ul className="space-y-2 text-sm">
            <li><a href={accounts.youtube} rel="me noopener noreferrer" target="_blank" className="text-ivory/80 hover:text-gold">YouTube — @AhmadDomiedu</a></li>
            <li><a href={accounts.instagram} rel="me noopener noreferrer" target="_blank" className="text-ivory/80 hover:text-gold">Instagram — @ahmaddomiedu</a></li>
            <li><a href={accounts.github} rel="me noopener noreferrer" target="_blank" className="text-ivory/80 hover:text-gold">GitHub</a></li>
            <li><a href={accounts.linkedin} rel="me noopener noreferrer" target="_blank" className="text-ivory/80 hover:text-gold">LinkedIn</a></li>
            <li><Link href="/en" className="text-ivory/80 hover:text-gold">English profile</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-ivory/15">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 text-xs text-ivory/60 sm:px-8">
          © {year} {brand.nameAr} · <bdi lang="en" dir="ltr">{brand.nameEn}</bdi>. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
