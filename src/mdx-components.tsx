import type { MDXComponents } from "mdx/types";
import ExternalLink from "@/components/external-link";
import CopyToClipboard from "./components/copy-to-clipboard";
import { Code } from "bright";

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
            className="font-mono text-sm bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 px-1 py-0.5 rounded"
            {...props}
          >
            {children}
          </span>
        );
      }
      return (
        <div className={`font-mono flex items-start group relative text-sm ${className}`}>
          <Code
            lang="angular-ts"
            theme={"github-dark"}
            className={`font-mono w-full ${className} !m-0`}
            {...props}
          >
            {children}
          </Code>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute h-fit top-2.5 right-3 duration-200">
            <CopyToClipboard>{children}</CopyToClipboard>
          </div>
        </div>
      );
    },
    pre: ({ children, ...props }) => (
      <pre className="w-full !p-0" {...props}>
        {children}
      </pre>
    ),
  };
}
