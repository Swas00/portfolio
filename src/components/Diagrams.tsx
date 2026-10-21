"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { DUR, EASE, VIEWPORT } from "./Reveal";

/** Real feature-importance figures from the DropoutGuard README. Bars grow from zero to the documented values. */
export function ImportanceDiagram({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const rows = [
    ["Curricular backlogs", 40.5],
    ["Current GPA", 22.8],
    ["Previous GPA", 12.2],
    ["Attendance & tuition", 9.4],
  ] as const;
  const MAX = 45; // axis runs 0–45 so the longest bar leaves headroom for its value
  const ticks = [0, 10, 20, 30, 40];

  return (
    <figure className={`border border-line-dark bg-ink-2 p-6 md:p-8 ${className}`}>
      <figcaption className="eyebrow mb-6 flex justify-between gap-4 text-muted-dark">
        <span>Why was this student flagged?</span>
        <span>Random Forest feature importance (%)</span>
      </figcaption>

      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 right-0">
          {ticks.map((t) => (
            <span key={t} className="absolute inset-y-0 w-px bg-line-dark" style={{ left: `${(t / MAX) * 100}%` }} />
          ))}
        </div>
        <ul className="relative space-y-5" onMouseLeave={() => setActive(null)}>
          {rows.map(([label, v], i) => (
            <li
              key={label}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`rounded-sm outline-offset-4 transition-opacity duration-300 ${active !== null && active !== i ? "opacity-45" : ""}`}
            >
              <div className="mb-1.5 flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-mono text-accent-bright">{v}</span>
              </div>
              <div className="h-2 bg-line-dark">
                <motion.div
                  className={`h-full origin-left transition-colors duration-300 ${active === i ? "bg-paper" : "bg-accent-bright"}`}
                  style={{ width: `${(v / MAX) * 100}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.5 + i * 0.12 }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden="true" className="relative mt-3 h-4 font-mono text-[0.65rem] text-muted-dark">
        {ticks.map((t) => (
          <span key={t} className="absolute -translate-x-1/2 first:translate-x-0" style={{ left: `${(t / MAX) * 100}%` }}>{t}</span>
        ))}
      </div>
      <p className="eyebrow mt-6 text-muted-dark">Diagram based on figures from the project README. Not a screenshot.</p>
    </figure>
  );
}

const steps = [
  { id: 1, body: <><span className="text-muted-dark">Ana and Raj both load</span> <span className="text-paper">v3</span></> },
  { id: 2, body: <><span className="text-muted-dark">Ana saves</span> → <span className="text-paper">v4</span></>, tag: "200 OK" },
  { id: 3, body: <span className="text-muted-dark">Raj saves, still on v3</span>, tag: "409 Conflict", hot: true },
  {
    id: 4,
    body: (
      <>
        <div className="text-muted-dark">Diff dialog opens</div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="border border-line-dark px-2 py-1">Discard &amp; load server version</span>
          <span className="border border-accent-bright px-2 py-1 text-accent-bright">Force overwrite</span>
        </div>
      </>
    ),
  },
] as const;

/** Illustrates the 409 flow. Steps light up in order along a connector line. Readable without animation. */
export function ConflictDiagram({ className = "" }: { className?: string }) {
  const at = (i: number) => 0.3 + i * 0.55;
  return (
    <figure className={`border border-line-dark bg-ink-2 p-6 md:p-8 ${className}`}>
      <figcaption className="eyebrow mb-6 text-muted-dark">Two people edit task #12</figcaption>
      <ol className="relative space-y-3 pl-9 font-mono text-sm">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-4 left-[9px] top-4 w-px origin-top bg-line-dark"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.3 + steps.length * 0.55, ease: "linear" }}
        />
        {steps.map((s, i) => {
          const hot = "hot" in s && s.hot;
          return (
            <li key={s.id} className="relative">
              <motion.span
                aria-hidden="true"
                className={`absolute -left-9 top-4 grid size-5 place-items-center rounded-full border text-[0.6rem] ${hot ? "border-accent-bright text-accent-bright" : "border-line-dark text-muted-dark"} bg-ink-2`}
                initial={{ scale: 0.7 }}
                whileInView={{ scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.fast, ease: EASE, delay: at(i) }}
              >
                {s.id}
              </motion.span>
              <motion.div
                className={`border p-4 ${hot ? "border-accent-bright/60" : "border-line-dark"}`}
                initial={{ opacity: 0.2, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.base, ease: EASE, delay: at(i) }}
              >
                {s.body}
                {"tag" in s && (
                  <span className={`float-right ${hot ? "font-semibold text-accent-bright" : "text-muted-dark"}`}>{s.tag}</span>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>
      <p className="eyebrow mt-7 text-muted-dark">Illustration of the documented flow. Not a screenshot.</p>
    </figure>
  );
}
