import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthorCard } from "@/components/kb/AuthorCard";
import { PageHeader, Section } from "@/components/kb/Layout";
import { Calculator } from "@/components/calculator/Calculator";
import { calculatorGraph } from "@/lib/seo/jsonld";
import { seoMeta } from "@/lib/seo/intent";
import { getTool } from "@/lib/kb/queries";

export const metadata = seoMeta("/btec-calculator");

const crumbs = [
  { name: "الرئيسية", path: "/" },
  { name: "حاسبة المعدل", path: "/btec-calculator" },
];

export default function CalculatorPage() {
  const tool = getTool("btec-calculator")!;
  return (
    <>
      <JsonLd data={calculatorGraph(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="حاسبة معدل BTEC (مسار التوجيهي الأردني)"
        titleEn="BTEC Grade Calculator — Jordan Tawjihi"
        lead={
          <p>
            اختر المرحلة والتخصص وحدّد نتيجة كل مادة (U أو P أو M أو D) لتحصل على معدل التخصص من 35. أضف المواد المشتركة لتحصل على المعدل من 65، أو استخدم «المعدل الكامل» لجمع الأول ثانوي والتوجيهي والمواد المشتركة من 100.
          </p>
        }
      />

      <Section id="calculator">
        <Calculator />
        <noscript>
          <p className="mt-4 rounded-xl border border-line bg-white p-4">تحتاج الحاسبة إلى تفعيل JavaScript. الصيغة موضّحة أدناه إن أردت الحساب يدويًا.</p>
        </noscript>
      </Section>

      <Section title="كيف يُحسب المعدل؟" id="method" className="pt-0">
        <div className="kb-prose">
          <p>هذه هي الخطوات التي تنفّذها الحاسبة بالضبط (منقولة من الحاسبة الأصلية دون تعديل):</p>
          <ol>
            <li>
              كل نتيجة تُحوَّل إلى قيمة: <strong dir="ltr">U = 0</strong>، <strong dir="ltr">P = 60</strong>، <strong dir="ltr">M = 80</strong>، <strong dir="ltr">D = 100</strong>.
            </li>
            <li>نقاط كل مادة = القيمة × ساعاتها المعتمدة. معدل التخصص من 100 = مجموع النقاط ÷ مجموع الساعات.</li>
            <li>معدل التخصص من 35 = (معدل التخصص من 100 ÷ 100) × 35.</li>
            <li>
              المواد المشتركة من 30 = العربية (÷100 × 10) + الإنجليزية (÷100 × 10) + التربية الإسلامية (÷60 × 6) + تاريخ الأردن (÷40 × 4).
            </li>
            <li>المعدل مع المشتركة = معدل التخصص من 35 + المشتركة من 30 (من 65). المعدل الكامل = الأول ثانوي من 35 + التوجيهي من 35 + المشتركة من 30 (من 100).</li>
          </ol>
        </div>
        <aside className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-5 leading-8">
          <p className="font-semibold">مصدر القواعد وحدودها</p>
          <p className="mt-1">
            هذه القواعد (قيم U/P/M/D، الساعات المعتمدة لكل مادة، أوزان المواد المشتركة) هي بيانات الحاسبة الأصلية التي طوّرها أحمد دومي لطلبة BTEC في الأردن، وهي{" "}
            <strong>ليست</strong> معادلة تصنيف عالمية من Pearson. المستودع الأصلي لا يوثّق الجهة الرسمية التي اعتُمدت منها هذه القيم، لذلك نعدّها «مصدر القواعد قيد التأكيد». ارجع دائمًا إلى معلّمك أو إلى التعليمات الرسمية قبل الاعتماد على الرقم في قرار مهم.
          </p>
          <p className="mt-2 text-sm text-muted">
            الكود الأصلي: <a href="https://github.com/ahmaddomi1235-glitch/asasbtec" rel="noopener noreferrer" target="_blank" className="underline decoration-gold underline-offset-4">github.com/ahmaddomi1235-glitch/asasbtec</a> · النسخة الأصلية من الحاسبة:{" "}
            <a href="https://asasbtec.vercel.app/" rel="noopener noreferrer" target="_blank" className="underline decoration-gold underline-offset-4">asasbtec.vercel.app</a>
          </p>
        </aside>
      </Section>

      <Section title="موارد ذات صلة" id="related" className="pt-0">
        <ul className="list-disc space-y-2 ps-6 leading-8">
          <li>
            <Link href="/btec-it" className="text-navy underline decoration-gold underline-offset-4">قاعدة معرفة BTEC IT</Link> — شرح الوحدات بالعربي.
          </li>
          <li>
            <Link href="/btec-it/glossary" className="text-navy underline decoration-gold underline-offset-4">المصطلحات</Link> — عربي ↔ English.
          </li>
        </ul>
      </Section>

      <Section id="author" className="pt-0">
        <AuthorCard lastReviewed={tool.lastReviewed} sources={tool.sourceReferences} />
      </Section>
    </>
  );
}
