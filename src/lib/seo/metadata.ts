import type { Metadata } from "next";
import { getAbsoluteUrl, getDefaultSeoImages, SITE_CONFIG } from "./site";

type BaseMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

type ArticleMetadataInput = BaseMetadataInput & {
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
};

export function createPageMetadata(input: BaseMetadataInput): Metadata {
  const canonical = getAbsoluteUrl(input.path);
  const images = getDefaultSeoImages(input.image);

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical,
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: SITE_CONFIG.siteName,
      locale: SITE_CONFIG.locale,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      creator: SITE_CONFIG.twitterHandle,
      images: images.map((image) => image.url),
    },
  };
}

export function createArticleMetadata(input: ArticleMetadataInput): Metadata {
  const canonical = getAbsoluteUrl(input.path);
  const images = getDefaultSeoImages(input.image);

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical,
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: SITE_CONFIG.siteName,
      locale: SITE_CONFIG.locale,
      type: "article",
      images,
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      authors: [input.authorName ?? SITE_CONFIG.authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      creator: SITE_CONFIG.twitterHandle,
      images: images.map((image) => image.url),
    },
  };
}
