import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow text-accent">404 — Off the beam</p>
        <h1 className="display mt-4 text-[clamp(3rem,10vw,9rem)]">That page isn’t here.</h1>
        <Link href="/" className="mt-8 inline-block bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent">Back home</Link>
      </div>
    </section>
  );
}
