/** English portfolio subtree: same static root layout, with language and direction declared on the wrapper. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" dir="ltr" className="flex min-h-full flex-1 flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {children}
    </div>
  );
}
