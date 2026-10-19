import { skillGroups } from "@/data/profile";
import { SectionHeader, Stagger, StaggerItem } from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeader n="03" label="Skills" title="What I’ve shipped with, and what I’m learning next." />
        <Stagger as="dl" gap={0.1} className="mt-16 border-t border-line">
          {skillGroups.map((g) => (
            <StaggerItem key={g.title} y={18} className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-8">
              <dt className="display text-3xl md:col-span-3">{g.title}</dt>
              <dd className="md:col-span-9">
                <Stagger as="ul" gap={0.04} delay={0.15} className="flex flex-wrap gap-2">
                  {g.used.map((s) => (
                    <StaggerItem as="li" key={s} y={8} className="border border-line px-3 py-1.5 text-base transition-colors duration-200 hover:border-ink hover:bg-paper-2 md:text-lg">
                      {s}
                    </StaggerItem>
                  ))}
                </Stagger>
                {"exploring" in g && (
                  <p className="mt-4 text-muted">
                    <span className="eyebrow mr-3 text-accent">Exploring</span>
                    {g.exploring.join(", ")}
                  </p>
                )}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="eyebrow mt-6 text-muted">Listed means used in a project or role on this site.</p>
      </div>
    </section>
  );
}
