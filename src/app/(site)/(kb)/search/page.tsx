import { PageHeader, Section } from "@/components/kb/Layout";
import { SearchBox } from "@/components/kb/SearchBox";
import { pageMetadata } from "@/lib/seo/metadata";

// Search-result pages carry no unique knowledge and must not compete with the content pages in search engines.
export const metadata = pageMetadata({
  title: "بحث في قاعدة معرفة BTEC IT",
  description: "ابحث بالعربي أو الإنجليزي في وحدات BTEC IT ومفاهيمها ومصطلحاتها وفيديوهاتها.",
  path: "/search",
  noindex: true,
});

export default function SearchPage() {
  return (
    <>
      <PageHeader title="بحث" lead={<p>ابحث بالعربي أو الإنجليزي أو بالاختصارات الشائعة. البحث يجري في متصفحك على فهرس صغير ولا يرسل ما تكتبه إلى أي خدمة.</p>} />
      <Section>
        <SearchBox />
      </Section>
    </>
  );
}
