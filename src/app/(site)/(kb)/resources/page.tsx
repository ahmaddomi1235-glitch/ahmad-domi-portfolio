import Link from "next/link";
import { Download } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader, Section } from "@/components/kb/Layout";
import { collectionGraph } from "@/lib/seo/jsonld";
import { seoMeta } from "@/lib/seo/intent";
import { getResources, getUnitById, getUnits } from "@/lib/kb/queries";

export const metadata = seoMeta("/resources");

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "الملفات التعليمية", path: "/resources" },
];

const KIND: Record<string, string> = { booklet: "دوسية تأسيس", "unit-book": "كتاب وحدة", explanation: "ملف شرح", worksheet: "ورقة عمل" };

export default function ResourcesPage() {
  const resources = getResources();
  const units = getUnits();
  return (
    <>
      <JsonLd data={collectionGraph({ path: "/resources", name: "الملفات التعليمية", description: "ملفات PDF من إعداد أحمد دومي", crumbs })} />
      <PageHeader
        crumbs={crumbs}
        title="الملفات التعليمية"
        lead={<p>ملفات PDF أعدّها أحمد دومي لطلبة BTEC IT. هي المصدر الذي تُبنى عليه الصفحات المكتوبة في هذا الموقع، وكل صفحة تذكر الملف والصفحات التي اعتمدت عليها.</p>}
      />
      {units.map((u) => {
        const list = resources.filter((r) => r.unit === u.id);
        if (!list.length) return null;
        return (
          <Section key={u.id} id={u.slug} title={u.title_ar}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {list.map((r) => (
                <li key={r.id} id={r.slug} className="flex scroll-mt-24 flex-col rounded-2xl border border-line bg-white p-5">
                  <p className="text-xs font-semibold text-[#7a5c24]">{KIND[r.kind]}</p>
                  <h3 className="mt-1 font-bold leading-snug">{r.title_ar}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-ink/80">{r.summary}</p>
                  <a
                    href={r.material.filePath}
                    download
                    data-track="resource_download"
                    data-track-id={r.materialId}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
                  >
                    <Download size={14} aria-hidden="true" />
                    تحميل {r.material.fileType} ({r.material.fileSize})
                  </a>
                  <Link href={`/btec-it/${getUnitById(r.unit ?? "")?.slug}`} className="mt-1 inline-flex min-h-11 items-center text-sm text-muted underline decoration-line underline-offset-4 hover:decoration-gold">
                    صفحة الوحدة
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
    </>
  );
}
