"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  continuumVarieties,
  continuumMorphSamples,
  tonalMinimalPairs,
  ContinuumMorphSample,
  TonalMinimalPair,
} from "@/lib/constants/lab-data";

export default function ContinuumExplorer() {
  const [activeDialectIndex, setActiveDialectIndex] = useState<number>(1); // Default to Asante Twi
  const [selectedSampleId, setSelectedSampleId] = useState<string>("water");
  const [showIPA, setShowIPA] = useState<boolean>(true);
  const [activeTonalPair, setActiveTonalPair] = useState<TonalMinimalPair>(tonalMinimalPairs[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentVariety = continuumVarieties[activeDialectIndex];
  const currentSample =
    continuumMorphSamples.find((s) => s.id === selectedSampleId) || continuumMorphSamples[0];

  // Helper to retrieve the current dialect's text
  const getDialectData = (sample: ContinuumMorphSample, varietyId: string) => {
    switch (varietyId) {
      case "akuapem":
        return sample.akuapem;
      case "asante":
        return sample.asante;
      case "fante":
        return sample.fante;
      case "nzema":
        return sample.nzema;
      case "pidgin":
        return sample.pidgin;
      default:
        return sample.asante;
    }
  };

  const activeData = getDialectData(currentSample, currentVariety.id);

  // Synthesized tone pitch audio player using Web Audio API
  const playToneContour = (pitchSequence: number[]) => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);

      const baseFreq = 160; // Base Hz
      const duration = 0.55;
      const now = ctx.currentTime;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.05);

      pitchSequence.forEach((val, idx) => {
        const timePoint = now + (idx / (pitchSequence.length - 1)) * duration;
        const targetFreq = baseFreq + val * 120;
        osc.frequency.setValueAtTime(targetFreq, timePoint);
      });

      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration + 0.05);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), duration * 1000);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xs p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Icon icon="ph:git-merge-bold" className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Akan Dialect Continuum & Isogloss Morphing Explorer
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Drag the continuum slider to observe real-time phonological shifts, vowel harmony mutations, and syntactic divergence from Central Akan to Nzema and Pidgin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowIPA(!showIPA)}
            className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showIPA
                ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                : "bg-stone-100 dark:bg-stone-800 border-transparent text-stone-600 dark:text-stone-400"
            }`}
          >
            <Icon icon="ph:waveform-bold" className="w-3.5 h-3.5" />
            <span>IPA Transcription</span>
          </button>
        </div>
      </div>

      {/* Lexical Concept Picker */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Select Lexical / Grammatical Concept:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {continuumMorphSamples.map((sample) => {
            const isSelected = sample.id === selectedSampleId;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => setSelectedSampleId(sample.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-500 text-amber-500 dark:text-amber-400 shadow-xs"
                    : "bg-stone-50/70 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <div className="text-xs font-bold truncate">{sample.english}</div>
                <div className="text-[10px] text-stone-400 capitalize mt-0.5">{sample.category}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Continuum Slider Track */}
      <div className="p-4 sm:p-5 rounded-xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400">
          <span className="flex items-center gap-1.5">
            <Icon icon="ph:map-pin-line-bold" className="w-3.5 h-3.5 text-amber-500" />
            Dialect Continuum Position:
          </span>
          <span className="text-stone-900 dark:text-stone-100 font-mono">
            {activeDialectIndex + 1} / {continuumVarieties.length} • {currentVariety.label}
          </span>
        </div>

        {/* Custom Range Slider */}
        <div className="relative py-2">
          <input
            type="range"
            min={0}
            max={continuumVarieties.length - 1}
            step={1}
            value={activeDialectIndex}
            onChange={(e) => setActiveDialectIndex(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          {/* Stepper Node Labels */}
          <div className="flex justify-between items-center mt-2.5">
            {continuumVarieties.map((v, idx) => {
              const isActive = idx === activeDialectIndex;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveDialectIndex(idx)}
                  className={`text-center transition-all cursor-pointer group ${
                    isActive ? "scale-105" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-3 h-3 mx-auto rounded-full mb-1 transition-all ${
                      isActive ? "bg-amber-500 ring-4 ring-amber-500/20" : "bg-stone-400 dark:bg-stone-600"
                    }`}
                  />
                  <span
                    className={`text-[10px] sm:text-xs block font-semibold ${
                      isActive ? "text-amber-500 dark:text-amber-400" : "text-stone-600 dark:text-stone-400"
                    }`}
                  >
                    {v.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Dialect Variety Card */}
        <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${currentVariety.badgeClass}`}>
                {currentVariety.label}
              </span>
              <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                ISO: {currentVariety.isoCode}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-stone-100">Linguistic Habitat:</strong>{" "}
              {currentVariety.region} ({currentVariety.subfamily})
            </p>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 sm:text-right max-w-xs">
            {currentVariety.keyShift}
          </div>
        </div>
      </div>

      {/* Morphing Word Stage */}
      <div className="relative p-6 sm:p-8 rounded-2xl border border-amber-500/20 bg-linear-to-b from-amber-500/5 to-transparent text-center space-y-3">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-500">
          Target Realization in {currentVariety.label}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSample.id}-${currentVariety.id}`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="space-y-2"
          >
            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-serif">
              &ldquo;{activeData.text}&rdquo;
            </div>

            {showIPA && (
              <div className="text-sm font-mono text-amber-600 dark:text-amber-400">
                {activeData.ipa}
              </div>
            )}

            <div className="text-xs text-stone-500 dark:text-stone-400 italic">
              Morphological gloss: {activeData.gloss}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Phonological Rule Explanation Callout */}
        <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 text-left">
          <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-stone-900/70 p-3 rounded-xl border border-stone-200/80 dark:border-stone-800/80">
            <Icon icon="ph:info-bold" className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 dark:text-stone-100">
                {currentSample.phonologicalMechanism}:
              </strong>{" "}
              {currentSample.linguisticRule}
            </div>
          </div>
        </div>
      </div>

      {/* Tonal Minimal Pairs & Interactive Pitch Track Simulator */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-purple-500/10 text-purple-400">
                <Icon icon="ph:waveform-bold" className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                Akan Pitch & Tone Contour Visualizer (Terraced Tone Contrasts)
              </h4>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Akan uses level tones (High, Low, Downstep) where pitch trajectory alters semantic meaning.
            </p>
          </div>

          <button
            type="button"
            onClick={() => playToneContour(activeTonalPair.pitchCurve)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Icon
              icon={isPlayingAudio ? "ph:speaker-high-bold" : "ph:play-bold"}
              className="w-3.5 h-3.5"
            />
            <span>{isPlayingAudio ? "Synthesizing..." : "Auditory Pitch Synth"}</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-2">
          {tonalMinimalPairs.slice(0, 3).map((pair) => {
            const isSelected = pair.word === activeTonalPair.word;
            return (
              <button
                key={pair.word}
                type="button"
                onClick={() => {
                  setActiveTonalPair(pair);
                  playToneContour(pair.pitchCurve);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-500/10 border-purple-500/40 text-stone-900 dark:text-stone-100 ring-1 ring-purple-500/30"
                    : "bg-white/60 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold font-serif">{pair.word}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {pair.toneMelody.split(" ")[0]}
                  </span>
                </div>
                <div className="text-xs text-amber-500 font-medium mt-1 truncate">{pair.gloss}</div>
                <div className="text-[10px] text-stone-400 font-mono mt-0.5">{pair.ipa}</div>
              </button>
            );
          })}
        </div>

        {/* Interactive Pitch Track Curve (SVG Visualizer) */}
        <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Fundamental Frequency Track ($F_0$ Contour) for &quot;{activeTonalPair.word}&quot;
            </span>
            <span className="font-mono text-[11px] text-purple-400 font-bold">
              {activeTonalPair.toneMelody}
            </span>
          </div>

          <div className="h-20 w-full relative flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 400 80"
              preserveAspectRatio="none"
            >
              {/* Reference Grid lines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeDasharray="3 3" className="text-stone-200 dark:text-stone-800" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" strokeDasharray="3 3" className="text-stone-200 dark:text-stone-800" />
              <text x="5" y="16" className="text-[9px] fill-stone-400 font-mono">High Pitch (H ~220Hz)</text>
              <text x="5" y="74" className="text-[9px] fill-stone-400 font-mono">Low Pitch (L ~140Hz)</text>

              {/* Animated pitch curve */}
              {(() => {
                const curve = activeTonalPair.pitchCurve;
                const points = curve
                  .map((val, idx) => {
                    const x = (idx / (curve.length - 1)) * 360 + 20;
                    const y = 70 - val * 55;
                    return `${x},${y}`;
                  })
                  .join(" ");
                return (
                  <>
                    <polyline
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                    {curve.map((val, idx) => {
                      const cx = (idx / (curve.length - 1)) * 360 + 20;
                      const cy = 70 - val * 55;
                      return (
                        <circle
                          key={idx}
                          cx={cx}
                          cy={cy}
                          r="5"
                          className="fill-purple-500 stroke-2 stroke-white dark:stroke-stone-900"
                        />
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
            {activeTonalPair.description}
          </p>
        </div>
      </div>
    </div>
  );
}
