"use client";
import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import { ContactButton, GhostButton } from "./Buttons";
import { HeroObject } from "./Decor";

export default function Hero() {
  return (
    <section id="top" className="relative flex h-screen min-h-[680px] flex-col px-6 md:px-10" style={{ overflowX: "clip" }}>
      <div className="h-20 md:h-24" aria-hidden="true" />

      <div className="w-full overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full text-[19vw] font-black uppercase leading-[0.92] tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-3 md:whitespace-nowrap md:text-[13.6vw]">
            Swastik Sahu
          </h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.3} y={20}>
        <p className="mt-3 text-[clamp(1.05rem,2.6vw,2.4rem)] font-light uppercase leading-tight tracking-wide text-[#D7E2EA] md:mt-1">
          I build software that <span className="font-medium text-accent">shows its reasoning.</span>
        </p>
      </FadeIn>

      {/* Hero object: a hollow ring, so the name stays legible behind it */}
      <FadeIn delay={0.6} y={30} className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0">
        <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <HeroObject className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]" />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[210px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[300px] md:max-w-[380px]">
            MCA student at CHRIST in Bengaluru. I build explainable ML systems and real-time web apps, and I came to
            software through physics research.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="flex flex-col items-end gap-3">
          <ContactButton href="#contact">Get in touch</ContactButton>
          <GhostButton href="#work" className="!px-6 !py-2 !text-xs">
            See selected work
          </GhostButton>
        </FadeIn>
      </div>
    </section>
  );
}
