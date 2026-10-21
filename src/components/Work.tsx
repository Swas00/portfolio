"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { projects, type Project } from "@/data/projects";
import FadeIn from "./FadeIn";
import { GhostButton } from "./Buttons";
import { CountUp } from "./Reveal";
import { ConflictDiagram, ImportanceDiagram } from "./Diagrams";
import Decor, { type DecorKind } from "./Decor";

const radius = "rounded-[32px] sm:rounded-[44px] md:rounded-[56px]";
const panel = `${radius} border border-[#D7E2EA]/15 bg-[#141414] p-6 sm:p-8`;
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function Card({ p, i, n, progress }: { p: Project; i: number; n: number; progress: MotionValue<number> }) {
  const target = 1 - (n - 1 - i) * 0.03;
  const scale = useTransform(progress, [i / n, 1], [1, target]);
  const num = String(i + 1).padStart(2, "0");

  return (
    <div className="stack-wrap">
      <div className="stack-sticky" style={{ "--top": `calc(6rem + ${i * 28}px)` } as React.CSSProperties}>
        <motion.article
          style={{ scale, transformOrigin: "top center" }}
          className={`stack-card ${radius} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`}
        >
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
            <div className="flex items-start gap-4 sm:gap-8">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">{num}</span>
              <div className="pt-1 sm:pt-3">
                <p className="eyebrow text-muted">{p.featured ? "Featured · Case study" : "Also built"} · {p.year}</p>
                <h3 className="mt-1 text-[clamp(1.4rem,3vw,2.6rem)] font-medium uppercase leading-tight">{p.name}</h3>
                <p className="mt-1 max-w-md font-light text-[#D7E2EA]/80">{p.tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {p.caseStudy && (
                <GhostButton href={`/work/${p.slug}`} className="group">
                  Case study <Arrow />
                </GhostButton>
              )}
              <GhostButton href={p.repo} target="_blank" rel="noopener noreferrer">
                Source <Arrow />
              </GhostButton>
              {p.live && (
                <GhostButton href={p.live} target="_blank" rel="noopener noreferrer">
                  Live demo <Arrow />
                </GhostButton>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-[40%_60%] md:gap-4">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className={panel}>
                <p className="eyebrow mb-3 text-muted">Summary</p>
                <p className="font-light leading-relaxed">{p.summary}</p>
              </div>
              {p.facts.length > 0 ? (
                <dl className={`${panel} flex flex-wrap gap-x-8 gap-y-5`}>
                  {p.facts.map((f, k) => (
                    <div key={f.label}>
                      <dd className="hero-heading text-[clamp(1.3rem,2.2vw,2.2rem)] font-black leading-none">
                        {f.count ? <CountUp value={f.value} delay={0.2 + k * 0.3} /> : f.value}
                      </dd>
                      <dt className="eyebrow mt-2 text-muted">{f.label}</dt>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className={panel}>
                  <p className="eyebrow mb-2 text-muted">Year</p>
                  <p className="hero-heading text-[clamp(2.4rem,5vw,4.5rem)] font-black leading-none">{p.year}</p>
                </div>
              )}
            </div>

            {p.slug === "dropoutguard-ai" ? (
              <div className="flex flex-col gap-3 md:gap-4">
                <ImportanceDiagram className={`${radius} !p-6 sm:!p-8`} />
                <StackPanel p={p} />
              </div>
            ) : p.slug === "letscollab" ? (
              <div className="flex flex-col gap-3 md:gap-4">
                <ConflictDiagram className={`${radius} !p-6 sm:!p-8`} />
                <StackPanel p={p} />
              </div>
            ) : (
              <StackPanel p={p} tall decor={decor[i % decor.length]} />
            )}
          </div>
        </motion.article>
      </div>
    </div>
  );
}

const decor: DecorKind[] = ["sphere", "torus", "cube", "orb"];

function StackPanel({ p, tall = false, decor: d }: { p: Project; tall?: boolean; decor?: DecorKind }) {
  return (
    <div className={`${panel} ${tall ? "relative min-h-[260px] overflow-hidden md:min-h-[320px]" : ""}`}>
      {tall && d && <Decor kind={d} className="pointer-events-none absolute -bottom-6 -right-4 w-44 sm:w-56 md:w-64" />}
      <p className="eyebrow mb-4 text-muted">Stack</p>
      <ul className="relative flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="eyebrow rounded-full border border-[#D7E2EA]/25 px-4 py-1.5 text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section
      id="work"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn as="h2" y={40} className="section-heading hero-heading mb-6">
        Work
      </FadeIn>
      <FadeIn as="p" delay={0.1} className="mx-auto mb-16 max-w-2xl text-center text-[clamp(1rem,2vw,1.5rem)] font-light text-[#D7E2EA]/80 sm:mb-20 md:mb-28">
        Two systems built around a hard question, plus a few smaller projects.
      </FadeIn>
      <div ref={ref} className="mx-auto flex max-w-[1500px] flex-col gap-6">
        {projects.map((p, i) => (
          <Card key={p.slug} p={p} i={i} n={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
