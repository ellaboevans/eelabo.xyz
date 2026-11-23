"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { labManifesto } from "@/lib/constants/lab-data";
import ContinuumExplorer from "./continuum-explorer";
import TokenizerInspector from "./tokenizer-inspector";
import OrthographyTester from "./orthography-tester";
import DialectComparator from "./dialect-comparator";
import CorpusBrowser from "./corpus-browser";
import BibtexCard from "./bibtex-card";

type TabId = "workbench" | "research" | "corpora" | "agenda";
type WorkbenchSubTool = "continuum" | "tokentax" | "orthography" | "matrix";

export default function LabView() {
  const [activeTab, setActiveTab] = useState<TabId>("workbench");
  const [activeSubTool, setActiveSubTool] = useState<WorkbenchSubTool>("continuum");

  const tabs: { id: TabId; label: string; icon: string; count?: string }[] = [
    { id: "workbench", label: "Interactive Workbench", icon: "ph:sliders-horizontal-bold", count: "4 Tools" },
    { id: "research", label: "Publications & Findings", icon: "ph:file-text-bold", count: "1 Study" },
    { id: "corpora", label: "Corpora & Statements", icon: "ph:database-bold", count: "2 Datasets" },
    { id: "agenda", label: "Doctoral Inquiries", icon: "ph:graduation-cap-bold" },
  ];

  const workbenchTools: { id: WorkbenchSubTool; label: string; icon: string; badge?: string }[] = [
    { id: "continuum", label: "Dialect Continuum & Morphing", icon: "ph:git-merge-bold", badge: "Interactive" },
    { id: "tokentax", label: "LLM Token Tax & Byte X-Ray", icon: "ph:scissors-bold", badge: "NLP Eval" },
    { id: "orthography", label: "Orthography & Homoglyphs", icon: "ph:text-t-bold" },
    { id: "matrix", label: "Dialect Comparison Matrix", icon: "ph:table-bold" },
  ];

  return (
    <div className="space-y-8 mt-6">
      {/* Lab Mission Banner */}
      <section className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Icon icon="ph:flask-bold" className="w-4 h-4" />
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-500">
            Research Lab
          </span>
          <span className="text-stone-400 dark:text-stone-600">•</span>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            Directed by Evans Elabo
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          {labManifesto.title}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-2 max-w-3xl leading-relaxed">
          {labManifesto.subtitle}
        </p>

        {/* Core Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
          {labManifesto.focusAreas.map((area) => (
            <div
              key={area.title}
              className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/40"
            >
              <div className="flex items-center gap-2 mb-1.5 text-amber-500">
                <Icon icon={area.icon} className="w-4 h-4" />
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200">
                  {area.title}
                </h4>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-amber-500 text-stone-950 shadow-xs"
                  : "bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              <Icon icon={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-stone-950/20 text-stone-950 font-bold"
                      : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === "workbench" && (
          <motion.div
            key="workbench"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Workbench Sub-Tool Switcher */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
              {workbenchTools.map((tool) => {
                const isCurrent = activeSubTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setActiveSubTool(tool.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs ring-1 ring-stone-200 dark:ring-stone-700"
                        : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                    }`}
                  >
                    <Icon icon={tool.icon} className={`w-3.5 h-3.5 ${isCurrent ? "text-amber-500" : ""}`} />
                    <span>{tool.label}</span>
                    {tool.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-500/10 text-amber-500 font-medium">
                        {tool.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Sub-Tool Rendering */}
            <AnimatePresence mode="wait">
              {activeSubTool === "continuum" && (
                <motion.div
                  key="continuum"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  <ContinuumExplorer />
                </motion.div>
              )}

              {activeSubTool === "tokentax" && (
                <motion.div
                  key="tokentax"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  <TokenizerInspector />
                </motion.div>
              )}

              {activeSubTool === "orthography" && (
                <motion.div
                  key="orthography"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  <OrthographyTester />
                </motion.div>
              )}

              {activeSubTool === "matrix" && (
                <motion.div
                  key="matrix"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  <DialectComparator />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === "research" && (
          <motion.div
            key="research"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <BibtexCard />
          </motion.div>
        )}

        {activeTab === "corpora" && (
          <motion.div
            key="corpora"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <CorpusBrowser />
          </motion.div>
        )}

        {activeTab === "agenda" && (
          <motion.div
            key="agenda"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 p-6 space-y-6"
          >
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Icon icon="ph:graduation-cap-bold" className="w-5 h-5 text-amber-500" />
                Doctoral Research Agenda & Inquiries
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Areas of theoretical and computational inquiry as I prepare for doctoral studies in Linguistics.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Icon icon="ph:waveform-bold" className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-200">
                    Tone & Prosody in Speech Representations
                  </h3>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Investigating whether self-supervised acoustic models (w2v-BERT, MMS, Whisper) adequately capture distinctive tone contrasts in Akan terraced-level tone systems, and how tonal representation affects downstream low-resource ASR and translation.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <Icon icon="ph:fingerprint-bold" className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-200">
                    Byte-Level Modeling for Non-Standardized Orthographies
                  </h3>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Subword tokenizers (BPE, WordPiece) break catastrophically when native speakers drop diacritics or substitute Latin lookalikes. Exploring token-free, byte-level architectures (Mamba, ByT5) to build resilient West African NLP.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Icon icon="ph:tree-structure-bold" className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-200">
                    Dialect Continua & Mutual Intelligibility Metrics
                  </h3>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Moving beyond discrete ISO 639-3 language tags. Developing continuous distance embeddings that map dialectal gradience along the Akan continuum (Asante, Akuapem, Fante, Wasa, Nzema, Sehwi).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Icon icon="ph:chat-teardrop-dots-bold" className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-200">
                    Intra-Sentential Code-Switching & Pidgin Syntax
                  </h3>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Modeling fluid grammatical alternation in West African urban contact varieties, distinguishing Ghanaian Pidgin loanword insertion from structural substrate borrowing.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="font-semibold text-amber-500">Interested in Academic Collaboration?</span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  I am always eager to discuss corpus construction, linguistic fieldwork, or prospective doctoral advising.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors"
              >
                Get in Touch
                <Icon icon="ph:arrow-right-bold" className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
