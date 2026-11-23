import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { impactMetrics, projects, techInhabitants, tools } from "@/lib/constants/data";
import ExternalLink from "@/components/external-link";
import { homeSchema } from "@/schema/home-schema";
import JsonLd from "@/components/json-ld";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import CalendlyButton from "@/components/calendly-button";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineer & Researcher - Evans Elabo",
  description:
    "Software engineer and researcher working at the intersection of full-stack development and computational linguistics. Building high-performing front-ends with Angular & Next.js, and researching NLP for West African languages.",
  path: "/",
  keywords: [
    "Evans Elabo",
    "Software Engineer",
    "Researcher",
    "Computational Linguistics",
    "NLP",
    "TypeScript Engineer",
    "Frontend Engineer",
    "Angular Developer",
  ],
});

export default function Home() {
  const featuredProjects = projects.slice(0, 4);
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
            <Icon icon={"circum:map-pin"} /> Software Engineer & Researcher, Ghana.
          </p>
        </div>
      </div>
      <div className="mt-6">
        I am a software engineer and researcher working at the intersection of full-stack
        development and computational linguistics. On the engineering side, I build high-performing
        front-ends with Angular and Next.js, and robust backends powered by Node.js, Prisma,
        Supabase, and Golang. On the research side, I investigate orthographic variation, corpus
        construction, and NLP evaluation for West African languages as I prepare for doctoral
        studies in Linguistics. Outside of code and corpora, I’m deeply fascinated by{" "}
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
        I&apos;m always open to new engineering opportunities, research collaborations, and
        conversations. Feel free to explore my portfolio and{" "}
        <ExternalLink href="/book">
          reach out
        </ExternalLink>{" "}
        if you&apos;d like to connect.
      </div>
      <section className="flex gap-4 py-6 text-black dark:text-stone-300 items-center">
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://github.com/ellaboevans"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-all duration-300 shrink-0"
            aria-label="GitHub"
          >
            <Icon icon={"line-md:github-loop"} className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/dev_concept"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-all duration-300 shrink-0"
            aria-label="Twitter"
          >
            <Icon icon={"line-md:twitter-x"} className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/evanselabo"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-all duration-300 shrink-0"
            aria-label="LinkedIn"
          >
            <Icon icon={"line-md:linkedin"} className="w-6 h-6" />
          </a>
          <CalendlyButton
            className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            ariaLabel="Book Consultation"
          >
            <Icon icon="ph:calendar-check" className="w-3.5 h-3.5" />
            Book Call
          </CalendlyButton>
        </div>

        <div className="flex-1 min-w-[30px] relative my-2">
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
                    {project.tag.includes("research") ? "Read Paper" : "Live Demo"}
                    <Icon
                      icon={
                        project.tag.includes("research")
                          ? "ph:file-text-bold"
                          : "solar:link-round-angle-line-duotone"
                      }
                      className="w-3.5 h-3.5"
                    />
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 transition-colors"
                    >
                      <Icon icon="line-md:github-loop" className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
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

      {/* Computational Linguistics Research Spotlight */}
      <section className="mt-12 rounded-2xl border border-stone-200 dark:border-stone-800 bg-linear-to-b from-stone-50/70 to-white/30 dark:from-stone-900/40 dark:to-stone-950/20 p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Icon icon="ph:translate-bold" className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">Computational Linguistics Research</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Research
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Investigating Akan dialect continuum separation & error analysis in off-the-shelf LID systems
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/lab"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <Icon icon="ph:flask-bold" className="w-3.5 h-3.5" />
              Open Lab
            </Link>
            <a
              href="https://github.com/ellaboevans/ghanaian-langid-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 transition-colors"
            >
              <Icon icon="line-md:github-loop" className="w-4 h-4" />
              Repo
            </a>
          </div>
        </div>

        <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <p>
            An empirical error analysis evaluating how well state-of-the-art LID models (
            <span className="font-semibold text-stone-800 dark:text-stone-200">GlotLID v3</span>,{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">AfroLID 1.5</span>, and a character n-gram linear SVM baseline
            ) distinguish closely related Ghanaian varieties:{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">Twi (Asante & Akuapem)</span>,{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">Fante</span>,{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">Nzema</span>, and{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">Ghanaian Pidgin</span>.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-purple-400">Informal Orthography Penalty</span>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                  Substituting ASCII vowels (<code className="text-amber-400 font-mono">e/o</code>) for standard Ghanaian characters (<code className="text-amber-400 font-mono">ɛ/ɔ</code>) causes error rates to spike from 2%–27% up to <span className="text-rose-400 font-semibold">42%–88%</span>.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-purple-400">Regional Pidgin Asymmetry</span>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                  Pretrained models recognize Ghanaian Pidgin primarily when it borrows Nigerian Pidgin markers (<span className="text-stone-300 font-semibold">88%</span> recall with vs <span className="text-rose-400 font-semibold">22%</span> without). AfroLID falls back to Wolof for 48% of Pidgin tweets.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-purple-400">Author-Curated Datasets</span>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                  Contributed 47 custom-authored native Nzema sentences, hand-verified 375 Akan social media tweets, and designed stress tests for code-mixing and lookalike characters (Greek <code className="text-amber-400 font-mono">ε</code>, IPA <code className="text-amber-400 font-mono">ᴐ</code>).
                </p>
              </div>
            </div>
          </div>
        </div>
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
