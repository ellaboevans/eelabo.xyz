"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/constants/data";
import ProjectDialog from "@/components/project-dialog";

type TabType = "all" | "research" | "production" | "open-source" | "tool";

export default function ProjectsView({ projects }: Readonly<{ projects: Project[] }>) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const tabs: { label: string; value: TabType }[] = [
    { label: "All", value: "all" },
    { label: "Research", value: "research" },
    { label: "Production", value: "production" },
    { label: "Open Source", value: "open-source" },
    { label: "Tools", value: "tool" },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.tag.includes(activeTab));

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-8 mb-8 pb-3 border-b border-stone-200 dark:border-stone-800">
        {tabs.map((tab) => {
          const count =
            tab.value === "all"
              ? projects.length
              : projects.filter((p) => p.tag.includes(tab.value)).length;
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                isActive
                  ? "bg-amber-500 text-stone-900 font-semibold shadow-xs"
                  : "bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-xs px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-stone-900/20 text-stone-900 font-bold"
                    : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="group rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 backdrop-blur-xs overflow-hidden hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="grid md:grid-cols-12 gap-5 p-5 sm:p-6">
                {/* Media Preview / Screenshot (Consistent 16:9 Aspect Ratio) */}
                {project.image && (
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60 cursor-pointer"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {project.metric && (
                      <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                        <Icon icon="ph:sparkle-fill" className="w-3.5 h-3.5 text-amber-400" />
                        {project.metric}
                      </div>
                    )}
                  </div>
                )}

                {/* Project Details (Clean, Proportional Height) */}
                <div
                  className={`${
                    project.image ? "md:col-span-7" : "md:col-span-12"
                  } flex flex-col justify-between`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2
                          onClick={() => setSelectedProject(project)}
                          className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 hover:text-amber-500 transition-colors cursor-pointer"
                        >
                          {project.title}
                        </h2>
                        {project.year && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 font-mono">
                            {project.year}
                          </span>
                        )}
                      </div>
                      {project.role && (
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                          {project.role}
                        </span>
                      )}
                    </div>

                    {/* Concise Clamped Description to Preserve Aspect Ratio */}
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Compact Tech Stack (Top 4) */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech.label}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/60"
                        >
                          <Icon icon={tech.icon} className="w-3 h-3" />
                          {tech.label}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[10px] text-stone-400 font-mono pl-1">
                          +{project.stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Row with More Details Dialog Trigger */}
                  <div className="flex items-center justify-between gap-3 mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800/80 flex-wrap">
                    <div className="flex items-center gap-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
                      >
                        <Icon
                          icon={
                            project.tag.includes("research")
                              ? "ph:book-bookmark-bold"
                              : "ph:arrow-square-out"
                          }
                          className="w-3.5 h-3.5"
                        />
                        <span>{project.tag.includes("research") ? "Paper" : "Live Demo"}</span>
                      </a>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                        >
                          <Icon icon="mdi:github" className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      {project.article && (
                        <Link
                          href={project.article}
                          className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-amber-500 transition-colors"
                        >
                          <Icon icon="ph:article-bold" className="w-3.5 h-3.5" />
                          <span>Story</span>
                        </Link>
                      )}
                    </div>

                    {/* "More details" Dialog Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-500/40 border border-stone-200 dark:border-stone-700 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span>More details</span>
                      <Icon icon="ph:arrow-right-bold" className="w-3 h-3 text-amber-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* shadcn UI Dialog for Full Project Information */}
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
