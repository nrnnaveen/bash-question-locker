"use client";

import { Lock, Unlock, Trash2, User } from "lucide-react";

export default function QuestionCard({
  question,
  user,
  onLock,
  onUnlock,
  onDelete,
  loading,
}) {
  const isLocked = question.lockedBy !== null;
  const isMyLock = isLocked && question.lockedBy === user.name;
  const isAdmin = user.role === "Admin";
  const canUnlock = isMyLock || isAdmin;

  // Extract title (text before colon)
  const colonIdx = question.question.indexOf(":");
  const title = colonIdx !== -1 ? question.question.slice(0, colonIdx) : `Q${question.id}`;
  const body = colonIdx !== -1 ? question.question.slice(colonIdx + 1).trim() : question.question;

  return (
    <div
      className={`question-card animate-slide-up rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-200 ${
        isLocked
          ? isMyLock
            ? "locked-card"
            : "opacity-75"
          : "card-glow cursor-pointer"
      }`}
      style={{
        background: isLocked
          ? isMyLock
            ? "linear-gradient(135deg, #1a1210 0%, #1a1814 100%)"
            : "#161412"
          : "#1a1814",
        border: isLocked
          ? isMyLock
            ? "1px solid #c2410c"
            : "1px solid #2a2520"
          : "1px solid #2a2520",
      }}
    >
      {/* Locked ribbon */}
      {isLocked && (
        <div
          className="absolute top-0 right-0 px-3 py-1 text-xs font-mono-custom font-600 rounded-bl-xl"
          style={{
            background: isMyLock ? "#c2410c" : "#2a2520",
            color: isMyLock ? "#fff" : "#a09080",
          }}
        >
          {isMyLock ? "YOURS" : "LOCKED"}
        </div>
      )}

      {/* Card number badge */}
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono-custom font-600"
          style={{
            background: isLocked ? (isMyLock ? "#7c2d12" : "#1a1a1a") : "#2a1f10",
            color: isLocked ? (isMyLock ? "#fb923c" : "#504030") : "#f97316",
            border: `1px solid ${isLocked ? (isMyLock ? "#7c2d12" : "#222") : "#3d2510"}`,
          }}
        >
          {question.id}
        </span>

        <div className="flex-1 min-w-0">
          <p
            className="font-display text-xs font-700 uppercase tracking-wider mb-1"
            style={{ color: isLocked ? (isMyLock ? "#f97316" : "#504030") : "#f97316" }}
          >
            {title}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: isLocked && !isMyLock ? "#504030" : "#c8b8a0" }}
          >
            {body}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-1 pt-3" style={{ borderTop: "1px solid #2a2520" }}>
        {/* Status */}
        <div className="flex items-center gap-2">
          {isLocked ? (
            <>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: isMyLock ? "#f97316" : "#504030" }}
              />
              <span
                className="text-xs font-mono-custom"
                style={{ color: isMyLock ? "#fb923c" : "#504030" }}
              >
                {isMyLock ? "Locked by you" : `Locked by ${question.lockedBy}`}
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono-custom text-green-500">Available</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={() => onDelete(question.id)}
              disabled={loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#504030] hover:text-red-400 hover:bg-red-900/20 transition-all disabled:opacity-40"
              title="Delete question"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {!isLocked && (
            <button
              onClick={() => onLock(question.id)}
              disabled={loading}
              className="btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs disabled:opacity-40"
            >
              {loading ? (
                <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Lock className="w-3 h-3" />
              )}
              Lock
            </button>
          )}

          {isLocked && canUnlock && (
            <button
              onClick={() => onUnlock(question.id)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-600 transition-all disabled:opacity-40"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171",
              }}
            >
              {loading ? (
                <span className="w-3 h-3 border border-red-400/30 border-t-red-400 rounded-full animate-spin" />
              ) : (
                <Unlock className="w-3 h-3" />
              )}
              {isAdmin && !isMyLock ? "Force Unlock" : "Unlock"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
