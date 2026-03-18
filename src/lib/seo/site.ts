export const SITE_CONFIG = {
  name: "Evans Elabo",
  siteName: "Evans Portfolio",
  shortName: "Evans",
  authorName: "Evans Elabo",
  twitterHandle: "@dev_concept",
  locale: "en_US",
  defaultDescription:
    "A Ghanaian software engineer with interest in user interfaces, backend development, open-source projects, and developer tools. Mostly writing software in TypeScript and Go.",
  fallbackUrl: "https://evans.elabo.com",
} as const;

function normalizeBaseUrl(url: string): string {
  try {
    const parsed = new URL(url);
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
