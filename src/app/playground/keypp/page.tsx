import Keypp from "./_components/keypp";
import Back from "@/components/back";
import { Metadata } from "next";
import ExternalLink from "@/components/external-link";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Keypp",
  description: "A minimal, interactive typing speed app.",
  path: "/playground/keypp",
  keywords: ["Typing Test", "Speed Typing", "Keyboard Practice"],
});

export default function KeyppPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Keypp</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        A minimal, interactive typing speed app.
      </p>
      <Keypp />
      <div className="mt-8">
        <small>
          Source code available at{" "}
          <ExternalLink href="https://github.com/ellaboevans/eelabo.xyz/tree/main/src/app/playground/keypp">
            @eelabo/github.io/keypp
          </ExternalLink>
        </small>
      </div>
    </div>
  );
}
