import Link from "next/link";
import { Icon } from "@iconify/react";
import { ContentMetadata } from "@/lib/utils/content-metadata";

interface PostNavigationProps {
  prevPost: ContentMetadata | null;
  nextPost: ContentMetadata | null;
  relatedPosts: ContentMetadata[];
}

export default function PostNavigation({
  prevPost,
  nextPost,
  relatedPosts,
}: Readonly<PostNavigationProps>) {
  return (
    <div data-tts-ignore className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4 flex items-center gap-2">
            <Icon icon="ph:sparkle-bold" className="w-4 h-4 text-amber-500" />
            Related Articles
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors text-sm line-clamp-2">
                    {post.title}
                  </h4>
                </div>
                <span className="text-xs text-amber-500 font-medium flex items-center gap-1 mt-3">
                  Read article
                  <Icon icon="ph:arrow-right" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next Pagination */}
      <div className="grid sm:grid-cols-2 gap-4">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/20 hover:border-amber-500/40 transition-all flex flex-col items-start"
          >
            <span className="text-xs text-stone-400 flex items-center gap-1 mb-1">
              <Icon icon="ph:arrow-left" className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Previous Article
            </span>
            <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-500 transition-colors line-clamp-1">
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/20 hover:border-amber-500/40 transition-all flex flex-col items-end text-right sm:col-start-2"
          >
            <span className="text-xs text-stone-400 flex items-center gap-1 mb-1">
              Next Article
              <Icon icon="ph:arrow-right" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-500 transition-colors line-clamp-1">
              {nextPost.title}
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
