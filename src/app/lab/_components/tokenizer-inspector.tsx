"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { tokenTaxSamples, TokenTaxSample } from "@/lib/constants/lab-data";

type ModelKey = "gpt4o" | "llama3" | "byt5";

export default function TokenizerInspector() {
  const [selectedSampleId, setSelectedSampleId] = useState<string>("tax-twi-standard");
  const [selectedModel, setSelectedModel] = useState<ModelKey>("gpt4o");
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);

  const activeSample: TokenTaxSample =
    tokenTaxSamples.find((s) => s.id === selectedSampleId) || tokenTaxSamples[0];

  const models: { key: ModelKey; label: string; arch: string; icon: string }[] = [
    { key: "gpt4o", label: "OpenAI GPT-4o", arch: "o200k_base (BPE)", icon: "logos:openai-icon" },
    { key: "llama3", label: "Meta LLaMA 3", arch: "Tiktoken 128k (BPE)", icon: "logos:meta-icon" },
    { key: "byt5", label: "ByT5 / Mamba", arch: "Token-Free (Raw UTF-8 Bytes)", icon: "ph:cpu-bold" },
  ];

  // Helper to get active tokens list
  const getActiveTokens = (): string[] => {
    if (selectedModel === "gpt4o") return activeSample.gpt4o.tokens;
    if (selectedModel === "llama3") return activeSample.llama3.tokens;
    // For byte level: show byte representation
    return activeSample.inputText.split("").map((ch) => {
      const code = ch.charCodeAt(0);
      return code > 127 ? `\\x${code.toString(16)}` : ch;
    });
  };

  const activeTokens = getActiveTokens();
  const tokenCount = activeTokens.length;
  const englishTokensCount = activeSample.englishTokens.length;
  const inflationRatio =
    selectedModel === "byt5"
      ? (activeSample.byteLevel.bytesCount / englishTokensCount).toFixed(1)
      : selectedModel === "gpt4o"
        ? activeSample.gpt4o.inflation.toFixed(1)
        : activeSample.llama3.inflation.toFixed(1);

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xs p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500">
              <Icon icon="ph:scissors-bold" className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              The LLM &ldquo;Token Tax&rdquo; & Byte Fragmentation X-Ray
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Visualizing why modern subword tokenizers (BPE) unfairly penalize West African languages with severe byte fragmentation, inflated latency, and elevated API costs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 font-semibold">
            Token Inflation: {inflationRatio}x
          </span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Evaluation Sentences & Language Varieties:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {tokenTaxSamples.map((sample) => {
            const isSelected = sample.id === selectedSampleId;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => setSelectedSampleId(sample.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-rose-500/10 border-rose-500 text-stone-900 dark:text-stone-100 ring-1 ring-rose-500/30"
                    : "bg-stone-50/70 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300"
                }`}
              >
                <div className="text-xs font-bold truncate">{sample.title}</div>
                <div className="text-[11px] text-stone-400 mt-0.5 truncate">{sample.language}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Architecture Toggle */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1">
          Tokenizer Architecture:
        </span>
        {models.map((m) => {
          const isActive = selectedModel === m.key;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setSelectedModel(m.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-xs"
                  : "bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              <Icon icon={m.icon} className="w-3.5 h-3.5" />
              <span>{m.label}</span>
              <span className="text-[10px] opacity-70 font-mono">({m.arch.split(" ")[0]})</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Token Inspection Canvas */}
      <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 space-y-4">
        {/* Input Sentence */}
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Input Sentence ({activeSample.language})
            </span>
            <span className="font-mono text-[11px]">
              {tokenCount} Tokens • {activeSample.inputText.length} Characters
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 font-serif text-base sm:text-lg text-stone-900 dark:text-stone-100">
            &ldquo;{activeSample.inputText}&rdquo;
          </div>
        </div>

        {/* Color-Coded Token Chips */}
        <div>
          <div className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2 flex items-center justify-between">
            <span>
              Tokenized Subword Chunks (Hover token to inspect):
            </span>
            <span className="text-[11px] text-amber-500 font-normal">
              Highlighted items denote split UTF-8 bytes or fragmented affixes
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-3.5 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 min-h-16">
            <AnimatePresence>
              {activeTokens.map((tok, idx) => {
                const isMultibyte =
                  tok.startsWith("\\x") ||
                  tok === "\xc9" ||
                  tok === "\x9b" ||
                  tok === "\x94" ||
                  tok === "ɛ" ||
                  tok === "ɔ";
                const isHovered = hoveredToken === `${idx}-${tok}`;

                return (
                  <motion.span
                    key={`${idx}-${tok}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1, delay: idx * 0.01 }}
                    onMouseEnter={() => setHoveredToken(`${idx}-${tok}`)}
                    onMouseLeave={() => setHoveredToken(null)}
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-mono transition-all cursor-pointer select-none ${
                      isMultibyte
                        ? "bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/40 ring-1 ring-rose-500/20"
                        : "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-amber-500"
                    } ${isHovered ? "scale-110 shadow-md" : ""}`}
                  >
                    {tok}
                  </motion.span>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* English Benchmark Comparison Bar */}
        <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-stone-600 dark:text-stone-400">
            <span>English Translation Reference:</span>
            <span className="font-mono text-stone-800 dark:text-stone-200 font-bold">
              {englishTokensCount} Tokens in English vs. {tokenCount} Tokens in {activeSample.language.split(" ")[0]}
            </span>
          </div>

          <div className="text-xs text-stone-700 dark:text-stone-300 italic">
            &ldquo;{activeSample.englishTranslation}&rdquo;
          </div>

          {/* Visual Bar Comparison */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="w-16 shrink-0 text-stone-500">English:</span>
              <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (englishTokensCount / Math.max(englishTokensCount, tokenCount)) * 100)}%` }}
                />
              </div>
              <span className="w-10 text-right text-emerald-500 font-bold">{englishTokensCount}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="w-16 shrink-0 text-stone-500">Target:</span>
              <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all"
                  style={{ width: "100%" }}
                />
              </div>
              <span className="w-10 text-right text-rose-500 font-bold">{tokenCount}</span>
            </div>
          </div>
        </div>

        {/* Linguistic Explanatory Verdict */}
        <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-stone-700 dark:text-stone-300 space-y-1">
          <div className="font-bold text-amber-500 flex items-center gap-1.5">
            <Icon icon="ph:lightbulb-filament-bold" className="w-4 h-4" />
            <span>Tokenizer Impact Analysis:</span>
          </div>
          <p className="leading-relaxed">
            {selectedModel === "gpt4o"
              ? activeSample.gpt4o.explanation
              : selectedModel === "llama3"
                ? activeSample.llama3.explanation
                : activeSample.byteLevel.benefit}
          </p>
        </div>
      </div>
    </div>
  );
}
