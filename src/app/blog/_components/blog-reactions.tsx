"use client";

import { LikeButton, ClapButton } from "@lyket/react";

type BlogReactionsProps = {
  slug: string;
};

export default function BlogReactions({ slug }: Readonly<BlogReactionsProps>) {
  return (
    <div className="flex flex-wrap items-center gap-6 py-6">
      <span className="text-sm text-stone-500 dark:text-stone-400">
        React to this post:
      </span>
      <div className="flex items-center gap-4">
        <LikeButton
          namespace="blog"
          id={slug}
          component={LikeButton.templates.Twitter}
        />
        <ClapButton
          namespace="blog"
          id={`${slug}-clap`}
          component={ClapButton.templates.Medium}
        />
      </div>
    </div>
  );
}
