import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import Path from "@/components/Path";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

export default function Home() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Full-stack developer",
    url: profile.github,
    sameAs: [profile.github, profile.linkedin],
    alumniOf: ["CHRIST (Deemed to be University)", "Amity University Uttar Pradesh"],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Work />
      <Path />
      <Contact />
    </>
  );
}
