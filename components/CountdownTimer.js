"use client";

import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";

const TOTAL = 45 * 60; // 45 minutes in seconds

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function reset() {
    setRunning(false);
    setTimeLeft(TOTAL);
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const pct = ((TOTAL - timeLeft) / TOTAL) * 100;

  const isUrgent = timeLeft < 5 * 60;
  const isDone = timeLeft === 0;

  return (
    <div
      className={`rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 ${
        isDone
          ? "bg-red-900/20 border border-red-800/50"
          : isUrgent
          ? "bg-orange-900/20 border border-orange-700/50"
          : "border border-[#2a2520]"
      }`}
      style={{ background: isDone ? undefined : isUrgent ? undefined : "#1a1814" }}
    >
      <div className="relative w-12 h-12 shrink-0">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#2a2520" strokeWidth="4" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke={isDone ? "#ef4444" : isUrgent ? "#f97316" : "#22c55e"}
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - pct / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <Timer
          className={`absolute inset-0 m-auto w-4 h-4 ${
            isDone ? "text-red-400" : isUrgent ? "text-orange-400" : "text-green-400"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#a09080] uppercase tracking-wider mb-0.5">Session Timer</p>
        <p
          className={`font-mono-custom text-2xl font-600 tabular-nums ${
            isDone ? "text-red-400" : isUrgent ? "text-orange-400 animate-pulse-slow" : "text-white"
          }`}
        >
          {isDone ? "TIME'S UP!" : `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          disabled={isDone}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={reset}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-[#2a2520] text-[#a09080] hover:text-white hover:border-[#3d3530] transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
