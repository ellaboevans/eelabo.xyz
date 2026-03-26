"use client";

import { useState, useEffect, useCallback } from "react";
import { CommentResponse } from "@/lib/types/comment";
import CommentItem from "./comment-item";
import CommentForm from "./comment-form";

interface CommentSectionProps {
  slug: string;
}

export default function CommentSection({ slug }: Readonly<CommentSectionProps>) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
      setError(null);
    } catch {
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  return (
    <section className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700" data-tts-ignore>
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      <CommentForm slug={slug} onCommentAdded={handleCommentAdded} />

      <div className="mt-8 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-stone-300 border-t-stone-600 dark:border-stone-600 dark:border-t-stone-300" />
          </div>
        ) : error ? (
          <p className="text-center text-stone-500 dark:text-stone-400 py-8">{error}</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-stone-500 dark:text-stone-400 py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
}
