"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { corpusSamples, CorpusSample } from "@/lib/constants/lab-data";

export default function CorpusBrowser() {
  const [filterVariety, setFilterVariety] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSamples = corpusSamples.filter((sample) => {
    const matchesVariety = filterVariety === "all" || sample.variety === filterVariety;
    const matchesSearch =
      searchQuery === "" ||
      sample.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.annotatorNote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVariety && matchesSearch;
  });

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xs p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Icon icon="ph:database-bold" className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Evaluation Corpora & Data Statement Viewer
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Browse author-annotated evaluation sentences from the Nzema few-shot set and Akan social media stress test.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ellaboevans/ghanaian-langid-eval/blob/main/DATA_STATEMENT.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 transition-colors inline-flex items-center gap-1.5"
          >
            <Icon icon="ph:file-doc-bold" className="w-3.5 h-3.5" />
            Data Statement (Bender & Friedman)
          </a>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {["all", "nzema", "twi", "pidgin"].map((varKey) => (
            <button
              key={varKey}
              type="button"
              onClick={() => setFilterVariety(varKey)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium capitalize transition-colors cursor-pointer ${
                filterVariety === varKey
                  ? "bg-amber-500 text-stone-950 font-semibold"
                  : "bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              {varKey === "all" ? "All Varieties" : varKey}
            </button>
          ))}
        </div>

        <div className="relative">
          <Icon
            icon="ph:magnifying-glass"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search corpus tokens..."
            className="w-full sm:w-56 pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-950/60 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Corpus Cards Grid */}
      <div className="grid gap-3 mt-4">
        {filteredSamples.map((sample: CorpusSample) => (
          <div
            key={sample.id}
            className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/40 dark:bg-stone-950/30 hover:border-amber-500/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {sample.id}
                </span>
                <span className="text-xs font-semibold text-amber-500">
                  {sample.dialect || sample.variety.toUpperCase()}
                </span>
              </div>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-stone-200/60 dark:bg-stone-800 text-stone-500">
                {sample.register}
              </span>
            </div>

            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-relaxed font-mono">
              &quot;{sample.text}&quot;
            </p>

            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 italic">
              Gloss: {sample.translation}
            </p>

            <div className="mt-2 pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex items-start gap-1.5 text-[11px] text-stone-600 dark:text-stone-400">
              <Icon icon="ph:notebook-bold" className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{sample.annotatorNote}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
