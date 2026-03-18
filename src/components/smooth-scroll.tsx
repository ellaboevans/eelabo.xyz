"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const win = globalThis.window;

    if (!win) {
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      autoRaf: false,
      anchors: true,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = globalThis.requestAnimationFrame(raf);
    };

    rafId = globalThis.requestAnimationFrame(raf);

    return () => {
      globalThis.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
