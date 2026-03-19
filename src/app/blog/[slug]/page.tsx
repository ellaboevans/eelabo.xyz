import Back from "@/components/back";
import { format, formatDistanceToNow } from "date-fns";
import { getAllContentMetadata, getContentMetadata } from "@/lib/utils/content-metadata";
import BlogPostWrapper from "../_components/blog-post-wrapper";
import ReadingProgressBar from "../_components/reading-progress-bar";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { createArticleMetadata, createPageMetadata } from "@/lib/seo/metadata";
import { getAbsoluteUrl, getCanonicalOriginFromRequest, SITE_CONFIG } from "@/lib/seo/site";
import JsonLd from "@/components/json-ld";

async function getRequestOrigin(): Promise<string> {
  const headerStore = await headers();
  return getCanonicalOriginFromRequest(
    headerStore.get("x-forwarded-host") ?? headerStore.get("host"),
    headerStore.get("x-forwarded-proto")
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ogTemplateVersion = "20260319-1";
  const requestOrigin = await getRequestOrigin();

  try {
    const { title, description, keywords, createdAt, updatedAt, author, published } =
      await getContentMetadata(slug);

    if (!published) {
      return createPageMetadata({
        title: "Post unavailable",
        description: "This post is currently unavailable.",
        path: `/blog/${slug}`,
        noIndex: true,
      });
    }

    return createArticleMetadata({
      title,
      description,
      path: `/blog/${slug}`,
      image: new URL(
        `/blog/${slug}/opengraph-image?v=${updatedAt.getTime()}-${ogTemplateVersion}`,
        `${requestOrigin}/`
      ).toString(),
      keywords,
      publishedTime: createdAt.toISOString(),
      modifiedTime: updatedAt.toISOString(),
      authorName: author,
    });
  } catch {
    return createPageMetadata({
      title: "Post not found",
      description: "The requested blog post could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
}

export async function generateStaticParams() {
  const posts = await getAllContentMetadata({
    published: true,
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;

  let postMetadata;

  try {
    postMetadata = await getContentMetadata(slug);
  } catch {
    notFound();
  }

  if (!postMetadata.published) {
    notFound();
  }

  const { title, description, keywords, author, readTime, createdAt, updatedAt, coverImage } =
    postMetadata;

  const { default: Post } = await import(`@/contents/${slug}.mdx`);
  const canonicalUrl = getAbsoluteUrl(`/blog/${slug}`);

  const blogPostSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: [coverImage],
    author: {
      "@type": "Person",
      name: author || SITE_CONFIG.authorName,
      url: getAbsoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.authorName,
      url: getAbsoluteUrl("/"),
    },
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    datePublished: createdAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    keywords,
    timeRequired: `PT${readTime}M`,
  };

  const breadcrumbSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: getAbsoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <BlogPostWrapper>
      <JsonLd id={`blog-post-schema-${slug}`} data={[blogPostSchema, breadcrumbSchema]} />
      <ReadingProgressBar readTime={readTime} />
      <article
        className="w-full mt-10 prose max-w-none prose-headings:mt-6 prose-img:rounded-lg prose-img:w-full prose-headings:font-semibold prose-headings:text-stone-600 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-lg prose-h6:text-lg dark:prose-headings:text-white
        prose-img:h-auto prose-p:text-stone-700 dark:prose-li:text-stone-300 prose-strong:text-inherit prose-li:text-stone-700 dark:prose-p:text-stone-300 prose-img:object-cover prose-img:object-center dark:prose-a:text-stone-300"
      >
        <Back />
        <h1 className="!leading-10 font-extrabold">{title}</h1>
        <div className="flex text-xs sm:text-sm items-center gap-2 justify-between">
          <section className="flex items-center gap-2">
            <p className="text-stone-700  !my-0">{format(createdAt, "MMMM d, yyyy")}</p>
            <p className="text-stone-700 !my-0">•</p>
            <p className=" !my-0">{readTime} min read</p>
          </section>
          <p className="text-stone-700 hidden sm:block !my-0">
            Updated{" "}
            {formatDistanceToNow(updatedAt, {
              addSuffix: true,
            })}
          </p>
        </div>
        {/* <div className="w-full outline mt-10 sm:max-h-96 overflow-hidden rounded-lg"> */}
        <Image src={coverImage} alt={title} width={500} height={500} className="h-full w-full" />
        {/* </div> */}
        <Post />
      </article>
    </BlogPostWrapper>
  );
}
