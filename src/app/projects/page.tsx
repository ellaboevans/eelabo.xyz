import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import Back from "@/components/back";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "A collection of projects I've built, from production applications to open-source tools. Each project represents a unique challenge and learning experience.",
  path: "/projects",
  keywords: [
    "Projects",
    "Portfolio",
    "Web Development",
    "Software Engineering",
    "Case Studies",
  ],
});

type Project = {
  title: string;
  description: string;
  longDescription?: string;
  link: string;
  github?: string;
  stack: { label: string; icon: string }[];
  colors: string;
  tag: string[];
  highlights?: string[];
  role?: string;
  year?: string;
};

const allProjects: Project[] = [
  {
    title: "Ark: VS Code Disaster Recovery",
    description:
      "A VS Code extension that backs up and restores your entire environment (extensions, settings, keybindings) in one click. Never lose your setup again.",
    longDescription:
      "Ark is a disaster recovery tool for developers. It securely backs up your VS Code environment to a private GitHub Gist and restores it instantly, with a smart diff preview and one-click recovery. Open source, privacy-first, and built for productivity.",
    link: "https://marketplace.visualstudio.com/items?itemName=ellaboevans.ark-disaster-recovery",
    github: "https://github.com/ellaboevans/ark",
    stack: [
      { label: "TypeScript", icon: "logos:typescript-icon" },
      { label: "VS Code API", icon: "vscode-icons:file-type-vscode" },
      { label: "GitHub Gist", icon: "logos:github-icon" },
    ],
    colors: "bg-yellow-900/30 text-yellow-400 border border-dashed border-yellow-500/30",
    tag: ["tool", "open-source", "productivity"],
    highlights: [
      "One-click backup and restore",
      "Smart diff preview before restore",
      "Auto-backup, privacy-first (no third-party servers)",
      "Open source and auditable",
    ],
    role: "Creator",
    year: "2026",
  },
  {
    title: "ST School",
    description:
      "A school management application designed to streamline administrative tasks and enhance communication between instructors and students.",
    longDescription:
      "Built a comprehensive school management system that handles student enrollment, grade tracking, attendance management, and parent-teacher communication. The platform serves multiple schools with role-based access control.",
    link: "https://school.slightlytechie.com",
    stack: [
      { label: "React", icon: "logos:react" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
    ],
    colors: "bg-purple-900/30 text-purple-300 border border-dashed border-purple-500/30",
    tag: ["frontend", "production"],
    highlights: [
      "Role-based access control for admins, teachers, and students",
      "Real-time grade and attendance tracking",
      "Parent notification system",
    ],
    role: "Frontend Developer",
    year: "2024",
  },
  {
    title: "JED",
    description:
      "An online event management platform that integrates an offline USSD voting system.",
    longDescription:
      "Developed a full-stack event management solution with a unique selling point: offline voting via USSD. This allows event organizers to reach audiences without internet access while maintaining real-time vote tallying.",
    link: "https://jedevent.com",
    stack: [
      { label: "Next.js", icon: "logos:nextjs" },
      { label: "Postgres", icon: "logos:postgres" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
      { label: "Nest", icon: "logos:nest" },
    ],
    colors: "bg-emerald-900/30 text-emerald-500 border border-dashed border-emerald-500/30",
    tag: ["frontend", "backend", "production"],
    highlights: [
      "USSD integration for offline voting",
      "Real-time vote tallying and analytics",
      "Multi-event management dashboard",
    ],
    role: "Full Stack Developer",
    year: "2024",
  },
  {
    title: "Schematics",
    description:
      "A custom Angular schematic that simplifies and standardizes the generation of Angular components with ChangeDetectionStrategy.OnPush by default.",
    link: "https://github.com/ellaboevans/schematics",
    github: "https://github.com/ellaboevans/schematics",
    stack: [{ label: "Angular", icon: "logos:angular" }],
    colors: "bg-cyan-900/30 text-cyan-500 border border-dashed border-cyan-500/30",
    tag: ["tool", "open-source"],
    highlights: [
      "Enforces performance best practices",
      "Customizable component templates",
      "CLI integration",
    ],
    role: "Creator",
    year: "2024",
  },
  {
    title: "Storyblok Field Plugin",
    description:
      "A Storyblok field plugin application showcasing fundamental features for field plugins, including value updates, modal toggling, and asset selection.",
    link: "https://github.com/ellaboevans/sb-cl-custom-plugin",
    github: "https://github.com/ellaboevans/sb-cl-custom-plugin",
    stack: [
      { label: "React.js", icon: "logos:react" },
      { label: "TypeScript", icon: "logos:typescript-icon" },
    ],
    colors: "bg-blue-500/10 text-blue-300 border border-dashed border-blue-500/30",
    tag: ["tool", "open-source", "CMS"],
    highlights: [
      "Custom field type for Storyblok CMS",
      "Asset picker integration",
      "Modal-based editing experience",
    ],
    role: "Creator",
    year: "2024",
  },
];

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  return (
    <article className="group relative">
      <div
        className={`${project.colors} rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {project.title}
              </h2>
              {project.year && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200/50 dark:bg-stone-700/50 text-stone-600 dark:text-stone-400">
                  {project.year}
                </span>
              )}
            </div>

            {project.role && (
              <p className="text-sm text-stone-500 dark:text-stone-400">{project.role}</p>
            )}

            <p className="text-stone-700 dark:text-stone-300">
              {project.longDescription || project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-1 mt-4">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2"
                  >
                    <Icon
                      icon="ph:check-circle-fill"
                      className="w-4 h-4 text-amber-500 mt-0.5 shrink-0"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {project.stack.map((tech) => (
                <span
                  key={tech.label}
                  className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md bg-stone-100/50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400"
                >
                  <Icon icon={tech.icon} className="w-3.5 h-3.5" />
                  {tech.label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-stone-200/30 dark:border-stone-700/30">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Icon icon="ph:arrow-square-out" className="w-4 h-4" />
                View Project
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-stone-500 hover:text-stone-400 transition-colors flex items-center gap-1"
                >
                  <Icon icon="mdi:github" className="w-4 h-4" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const productionProjects = allProjects.filter((p) => p.tag.includes("production"));
  const openSourceProjects = allProjects.filter((p) => p.tag.includes("open-source"));

  return (
    <div>
      <div className="mt-4">
        <Back />
      </div>

      <h1 className="text-4xl pb-1 font-bold mt-8">Projects</h1>
      <p className="dark:text-stone-400 text-stone-500 mt-2">
        A collection of projects I&apos;ve built, from production applications to open-source
        tools. Each represents a unique challenge and learning experience.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Icon icon="ph:rocket-launch" className="w-6 h-6 text-amber-500" />
          Production
        </h2>
        <div className="grid gap-6">
          {productionProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Icon icon="ph:open-ai-logo" className="w-6 h-6 text-amber-500" />
          Open Source
        </h2>
        <div className="grid gap-6">
          {openSourceProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-12 p-6 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-center">
        <p className="text-stone-600 dark:text-stone-400">
          Want to see more? Check out my{" "}
          <a
            href="https://github.com/ellaboevans"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:underline"
          >
            GitHub profile
          </a>{" "}
          or{" "}
          <Link href="/playground" className="text-amber-500 hover:underline">
            explore my playground
          </Link>{" "}
          for interactive demos.
        </p>
      </section>
    </div>
  );
}
