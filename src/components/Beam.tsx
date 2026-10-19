"use client";
import { useEffect, useRef } from "react";

/**
 * A particle ring, a nod to the accelerator research on the résumé.
 * Particles circulate in bunches; the pointer bends nearby orbits outward.
 * Static single frame when reduced motion is requested; paused when off-screen.
 */
export default function Beam({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = window.innerWidth < 768 ? 260 : 520;
    const parts = Array.from({ length: N }, (_, i) => ({
      a: Math.random() * Math.PI * 2,
      lane: (Math.random() - 0.5) * 2, // -1..1 across the beam width
      speed: 0.0016 + Math.random() * 0.0007,
      size: 0.6 + Math.random() * 1.3,
      bunch: i % 7,
    }));
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5, cy = h * 0.5;
      const R = Math.min(w, h) * 0.38;
      const spread = R * 0.07;
      // faint guide rings
      ctx.lineWidth = 1;
      for (const k of [-1, 0, 1]) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(20,19,15,0.10)";
        ctx.ellipse(cx, cy, R + k * spread * 1.6, (R + k * spread * 1.6) * 0.86, -0.35, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (const p of parts) {
        if (!reduce) p.a += p.speed;
        const bunchPulse = 1 + Math.sin(p.a * 3 + p.bunch + t * 0.0004) * 0.25;
        const r = R + p.lane * spread * bunchPulse;
        let x = cx + Math.cos(p.a) * r;
        let y = cy + Math.sin(p.a) * r * 0.86;
        // rotate the ellipse
        const c = Math.cos(-0.35), s = Math.sin(-0.35);
        const dx = x - cx, dy = y - cy;
        x = cx + dx * c - dy * s;
        y = cy + dx * s + dy * c;
        // pointer deflection
        const mx = x - mouse.x, my = y - mouse.y;
        const d2 = mx * mx + my * my;
        if (d2 < 140 * 140) {
          const f = (1 - Math.sqrt(d2) / 140) * 26;
          const d = Math.sqrt(d2) || 1;
          x += (mx / d) * f; y += (my / d) * f;
        }
        const hot = p.bunch === 0;
        ctx.fillStyle = hot ? "#c8321d" : "rgba(20,19,15,0.78)";
        ctx.beginPath();
        ctx.arc(x, y, hot ? p.size * 1.25 : p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));

    resize();
    io.observe(canvas);
    const onResize = () => { resize(); draw(0); };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    draw(0);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
