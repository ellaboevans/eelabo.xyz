"use client";

import { CommentResponse, generateGradient, getInitials } from "@/lib/types/comment";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
  comment: CommentResponse;
}

export default function CommentItem({ comment }: Readonly<CommentItemProps>) {
  const gradient = generateGradient(comment.name);
  const initials = getInitials(comment.name);

  return (
    <div className="flex gap-3 p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50">
      <div
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
        style={{ background: gradient }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-stone-900 dark:text-stone-100">
            {comment.name}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="mt-1 text-stone-700 dark:text-stone-300 whitespace-pre-wrap wrap-break-word">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
