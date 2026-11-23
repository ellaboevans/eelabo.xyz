"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { bibtexData, researchKeyFindings } from "@/lib/constants/lab-data";

export default function BibtexCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bibtexData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Featured Paper Overview */}
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-linear-to-b from-stone-50/70 to-white/30 dark:from-stone-900/40 dark:to-stone-950/20 p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Evaluation & Error Analysis Report
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 pt-1">
              Language Identification for Twi, Fante, Nzema and Ghanaian Pidgin: An Error Analysis
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Evans Elabo · Independent Computational Linguistics Study · October 2026
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://github.com/ellaboevans/ghanaian-langid-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <Icon icon="line-md:github-loop" className="w-4 h-4" />
              Code & Splits
            </a>
            <a
              href="https://github.com/ellaboevans/ghanaian-langid-eval/blob/main/REPORT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 transition-colors"
            >
              <Icon icon="ph:file-text-bold" className="w-3.5 h-3.5" />
              Full Report
            </a>
          </div>
        </div>

        {/* Abstract */}
        <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <p>
            <span className="font-semibold text-stone-800 dark:text-stone-200">Abstract: </span>
            This evaluation benchmarks off-the-shelf multilingual language identification systems (
            <span className="font-semibold">GlotLID v3</span>, <span className="font-semibold">AfroLID 1.5</span>) alongside a character n-gram linear SVM baseline across closely related Ghanaian varieties along the Akan dialect continuum: Twi (Asante and Akuapem), Fante, Nzema, and Ghanaian Pidgin.
          </p>
          <p>
            While models perform well on clean formal datasets (macro-F1 &gt; 0.96), empirical error analysis reveals acute vulnerabilities under realistic informal writing: informal ASCII spelling causes error rates to jump from 2%–27% up to 42%–88%, pretrained systems recognize Ghanaian Pidgin only when borrowing Nigerian markers, and AfroLID exhibits systematic fallback to Wolof for unplaced West African text.
          </p>
        </div>

        {/* Empirical Metrics Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {researchKeyFindings.map((finding) => (
            <div
              key={finding.label}
              className={`p-3.5 rounded-xl border ${finding.color} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-black tracking-tight">{finding.metric}</span>
                <Icon icon={finding.icon} className="w-4 h-4 opacity-80" />
              </div>
              <div>
                <p className="text-xs font-bold leading-snug">{finding.label}</p>
                <p className="text-[11px] opacity-80 mt-1 leading-relaxed">
                  {finding.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BibTeX Citation Box */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-900/60 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-400 flex items-center gap-1.5">
            <Icon icon="ph:quotes-bold" className="w-4 h-4 text-amber-500" />
            Cite this Research (BibTeX)
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-stone-800 text-stone-300 hover:text-amber-400 hover:bg-stone-700 transition-colors cursor-pointer"
          >
            <Icon icon={copied ? "ph:check-bold" : "ph:copy-bold"} className="w-3.5 h-3.5" />
            {copied ? "Copied" : "Copy BibTeX"}
          </button>
        </div>
        <pre className="text-xs font-mono text-stone-300 bg-stone-950/80 p-3.5 rounded-lg overflow-x-auto leading-relaxed">
          {bibtexData}
        </pre>
      </div>
    </div>
  );
}
