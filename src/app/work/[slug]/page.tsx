import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import FadeIn from "@/components/FadeIn";
import { GhostButton } from "@/components/Buttons";
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

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  // Reading the URL param happens inside Suspense so the rest of the shell can prerender.
  return (
    <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

const label = "eyebrow mb-3 text-accent";

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = withStudy.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = withStudy[idx];
  const cs = p.caseStudy!;
  const next = withStudy[(idx + 1) % withStudy.length];
  const radius = "rounded-[32px] sm:rounded-[44px]";

  return (
    <article className="px-5 pb-24 pt-32 sm:px-8 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <Link href="/#work" className="eyebrow link-draw text-muted">← All work</Link>
        <p className="eyebrow mt-12 text-accent">Case study · {p.year}</p>
        <FadeIn as="h1" y={40} className="hero-heading mt-4 text-[clamp(3rem,11vw,10rem)] font-black uppercase leading-[0.95] tracking-tight">
          {p.name}
        </FadeIn>
        <p className="mt-6 max-w-2xl text-2xl font-light">{p.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <GhostButton href={p.repo} target="_blank" rel="noopener noreferrer">Source on GitHub ↗</GhostButton>
          {p.live && <GhostButton href={p.live} target="_blank" rel="noopener noreferrer">Live demo ↗</GhostButton>}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <FadeIn>
              <h2 className={label}>The problem</h2>
              <p className="text-xl font-light leading-relaxed">{cs.problem}</p>
            </FadeIn>
            <FadeIn className="mt-12">
              <h2 className={label}>Context &amp; role</h2>
              <p className="text-lg font-light leading-relaxed">{cs.role}</p>
            </FadeIn>
            <h2 className={`${label} mt-14`}>Engineering decisions</h2>
            <ol className="divide-y divide-line border-y border-line">
              {cs.decisions.map((d, i) => (
                <li key={d.title} className="grid gap-2 py-6 md:grid-cols-[3rem_1fr]">
                  <span className="eyebrow text-muted">0{i + 1}</span>
                  <FadeIn>
                    <h3 className="text-2xl font-medium uppercase tracking-wide">{d.title}</h3>
                    <p className="mt-2 font-light leading-relaxed text-muted">{d.body}</p>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-24">
              {p.slug === "dropoutguard-ai" ? <ImportanceDiagram className={radius} /> : <ConflictDiagram className={radius} />}
              <h2 className={`${label} mt-10`}>Features</h2>
              <ul className="space-y-2 border-t border-line pt-4 font-light">
                {cs.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <h2 className={`${label} mt-10`}>Stack</h2>
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((s) => <li key={s} className="eyebrow rounded-full border border-[#D7E2EA]/25 px-4 py-1.5">{s}</li>)}
              </ul>
              {cs.notes && <p className="mt-10 border-l-2 border-accent pl-4 font-light text-muted">{cs.notes}</p>}
            </div>
          </aside>
        </div>

        <Link href={`/work/${next.slug}`} className="group mt-24 block border-t border-line pt-8">
          <span className="eyebrow text-muted">Next case study</span>
          <span className="hero-heading mt-2 block text-5xl font-black uppercase leading-none tracking-tight transition-opacity group-hover:opacity-70 md:text-8xl">{next.name} →</span>
        </Link>
      </div>
    </article>
  );
}
