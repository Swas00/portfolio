"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { nav, profile } from "@/data/profile";
import CommandPalette from "./CommandPalette";

export default function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    if (!home) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-paper">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="eyebrow link-draw" aria-label="Swastik Sahu, home">
            {profile.name}
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <Link
                key={n.id}
                href={`/#${n.id}`}
                aria-current={active === n.id ? "location" : undefined}
                className="eyebrow link-draw relative"
              >
                <span className={active === n.id ? "opacity-100" : "opacity-70"}>{n.label}</span>
                {active === n.id && <motion.span layoutId="nav-dot" className="absolute -left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-current" />}
              </Link>
            ))}
            <button
              onClick={() => setPalette(true)}
              className="eyebrow border border-current px-2 py-1 opacity-80 transition-opacity hover:opacity-100"
              aria-label="Open command menu"
            >
              ⌘K
            </button>
          </nav>
          <button
            className="eyebrow md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <motion.div className="h-px origin-left bg-current" style={{ scaleX: progress }} />
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-ink px-5 pt-24 text-paper md:hidden on-dark">
          <ul className="flex flex-col gap-2">
            {nav.map((n) => (
              <li key={n.id}>
                <Link href={`/#${n.id}`} onClick={() => setOpen(false)} className="display block py-1 text-6xl">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </>
  );
}
