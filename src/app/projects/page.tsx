import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import Back from "@/components/back";
import Link from "next/link";
import { projects } from "@/lib/constants/data";
import ProjectsView from "./_components/projects-view";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "A collection of projects I've built, from production applications to open-source developer tools. Each represents a unique engineering challenge and learning experience.",
  path: "/projects",
  keywords: [
    "Software Projects",
    "Portfolio",
    "Web Development",
    "Full Stack Applications",
    "Developer Tools",
    "Open Source",
  ],
});

export default function ProjectsPage() {
  return (
    <div>
      <div className="mt-4">
        <Back />
      </div>

      <h1 className="text-4xl pb-1 font-bold mt-8">Projects</h1>
      <p className="dark:text-stone-400 text-stone-500 mt-2">
        A collection of projects I&apos;ve built, from production applications to open-source
        developer tools. Each represents a unique challenge, architectural decision, and learning
        experience.
      </p>

      {/* Interactive Projects Directory */}
      <ProjectsView projects={projects} />

      <section className="mt-14 p-6 rounded-xl border border-dashed border-stone-300 dark:border-stone-800 text-center">
        <p className="text-stone-600 dark:text-stone-400">
          Want to see more experiments? Check out my{" "}
          <a
            href="https://github.com/ellaboevans"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:underline font-medium"
          >
            GitHub profile
          </a>{" "}
          or{" "}
          <Link href="/playground" className="text-amber-500 hover:underline font-medium">
            explore SmallWorld
          </Link>{" "}
          for interactive playgrounds.
        </p>
      </section>
    </div>
  );
}
