import { profile } from "@/data/profile";
import FadeIn from "./FadeIn";
import { ContactButton } from "./Buttons";
import { DrawLine, Stagger, StaggerItem } from "./Reveal";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const links = [
  { k: "Email", label: profile.email, href: `mailto:${profile.email}`, external: false },
  { k: "GitHub", label: "github.com/Swas00", href: profile.github, external: true },
  { k: "LinkedIn", label: "linkedin.com/in/swastik-sahu-linkdin07", href: profile.linkedin, external: true },
  { k: "Résumé", label: "Download PDF", href: profile.resume, external: false },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-10 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <div className="mx-auto max-w-[1500px]">
        <FadeIn as="p" y={10} className="eyebrow mb-6 text-muted">
          Contact
        </FadeIn>
        <FadeIn as="h2" y={40} className="hero-heading text-[clamp(2.6rem,9vw,9rem)] font-black uppercase leading-[0.95] tracking-tight">
          Let’s build something worth explaining.
        </FadeIn>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <FadeIn delay={0.2} className="flex flex-col items-start gap-8 md:col-span-5">
            <p className="max-w-md text-lg font-light text-[#D7E2EA]/80">
              I’m open to internships and collaborations in full-stack and applied ML. Email is the fastest way to reach me.
            </p>
            <ContactButton href={`mailto:${profile.email}`}>Send an email</ContactButton>
          </FadeIn>
          <Stagger as="ul" gap={0.1} delay={0.2} className="md:col-span-7">
            {links.map((l) => (
              <StaggerItem as="li" key={l.k} y={10}>
                <DrawLine className="bg-line" />
                <a
                  href={l.href}
                  {...(l.external ? ext : {})}
                  {...(l.k === "Résumé" ? { download: "Swastik_Sahu_Resume.pdf" } : {})}
                  className="group flex items-baseline justify-between gap-4 py-5 transition-[padding] duration-300 ease-out hover:pl-3 focus-visible:pl-3"
                >
                  <span className="eyebrow w-24 shrink-0 text-muted">{l.k}</span>
                  <span className="flex-1 [overflow-wrap:anywhere] text-lg font-medium uppercase tracking-wide transition-colors duration-200 group-hover:text-accent md:text-2xl">{l.label}</span>
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </a>
              </StaggerItem>
            ))}
            <li aria-hidden="true">
              <DrawLine className="bg-line" delay={0.4} />
            </li>
          </Stagger>
        </div>

        <footer className="eyebrow mt-28 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-muted">
          <span>© Swastik Sahu</span>
          <span>Built with Next.js · Set in Kanit</span>
          <a href="#main" className="link-draw">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
