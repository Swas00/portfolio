"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
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
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "top" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...nav.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [home]);

  // Close the mobile menu on Escape, lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

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
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,#b600a8,#7621b0,#be4c00)]"
        style={{ scaleX: progress }}
      />
      <header className="fixed inset-x-0 top-0 z-50 text-[#D7E2EA] mix-blend-difference">
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-6 pt-2 md:px-10 md:pt-4">
          <Link href="/" className="link-draw text-sm font-medium uppercase tracking-wider md:text-lg" aria-label="Swastik Sahu, home">
            {profile.name}
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex lg:gap-12">
            {nav.map((n) => (
              <Link
                key={n.id}
                href={`/#${n.id}`}
                aria-current={active === n.id ? "location" : undefined}
                className="link-draw relative text-sm font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 lg:text-lg"
              >
                <span>{n.label}</span>
                {active === n.id && <motion.span layoutId="nav-dot" className="absolute -left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-current" />}
              </Link>
            ))}
            <button
              onClick={() => setPalette(true)}
              className="eyebrow rounded-full border border-current px-3 py-1 opacity-70 transition-[opacity,transform] duration-200 hover:opacity-100 active:translate-y-px"
              aria-label="Open command menu"
            >
              ⌘K
            </button>
          </nav>
          <button
            className="eyebrow rounded-full border border-current px-4 py-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-[#0C0C0C] px-6 pt-28 text-[#D7E2EA] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <motion.ul
              initial="hide"
              animate="show"
              variants={{ hide: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              className="flex flex-col gap-2"
            >
              {nav.map((n) => (
                <motion.li key={n.id} variants={{ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
                  <Link href={`/#${n.id}`} onClick={() => setOpen(false)} className="hero-heading block py-1 text-6xl font-black uppercase leading-none tracking-tight">
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </>
  );
}
