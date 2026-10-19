"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Beam from "./Beam";
import { SplitText } from "./Reveal";

const INTRO = 1.25; // matches the CSS curtain

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const beamY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const beamScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: INTRO + d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-28 md:px-10">
      <motion.div style={{ y: beamY, scale: beamScale }} className="pointer-events-none absolute inset-y-0 right-[-18%] w-[95%] md:right-[-6%] md:w-[68%]">
        <Beam className="h-full w-full" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative mx-auto flex min-h-[calc(100svh-9.5rem)] max-w-[1500px] flex-col justify-end">
        <motion.p {...fade(0.1)} className="eyebrow mb-6 text-muted">
          Full-stack developer · Applied ML
        </motion.p>
        <h1 className="display max-w-[16ch] text-[clamp(3.2rem,9.5vw,9.5rem)]">
          <SplitText text="I build software that" immediate delay={INTRO} />{" "}
          <em className="text-accent">
            <SplitText text="shows its reasoning." immediate delay={INTRO + 0.25} />
          </em>
        </h1>
        <motion.p {...fade(0.9)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">
          MCA student at CHRIST in Bengaluru. I build explainable ML systems and real-time web apps, and I came to
          software from physics research.
        </motion.p>
        <motion.div {...fade(1.05)} className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#work" className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent">
            See selected work
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
          <a href="#contact" className="link-draw px-1 py-2 text-lg">Get in touch</a>
        </motion.div>
      </motion.div>

      <motion.dl
        {...fade(1.2)}
        className="relative mx-auto mt-12 grid max-w-[1500px] grid-cols-2 gap-6 border-t border-line pt-5 md:grid-cols-4"
      >
        {[
          ["Based in", "Bengaluru, India"],
          ["Studying", "MCA · CHRIST · 2026–28"],
          ["Before", "B.Sc. Physics (Hons.)"],
          ["Recent", "Top 50 · Hack Devengers 2.0"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="eyebrow text-muted">{k}</dt>
            <dd className="mt-1">{v}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
