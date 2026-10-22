"use client";
import { MotionConfig } from "motion/react";

/** Always play the full motion design, regardless of the visitor's OS "reduce motion" setting. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
