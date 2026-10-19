"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { featured, others, type Project } from "@/data/projects";
import { Reveal, SplitText } from "./Reveal";
import { ImportanceDiagram, ConflictDiagram } from "./Diagrams";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1.5 py-1">
      {children} <Arrow />
    </a>
  );
}

function Featured({ p, flip, index }: { p: Project; flip: boolean; index: number }) {
  return (
    <article className="grid items-center gap-10 py-20 md:grid-cols-12 md:gap-14 md:py-28">
      <div className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
        <Reveal>
          <p className="eyebrow text-accent-bright">0{index + 1} — {p.year}</p>
          <h3 className="display mt-4 text-[clamp(2.6rem,6vw,5.5rem)]">{p.name}</h3>
          <p className="mt-5 text-xl text-paper/90">{p.tagline}</p>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-dark">{p.summary}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-line-dark py-5">
            {p.facts.map((f) => (
              <div key={f.label}>
                <dd className="display text-3xl">{f.value}</dd>
                <dt className="eyebrow mt-1 text-muted-dark">{f.label}</dt>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="eyebrow border border-line-dark px-2.5 py-1 text-muted-dark">{s}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
            <Link href={`/work/${p.slug}`} data-cursor="Read" className="inline-flex items-center gap-2 bg-paper px-5 py-3 text-ink transition-colors hover:bg-accent-bright">
              Case study <Arrow />
            </Link>
            <ExtLink href={p.repo}>Source</ExtLink>
            {p.live && <ExtLink href={p.live}>Live demo</ExtLink>}
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.15} className={`md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : ""}`}>
        {p.slug === "dropoutguard-ai" ? <ImportanceDiagram /> : <ConflictDiagram />}
      </Reveal>
    </article>
  );
}

function OtherList() {
  const [open, setOpen] = useState<string | null>(others[0]?.slug ?? null);
  const reduce = useReducedMotion();
  return (
    <ul className="border-t border-line-dark">
      {others.map((p) => {
        const isOpen = open === p.slug;
        return (
          <li key={p.slug} className="border-b border-line-dark" onMouseEnter={() => setOpen(p.slug)}>
            <button
              onClick={() => setOpen(isOpen ? null : p.slug)}
              aria-expanded={isOpen}
              className="flex w-full items-baseline justify-between gap-6 py-6 text-left"
            >
              <span className={`display text-4xl transition-colors duration-300 md:text-6xl ${isOpen ? "text-accent-bright" : "text-paper"}`}>{p.name}</span>
              <span className="eyebrow hidden text-muted-dark md:block">{p.stack.slice(0, 3).join(" · ")}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pb-8 md:grid-cols-12">
                    <p className="max-w-xl leading-relaxed text-paper/90 md:col-span-6 md:col-start-1">{p.summary}</p>
                    <div className="flex flex-wrap content-start gap-x-7 gap-y-2 md:col-span-6 md:justify-end">
                      <ExtLink href={p.repo}>Source</ExtLink>
                      {p.live && <ExtLink href={p.live}>Live demo</ExtLink>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export default function Work() {
  return (
    <section id="work" className="on-dark bg-ink px-5 py-24 text-paper md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow text-accent-bright md:col-span-3">02 — Selected work</p>
          <h2 className="display text-[clamp(2.2rem,5.2vw,5rem)] md:col-span-9">
            <SplitText text="Two systems built around a hard question, plus a few smaller builds." />
          </h2>
        </div>
        <div className="mt-8 divide-y divide-line-dark md:mt-16">
          {featured.map((p, i) => (
            <Featured key={p.slug} p={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
        <div className="mt-16 md:mt-24">
          <h3 className="eyebrow mb-6 text-muted-dark">Also built</h3>
          <OtherList />
        </div>
      </div>
    </section>
  );
}
