import Back from "@/components/back";
import { format, formatDistanceToNow } from "date-fns";
import BlogPostWrapper from "../_components/blog-post-wrapper";
import ReadingProgressBar from "../_components/reading-progress-bar";
import TTSAudioReader from "../_components/tts-audio-reader";
import BlogReactions from "../_components/blog-reactions";
import { CommentSection } from "../_components/comments";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAbsoluteUrl, SITE_CONFIG } from "@/lib/seo/site";
import JsonLd from "@/components/json-ld";
import { getAllContentMetadata, getContentMetadata } from "@/lib/utils/content-metadata";


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllContentMetadata({
    published: true,
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getContentMetadata(slug);

  if (!post) return {}; // notFound() is handled in the page below

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  const image = post.coverImage
    ? `${post.coverImage}`
    : `${siteUrl}/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(
        post.description
      )}`;
  const ogImageUrl = post.ogImage ? `${siteUrl}${post.ogImage}` : image;

return {
  title: post.title,
  description: post.description,

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: post.title,
    description: post.description,
    publishedTime: new Date(post.createdAt).toISOString(),
    authors: post.author ? [post.author] : undefined,
    tags: post.keywords,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [ogImageUrl],
  },
};
}
 



export default async function BlogPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;

  let postMetadata = await getContentMetadata(slug);

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
        <h1 className="leading-10! font-extrabold">{title}</h1>
        <div data-tts-ignore className="flex text-xs sm:text-sm items-center gap-2 justify-between">
          <section className="flex items-center gap-2">
            <p className="text-stone-700  my-0!">{format(createdAt, "MMMM d, yyyy")}</p>
            <p className="text-stone-700 my-0!">•</p>
            <p className=" my-0!">{readTime} min read</p>
          </section>
          <p data-tts-ignore className="text-stone-700 hidden sm:block my-0!">
            Updated{" "}
            {formatDistanceToNow(updatedAt, {
              addSuffix: true,
            })}
          </p>
        </div>
        {/* <div className="w-full outline mt-10 sm:max-h-96 overflow-hidden rounded-lg"> */}
        <Image src={coverImage} alt={title} width={500} height={500} className="h-full w-full" />
        {/* </div> */}
        <TTSAudioReader articleSelector="#tts-content" />
        <div id="tts-content">
          <Post />
        </div>
      </article>
      <BlogReactions slug={slug} />
      <CommentSection slug={slug} />
    </BlogPostWrapper>
  );
}
