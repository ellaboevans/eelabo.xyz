"use client";

import BlogThumbnail from "@/app/blog/_components/blog-thumbnail";
import { Icon } from "@iconify/react";
import { ContentMetadata } from "@/lib/utils/content-metadata";
import { useState, useEffect, useMemo } from "react";
import BlogList from "./bloglist";
import { motion, AnimatePresence } from "framer-motion";
import { loadItem, saveItem } from "@/lib/utils/local-storage";

export default function BlogView({ posts }: { posts: ContentMetadata[] }) {
  const mode = loadItem("mode", "grid");
  const [view, setView] = useState<"grid" | "list">(mode);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    saveItem("mode", view);
  }, [view]);

  // Extract top unique tags from all posts
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      if (post.keywords) {
        for (const kw of post.keywords) {
          const norm = kw.trim();
          if (norm) {
            counts.set(norm, (counts.get(norm) || 0) + 1);
          }
        }
      }
    }
    // Sort tags by frequency
    const sorted = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);

    return ["All", ...sorted.slice(0, 7)];
  }, [posts]);

  // Filter posts by query and tag
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "All" ||
        post.keywords?.some((k) => k.toLowerCase() === selectedTag.toLowerCase());

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.keywords?.some((k) => k.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="mt-8 w-full">
      {/* Search Bar & View Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Icon
            icon="ph:magnifying-glass-bold"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search essays by title, topic, or keyword..."
            className="w-full pl-9 pr-9 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              aria-label="Clear search"
            >
              <Icon icon="ph:x-circle-fill" className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 self-end sm:self-center bg-stone-100 dark:bg-stone-800/80 p-1 rounded-lg border border-stone-200/60 dark:border-stone-700/60">
          <button
            type="button"
            className={`${
              view === "grid"
                ? "bg-white dark:bg-stone-700 text-amber-500 shadow-xs"
                : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            } transition-all duration-200 rounded-md p-1.5 cursor-pointer`}
            onClick={() => setView("grid")}
            aria-label="Grid view"
            title="Grid view"
          >
            <Icon icon="foundation:thumbnails" className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={`${
              view === "list"
                ? "bg-white dark:bg-stone-700 text-amber-500 shadow-xs"
                : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            } transition-all duration-200 rounded-md p-1.5 cursor-pointer`}
            onClick={() => setView("list")}
            aria-label="List view"
            title="List view"
          >
            <Icon icon="lucide:list" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Topic Tag Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
        <span className="text-xs text-stone-400 font-medium mr-1 shrink-0">Topics:</span>
        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-amber-500 text-stone-900 font-semibold shadow-xs"
                  : "bg-stone-100 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Results Count / Reset */}
      {(searchQuery || selectedTag !== "All") && (
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-4 px-1">
          <span>
            Showing {filteredPosts.length} of {posts.length} articles
          </span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
            }}
            className="text-amber-500 hover:underline font-medium cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-xl border border-dashed border-stone-200 dark:border-stone-800 my-4">
          <Icon
            icon="ph:newspaper-clipping-bold"
            className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto mb-3"
          />
          <p className="text-stone-700 dark:text-stone-300 font-medium mb-1">
            No articles match your criteria
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Try adjusting your search query or topic filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
            }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="space-y-4 mt-2 pl-0 list-none grid grid-cols-1 md:grid-cols-2 gap-4">
                <BlogThumbnail posts={filteredPosts} />
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <BlogList posts={filteredPosts} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
