"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

function ResultCard({
  wpm,
  accuracy,
  errors,
  timeElapsed,
}: {
  wpm: number;
  accuracy: number;
  errors: number[];
  timeElapsed: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `⚡ Typed at ${wpm} WPM with ${accuracy}% accuracy on Keypp!\nTest your typing speed: https://www.elabo.me/playground/keypp`;

  const copyResults = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `⚡ Typed at ${wpm} WPM with ${accuracy}% accuracy on Keypp by @dev_concept!\n`
  )}&url=${encodeURIComponent("https://www.elabo.me/playground/keypp")}`;

  return (
    <motion.div
      key="results-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200">Results</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyResults}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Icon
              icon={copied ? "ph:check-bold" : "ph:copy-bold"}
              className={`w-3.5 h-3.5 ${copied ? "text-emerald-500" : ""}`}
            />
            {copied ? "Copied!" : "Copy Score"}
          </button>
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <Icon icon="line-md:twitter-x" className="w-3.5 h-3.5" />
            Share on X
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 font-mono gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-green-100/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-green-800 dark:text-green-300">{wpm}</span>
          <span className="text-sm text-green-600 dark:text-green-400">WPM</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-yellow-100/80 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-yellow-800 dark:text-yellow-300">
            {accuracy}%
          </span>
          <span className="text-sm text-yellow-600 dark:text-yellow-400">Accuracy</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-red-800 dark:text-red-300">{errors.length}</span>
          <span className="text-sm text-red-600 dark:text-red-400">Errors</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center bg-teal-100/80 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4"
        >
          <span className="text-3xl font-bold text-teal-800 dark:text-teal-300">{timeElapsed}</span>
          <span className="text-sm text-teal-600 dark:text-teal-400">Time</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ResultCard;
