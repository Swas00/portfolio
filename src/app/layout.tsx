import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Providers from "@/components/Providers";
import ScrollBackdrop from "@/components/ScrollBackdrop";

const display = Instrument_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const sans = Geist({ variable: "--font-sans-body", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono-body", subsets: ["latin"] });

const base =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const description =
  "Swastik Sahu is an MCA student in Bengaluru building full-stack web apps and explainable ML systems. Formerly a physics researcher.";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: "Swastik Sahu — Full-stack developer", template: "%s · Swastik Sahu" },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    type: "website",
    title: "Swastik Sahu — Full-stack developer",
    description,
    siteName: "Swastik Sahu",
  },
  twitter: { card: "summary_large_image", title: "Swastik Sahu — Full-stack developer", description },
};

export const viewport: Viewport = { themeColor: "#f1ede3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <Providers>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[110] -translate-y-20 bg-ink px-4 py-2 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollBackdrop />
        <Nav />
        <Cursor />
        {/* If JS is unavailable, never leave content hidden at its pre-animation state. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="translateY"],[style*="scale"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
