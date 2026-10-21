"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Char({ c, i, n, progress }: { c: string; i: number; n: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.2, 1]);
  return (
    <span className="relative inline-block" aria-hidden="true">
      <span className="opacity-0">{c}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {c}
      </motion.span>
    </span>
  );
}

/** Each character rises from 20% to full opacity as the paragraph scrolls through the viewport. */
export default function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const words = text.split(" ");
  const n = text.length;
  const starts = words.map((_, i) => words.slice(0, i).reduce((a, w) => a + w.length + 1, 0));
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => {
        const start = starts[wi];
        return (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {[...w].map((c, ci) => (
                <Char key={ci} c={c} i={start + ci} n={n} progress={scrollYProgress} />
              ))}
            </span>
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
