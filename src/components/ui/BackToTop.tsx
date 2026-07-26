"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#top"
      aria-label={label}
      className="fixed bottom-6 end-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lg hover:border-navy hover:text-navy"
    >
      <ArrowUp size={20} aria-hidden="true" />
    </a>
  );
}
