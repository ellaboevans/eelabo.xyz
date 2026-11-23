"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { bibtexData } from "@/lib/constants/lab-data";
import { projects } from "@/lib/constants/data";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Language Lab" | "Projects" | "Actions";
  icon: string;
  badge?: string;
  onSelect: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Show a temporary toast notification inside the modal
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
      setIsOpen(false);
    }, 1500);
  };

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input upon opening
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // All searchable commands
  const commands: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      // Navigation
      {
        id: "nav-home",
        title: "Home",
        subtitle: "Evans Elabo - Software Engineer & Researcher",
        category: "Navigation",
        icon: "ph:house-bold",
        onSelect: () => {
          router.push("/");
          setIsOpen(false);
        },
      },
      {
        id: "nav-lab",
        title: "Language Research Lab",
        subtitle: "Akan dialect continuum, orthography resilience & NLP evaluation",
        category: "Navigation",
        icon: "ph:flask-bold",
        badge: "Research",
        onSelect: () => {
          router.push("/lab");
          setIsOpen(false);
        },
      },
      {
        id: "nav-projects",
        title: "Projects",
        subtitle: "Full-stack apps, spatial canvases, developer tools",
        category: "Navigation",
        icon: "ph:code-bold",
        onSelect: () => {
          router.push("/projects");
          setIsOpen(false);
        },
      },
      {
        id: "nav-blog",
        title: "Blog & Writing",
        subtitle: "Articles on Angular, Next.js, systems, and research",
        category: "Navigation",
        icon: "ph:article-bold",
        onSelect: () => {
          router.push("/blog");
          setIsOpen(false);
        },
      },
      {
        id: "nav-playground",
        title: "Playground & SmallWorld",
        subtitle: "Interactive developer micro-utilities & experiments",
        category: "Navigation",
        icon: "ph:game-controller-bold",
        onSelect: () => {
          router.push("/playground");
          setIsOpen(false);
        },
      },
      {
        id: "nav-book",
        title: "Book a Chat",
        subtitle: "Schedule a 30-min call via Calendly",
        category: "Navigation",
        icon: "ph:calendar-check-bold",
        onSelect: () => {
          router.push("/book");
          setIsOpen(false);
        },
      },
      {
        id: "nav-contact",
        title: "Contact",
        subtitle: "Get in touch for engineering or academic research",
        category: "Navigation",
        icon: "ph:envelope-simple-bold",
        onSelect: () => {
          router.push("/contact");
          setIsOpen(false);
        },
      },

      // Language Lab Specific Deep Links
      {
        id: "lab-continuum",
        title: "Akan Dialect Continuum Morphing Slider",
        subtitle: "Real-time isogloss phonological morphing (Akuapem -> Asante -> Fante -> Nzema)",
        category: "Language Lab",
        icon: "ph:git-merge-bold",
        badge: "Interactive",
        onSelect: () => {
          router.push("/lab");
          setIsOpen(false);
        },
      },
      {
        id: "lab-token-tax",
        title: "LLM Token Tax & Byte Fragmentation X-Ray",
        subtitle: "Analyze token inflation and subword fragmentation on West African languages",
        category: "Language Lab",
        icon: "ph:scissors-bold",
        badge: "NLP Eval",
        onSelect: () => {
          router.push("/lab");
          setIsOpen(false);
        },
      },
      {
        id: "lab-orthography",
        title: "Orthography & Homoglyph Resilience Tester",
        subtitle: "Test informal ASCII substitution (e/o) vs standard Ghanaian open vowels (ɛ/ɔ)",
        category: "Language Lab",
        icon: "ph:text-t-bold",
        onSelect: () => {
          router.push("/lab");
          setIsOpen(false);
        },
      },
      {
        id: "lab-corpora",
        title: "Evaluation Corpora & Data Statements",
        subtitle: "Bender & Friedman Data Statements and native-annotated Nzema/Twi sentences",
        category: "Language Lab",
        icon: "ph:database-bold",
        onSelect: () => {
          router.push("/lab");
          setIsOpen(false);
        },
      },

      // Projects
      ...projects.slice(0, 4).map((p) => ({
        id: `proj-${p.title}`,
        title: p.title,
        subtitle: p.description,
        category: "Projects" as const,
        icon: "ph:browser-bold",
        badge: p.metric,
        onSelect: () => {
          if (p.link.startsWith("http")) {
            window.open(p.link, "_blank", "noopener,noreferrer");
          } else {
            router.push(p.link);
          }
          setIsOpen(false);
        },
      })),

      // Actions & Shortcuts
      {
        id: "action-copy-bibtex",
        title: "Copy BibTeX Citation",
        subtitle: "Language Identification for Twi, Fante, Nzema & Ghanaian Pidgin (Elabo, 2026)",
        category: "Actions",
        icon: "ph:quotes-bold",
        badge: "Citation",
        onSelect: () => {
          navigator.clipboard.writeText(bibtexData);
          showToast("Copied BibTeX citation to clipboard!");
        },
      },
      {
        id: "action-copy-email",
        title: "Copy Email Address",
        subtitle: "elaboevans@gmail.com",
        category: "Actions",
        icon: "ph:copy-bold",
        onSelect: () => {
          navigator.clipboard.writeText("elaboevans@gmail.com");
          showToast("Copied email (elaboevans@gmail.com) to clipboard!");
        },
      },
      {
        id: "action-github",
        title: "Open GitHub Profile",
        subtitle: "github.com/ellaboevans",
        category: "Actions",
        icon: "logos:github-icon",
        onSelect: () => {
          window.open("https://github.com/ellaboevans", "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
      },
      {
        id: "action-x",
        title: "Open X / Twitter Profile",
        subtitle: "@dev_concept",
        category: "Actions",
        icon: "logos:twitter",
        onSelect: () => {
          window.open("https://x.com/dev_concept", "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
      },
      {
        id: "action-linkedin",
        title: "Open LinkedIn Profile",
        subtitle: "linkedin.com/in/evanselabo",
        category: "Actions",
        icon: "logos:linkedin-icon",
        onSelect: () => {
          window.open("https://linkedin.com/in/evanselabo", "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
      },
    ];

    return items;
  }, [router]);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase().trim();
    return commands.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll active item into view when navigating via keyboard
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Handle keyboard navigation within the list
  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].onSelect();
      }
    }
  };

  return (
    <>
      {/* Trigger Button in Navigation (Minimalist & Uncluttered) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-1.5 rounded-lg text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        aria-label="Search (⌘K)"
        title="Search (⌘K)"
      >
        <Icon icon="ph:magnifying-glass-bold" className="w-4 h-4" />
        <kbd className="hidden md:inline-flex items-center text-[10px] font-mono text-stone-400 dark:text-stone-500 px-1 py-0.2 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/80">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Dialog Card (shadcn UI Command style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-950/95 backdrop-blur-xl shadow-2xl overflow-hidden z-10 ring-1 ring-black/5 dark:ring-white/10"
            >
              {/* Search Bar Input (shadcn CommandInput pattern: zero outline/yellow rings) */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-stone-800/80 bg-transparent">
                <Icon
                  icon="ph:magnifying-glass-bold"
                  className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDownList}
                  placeholder="Type a command or search..."
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                  }}
                  className="w-full bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none !outline-none !ring-0 !border-none !shadow-none"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5 rounded cursor-pointer transition-colors"
                >
                  <kbd className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-[10px] font-mono text-stone-500 dark:text-stone-400">
                    ESC
                  </kbd>
                </button>
              </div>

              {/* Toast Feedback */}
              {toastMessage && (
                <div className="p-2.5 px-4 bg-amber-500/10 border-b border-amber-500/20 text-xs font-semibold text-amber-500 flex items-center gap-2">
                  <Icon icon="ph:check-circle-bold" className="w-4 h-4 shrink-0" />
                  <span>{toastMessage}</span>
                </div>
              )}

              {/* Filtered Results List */}
              <div
                ref={listRef}
                className="max-h-80 overflow-y-auto p-2 space-y-1"
              >
                {filteredCommands.length === 0 ? (
                  <div className="py-10 text-center text-xs text-stone-500 dark:text-stone-400">
                    No results found for &ldquo;{query}&rdquo;.
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        data-index={idx}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => cmd.onSelect()}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-500/10 text-stone-900 dark:text-stone-100"
                            : "text-stone-700 dark:text-stone-300 hover:bg-stone-100/70 dark:hover:bg-stone-900/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                              isSelected
                                ? "bg-amber-500 text-stone-950 font-bold"
                                : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                            }`}
                          >
                            <Icon icon={cmd.icon} className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-semibold truncate flex items-center gap-2">
                              <span>{cmd.title}</span>
                              {cmd.badge && (
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-stone-600 dark:text-stone-300 font-normal">
                                  {cmd.badge}
                                </span>
                              )}
                            </div>
                            {cmd.subtitle && (
                              <div className="text-[11px] text-stone-400 dark:text-stone-500 truncate mt-0.5">
                                {cmd.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <span className="text-[9px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-600 shrink-0">
                          {cmd.category}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Helper (shadcn CommandFooter pattern) */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 text-[10px] text-stone-400 font-mono">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded">↑</kbd>
                    <kbd className="px-1 py-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded">↓</kbd>
                    <span className="ml-0.5">navigate</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded">↵</kbd>
                    <span className="ml-0.5">select</span>
                  </span>
                </div>
                <span>Evans Elabo</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
