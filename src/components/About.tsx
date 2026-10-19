import { Reveal, SplitText } from "./Reveal";
import { leadership } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-12">
        <p className="eyebrow text-accent md:col-span-3">01 — About</p>
        <div className="md:col-span-9">
          <h2 className="display text-[clamp(2.2rem,5.2vw,5rem)]">
            <SplitText text="Physics taught me to distrust a number I can’t explain. I build that into software." />
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="text-lg leading-relaxed">
                I studied physics at Amity (B.Sc. Hons., 8.89/10), then spent two internships modelling
                particle-accelerator systems and analysing scientific datasets in Python and MATLAB. Now I’m doing an
                MCA at CHRIST, turning that habit of checking the evidence into full-stack and ML work.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed">
                Two habits show up in both of my larger projects. Explain the result: DropoutGuard ranks the factors
                behind every risk score. Design the failure case: LetsCollab answers a stale edit with an HTTP 409
                and a diff, not a silent overwrite. Next I’m exploring LangChain and RAG.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <h3 className="eyebrow mb-4 text-muted">Beyond the code</h3>
            <ul className="divide-y divide-line border-y border-line">
              {leadership.map((l) => (
                <li key={l.title + l.org} className="grid gap-1 py-4 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-6">
                  <span className="display text-2xl">{l.title}</span>
                  <span className="text-muted">{l.org}</span>
                  <span className="eyebrow text-muted">{l.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
