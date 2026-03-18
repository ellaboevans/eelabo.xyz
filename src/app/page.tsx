import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { projects, techInhabitants, tools } from "@/lib/constants/data";
import ExternalLink from "@/components/external-link";
import { homeSchema } from "@/schema/home-schema";
import JsonLd from "@/components/json-ld";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineer - Evans Elabo",
  description:
    "I am a Ghanaian software engineer focused on sytem architecture, systems engineerin, open-source projects, and developer tools. Writing code is always the last thing I do. I think through problems, design solutions, and build consensus before writing a single line of code.",
  path: "/",
  keywords: [
    "Evans Elabo",
    "Software Engineer",
    "TypeScript Engineer",
    "Frontend Engineer",
    "Angular Developer",
  ],
});

export default function Home() {
  const featuredProjects = projects.slice(0, 2);
  return (
    <div>
      <JsonLd id="home-schema" data={homeSchema as unknown as Record<string, unknown>} />
      <div className="mt-8">
        <div>
          <span>
            <h1 className=" text-4xl pb-1 font-bold text-amber-500">Evans Elabo</h1>
          </span>
          <p className=" text-stone-600 dark:text-stone-500 flex items-center gap-1">
            {" "}
            <Icon icon={"circum:map-pin"} /> Software Engineer, Ghana.
          </p>
        </div>
      </div>
      <div className="mt-6">
        I specialize in building high-performing front-ends with <span>Angular</span> and{" "}
        <span>Next.js</span>, and robust backends powered by <span>Node.js</span>,{" "}
        <span>Prisma</span>, <span>Supabase</span> and sometimes <span>Golang</span>. I love
        designing clean architectures, mentoring developers, and exploring the intersection of
        technology and community growth. Outside coding, I’m deeply fascinated by{" "}
        <ExternalLink href="https://en.wikipedia.org/wiki/Human-centered_design">
          human-centered design
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink href="https://en.wikipedia.org/wiki/Constructed_language">
          constructed languages
        </ExternalLink>
        .
      </div>
      <div className=" mt-6">
        I'm always looking for opportunities to learn and grow. Feel free to explore my portfolio
        and <ExternalLink href={"mailto:ellaboevans@gmail.com"}>reach out</ExternalLink> if you're
        ready to collaborate on your next project!
      </div>
      <section className="flex gap-4 py-6  text-black dark:text-stone-300 items-center">
        <a
          href="https://github.com/ellaboevans"
          target="_blank"
          rel="noopener noreferrer"
          className="  opacity-60 hover:opacity-100 transition-all duration-300"
        >
          <Icon icon={"line-md:github-loop"} className=" w-6 h-6" />
        </a>
        <a
          href="https://twitter.com/dev_concept"
          target="_blank"
          rel="noopener noreferrer"
          className=" opacity-60 hover:opacity-100 transition-all duration-300"
        >
          <Icon icon={"hugeicons:new-twitter"} className=" w-6 h-6" />
        </a>

        <div className="w-full relative my-2">
          <hr className="w-full border-stone-200 dark:border-stone-700" />
          <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-stone-500 dark:via-stone-400 to-transparent animate-shootingStar"></div>
          </div>
        </div>
      </section>
      <section className=" mt-10">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <section className="grid sm:grid-cols-2 mt-3 gap-4">
          {featuredProjects.map((project) => {
            return (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.link}
                className=" group"
              >
                <span className={` flex mb-2 items-center gap-2 w-fit`}>
                  <p className={`font-bold text-sm ${project.colors} p-1  px-2 rounded-md`}>
                    {project.title}
                  </p>{" "}
                  <Icon
                    icon={"solar:link-round-angle-line-duotone"}
                    className={` w-4 h-4 opacity-0 group-hover:opacity-100  transition-all duration-300`}
                  />
                </span>
                <p className={`mb-3`}>{project.description}</p>
              </Link>
            );
          })}
          <Link
            href={"https://github.com/ellaboevans?tab=repositories"}
            className=" flex items-center gap-0 underline hover:gap-1 transition-all duration-300"
          >
            See archived projects <Icon className=" rotate-90" icon={"stash:arrow-up-light"} />
          </Link>
        </section>
      </section>
      <section className=" mt-10">
        <h2 className="text-2xl font-bold mb-6">Tools</h2>
        <section className=" flex flex-col gap-4">
          {tools.map((tool) => {
            return (
              <Link
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                key={tool.link}
                className=" group"
              >
                <span className={` flex mb-2 items-center gap-2 w-fit`}>
                  <p className={`font-bold text-sm ${tool.colors} p-1  px-2 rounded-md`}>
                    {tool.title}
                  </p>{" "}
                  <Icon
                    icon={"solar:link-round-angle-line-duotone"}
                    className={` w-4 h-4 opacity-0 group-hover:opacity-100  transition-all duration-300`}
                  />
                </span>
                <p className="mb-3">
                  {tool.description.split(/(`[^`]+`)/g).map((part, index) =>
                    part.startsWith("`") && part.endsWith("`") ? (
                      <code
                        key={index + 1}
                        className="bg-gray-800 !text-red-400 px-1 rounded text-sm font-mono"
                      >
                        {part.slice(1, -1)}
                      </code>
                    ) : (
                      part
                    )
                  )}
                </p>
              </Link>
            );
          })}
        </section>
      </section>
      <section className=" mt-10">
        <h2 className="text-2xl font-bold mb-6">Tech Inhabitants</h2>
        <section className=" flex flex-col gap-4">
          {techInhabitants.map((tech) => {
            return (
              <Link
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                key={tech.link}
                className=" group"
              >
                <div className="flex w-full items-center justify-between">
                  <span className={` flex mb-2 items-center gap-2 w-fit`}>
                    <p className={`font-bold text-sm ${tech.colors} p-1  px-2 rounded-md`}>
                      {tech.name}
                    </p>{" "}
                    <Icon
                      icon={"solar:link-round-angle-line-duotone"}
                      className={` w-4 h-4 opacity-0 group-hover:opacity-100  transition-all duration-300`}
                    />
                  </span>
                  <span>
                    <p className=" italic opacity-70">{tech.role}</p>
                    <p className={`  mb-3`}>{tech.duration}</p>
                  </span>
                </div>
                <p className={` mb-3`}>{tech.description}</p>
              </Link>
            );
          })}
        </section>
      </section>
    </div>
  );
}
