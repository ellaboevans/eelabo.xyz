import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} | Portfolio`,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "oklch(0.99 0.0164 107.04)",
    theme_color: "oklch(0.99 0.0164 107.04)",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
