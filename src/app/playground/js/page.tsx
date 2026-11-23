import JsPlayground from "./_components/js-playground";
import Back from "@/components/back";
import ExternalLink from "@/components/external-link";
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Truth JS",
  description: "A playground for testing and experimenting with JavaScript code.",
  path: "/playground/js",
  keywords: ["JavaScript Playground", "Code Runner", "JS Sandbox"],
});
export default function JsPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Truth JS</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        A playground for testing and experimenting with JavaScript code.
      </p>
      <JsPlayground />
      <small>
        Source code available at{" "}
        <ExternalLink href="https://github.com/ellaboevans/eelabo.xyz/blob/main/src/app/playground/js/page.tsx">
          @eelabo/github.io/js
        </ExternalLink>
      </small>
    </div>
  );
}
