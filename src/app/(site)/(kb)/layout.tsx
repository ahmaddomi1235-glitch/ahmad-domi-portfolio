import { SiteHeader } from "@/components/kb/SiteHeader";
import { SiteFooter } from "@/components/kb/SiteFooter";

/** Shell for the knowledge-base pages (entity home, BTEC IT hub, calculator, card, videos, resources, search). */
export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
