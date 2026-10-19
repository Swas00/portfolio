"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Fixed, scroll-linked backdrop: a slowly turning ring (echoing the hero beam)
 * and a measuring ruler that moves with the page. `mix-blend-mode: difference`
 * makes one light stroke read as a faint dark line on paper and a light line on ink.
 */
export default function ScrollBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 540]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? ["0vw", "0vw", "0vw"] : ["28vw", "-26vw", "28vw"]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0vh", "0vh"] : ["10vh", "-10vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.07, 1], [0, 1, 1]);
  const rulerY = useTransform(scrollY, (v) => (reduce ? 0 : -v * 0.6));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden mix-blend-difference">
      <motion.svg
        viewBox="-500 -500 1000 1000"
        className="absolute left-1/2 top-1/2 h-[110vmin] w-[110vmin] -ml-[55vmin] -mt-[55vmin]"
        style={{ x, y, rotate, opacity }}
        suppressHydrationWarning
        fill="none"
        stroke="#f1ede3"
        strokeOpacity="0.16"
      >
        {[0, 22, 44].map((d) => (
          <ellipse key={d} rx={430 - d} ry={370 - d} transform="rotate(-20)" strokeWidth="1.2" />
        ))}
        <circle cx="-404" cy="-72" r="7" fill="#f1ede3" fillOpacity="0.5" stroke="none" />
        <circle cx="385" cy="150" r="4" fill="#f1ede3" fillOpacity="0.35" stroke="none" />
      </motion.svg>

      <motion.div
        suppressHydrationWarning
        className="absolute inset-y-0 left-0 hidden w-5 md:block"
        style={{
          backgroundPositionY: rulerY,
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(241,237,227,.22) 0 1px, transparent 1px 20px), repeating-linear-gradient(to bottom, rgba(241,237,227,.4) 0 1px, transparent 1px 100px)",
          backgroundSize: "8px 100%, 18px 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
