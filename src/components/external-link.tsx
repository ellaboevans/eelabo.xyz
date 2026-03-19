import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HTMLAttributeAnchorTarget } from "react";

export default function ExternalLink({
  href,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
}: Readonly<{
  href: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className="inline-flex underline items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
      aria-label={`${typeof children === "string" ? children : ""} (opens in new tab)`}
    >
      {children} <Icon className="rotate-45" icon={"stash:arrow-up-light"} aria-hidden="true" />
      <span className="sr-only">(opens in new tab)</span>
    </Link>
  );
}
