"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const article = document.getElementById("tts-content");
    if (!article) return;

    const elements = Array.from(article.querySelectorAll("h2, h3"));
    const items: TocItem[] = elements.map((element, index) => {
      let id = element.id;
      if (!id) {
        id =
          element.textContent
            ?.toLowerCase()
            .replaceAll(/[^a-z0-9]+/g, "-")
            .replaceAll(/(^-|-$)/g, "") || `heading-${index}`;
        element.id = id;
      }
      return {
        id,
        text: element.textContent || "",
        level: element.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(items);

    // Active heading observer
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      data-tts-ignore
      className="my-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-4 transition-all"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
          <Icon icon="ph:list-dashes-bold" className="w-4 h-4 text-amber-500" />
          Table of Contents ({headings.length})
        </span>
        <Icon
          icon={isOpen ? "ph:caret-up-bold" : "ph:caret-down-bold"}
          className="w-3.5 h-3.5 text-stone-400 transition-transform"
        />
      </button>

      {isOpen && (
        <nav className="mt-3 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
          <ul className="space-y-1.5 text-xs m-0 p-0 list-none">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              return (
                <li
                  key={heading.id}
                  className={`m-0 p-0 ${heading.level === 3 ? "pl-3.5" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left py-1 px-2 rounded-md transition-colors cursor-pointer truncate ${
                      isActive
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                        : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/50"
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
