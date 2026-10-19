import { profile } from "@/data/profile";
import { DrawLine, Reveal, SplitText, Stagger, StaggerItem } from "./Reveal";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const links = [
  { k: "Email", label: profile.email, href: `mailto:${profile.email}`, external: false },
  { k: "GitHub", label: "github.com/Swas00", href: profile.github, external: true },
  { k: "LinkedIn", label: "linkedin.com/in/swastik-sahu-linkdin07", href: profile.linkedin, external: true },
  { k: "Résumé", label: "Download PDF", href: profile.resume, external: false },
];

export default function Contact() {
  return (
    <section id="contact" className="on-dark bg-ink px-5 pb-10 pt-28 text-paper md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1500px]">
        <DrawLine className="bg-line-dark" />
        <Reveal y={10} className="mt-8">
          <p className="eyebrow text-accent-bright">05 — Contact</p>
        </Reveal>
        <h2 className="display mt-6 text-[clamp(3rem,9vw,9rem)]">
          <SplitText text="Let’s build something" />{" "}
          <em className="text-accent-bright"><SplitText text="worth explaining." delay={0.3} /></em>
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal delay={0.5} className="md:col-span-5">
            <p className="max-w-md text-lg text-muted-dark">
              I’m open to internships and collaborations in full-stack and applied ML. Email is the fastest way to reach me.
            </p>
          </Reveal>
          <Stagger as="ul" gap={0.1} delay={0.6} className="md:col-span-7">
            {links.map((l) => (
              <StaggerItem as="li" key={l.k} y={10}>
                <DrawLine className="bg-line-dark" />
                <a
                  href={l.href}
                  {...(l.external ? ext : {})}
                  {...(l.k === "Résumé" ? { download: "Swastik_Sahu_Resume.pdf" } : {})}
                  className="group flex items-baseline justify-between gap-4 py-5 transition-[padding] duration-300 ease-out hover:pl-3 focus-visible:pl-3"
                >
                  <span className="eyebrow w-24 shrink-0 text-muted-dark">{l.k}</span>
                  <span className="display flex-1 break-all text-2xl transition-colors duration-200 group-hover:text-accent-bright md:text-4xl">{l.label}</span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </a>
              </StaggerItem>
            ))}
            <li aria-hidden="true"><DrawLine className="bg-line-dark" delay={0.4} /></li>
          </Stagger>
        </div>
        <footer className="eyebrow mt-28 flex flex-wrap justify-between gap-4 border-t border-line-dark pt-6 text-muted-dark">
          <span>© Swastik Sahu</span>
          <span>Built with Next.js · Set in Instrument Serif &amp; Geist</span>
          <a href="#main" className="link-draw">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
