"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow text-accent">Error</p>
        <h1 className="hero-heading mt-4 text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-none tracking-tight">Something went wrong.</h1>
        <button onClick={reset} className="btn-contact mt-10 px-10 py-4 text-sm">Try again</button>
      </div>
    </section>
  );
}
