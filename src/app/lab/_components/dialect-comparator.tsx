"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { dialectContinuumData, DialectItem } from "@/lib/constants/lab-data";

type CategoryFilter = "all" | "greetings" | "nouns" | "verbs" | "grammar";

export default function DialectComparator() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedItem, setSelectedItem] = useState<DialectItem | null>(null);

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: "All Items", value: "all" },
    { label: "Verbs", value: "verbs" },
    { label: "Nouns", value: "nouns" },
    { label: "Grammar & Aspect", value: "grammar" },
    { label: "Greetings", value: "greetings" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? dialectContinuumData
      : dialectContinuumData.filter((item) => item.category === activeCategory);

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xs p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Icon icon="ph:git-merge-bold" className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Akan Dialect Continuum & Lexical Matrix
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Tracking phonological shifts, rhotic codas, and grammatical divergence from Central Akan to Nzema and Pidgin.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-amber-500 text-stone-950 font-semibold"
                  : "bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-3">English Concept</th>
              <th className="py-2.5 px-3 text-amber-500">Asante Twi</th>
              <th className="py-2.5 px-3">Akuapem Twi</th>
              <th className="py-2.5 px-3 text-purple-400">Fante</th>
              <th className="py-2.5 px-3 text-emerald-400">Nzema</th>
              <th className="py-2.5 px-3 text-cyan-400">Ghanaian Pidgin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
            {filteredItems.map((item) => (
              <tr
                key={item.english}
                onClick={() => setSelectedItem(item)}
                className="hover:bg-amber-500/5 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-3 font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-500 transition-colors">
                  {item.english}
                </td>
                <td className="py-3 px-3 font-mono text-stone-700 dark:text-stone-300">
                  {item.asanteTwi}
                </td>
                <td className="py-3 px-3 font-mono text-stone-600 dark:text-stone-400">
                  {item.akuapemTwi}
                </td>
                <td className="py-3 px-3 font-mono text-stone-700 dark:text-stone-300">
                  {item.fante}
                </td>
                <td className="py-3 px-3 font-mono text-emerald-300 dark:text-emerald-400">
                  {item.nzema}
                </td>
                <td className="py-3 px-3 font-mono text-cyan-300 dark:text-cyan-400">
                  {item.pidgin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phonological / Morphological Note Display */}
      {selectedItem?.phonologicalNote ? (
        <div className="mt-4 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2">
          <Icon icon="ph:waveform-bold" className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-amber-500">
              Linguistic Note on &quot;{selectedItem.english}&quot;:
            </span>{" "}
            {selectedItem.phonologicalNote}
          </div>
        </div>
      ) : (
        <div className="mt-4 text-[11px] text-stone-400 dark:text-stone-500 italic text-center">
          Click any row above to view detailed phonological and morphosyntactic shift notes.
        </div>
      )}
    </div>
  );
}
