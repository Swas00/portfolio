"use client";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Real feature-importance figures from the DropoutGuard README. */
export function ImportanceDiagram() {
  const reduce = useReducedMotion();
  const rows = [
    ["Curricular backlogs", 40.5],
    ["Current GPA", 22.8],
    ["Previous GPA", 12.2],
    ["Attendance & tuition", 9.4],
  ] as const;
  return (
    <figure className="border border-line-dark bg-ink-2 p-6 md:p-8">
      <figcaption className="eyebrow mb-6 flex justify-between text-muted-dark">
        <span>Why was this student flagged?</span>
        <span>RF feature importance, %</span>
      </figcaption>
      <ul className="space-y-5">
        {rows.map(([label, v], i) => (
          <li key={label}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span>{label}</span>
              <span className="font-mono text-accent-bright">{v}</span>
            </div>
            <div className="h-2 bg-line-dark">
              <motion.div
                className="h-full bg-accent-bright"
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${(v / 40.5) * 100}%` }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.2, ease, delay: i * 0.12 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="eyebrow mt-7 text-muted-dark">Diagram of figures from the project README. Not a screenshot.</p>
    </figure>
  );
}

/** Illustrates the 409 flow. Not a screenshot of the app. */
function Step({ i, children }: { i: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className="border border-line-dark p-4"
      initial={reduce ? false : { opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.7, ease, delay: i * 0.18 }}
    >
      {children}
    </motion.li>
  );
}

export function ConflictDiagram() {
  return (
    <figure className="border border-line-dark bg-ink-2 p-6 md:p-8">
      <figcaption className="eyebrow mb-6 text-muted-dark">Two people edit task #12</figcaption>
      <ol className="space-y-3 font-mono text-sm">
        <Step i={0}>
          <span className="text-muted-dark">Ana and Raj both load</span> <span className="text-paper">v3</span>
        </Step>
        <Step i={1}>
          <span className="text-muted-dark">Ana saves</span> → <span className="text-paper">v4</span>
          <span className="float-right text-muted-dark">200 OK</span>
        </Step>
        <Step i={2}>
          <span className="text-muted-dark">Raj saves, still on v3</span>
          <span className="float-right font-semibold text-accent-bright">409 Conflict</span>
        </Step>
        <Step i={3}>
          <div className="text-muted-dark">Diff dialog opens</div>
          <div className="mt-2 flex gap-2 text-xs">
            <span className="border border-line-dark px-2 py-1">Discard &amp; load server version</span>
            <span className="border border-accent-bright px-2 py-1 text-accent-bright">Force overwrite</span>
          </div>
        </Step>
      </ol>
      <p className="eyebrow mt-7 text-muted-dark">Illustration of the documented flow. Not a screenshot.</p>
    </figure>
  );
}
