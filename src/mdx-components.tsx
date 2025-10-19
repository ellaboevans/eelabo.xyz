import type { MDXComponents } from "mdx/types";
import ExternalLink from "@/components/external-link";
import CopyToClipboard from "./components/copy-to-clipboard";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...props }) => (
      <ExternalLink href={href} {...props}>
        {children}
      </ExternalLink>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <span
            className="font-mono text-sm bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-1 py-0.5 rounded"
            {...props}
          >
            {children}
          </span>
        );
      }
      return (
        <div
          className={`font-mono flex items-start group relative text-sm ${className}`}
          {...props}
        >
          <div>{children}</div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute h-fit -top-1.5 right-0 duration-200">
            <CopyToClipboard children={children} />
          </div>
        </div>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="font-mono text-sm bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 p-4 rounded-lg overflow-x-auto border border-stone-200 dark:border-stone-700 my-4"
        {...props}
      >
        {children}
      </pre>
    ),
  };
}
