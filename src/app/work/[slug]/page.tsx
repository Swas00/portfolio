import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Reveal, SplitText } from "@/components/Reveal";
import { ImportanceDiagram, ConflictDiagram } from "@/components/Diagrams";

const withStudy = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return withStudy.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = withStudy.find((x) => x.slug === slug);
  return p ? { title: `${p.name} case study`, description: p.tagline + " " + p.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = withStudy.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = withStudy[idx];
  const cs = p.caseStudy!;
  const next = withStudy[(idx + 1) % withStudy.length];

  return (
    <article className="px-5 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <Link href="/#work" className="eyebrow link-draw text-muted">← All work</Link>
        <p className="eyebrow mt-12 text-accent">Case study · {p.year}</p>
        <h1 className="display mt-4 text-[clamp(3.2rem,9vw,9rem)]">
          <SplitText text={p.name} immediate as="span" />
        </h1>
        <p className="mt-6 max-w-2xl text-2xl">{p.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link-draw py-1">Source on GitHub ↗</a>
          {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-draw py-1">Live demo ↗</a>}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal><h2 className="eyebrow mb-3 text-accent">The problem</h2><p className="text-xl leading-relaxed">{cs.problem}</p></Reveal>
            <Reveal className="mt-12"><h2 className="eyebrow mb-3 text-accent">Context &amp; role</h2><p className="text-lg leading-relaxed">{cs.role}</p></Reveal>
            <h2 className="eyebrow mb-2 mt-14 text-accent">Engineering decisions</h2>
            <ol className="divide-y divide-line border-y border-line">
              {cs.decisions.map((d, i) => (
                <li key={d.title} className="grid gap-2 py-6 md:grid-cols-[3rem_1fr]">
                  <span className="eyebrow text-muted">0{i + 1}</span>
                  <Reveal>
                    <h3 className="display text-3xl">{d.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <aside className="md:col-span-5">
            <div className="on-dark md:sticky md:top-24">
              {p.slug === "dropoutguard-ai" ? <ImportanceDiagram /> : <ConflictDiagram />}
              <h2 className="eyebrow mb-3 mt-10 text-accent">Features</h2>
              <ul className="space-y-2 border-t border-line pt-4">
                {cs.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <h2 className="eyebrow mb-3 mt-10 text-accent">Stack</h2>
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((s) => <li key={s} className="eyebrow border border-line px-2.5 py-1">{s}</li>)}
              </ul>
              {cs.notes && <p className="mt-10 border-l-2 border-accent pl-4 text-muted">{cs.notes}</p>}
            </div>
          </aside>
        </div>

        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group mt-24 block border-t border-line pt-8">
          <span className="eyebrow text-muted">Next case study</span>
          <span className="display mt-2 block text-5xl transition-colors group-hover:text-accent md:text-8xl">{next.name} →</span>
        </Link>
      </div>
    </article>
  );
}
