import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/kb/SiteHeader";
import { SiteFooter } from "@/components/kb/SiteFooter";
import { getUnits } from "@/lib/kb/queries";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: true },
};

/** Useful 404: explains what happened and routes the visitor to the real content (no blanket redirect to home). */
export default function NotFound() {
  const units = getUnits();
  return (
    <>
      <a href="#main-content" className="skip-link">
        تخطَّ إلى المحتوى الرئيسي
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
          <p className="text-sm font-semibold text-[#7a5c24]">خطأ 404</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">لم نجد هذه الصفحة</h1>
          <p className="mt-4 text-lg leading-9 text-ink/85">
            قد يكون الرابط قديمًا أو مكتوبًا بشكل خاطئ. لا ننشر صفحة إلا عندما يتوفر لها مصدر موثّق، فربما لم تُنشر هذه الصفحة بعد.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/search" className="inline-flex min-h-[44px] items-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-ivory hover:bg-navy-surface">
              ابحث في قاعدة المعرفة
            </Link>
            <Link href="/btec-it" className="inline-flex min-h-[44px] items-center rounded-full border border-line px-6 py-3 text-sm font-semibold hover:border-navy">
              تصفّح وحدات BTEC IT
            </Link>
            <Link href="/" className="inline-flex min-h-[44px] items-center rounded-full border border-line px-6 py-3 text-sm font-semibold hover:border-navy">
              الصفحة الرئيسية
            </Link>
          </div>
          <h2 className="mb-3 mt-12 text-xl font-bold">الوحدات المنشورة</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {units.map((u) => (
              <li key={u.id}>
                <Link href={`/btec-it/${u.slug}`} className="block rounded-xl border border-line bg-white p-4 hover:border-navy">
                  {u.title_ar}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
