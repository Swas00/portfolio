import { experience, education, certifications, achievements } from "@/data/profile";
import FadeIn from "./FadeIn";
import { Stagger, StaggerItem, TimelineDot } from "./Reveal";

const label = "eyebrow mb-6 font-semibold text-[#7621B0]";
const rule = "divide-y divide-[rgba(12,12,12,0.15)] border-y border-[rgba(12,12,12,0.15)]";

export default function Path() {
  return (
    <section
      id="path"
      className="on-light relative z-10 -mt-10 rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn as="h2" y={40} className="section-heading mb-6 text-[#0C0C0C]">
        Path
      </FadeIn>
      <FadeIn as="p" delay={0.1} className="mx-auto mb-16 max-w-2xl text-center text-[clamp(1rem,2vw,1.5rem)] font-light opacity-70 sm:mb-20 md:mb-28">
        From accelerator physics to full-stack.
      </FadeIn>

      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <h3 className={label}>Experience</h3>
          <ol className="relative ml-2 border-l border-[#0C0C0C]/30 pl-8">
            {experience.map((e) => (
              <li key={e.period} className="relative pb-12 last:pb-0">
                <TimelineDot className="absolute -left-[2.45rem] top-2 size-3 rounded-full border-2 border-[#0C0C0C]" />
                <FadeIn>
                  <p className="eyebrow font-semibold text-[#7621B0]">{e.period}</p>
                  <h4 className="mt-2 text-3xl font-black uppercase leading-none tracking-tight">{e.title}</h4>
                  <p className="mt-1 font-light opacity-60">{e.org}</p>
                  <ul className="mt-4 space-y-2 font-light leading-relaxed">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </FadeIn>
              </li>
            ))}
          </ol>

          <h3 className={`${label} mt-20`}>Recognition</h3>
          <Stagger as="ul" gap={0.09} className={rule}>
            {achievements.map((a) => (
              <StaggerItem as="li" key={a.name} className="grid gap-1 py-4 md:grid-cols-[1fr_auto]">
                <span>
                  <strong className="font-medium">{a.name}</strong> <span className="font-light opacity-60">— {a.detail}</span>
                </span>
                <span className="eyebrow opacity-60">{a.date}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="md:col-span-5">
          <h3 className={label}>Education</h3>
          <ul className="space-y-8">
            {education.map((e) => (
              <li key={e.title}>
                <FadeIn>
                  <p className="eyebrow font-semibold text-[#7621B0]">{e.period}</p>
                  <h4 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight">{e.title}</h4>
                  <p className="font-light opacity-60">{e.org}</p>
                  <p className="mt-1 font-medium">{e.note}</p>
                </FadeIn>
              </li>
            ))}
          </ul>

          <h3 className={`${label} mt-20`}>Certifications</h3>
          <Stagger as="ul" gap={0.09} className={rule}>
            {certifications.map((c) => (
              <StaggerItem as="li" key={c.name} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-medium">{c.name}</span>
                  <span className="font-light opacity-60">{c.issuer}</span>
                </span>
                <span className="eyebrow shrink-0 opacity-60">{c.date}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
