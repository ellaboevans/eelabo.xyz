import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { impactMetrics, projects, techInhabitants, tools } from "@/lib/constants/data";
import ExternalLink from "@/components/external-link";
import { homeSchema } from "@/schema/home-schema";
import JsonLd from "@/components/json-ld";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineer - Evans Elabo",
  description:
    "I am a Ghanaian software engineer focused on system architecture, systems engineering, open-source projects, and developer tools. Writing code is always the last thing I do. I think through problems, design solutions, and build consensus before writing a single line of code.",
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
      <div className="mt-6">
        I'm always open to new opportunities and collaborations. Feel free to explore my portfolio
        and{" "}
        <ExternalLink target="_self" href={"/book"}>
          reach out
        </ExternalLink>{" "}
        if you'd like to work together on your next project.
      </div>
      <section className="flex gap-4 py-6  text-black dark:text-stone-300 items-center">
        <a
          href="https://github.com/ellaboevans"
          target="_blank"
          rel="noopener noreferrer"
          className="  opacity-60 hover:opacity-100 transition-all duration-300"
          aria-label="GitHub"
        >
          <Icon icon={"line-md:github-loop"} className=" w-6 h-6" />
        </a>
        <a
          href="https://twitter.com/dev_concept"
          target="_blank"
          rel="noopener noreferrer"
          className=" opacity-60 hover:opacity-100 transition-all duration-300"
          aria-label="Twitter"
        >
          <Icon icon={"line-md:twitter-x"} className=" w-6 h-6" />
        </a>
        <Link
          href="/book"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-all duration-300"
          aria-label="Book Consultation"
        >
          <Icon icon="ph:calendar-check" className="w-3.5 h-3.5" />
          Book Call
        </Link>

        <div className="w-full relative my-2">
          <hr className="w-full border-stone-200 dark:border-stone-700" />
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
            <div className="h-full w-1/3 bg-linear-to-r from-transparent via-stone-500 dark:via-stone-400 to-transparent animate-shootingStar"></div>
          </div>
        </div>
      </section>

      {/* Impact & Key Metrics */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        {impactMetrics.map((metric) => (
          <div
            key={metric.label}
            className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 backdrop-blur-xs flex flex-col justify-between hover:border-amber-500/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                {metric.label}
              </span>
              <Icon icon={metric.icon} className="w-4 h-4 text-amber-500 opacity-80" />
            </div>
            <div>
              <p className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {metric.value}
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            All Projects ({projects.length})
            <Icon icon="ph:arrow-right" className="w-3.5 h-3.5" />
          </Link>
        </div>
        <section className="grid sm:grid-cols-2 gap-5">
          {featuredProjects.map((project) => {
            return (
              <div
                key={project.link}
                className="group flex flex-col justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 overflow-hidden hover:border-amber-500/40 transition-all duration-300 shadow-xs"
              >
                <div>
                  {project.image && (
                    <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-800 border-b border-stone-200/60 dark:border-stone-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.metric && (
                        <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
                          <Icon icon="ph:sparkle-fill" className="w-3 h-3 text-amber-400" />
                          {project.metric}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                        {project.title}
                      </h3>
                      {project.year && (
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech.label}
                          className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 border border-stone-200/60 dark:border-stone-800"
                        >
                          <Icon icon={tech.icon} className="w-3 h-3" />
                          {tech.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-stone-50/60 dark:bg-stone-900/60 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    Live Demo
                    <Icon icon="solar:link-round-angle-line-duotone" className="w-3.5 h-3.5" />
                  </a>
                  {project.article && (
                    <Link
                      href={project.article}
                      className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 transition-colors"
                    >
                      Case Study →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
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
                        className="bg-gray-800 text-red-400! px-1 rounded text-sm font-mono"
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
