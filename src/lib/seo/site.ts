export const SITE_CONFIG = {
  name: "Evans Elabo",
  siteName: "Evans Portfolio",
  shortName: "Evans",
  authorName: "Evans Elabo",
  twitterHandle: "@dev_concept",
  locale: "en_US",
  defaultDescription:
    "A Ghanaian software engineer with interest in user interfaces, backend development, open-source projects, and developer tools. Mostly writing software in TypeScript and Go.",
  fallbackUrl: "https://www.elabo.me",
} as const;

function readHeaderValue(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const [first] = value.split(",");
  const normalized = first?.trim();
  return normalized || null;
}

function normalizeHost(host: string): string {
  const configuredCanonicalHost = process.env.NEXT_PUBLIC_CANONICAL_HOST?.trim();
  if (configuredCanonicalHost) {
    return configuredCanonicalHost;
  }

  if (host === "elabo.me") {
    return "www.elabo.me";
  }

  return host;
}

function normalizeBaseUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.host = normalizeHost(parsed.host);
    parsed.pathname = "";
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return SITE_CONFIG.fallbackUrl;
  }
}

const SITE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_BASE_URL ?? SITE_CONFIG.fallbackUrl);

export type SeoImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export function getSiteUrl(): string {
  return SITE_URL;
}

export function getCanonicalOriginFromRequest(
  requestHost?: string | null,
  requestProtocol?: string | null
): string {
  const host = readHeaderValue(requestHost);
  const protocol = readHeaderValue(requestProtocol) ?? "https";

  if (!host) {
    return SITE_URL;
  }

  if (host.includes("localhost") || host.startsWith("127.0.0.1")) {
    return `${protocol}://${host}`;
  }

  return `${protocol}://${normalizeHost(host)}`;
}

export function getAbsoluteUrl(pathname: string = "/"): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, `${SITE_URL}/`).toString();
}

export function getDefaultSeoImages(primaryImage?: string): SeoImage[] {
  return [
    {
      url: primaryImage ?? getAbsoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt: SITE_CONFIG.siteName,
    },
  ];
}
