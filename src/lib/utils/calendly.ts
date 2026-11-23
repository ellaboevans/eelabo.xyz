/**
 * Utility to launch the official Calendly popup modal widget.
 * Lazy-loads Calendly's stylesheet and JavaScript on demand to preserve fast Core Web Vitals.
 */
export function openCalendly(customUrl?: string) {
  if (typeof window === "undefined") return;

  const url =
    customUrl ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    process.env.NEXT_PUBLIC_CALENDLY_LINK ||
    "https://calendly.com/ellaboevans/30min";

  const targetUrl = url.startsWith("http")
    ? url
    : `https://calendly.com/${url.replace(/^\/+/, "")}`;

  const launch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cal = (window as any).Calendly;
    if (cal && typeof cal.initPopupWidget === "function") {
      cal.initPopupWidget({ url: targetUrl });
    } else {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  // If Calendly is already initialized on the window
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).Calendly) {
    launch();
    return;
  }

  // Inject Calendly CSS if not already present
  if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  // Inject Calendly JS if not already present
  const existingScript = document.querySelector(
    'script[src*="calendly.com/assets/external/widget.js"]'
  );
  if (existingScript) {
    existingScript.addEventListener("load", launch, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  script.onload = launch;
  document.body.appendChild(script);
}
