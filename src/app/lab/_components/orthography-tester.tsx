"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface SamplePreset {
  label: string;
  tag: string;
  text: string;
  description: string;
}

const PRESETS: SamplePreset[] = [
  {
    label: "Standard Asante Twi",
    tag: "Clean Standard",
    text: "Ɛnkyɛ koraa na yɛbɛyɛ adwuma no yie ama obiara anya anigye.",
    description: "Uses standard Ghanaian open vowels ɛ (U+025B) and ɔ (U+0254). Highly recognizable by baseline & GlotLID.",
  },
  {
    label: "Informal Social Media Twi",
    tag: "ASCII Substituted",
    text: "Enkye koraa na yebeye adwuma no yie ama obiara anya anigye.",
    description: "All open vowels substituted with ASCII 'e' and 'o'. In research testing, error rates jump up to 88% in AfroLID.",
  },
  {
    label: "Homoglyph / Lookalike Spoof",
    tag: "Unicode Confusables",
    text: "Εnkyε koraa na yεbεyε adwuma no yie ama obiara anya anigye.",
    description: "Contains Greek lowercase epsilon ε (U+03B5) and uppercase Epsilon Ε (U+0395). Subtly breaks subword tokenizers.",
  },
  {
    label: "Fante Dialectal Variation",
    tag: "Dialect Coda",
    text: "Ɔbaatan pa no kɔr gua do ndɛ anapa kɔtɔɔ edziban maa ne mba.",
    description: "Demonstrates Fante rhotic verb coda (-r in kɔr), affricate fronting (edziban), and distinct noun prefix.",
  },
  {
    label: "Ghanaian Pidgin (Marker-less)",
    tag: "Authentic Pidgin",
    text: "I go catch you for that side soon, make we link up for night.",
    description: "Lacks Nigerian-associated markers (dey, wey, abeg). Causes recall to plummet to 22% in pretrained LID models.",
  },
];

export default function OrthographyTester() {
  const [input, setInput] = useState<string>(PRESETS[0].text);
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [normalizedResult, setNormalizedResult] = useState<string | null>(null);

  // Analysis computations
  const totalChars = input.length;
  const standardOpenE = (input.match(/[ɛƐ]/g) || []).length;
  const standardOpenO = (input.match(/[ɔƆ]/g) || []).length;
  const standardAkanVowels = standardOpenE + standardOpenO;

  // Lookalikes (Greek epsilon \u03B5, \u0395, IPA \u1D10, etc.)
  const greekEpsilons = (input.match(/[\u03B5\u0395]/g) || []).length;
  const ipaLookalikes = (input.match(/[\u1D10\u0254]/g) || []).length;
  const homoglyphs = greekEpsilons + (input.match(/[\u03B5\u0395\u1D10]/g) || []).length;

  // Informality heuristics
  const asciiVowels = (input.match(/[eEoO]/g) || []).length;
  const hasOnlyAscii = standardAkanVowels === 0 && asciiVowels > 3;

  let modelRisk: "Low" | "Moderate" | "High" | "Critical" = "Low";
  let riskColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  let riskExplanation = "Standard orthography detected. Baseline linear SVM and GlotLID v3 perform with >98% accuracy.";

  if (homoglyphs > 0) {
    modelRisk = "Critical";
    riskColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
    riskExplanation = "Homoglyphs detected (e.g. Greek ε U+03B5). AfroLID and subword tokenizers classify these as unknown character sequences.";
  } else if (hasOnlyAscii) {
    modelRisk = "High";
    riskColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    riskExplanation = "Informal ASCII detected (missing standard ɛ/ɔ). Evaluated error rate spikes from 2% up to 42% (GlotLID) and 88% (AfroLID).";
  } else if (standardAkanVowels > 0 && asciiVowels > standardAkanVowels * 3) {
    modelRisk = "Moderate";
    riskColor = "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    riskExplanation = "Mixed standard and ASCII orthography. Minor risk of dialect misclassification between Asante and Fante.";
  }

  const handleNormalize = () => {
    // Basic smart normalizer demonstrating pre-processing pipeline
    let normalized = input;
    // Replace Greek and lookalikes
    normalized = normalized.replaceAll("\u03B5", "ɛ").replaceAll("\u0395", "Ɛ");
    // Contextual replacements for common Akan roots if ASCII
    normalized = normalized
      .replace(/\bEnkye\b/gi, "Ɛnkyɛ")
      .replace(/\byebeye\b/gi, "yɛbɛyɛ")
      .replace(/\badwuma\b/gi, "adwuma")
      .replace(/\bObaatan\b/gi, "Ɔbaatan")
      .replace(/\bkor\b/gi, "kɔr")
      .replace(/\bko\b/gi, "kɔ")
      .replace(/\badeye\b/gi, "adeyɛ")
      .replace(/\bdee\b/gi, "deɛ");
    setNormalizedResult(normalized);
  };

  const loadPreset = (index: number) => {
    setSelectedPreset(index);
    setInput(PRESETS[index].text);
    setNormalizedResult(null);
  };

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xs p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Icon icon="ph:text-t-bold" className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Akan Orthography Stress-Tester & Homoglyph Analyzer
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Simulates the empirical model degradation discovered in the Akan language identification evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${riskColor}`}>
            Model Vulnerability: {modelRisk}
          </span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="mt-5">
        <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
          Load Research Presets:
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => loadPreset(idx)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                selectedPreset === idx
                  ? "bg-amber-500 text-stone-950 font-semibold shadow-xs"
                  : "bg-stone-100 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-2">
          {PRESETS[selectedPreset].description}
        </p>
      </div>

      {/* Text Area */}
      <div className="mt-4">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setNormalizedResult(null);
          }}
          rows={3}
          className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-950/60 p-3.5 text-sm font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          placeholder="Paste or type Twi, Fante, Nzema, or Ghanaian Pidgin text here..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span>Characters: {totalChars}</span>
          <span>•</span>
          <span>Akan Vowels (ɛ/ɔ): {standardAkanVowels}</span>
          <span>•</span>
          <span>Homoglyphs: {homoglyphs}</span>
        </div>

        <button
          type="button"
          onClick={handleNormalize}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 transition-colors cursor-pointer"
        >
          <Icon icon="ph:magic-wand-bold" className="w-3.5 h-3.5" />
          Simulate Normalization
        </button>
      </div>

      {/* Diagnostic Findings */}
      <div className="mt-5 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40">
        <div className="flex items-start gap-2.5">
          <Icon icon="ph:info-bold" className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-xs space-y-1">
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Linguistic Diagnostic Analysis:
            </span>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              {riskExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* Normalization Output */}
      {normalizedResult && (
        <div className="mt-4 p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 animate-fadeIn">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-purple-400 flex items-center gap-1">
              <Icon icon="ph:check-bold" className="w-3.5 h-3.5" />
              Pre-processed & Normalized Output:
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(normalizedResult)}
              className="text-[11px] text-purple-300 hover:text-purple-100 flex items-center gap-1 cursor-pointer"
            >
              <Icon icon="ph:copy-bold" className="w-3 h-3" />
              Copy
            </button>
          </div>
          <p className="text-xs font-mono text-stone-200 leading-relaxed">
            {normalizedResult}
          </p>
        </div>
      )}
    </div>
  );
}
