"use client";

import { ThemeProvider } from "next-themes";
import ThemeColorMeta from "@/components/theme-color-meta";

export default function ThemeProviderWithMeta({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeColorMeta />
      {children}
    </ThemeProvider>
  );
}
