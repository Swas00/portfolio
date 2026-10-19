"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow text-accent">Something went wrong</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,8vw,7rem)]">The page hit an error.</h1>
        <button onClick={reset} className="mt-8 bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent">Try again</button>
      </div>
    </section>
  );
}
