import { skillGroups } from "@/data/profile";

const items = skillGroups.flatMap((g) => g.used.map((name) => ({ name, group: g.title })));
const half = Math.ceil(items.length / 2);
const rows = [items.slice(0, half), items.slice(half)];

const tones = [
  "linear-gradient(145deg,#1b1d22 0%,#0f1013 100%)",
  "linear-gradient(145deg,#220a2e 0%,#0f0a14 100%)",
  "linear-gradient(145deg,#171a1f 0%,#0c0c0c 100%)",
  "linear-gradient(145deg,#2a1208 0%,#0f0b09 100%)",
];

function Tile({ name, group, i }: { name: string; group: string; i: number }) {
  return (
    <div
      className="relative flex h-[270px] w-[420px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#D7E2EA]/10 p-6"
      style={{ background: tones[i % tones.length] }}
    >
      <span className="absolute -right-10 -top-10 size-44 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(215,226,234,0.18),transparent_65%)]" />
      <span className="eyebrow text-muted">{group}</span>
      <span className="hero-heading text-[clamp(2.2rem,4.4vw,3.6rem)] font-black uppercase leading-none tracking-tight">{name}</span>
    </div>
  );
}

function Row({ data, reverse, offset }: { data: typeof items; reverse?: boolean; offset: number }) {
  // ~72px per second, whatever the row length
  const dur = `${Math.round((data.length * 432) / 72)}s`;
  const copy = (dup: boolean) => (
    <div className={`flex gap-3 pr-3 ${dup ? "marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {data.map((it, i) => (
        <Tile key={i} name={it.name} group={it.group} i={i + offset} />
      ))}
    </div>
  );
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`} style={{ "--dur": dur } as React.CSSProperties}>
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

/** Two rows of skill tiles that loop continuously in opposite directions, independent of scroll. Decorative. */
export default function Marquee() {
  return (
    <section aria-hidden="true" className="marquee-decor bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" style={{ overflowX: "clip" }}>
      <div className="flex flex-col gap-3">
        <Row data={rows[0]} offset={0} />
        <Row data={rows[1]} offset={2} reverse />
      </div>
    </section>
  );
}
