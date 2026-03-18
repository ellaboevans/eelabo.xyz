import Back from "@/components/back";
import Regfatto from "./_components/regfatto";
import ExternalLink from "@/components/external-link";
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Regfatto",
  description: "An interactive regex playground with readable expression explanations.",
  path: "/playground/regfatto",
  keywords: ["Regex Playground", "Regular Expressions", "Regex Learning Tool"],
});
export default function RegexPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Regfatto</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        Inspired by <ExternalLink href="https://regex101.com/">regex101.com</ExternalLink>, regular
        expressions explanations made easy.
      </p>
      <Regfatto />
      <div className="mt-8">
        <small>
          Source code available at{" "}
          <ExternalLink href="https://github.com/ellaboevans/eelabo.xyz/blob/main/src/app/playground/regfatto/page.tsx">
            @eelabo/github.io/regfatto
          </ExternalLink>
        </small>
      </div>
    </div>
  );
}
