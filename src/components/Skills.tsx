import { skillGroups } from "@/data/profile";
import { Reveal, SplitText } from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow text-accent md:col-span-3">03 — Skills</p>
          <h2 className="display text-[clamp(2.2rem,5.2vw,5rem)] md:col-span-9">
            <SplitText text="What I’ve shipped with, and what I’m learning next." />
          </h2>
        </div>
        <dl className="mt-16 border-t border-line">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04}>
              <div className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-8">
                <dt className="display text-3xl md:col-span-3">{g.title}</dt>
                <dd className="md:col-span-9">
                  <p className="text-xl leading-snug md:text-2xl">{g.used.join("  ·  ")}</p>
                  {"exploring" in g && (
                    <p className="mt-3 text-muted">
                      <span className="eyebrow mr-3 text-accent">Exploring</span>
                      {g.exploring.join(", ")}
                    </p>
                  )}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <p className="eyebrow mt-6 text-muted">Listed means used in a project or role on this site.</p>
      </div>
    </section>
  );
}
