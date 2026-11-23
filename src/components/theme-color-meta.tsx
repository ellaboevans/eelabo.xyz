"use client";

import { useEffect } from "react";

export default function ThemeColorMeta() {
  useEffect(() => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    metaThemeColor.setAttribute("content", "oklch(0.17 0.0041 106.83)");
  }, []);

  return null;
}
