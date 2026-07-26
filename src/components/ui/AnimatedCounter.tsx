"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  value,
  durationMs = 1500,
  className,
  ariaLabel,
}: {
  value: number;
  durationMs?: number;
  className?: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, shouldReduceMotion, value, durationMs]);

  const shown = shouldReduceMotion ? value : isInView ? display : 0;

  return (
    <span ref={ref} className={className} aria-label={ariaLabel}>
      <span aria-hidden="true" dir="ltr" className="tabular-nums">
        {shown.toLocaleString("en-US")}
      </span>
    </span>
  );
}
