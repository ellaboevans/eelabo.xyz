"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    if (typeof globalThis === "undefined") {
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    // Clean up any existing instance first
    if (lenisRef.current) {
      lenisRef.current.destroy();
    }

    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    // Handle visibility change to prevent scroll lock when tab is inactive
    const handleVisibilityChange = () => {
      if (!lenisRef.current) return;

      if (document.hidden) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(rafIdRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return null;
}
