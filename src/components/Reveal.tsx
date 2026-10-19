"use client";
import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

/* ── Motion tokens: every component below pulls from these so timing stays consistent. ── */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.25, base: 0.7, slow: 0.95 } as const;
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fade + rise on scroll-in. Plays once. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Words rise out of a mask, staggered. `immediate` plays on mount instead of on scroll. */
export function SplitText({
  text,
  className,
  delay = 0,
  immediate = false,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const words = text.split(" ");
  const M = motion[Tag];
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <M
      className={className}
      aria-label={text}
      initial="hide"
      {...trigger}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hide: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: DUR.slow + 0.05, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** Parent that staggers its <StaggerItem> children in once, when scrolled into view. */
export function Stagger({
  children,
  className,
  gap = 0.07,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial="hide"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hide: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  children,
  className,
  y = 14,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      variants={{ hide: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } } }}
    >
      {children}
    </M>
  );
}

/** A hairline that draws in from the left. */
export function DrawLine({ className = "bg-line", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE, delay }}
    />
  );
}

/** Timeline marker that fills as its entry scrolls into view. */
export function TimelineDot({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      initial={{ backgroundColor: "rgba(0,0,0,0)", scale: 0.8 }}
      whileInView={{ backgroundColor: "#14130f", scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -30% 0px" }}
      transition={{ duration: DUR.base, ease: EASE }}
    />
  );
}

const parse = (v: string) => {
  const m = v.match(/^(\D*)([\d,]*\.?\d+)(\D*)$/);
  if (!m) return null;
  const decimals = (m[2].split(".")[1] ?? "").length;
  return { pre: m[1], suf: m[3], decimals, comma: m[2].includes(","), target: parseFloat(m[2].replace(/,/g, "")) };
};
const fmt = (n: number, p: NonNullable<ReturnType<typeof parse>>) =>
    p.pre + n.toLocaleString("en-US", { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals, useGrouping: p.comma }) + p.suf;


/** Counts a numeric string up to its final value ("86.78%", "4,424", "0.9251"). The DOM text is written
 *  directly, so there are no React re-renders; the server-rendered text is the final value. */
export function CountUp({ value, delay = 0, className }: { value: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  // Start from zero as soon as hydrated so the final value never flashes before counting.
  useEffect(() => {
    const p = parse(value);
    if (reduce || !p || !ref.current) return;
    ref.current.textContent = fmt(0, p);
  }, [value, reduce]);

  useEffect(() => {
    const p = parse(value);
    if (!inView || reduce || !p || !ref.current) return;
    const el = ref.current;
    const c = animate(0, p.target, {
      duration: 1.5,
      delay,
      ease: EASE,
      onUpdate: (n) => (el.textContent = fmt(n, p)),
      onComplete: () => (el.textContent = value),
    });
    return () => c.stop();
  }, [inView, reduce, value, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/** Numbered section header: hairline draws in, number and label slide in, title reveals through a mask. */
export function SectionHeader({
  n,
  label,
  title,
  dark = false,
}: {
  n: string;
  label: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <header>
      <DrawLine className={dark ? "bg-line-dark" : "bg-line"} />
      <div className="mt-8 grid gap-8 md:grid-cols-12">
        <Reveal y={10} className="md:col-span-3">
          <p className={`eyebrow ${dark ? "text-accent-bright" : "text-accent"}`}>
            {n} — {label}
          </p>
        </Reveal>
        <h2 className="display text-[clamp(2.2rem,5.2vw,5rem)] md:col-span-9">
          <SplitText text={title} />
        </h2>
      </div>
    </header>
  );
}
