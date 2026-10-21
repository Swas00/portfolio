import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import Decor from "./Decor";
import { ContactButton } from "./Buttons";
import { Stagger, StaggerItem } from "./Reveal";
import { leadership } from "@/data/profile";

const meta = [
  ["Based in", "Bengaluru, India"],
  ["Studying", "MCA · CHRIST · 2026–28"],
  ["Before", "B.Sc. Physics (Hons.)"],
  ["Recent", "Top 50 · Hack Devengers 2.0"],
] as const;

export default function About() {
  return (
    <section id="about" className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10" style={{ overflowX: "clip" }}>
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <Decor kind="sphere" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <Decor kind="cube" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <Decor kind="torus" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <Decor kind="orb" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40} as="h2" className="section-heading hero-heading">
            About
          </FadeIn>

          <FadeIn as="p" className="max-w-[760px] text-center text-[clamp(1.25rem,2.6vw,2rem)] font-light leading-snug text-[#D7E2EA]">
            Physics taught me to distrust a number I can’t explain. I build that habit into software.
          </FadeIn>

          <div className="flex max-w-[620px] flex-col gap-8">
            <AnimatedText
              className="text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
              text="I studied physics at Amity (B.Sc. Hons., GPA 8.89/10) and completed two research internships there: one on particle accelerators, the other analysing datasets and running simulations in Python and MATLAB. I’m now doing an MCA at CHRIST, applying the same habit of checking the evidence to full-stack and ML work."
            />
            <AnimatedText
              className="text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
              text="Two habits show up in my two larger projects. Explain the result: DropoutGuard ranks the factors behind every risk score. Design for failure: LetsCollab answers a stale edit with an HTTP 409 and a diff dialog, not a silent overwrite. Next, I’m exploring LangChain and RAG."
            />
          </div>

          <Stagger as="div" gap={0.08} className="grid w-full max-w-3xl grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
            {meta.map(([k, v]) => (
              <StaggerItem key={k}>
                <p className="eyebrow text-muted">{k}</p>
                <p className="mt-1 font-light">{v}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="w-full max-w-3xl">
            <h3 className="eyebrow mb-4 text-muted">Beyond the code</h3>
            <Stagger as="ul" gap={0.09} className="divide-y divide-line border-y border-line">
              {leadership.map((l) => (
                <StaggerItem as="li" key={l.title + l.org} className="grid gap-1 py-4 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-6">
                  <span className="text-xl font-medium uppercase tracking-wide">{l.title}</span>
                  <span className="font-light text-muted">{l.org}</span>
                  <span className="eyebrow text-muted">{l.period}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <FadeIn>
          <ContactButton href="#contact">Get in touch</ContactButton>
        </FadeIn>
      </div>
    </section>
  );
}
