import { ContactButton } from "@/components/Buttons";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow text-accent">404 — Off the beam</p>
        <h1 className="hero-heading mt-4 text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-none tracking-tight">That page isn’t here.</h1>
        <div className="mt-10">
          <ContactButton href="/">Back home</ContactButton>
        </div>
      </div>
    </section>
  );
}
