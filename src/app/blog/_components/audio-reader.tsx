"use client";

import { useState, useCallback, useRef } from "react";
import { Play, Pause, Square, Volume2, Loader2 } from "lucide-react";

export default function AudioReader() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getArticleText = useCallback(() => {
    const article = document.querySelector("article");
    if (!article) return "";

    const clone = article.cloneNode(true) as HTMLElement;

    // Remove elements we don't want read
    clone.querySelectorAll("pre, code, script, style, nav, button, img, svg, .not-prose").forEach((el) => el.remove());

    const text = clone.textContent || "";
    return text.replace(/\s+/g, " ").trim();
  }, []);

  const handlePlay = useCallback(async () => {
    setError(null);

    // If we have audio and it's paused, resume it
    if (audioRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // If audio is already loaded, play from start
    if (audioRef.current && !isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // Generate new audio
    const text = getArticleText();
    if (!text) {
      setError("No text found to read");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Clean up previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      audio.onerror = () => {
        setError("Failed to play audio");
        setIsPlaying(false);
        setIsLoading(false);
      };

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate audio");
    } finally {
      setIsLoading(false);
    }
  }, [isPaused, isPlaying, getArticleText]);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const handleStop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, []);

  return (
    <div className="flex items-center gap-3 p-3 bg-stone-600 dark:bg-stone-800 rounded-lg mb-6 not-prose">
      <Volume2 className="w-5 h-5 text-stone-500 dark:text-stone-400 shrink-0" />
      <div className="flex-1">
        <span className="text-sm text-stone-600 dark:text-stone-300">
          Listen to this article
        </span>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <div className="p-2 bg-amber-500 text-white rounded-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : isPlaying ? (
          <button
            onClick={handlePause}
            type="button"
            className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors"
            aria-label="Pause"
            title="Pause"
          >
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            type="button"
            className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors"
            aria-label={isPaused ? "Resume" : "Play"}
            title={isPaused ? "Resume" : "Play"}
          >
            <Play className="w-4 h-4" />
          </button>
        )}
        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            type="button"
            className="p-2 bg-stone-300 hover:bg-stone-400 dark:bg-stone-600 dark:hover:bg-stone-500 text-stone-700 dark:text-white rounded-full transition-colors"
            aria-label="Stop"
            title="Stop"
          >
            <Square className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
