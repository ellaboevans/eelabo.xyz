"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PlaybackStatus = "ready" | "playing" | "paused" | "done" | "unsupported";
type PlaybackSpeed = 0.75 | 1 | 1.25 | 1.5 | 2;

const PLAYBACK_SPEEDS: PlaybackSpeed[] = [0.75, 1, 1.25, 1.5, 2];

const STATUS_LABELS: Record<PlaybackStatus, string> = {
  ready: "Ready",
  playing: "Playing",
  paused: "Paused",
  done: "Done",
  unsupported: "Unsupported",
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getPreferredVoice(): SpeechSynthesisVoice | undefined {
  const voices = globalThis.speechSynthesis?.getVoices() ?? [];
  // Prefer high-quality voices
  return voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      (v.name.includes("Google") ||
        v.name.includes("Microsoft") ||
        v.name.includes("Samantha") ||
        v.name.includes("Daniel") ||
        v.name.includes("Karen"))
  );
}

interface TTSAudioReaderProps {
  articleSelector?: string;
}

export default function TTSAudioReader({
  articleSelector = "#tts-content",
}: Readonly<TTSAudioReaderProps>) {
  const [status, setStatus] = useState<PlaybackStatus>("ready");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [isSupported, setIsSupported] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef<string>("");
  const charIndexRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const statusRef = useRef<PlaybackStatus>("ready");

  const statusId = useId();
  const progressId = useId();

  // Keep statusRef in sync
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Check browser support
  useEffect(() => {
    const supported =
      typeof globalThis !== "undefined" && "speechSynthesis" in globalThis;
    setIsSupported(supported);
    if (!supported) {
      setStatus("unsupported");
    }
  }, []);

  // Load voices
  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      preferredVoiceRef.current = getPreferredVoice();
    };

    loadVoices();
    globalThis.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      globalThis.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadVoices
      );
    };
  }, [isSupported]);

  // Extract article text
  const getArticleText = useCallback((): string => {
    if (typeof document === "undefined") return "";

    const article = document.querySelector(articleSelector);
    if (!article) return "";

    const clone = article.cloneNode(true) as HTMLElement;

    const removeSelectors = [
      "script",
      "style",
      "noscript",
      "button",
      "nav",
      "aside",
      "[aria-hidden='true']",
      "[data-tts-ignore]",
      "[datetime]",
      "time",
      ".sr-only",
      "pre",
      "code",
      "img",
    ];
    removeSelectors.forEach((selector) => {
      clone.querySelectorAll(selector).forEach((el) => el.remove());
    });

    const text = clone.textContent || "";
    return text.replaceAll(/\s+/g, " ").trim();
  }, [articleSelector]);

  // Update elapsed time
  const updateElapsedTime = useCallback(() => {
    if (startTimeRef.current && statusRef.current === "playing") {
      const elapsed =
        (Date.now() - startTimeRef.current + pausedTimeRef.current) / 1000;
      setCurrentTime(elapsed);
      if (duration > 0) {
        setProgress((elapsed / duration) * 100);
      }
    }
  }, [duration]);

  // Start elapsed time interval
  useEffect(() => {
    if (status === "playing") {
      intervalRef.current = setInterval(updateElapsedTime, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, updateElapsedTime]);

  // Create and play utterance
  const playFromIndex = useCallback(
    (text: string, startIndex = 0) => {
      if (!isSupported) return;

      globalThis.speechSynthesis.cancel();

      const textToSpeak = startIndex > 0 ? text.slice(startIndex) : text;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speed;
      utterance.pitch = 1;
      utterance.volume = 1;

      if (preferredVoiceRef.current) {
        utterance.voice = preferredVoiceRef.current;
      }

      // Estimate duration (150 words/min at 1x speed)
      const words = text.split(/\s+/).length;
      const estimatedDuration = (words / (150 * speed)) * 60;
      setDuration(estimatedDuration);

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const currentIdx = startIndex + event.charIndex;
          charIndexRef.current = currentIdx;
          const progressPercent = (currentIdx / textRef.current.length) * 100;
          setProgress(progressPercent);
        }
      };

      utterance.onend = () => {
        setStatus("done");
        setProgress(100);
        setCurrentTime(estimatedDuration);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };

      utterance.onerror = (event) => {
        if (event.error !== "interrupted" && event.error !== "canceled") {
          console.error("Speech synthesis error:", event.error);
          setStatus("ready");
        }
      };

      utteranceRef.current = utterance;
      globalThis.speechSynthesis.speak(utterance);
      startTimeRef.current = Date.now();
      setStatus("playing");
    },
    [isSupported, speed]
  );

  // Handle play
  const handlePlay = useCallback(() => {
    if (!isSupported) return;

    if (status === "paused") {
      // Resume from where we left off
      globalThis.speechSynthesis.resume();
      startTimeRef.current = Date.now();
      setStatus("playing");
      return;
    }

    // Start fresh
    const text = getArticleText();
    if (!text) return;

    textRef.current = text;
    charIndexRef.current = 0;
    pausedTimeRef.current = 0;
    setProgress(0);
    setCurrentTime(0);

    playFromIndex(text, 0);
  }, [isSupported, status, getArticleText, playFromIndex]);

  // Handle pause
  const handlePause = useCallback(() => {
    if (status === "playing") {
      globalThis.speechSynthesis.pause();
      pausedTimeRef.current += Date.now() - startTimeRef.current;
      setStatus("paused");
    }
  }, [status]);

  // Handle stop
  const handleStop = useCallback(() => {
    globalThis.speechSynthesis.cancel();
    setStatus("ready");
    setProgress(0);
    setCurrentTime(0);
    pausedTimeRef.current = 0;
    charIndexRef.current = 0;
    utteranceRef.current = null;
  }, []);

  // Handle speed change
  const handleSpeedChange = useCallback(
    (newSpeed: PlaybackSpeed) => {
      setSpeed(newSpeed);

      if (status === "playing" || status === "paused") {
        // Web Speech API doesn't support dynamic rate change, restart from current position
        globalThis.speechSynthesis.cancel();
        pausedTimeRef.current = 0;
        startTimeRef.current = Date.now();

        const text = textRef.current;
        const textToSpeak = text.slice(charIndexRef.current);
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = newSpeed;
        utterance.pitch = 1;
        utterance.volume = 1;

        if (preferredVoiceRef.current) {
          utterance.voice = preferredVoiceRef.current;
        }

        // Update duration estimate
        const words = text.split(/\s+/).length;
        const estimatedDuration = (words / (150 * newSpeed)) * 60;
        setDuration(estimatedDuration);

        utterance.onboundary = (event) => {
          if (event.name === "word") {
            const currentIdx = charIndexRef.current + event.charIndex;
            charIndexRef.current = currentIdx;
            const progressPercent = (currentIdx / textRef.current.length) * 100;
            setProgress(progressPercent);
          }
        };

        utterance.onend = () => {
          setStatus("done");
          setProgress(100);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };

        utterance.onerror = (event) => {
          if (event.error !== "interrupted" && event.error !== "canceled") {
            console.error("Speech synthesis error:", event.error);
            setStatus("ready");
          }
        };

        utteranceRef.current = utterance;
        globalThis.speechSynthesis.speak(utterance);
        setStatus("playing");
      }
    },
    [status]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      globalThis.speechSynthesis?.cancel();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!isSupported || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="sticky top-16 z-40 mb-4 -mx-4 sm:mx-0"
        role="region"
        aria-label="Text-to-speech audio player"
      >
        <div className="bg-neutral-900/50 backdrop-blur-xs text-white shadow-lg border-b sm:border border-stone-800">
          {/* Progress Bar */}
          <div
            className="h-1 bg-neutral-800 overflow-hidden"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
            id={progressId}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-amber-900 to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Play/Pause Button */}
              <button
                onClick={status === "playing" ? handlePause : handlePlay}
                disabled={status === "unsupported"}
                className="p-2 rounded-full bg-amber-600 active:scale-95 hover:bg-amber-500 disabled:bg-stone-700 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 min-w-10 min-h-10 flex items-center justify-center"
                aria-label={status === "playing" ? "Pause audio" : "Play audio"}
              >
                {status === "playing" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Stop Button */}
              <button
                onClick={handleStop}
                disabled={status === "ready" || status === "unsupported"}
                className="p-2 rounded-full bg-stone-700 active:scale-95 hover:bg-stone-600 disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 min-w-10 min-h-10 flex items-center justify-center"
                aria-label="Stop audio"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                </svg>
              </button>
            </div>

            {/* Waveform Animation */}
            <div className="flex items-center gap-0.75 h-6" aria-hidden="true">
              {[0, 1, 2, 3, 4,].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-amber-500 rounded-full"
                  animate={status === "playing" ? { height: [8, 20, 12, 24, 8] } : { height: 8 }}
                  transition={
                    status === "playing"
                      ? {
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }
                      : { duration: 0.2 }
                  }
                />
              ))}
            </div>

            {/* Time Display */}
            <div className="flex items-center gap-2 text-sm text-stone-300 tabular-nums font-mono">
              <span aria-label={`Current time: ${formatTime(currentTime)}`}>
                {formatTime(currentTime)}
              </span>
             
            </div>

            {/* Status Label */}
            <div
              id={statusId}
              role="status"
              aria-live="polite"
              className="px-2 py-1 rounded-md bg-stone-800 text-xs font-medium text-stone-300"
            >
              {STATUS_LABELS[status]}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Speed Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="speed-select" className="text-xs text-stone-400 hidden sm:block">
                Speed
              </label>
              <select
                id="speed-select"
                value={speed}
                onChange={(e) =>
                  handleSpeedChange(Number.parseFloat(e.target.value) as PlaybackSpeed)
                }
                className="bg-stone-800 text-stone-200 rounded-md px-2 py-1 text-sm border border-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 min-h-9"
                aria-label="Playback speed"
              >
                {PLAYBACK_SPEEDS.map((s) => (
                  <option key={s} value={s}>
                    {s}x
                  </option>
                ))}
              </select>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => {
                handleStop();
                setIsDismissed(true);
              }}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 transition-all active:scale-95 duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 min-w-9 min-h-9 flex items-center justify-center"
              aria-label="Close audio player"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
