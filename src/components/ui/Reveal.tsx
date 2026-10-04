"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  /** Render as the list item itself (inside <ol>/<ul>) so list semantics stay valid. */
  as?: "div" | "li";
}) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
