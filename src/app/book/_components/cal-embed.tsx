"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type CalEmbedProps = {
  calLink: string;
};

function normalizeCalLink(link: string): string {
  return link.replace(/^https?:\/\/cal\.com\//, "");
}

export default function CalEmbed({ calLink }: Readonly<CalEmbedProps>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const normalizedLink = normalizeCalLink(calLink);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    (async function () {
      const cal = await getCalApi({ namespace: "consultation" });
      cal("ui", {
        theme: resolvedTheme === "dark" ? "dark" : "light",
        styles: { branding: { brandColor: "#f59e0b" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [mounted, resolvedTheme]);

  if (!mounted) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">Loading calendar...</p>
      </div>
    );
  }

  return (
    <Cal
      namespace="consultation"
      calLink={normalizedLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
