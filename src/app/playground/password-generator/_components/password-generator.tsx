"use client";
import React, { useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  const evaluateStrength = (value: string) => {
    let score = 0;

    if (value.length > 5) score++;
    if (value.length > 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    setStrength(score);

    switch (score) {
      case 0:
        setFeedback("");
        break;
      case 1:
        setFeedback("😕 Weak");
        break;
      case 2:
        setFeedback("🙂 Fair");
        break;
      case 3:
        setFeedback("😎 Good");
        break;
      case 4:
        setFeedback("💪 Strong");
        break;
      case 5:
        setFeedback("🔥 Very Strong");
        break;
    }
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPass = "";
    for (let i = 0; i < 12; i++) {
      newPass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPass);
    evaluateStrength(newPass);
  };

  const copyToClipBoard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-start space-y-2">
          <div className="relative w-full">
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                evaluateStrength(e.target.value);
              }}
              placeholder="Type your password..."
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors"
            />
            <button
              onClick={() => copyToClipBoard(password)}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-sm text-amber-500 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            onClick={generatePassword}
            className="font-normal hover:cursor-pointer hover:underline text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
          >
            Generate
          </button>
        </div>
        <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              strength === 0
                ? "w-0"
                : strength === 1
                ? "w-1/5 bg-red-500"
                : strength === 2
                ? "w-2/5 bg-orange-500"
                : strength === 3
                ? "w-3/5 bg-yellow-500"
                : strength === 4
                ? "w-4/5 bg-green-500"
                : "w-full bg-emerald-600"
            }`}
          />
        </div>
        <p className="text-left text-lg font-medium mt-2">{feedback}</p>
      </div>
    </div>
  );
}
