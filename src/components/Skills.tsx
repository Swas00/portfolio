import { skillGroups } from "@/data/profile";
import FadeIn from "./FadeIn";

/** One continuously moving strip per skill group. Rows alternate direction; hover or focus pauses them. */
function Strip({ items, reverse }: { items: readonly string[]; reverse: boolean }) {
  const reps = Math.max(1, Math.ceil(10 / items.length));
  const list = Array.from({ length: reps }, () => items).flat();
  const chars = list.reduce((a, s) => a + s.length, 0);
  const dur = `${Math.max(24, Math.round(chars * 0.5))}s`;
  const copy = (dup: boolean) => (
    <ul className={`flex shrink-0 items-center ${dup ? "marquee-dup" : ""}`} aria-hidden="true">
      {list.map((s, i) => (
        <li key={i} className={`flex items-center whitespace-nowrap ${i >= items.length ? "marquee-rep" : ""}`}>
          <span className="text-[clamp(1.8rem,5vw,4rem)] font-black uppercase leading-none tracking-tight">{s}</span>
          <span className="mx-5 inline-block size-2.5 shrink-0 rounded-full bg-[#7621B0] sm:mx-8 sm:size-3" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee mt-6">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`} style={{ "--dur": dur } as React.CSSProperties}>
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="on-light relative overflow-hidden rounded-t-[40px] bg-white py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:py-24 md:rounded-t-[60px] md:py-32"
    >
      <FadeIn as="h2" y={40} className="section-heading mb-6 px-5 text-[#0C0C0C]">
        Skills
      </FadeIn>
      <FadeIn as="p" delay={0.1} className="mx-auto mb-16 max-w-2xl px-5 text-center text-[clamp(1rem,2vw,1.5rem)] font-light opacity-70 sm:mb-20 md:mb-28">
        What I’ve built with, and what I’m learning next.
      </FadeIn>

      <ul>
        {skillGroups.map((g, i) => (
          <FadeIn
            as="li"
            key={g.title}
            delay={i * 0.08}
            className="border-b border-[rgba(12,12,12,0.15)] py-8 first:border-t sm:py-10"
          >
            <div className="mx-auto flex max-w-5xl items-baseline gap-4 px-5 sm:gap-6 sm:px-8 md:px-10">
              <span className="text-[clamp(1.6rem,4vw,3rem)] font-black leading-none">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{g.title}</h3>
            </div>
            <p className="sr-only">{g.used.join(", ")}</p>
            <Strip items={g.used} reverse={i % 2 === 1} />
            {"exploring" in g && (
              <p className="mx-auto mt-5 max-w-5xl px-5 text-[clamp(0.85rem,1.6vw,1.25rem)] font-light sm:px-8 md:px-10">
                <span className="eyebrow mr-3 font-semibold text-[#7621B0]">Exploring</span>
                <span className="opacity-60">{g.exploring.join(", ")}</span>
              </p>
            )}
          </FadeIn>
        ))}
      </ul>
      <p className="eyebrow mx-auto mt-8 max-w-5xl px-5 opacity-50 sm:px-8 md:px-10">Everything listed was used in a project or role on this site.</p>
    </section>
  );
}
