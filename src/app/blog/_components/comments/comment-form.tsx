"use client";

import { useState, SyntheticEvent } from "react";
import { generateGradient, getInitials } from "@/lib/types/comment";

interface CommentFormProps {
  slug: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ slug, onCommentAdded }: Readonly<CommentFormProps>) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gradient = name.trim().length >= 2 ? generateGradient(name) : "linear-gradient(135deg, #ccc, #999)";
  const initials = name.trim().length >= 2 ? getInitials(name) : "?";

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (content.trim().length < 3) {
      setError("Comment must be at least 3 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/comments/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), content: content.trim(), honeypot }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to post comment");
        return;
      }

      setName("");
      setContent("");
      onCommentAdded();
    } catch {
      setError("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3 items-start">
        <div
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-all duration-300"
          style={{ background: gradient }}
        >
          {initials}
        </div>
        <div className="flex-1 space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400"
          />
          <textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400 resize-none"
          />
        </div>
      </div>

      {/* Honeypot field - hidden from humans, bots will fill it */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || name.trim().length < 2 || content.trim().length < 3}
          className="px-4 py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 font-medium hover:bg-stone-700 dark:hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
