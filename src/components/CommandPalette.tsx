"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { nav, profile } from "@/data/profile";
import { projects } from "@/data/projects";

type Item = { label: string; hint: string; run: () => void };

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Mount the dialog only while open so its state resets on every open.
  return open ? <Dialog onClose={onClose} /> : null;
}

function Dialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const items: Item[] = useMemo(() => {
    const ext = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...nav.map((n) => ({ label: n.label, hint: "Section", run: () => router.push(`/#${n.id}`) })),
      ...projects.filter((p) => p.caseStudy).map((p) => ({ label: p.name, hint: "Case study", run: () => router.push(`/work/${p.slug}`) })),
      { label: "Download résumé", hint: "PDF", run: () => (window.location.href = profile.resume) },
      { label: "GitHub", hint: "External", run: ext(profile.github) },
      { label: "LinkedIn", hint: "External", run: ext(profile.linkedin) },
      { label: "Send an email", hint: "Mail", run: () => (window.location.href = `mailto:${profile.email}`) },
    ];
  }, [router]);

  const results = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  const choose = (i: Item | undefined) => {
    if (!i) return;
    onClose();
    i.run();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
      className="on-dark fixed inset-0 z-[95] grid place-items-start justify-center bg-ink/60 px-4 pt-[18vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
        if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
        if (e.key === "Enter") choose(results[idx]);
      }}
    >
      <div className="w-full max-w-lg border border-line-dark bg-ink text-paper shadow-2xl">
        <input
          autoFocus
          value={q}
          onChange={(e) => { setQ(e.target.value); setIdx(0); }}
          placeholder="Jump to…"
          aria-label="Search commands"
          className="w-full border-b border-line-dark bg-transparent px-5 py-4 text-lg outline-none placeholder:text-muted-dark"
        />
        <ul role="listbox" className="max-h-80 overflow-auto py-2">
          {results.length === 0 && <li className="px-5 py-3 text-muted-dark">No matches</li>}
          {results.map((r, i) => (
            <li
              key={r.label}
              role="option"
              aria-selected={i === idx}
              onMouseEnter={() => setIdx(i)}
              onClick={() => choose(r)}
              className={`flex cursor-pointer items-center justify-between px-5 py-2.5 ${i === idx ? "bg-paper text-ink" : ""}`}
            >
              <span>{r.label}</span>
              <span className="eyebrow opacity-60">{r.hint}</span>
            </li>
          ))}
        </ul>
        <p className="eyebrow border-t border-line-dark px-5 py-2.5 text-muted-dark">↑↓ navigate · ↵ open · esc close</p>
      </div>
    </div>
  );
}
