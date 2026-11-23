"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type CalendlyEmbedProps = {
  url?: string;
};

function normalizeCalendlyUrl(input?: string): string {
  const fallback = "https://calendly.com/ellaboevans/30min";
  const raw = input?.trim() || fallback;

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  // If user provided just "username/event"
  return `https://calendly.com/${raw.replace(/^\/+/, "")}`;
}

export default function CalendlyEmbed({ url }: Readonly<CalendlyEmbedProps>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseCalendlyUrl = normalizeCalendlyUrl(url);

  // Apply site brand theme colors to Calendly widget
  const isDark = (resolvedTheme || "dark") === "dark";
  const primaryColor = "f59e0b"; // amber-500
  const backgroundColor = isDark ? "171717" : "ffffff";
  const textColor = isDark ? "f5f5f5" : "1c1917";

  const separator = baseCalendlyUrl.includes("?") ? "&" : "?";
  const embedUrl = `${baseCalendlyUrl}${separator}hide_gdpr_banner=1&hide_landing_page_details=0&primary_color=${primaryColor}&background_color=${backgroundColor}&text_color=${textColor}`;

  if (!mounted) {
    return (
      <div className="min-h-[680px] flex items-center justify-center bg-stone-50 dark:bg-stone-900/40 rounded-xl border border-stone-200 dark:border-stone-800">
        <div className="flex flex-col items-center gap-3">
          <Icon icon="line-md:loading-loop" className="w-8 h-8 text-amber-500" />
          <p className="text-sm text-stone-500 dark:text-stone-400">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative min-h-[680px] rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#171717] shadow-xs">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-xs">
          <div className="flex flex-col items-center gap-3">
            <Icon icon="line-md:loading-loop" className="w-8 h-8 text-amber-500" />
            <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
              Connecting to Calendly...
            </p>
          </div>
        </div>
      )}

      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Schedule a Free Consultation via Calendly"
        onLoad={() => setLoading(false)}
        className="w-full min-h-[680px] border-0"
        allow="camera; microphone; autoplay; clipboard-write"
      />
    </div>
  );
}
