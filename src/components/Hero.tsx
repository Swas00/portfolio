"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Beam from "./Beam";
import { DUR, EASE, SplitText } from "./Reveal";

const meta = [
  ["Based in", "Bengaluru, India"],
  ["Studying", "MCA · CHRIST · 2026–28"],
  ["Before", "B.Sc. Physics (Hons.)"],
  ["Recent", "Top 50 · Hack Devengers 2.0"],
] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const beamY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 70]);

  // One shared entrance: starts immediately, finishes in about 1.6s. The headline is readable from the first frame.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.base, delay, ease: EASE },
  });

  return (
    <section id="top" ref={ref} className="relative flex min-h-[max(100svh,640px)] flex-col overflow-hidden px-5 pb-8 pt-24 md:px-10">
      <motion.div
        data-bg
        style={{ y: beamY }}
        className="pointer-events-none absolute inset-y-0 right-[-18%] w-[95%] md:right-[-6%] md:w-[68%]"
      >
        <Beam className="h-full w-full" />
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-center py-6">
        <SplitText text="Full-stack developer · Applied ML" immediate delay={0.05} className="eyebrow mb-5 block text-muted" />
        <h1 className="display max-w-[16ch] text-[clamp(3rem,min(9.5vw,16vh),9.5rem)]">
          <SplitText text="I build software that" immediate delay={0.15} />{" "}
          <em className="text-accent">
            <SplitText text="shows its reasoning." immediate delay={0.4} />
          </em>
        </h1>
        {/* thin underline that draws beneath the headline */}
        <motion.span
          aria-hidden="true"
          className="mt-3 block h-px w-[min(34rem,70%)] origin-left bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
        />
        <motion.p {...rise(0.75)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">
          MCA student at CHRIST in Bengaluru. I build explainable ML systems and real-time web apps, and I came to
          software from physics research.
        </motion.p>
        <motion.div {...rise(0.9)} className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-paper transition-[background-color,transform] duration-200 hover:bg-accent active:translate-y-px"
          >
            See selected work
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
          <a href="#contact" className="link-draw px-1 py-2 text-lg">Get in touch</a>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-4 flex w-full max-w-[1500px] items-end justify-between gap-8 border-t border-line pt-5">
        <motion.dl
          className="grid flex-1 grid-cols-2 gap-6 md:grid-cols-4"
          initial="hide"
          animate="show"
          variants={{ hide: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.05 } } }}
        >
          {meta.map(([k, v]) => (
            <motion.div key={k} variants={{ hide: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } } }}>
              <dt className="eyebrow text-muted">{k}</dt>
              <dd className="mt-1">{v}</dd>
            </motion.div>
          ))}
        </motion.dl>
        <motion.a
          {...rise(1.5)}
          href="#about"
          className="eyebrow group hidden shrink-0 items-center gap-3 text-muted transition-colors hover:text-ink md:inline-flex"
        >
          Scroll
          <span aria-hidden="true" className="relative block h-8 w-px bg-line">
            <span className="absolute inset-x-0 top-0 h-3 bg-ink transition-transform duration-500 group-hover:translate-y-5" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
