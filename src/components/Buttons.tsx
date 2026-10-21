import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

/** Internal hrefs use client-side navigation; external ones stay plain anchors. */
function A({ href = "", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return href.startsWith("/") ? <Link href={href} {...rest} /> : <a href={href} {...rest} />;
}

const size = "px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base";

export function ContactButton({ children = "Get in touch", className = "", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <A className={`btn-contact ${size} ${className}`} {...rest}>
      {children}
    </A>
  );
}

/** Ghost / outline pill. `light` is for white sections. */
export function GhostButton({
  children,
  light = false,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { light?: boolean }) {
  const tone = light
    ? "border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C]/10"
    : "border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10";
  return (
    <A
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-3 text-sm font-medium uppercase tracking-widest transition-[background-color,transform] duration-200 active:translate-y-px sm:px-10 sm:py-3.5 sm:text-base ${tone} ${className}`}
      {...rest}
    >
      {children}
    </A>
  );
}
