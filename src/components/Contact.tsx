import { profile } from "@/data/profile";
import { Reveal, SplitText } from "./Reveal";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Contact() {
  return (
    <section id="contact" className="on-dark bg-ink px-5 pb-10 pt-28 text-paper md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow text-accent-bright">05 — Contact</p>
        <h2 className="display mt-6 text-[clamp(3rem,9vw,9rem)]">
          <SplitText text="Let’s build something" />{" "}
          <em className="text-accent-bright"><SplitText text="worth explaining." delay={0.2} /></em>
        </h2>
        <Reveal delay={0.15} className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="max-w-md text-lg text-muted-dark md:col-span-5">
            I’m open to internships and collaborations in full-stack and applied ML. Email is the fastest way to reach me.
          </p>
          <ul className="md:col-span-7">
            {[
              ["Email", profile.email, `mailto:${profile.email}`, false],
              ["GitHub", "github.com/Swas00", profile.github, true],
              ["LinkedIn", "linkedin.com/in/swastik-sahu-linkdin07", profile.linkedin, true],
              ["Résumé", "Download PDF", profile.resume, false],
            ].map(([k, label, href, external]) => (
              <li key={k as string} className="border-t border-line-dark last:border-b">
                <a
                  href={href as string}
                  {...(external ? ext : {})}
                  {...(k === "Résumé" ? { download: "Swastik_Sahu_Resume.pdf" } : {})}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="eyebrow w-24 shrink-0 text-muted-dark">{k}</span>
                  <span className="display flex-1 break-all text-2xl transition-colors group-hover:text-accent-bright md:text-4xl">{label}</span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <footer className="eyebrow mt-28 flex flex-wrap justify-between gap-4 border-t border-line-dark pt-6 text-muted-dark">
          <span>© Swastik Sahu</span>
          <span>Built with Next.js · Set in Instrument Serif &amp; Geist</span>
          <a href="#main" className="link-draw">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
