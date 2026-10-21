import { useId } from "react";

/** Original 3D-style objects drawn as SVG gradients. Purely decorative. */
export type DecorKind = "sphere" | "torus" | "cube" | "orb";

export default function Decor({ kind, className }: { kind: DecorKind; className?: string }) {
  const id = useId().replace(/:/g, "");
  const g = (s: string) => `${s}-${id}`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={g("sp")} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f1f7fb" />
          <stop offset="0.45" stopColor="#8d9aa7" />
          <stop offset="1" stopColor="#16181c" />
        </radialGradient>
        <radialGradient id={g("pu")} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f3c6ff" />
          <stop offset="0.45" stopColor="#8a2bd0" />
          <stop offset="1" stopColor="#1a0224" />
        </radialGradient>
        <linearGradient id={g("tr")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9f2f8" />
          <stop offset="0.5" stopColor="#6d7886" />
          <stop offset="1" stopColor="#b600a8" />
        </linearGradient>
        <linearGradient id={g("c1")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dfeaf2" />
          <stop offset="1" stopColor="#8d9aa7" />
        </linearGradient>
        <linearGradient id={g("c2")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b7684" />
          <stop offset="1" stopColor="#262a31" />
        </linearGradient>
        <linearGradient id={g("c3")} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a46d6" />
          <stop offset="1" stopColor="#2a0a3a" />
        </linearGradient>
      </defs>
      {kind === "sphere" && (
        <>
          <circle cx="100" cy="100" r="86" fill={`url(#${g("sp")})`} />
          <circle cx="72" cy="78" r="14" fill="#000" opacity="0.12" />
          <circle cx="122" cy="124" r="9" fill="#000" opacity="0.14" />
          <circle cx="104" cy="60" r="6" fill="#000" opacity="0.1" />
        </>
      )}
      {kind === "torus" && (
        <>
          <ellipse cx="100" cy="100" rx="84" ry="60" transform="rotate(-24 100 100)" fill="none" stroke={`url(#${g("tr")})`} strokeWidth="34" />
          <ellipse cx="100" cy="92" rx="84" ry="60" transform="rotate(-24 100 100)" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="3" />
        </>
      )}
      {kind === "cube" && (
        <>
          <polygon points="100,22 172,62 100,102 28,62" fill={`url(#${g("c1")})`} />
          <polygon points="28,62 100,102 100,182 28,142" fill={`url(#${g("c2")})`} />
          <polygon points="172,62 100,102 100,182 172,142" fill={`url(#${g("c3")})`} />
        </>
      )}
      {kind === "orb" && (
        <>
          <circle cx="100" cy="100" r="62" fill={`url(#${g("pu")})`} />
          <ellipse cx="100" cy="100" rx="94" ry="26" transform="rotate(-18 100 100)" fill="none" stroke={`url(#${g("tr")})`} strokeWidth="9" />
        </>
      )}
    </svg>
  );
}

/** Large hollow ring for the hero. The centre is transparent, so the headline stays readable behind it. */
export function HeroObject({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 520 520" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef5fa" />
          <stop offset="0.38" stopColor="#7c8794" />
          <stop offset="0.7" stopColor="#7621b0" />
          <stop offset="1" stopColor="#be4c00" />
        </linearGradient>
        <radialGradient id={`ball-${id}`} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f6d3ff" />
          <stop offset="0.5" stopColor="#9a2fd8" />
          <stop offset="1" stopColor="#1b0326" />
        </radialGradient>
      </defs>
      <ellipse cx="260" cy="268" rx="214" ry="170" transform="rotate(-18 260 268)" fill="none" stroke={`url(#ring-${id})`} strokeWidth="64" />
      <ellipse cx="260" cy="250" rx="214" ry="170" transform="rotate(-18 260 268)" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="4" />
      <circle cx="418" cy="132" r="40" fill={`url(#ball-${id})`} />
    </svg>
  );
}
