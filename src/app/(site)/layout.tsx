export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        تخطَّ إلى المحتوى الرئيسي
      </a>
      {children}
    </>
  );
}
