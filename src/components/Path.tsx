import { experience, education, certifications, achievements } from "@/data/profile";
import { Reveal, SplitText } from "./Reveal";

export default function Path() {
  return (
    <section id="path" className="bg-paper-2 px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow text-accent md:col-span-3">04 — Path</p>
          <h2 className="display text-[clamp(2.2rem,5.2vw,5rem)] md:col-span-9">
            <SplitText text="From accelerator physics to full-stack." />
          </h2>
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="eyebrow mb-6 text-muted">Experience</h3>
            <ol className="relative ml-2 border-l border-ink/30 pl-8">
              {experience.map((e) => (
                <li key={e.period} className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[2.45rem] top-2 size-3 rounded-full border-2 border-ink bg-paper-2" aria-hidden="true" />
                  <Reveal>
                    <p className="eyebrow text-accent">{e.period}</p>
                    <h4 className="display mt-2 text-4xl">{e.title}</h4>
                    <p className="text-muted">{e.org}</p>
                    <ul className="mt-4 space-y-2 leading-relaxed">
                      {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>

            <h3 className="eyebrow mb-6 mt-20 text-muted">Recognition</h3>
            <ul className="divide-y divide-line border-y border-line">
              {achievements.map((a) => (
                <li key={a.name} className="grid gap-1 py-4 md:grid-cols-[1fr_auto]">
                  <span><strong className="font-medium">{a.name}</strong> <span className="text-muted">— {a.detail}</span></span>
                  <span className="eyebrow text-muted">{a.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h3 className="eyebrow mb-6 text-muted">Education</h3>
            <ul className="space-y-8">
              {education.map((e) => (
                <li key={e.title}>
                  <Reveal>
                    <p className="eyebrow text-accent">{e.period}</p>
                    <h4 className="display mt-2 text-3xl">{e.title}</h4>
                    <p className="text-muted">{e.org}</p>
                    <p className="mt-1">{e.note}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mb-6 mt-20 text-muted">Certifications</h3>
            <ul className="divide-y divide-line border-y border-line">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="block font-medium">{c.name}</span>
                    <span className="text-muted">{c.issuer}</span>
                  </span>
                  <span className="eyebrow shrink-0 text-muted">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
