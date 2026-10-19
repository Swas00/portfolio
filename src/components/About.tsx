import { Reveal, SectionHeader, Stagger, StaggerItem } from "./Reveal";
import { leadership } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader
          n="01"
          label="About"
          title="Physics taught me to distrust a number I can’t explain. I build that into software."
        />

        <div className="mt-14 md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-9 md:col-start-4">
            <div className="grid gap-10 md:grid-cols-2">
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

            <h3 className="eyebrow mb-4 mt-16 text-muted">Beyond the code</h3>
            <Stagger as="ul" gap={0.09} className="divide-y divide-line border-y border-line">
              {leadership.map((l) => (
                <StaggerItem as="li" key={l.title + l.org} className="grid gap-1 py-4 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-6">
                  <span className="display text-2xl">{l.title}</span>
                  <span className="text-muted">{l.org}</span>
                  <span className="eyebrow text-muted">{l.period}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
