import { getAllContentMetadata } from "@/lib/utils/content-metadata";
import BlogView from "./_components/shared-layout";
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/json-ld";
import { getAbsoluteUrl, SITE_CONFIG } from "@/lib/seo/site";
import { Icon } from "@iconify/react";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Thoughts, project notes, and practical discoveries across web technologies and software engineering.",
  path: "/blog",
  keywords: ["Software Engineering Blog", "Web Development", "Next.js", "Angular", "TypeScript"],
});

export default async function Blog() {
  try {
    const posts = await getAllContentMetadata({
      published: true,
      sortBy: "createdAt",
      sortDirection: "desc",
    });

    const blogSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${SITE_CONFIG.authorName} Blog`,
      description:
        "Thoughts, project notes, and practical discoveries across web technologies and software engineering.",
      url: getAbsoluteUrl("/blog"),
      author: {
        "@type": "Person",
        name: SITE_CONFIG.authorName,
        url: getAbsoluteUrl("/"),
      },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        url: getAbsoluteUrl(`/blog/${post.slug}`),
        image: post.coverImage,
        author: {
          "@type": "Person",
          name: post.author || SITE_CONFIG.authorName,
        },
      })),
    };

    return (
      <div className="">
        <JsonLd id="blog-list-schema" data={blogSchema} />
        <div className="flex items-center justify-between mt-8 flex-wrap gap-2">
          <h1 className="text-4xl pb-1 font-bold">Philosophy</h1>
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
            title="Subscribe via RSS"
          >
            <Icon icon="ph:rss-simple-bold" className="w-3.5 h-3.5" />
            RSS Feed
          </a>
        </div>
        <p>
          This is where i share my thoughts, projects and discoveries in web dev technologies and
          software engineering.
        </p>
        {posts.length === 0 ? (
          <p className="mt-4">No blog posts published yet.</p>
        ) : (
          <BlogView posts={posts} />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error reading posts:", error);
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <div className="p-4 bg-red-50 text-red-700 rounded">
          Error loading posts. Please check the console for details.
        </div>
      </div>
    );
  }
}
