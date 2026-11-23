"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/constants/data";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  // Lock body scroll and listen for ESC key
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog Card (shadcn UI Dialog pattern) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-2xl overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Close dialog"
            >
              <Icon icon="ph:x-bold" className="w-4 h-4" />
            </button>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto">
              {/* Media Banner */}
              {project.image && (
                <div className="relative aspect-video w-full bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    className="object-cover"
                    priority
                  />
                  {project.metric && (
                    <div className="absolute top-3.5 left-3.5 bg-stone-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <Icon icon="ph:sparkle-fill" className="w-3.5 h-3.5 text-amber-400" />
                      {project.metric}
                    </div>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Header Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h2
                      id="project-dialog-title"
                      className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
                    >
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      {project.year && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 font-mono">
                          {project.year}
                        </span>
                      )}
                      {project.role && (
                        <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                          {project.role}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tag.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full In-Depth Narrative */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Project Overview
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-2.5 p-4 rounded-xl bg-stone-50/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <Icon icon="ph:check-circle-bold" className="w-4 h-4 text-amber-500" />
                      <span>Key Highlights & Engineering Feats</span>
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="text-amber-500 shrink-0 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Complete Tech Stack */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Technologies & Architecture
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech.label}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 font-medium"
                      >
                        <Icon icon={tech.icon} className="w-3.5 h-3.5" />
                        {tech.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-stone-800 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors shadow-xs"
                    >
                      <span>
                        {project.tag.includes("research") ? "Read Paper & Code" : "Open Live Project"}
                      </span>
                      <Icon
                        icon={
                          project.tag.includes("research")
                            ? "ph:file-text-bold"
                            : "ph:arrow-square-out-bold"
                        }
                        className="w-4 h-4"
                      />
                    </a>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
                      >
                        <Icon icon="mdi:github" className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  {project.article && (
                    <Link
                      href={project.article}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      <Icon icon="ph:book-open-text-bold" className="w-4 h-4" />
                      <span>Read Deep-Dive Article →</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
