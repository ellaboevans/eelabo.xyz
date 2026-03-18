import { getAbsoluteUrl, SITE_CONFIG } from "@/lib/seo/site";

export const siteSchema: Array<Record<string, unknown>> = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.siteName,
    url: getAbsoluteUrl("/"),
    description: SITE_CONFIG.defaultDescription,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.authorName,
      url: getAbsoluteUrl("/"),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.authorName,
    url: getAbsoluteUrl("/"),
    image: getAbsoluteUrl("/opengraph-image"),
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/ellaboevans",
      "https://twitter.com/dev_concept",
      "mailto:ellaboevans@gmail.com",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.siteName,
    url: getAbsoluteUrl("/"),
    logo: getAbsoluteUrl("/favicon.ico"),
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.authorName,
      url: getAbsoluteUrl("/"),
    },
  },
];
