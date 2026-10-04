"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  const startAnimation = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{ display: "inline-block" }}
      initial={{ opacity: 0.999 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      onViewportEnter={startAnimation}
    >
      <span aria-hidden="true" dir="ltr" className="tabular-nums">
        {display.toLocaleString("en-US")}
      </span>
    </motion.span>
  );
}
