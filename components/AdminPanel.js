"use client";

import { useState } from "react";
import { RotateCcw, Plus, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPanel({ user, onReset, onAdd, loading }) {
  const [newQ, setNewQ] = useState("");
  const [adding, setAdding] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newQ.trim() || newQ.trim().length < 5) {
      toast.error("Question is too short!");
      return;
    }
    setAdding(true);
    await onAdd(newQ.trim());
    setNewQ("");
    setAdding(false);
  }

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{
        background: "linear-gradient(135deg, #0f1520 0%, #1a1814 100%)",
        border: "1px solid #1e3a5f",
        boxShadow: "0 0 40px rgba(59,130,246,0.04)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Shield className="w-4 h-4 text-blue-400" />
        <span className="font-display text-sm font-700 text-blue-400 uppercase tracking-wider">
          Admin Controls
        </span>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-display font-600 transition-all disabled:opacity-40"
        style={{
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)",
          color: "#f87171",
        }}
      >
        <RotateCcw className="w-4 h-4" />
        Reset All Locks
      </button>

      {/* Add Question */}
      <form onSubmit={handleAdd} className="space-y-2">
        <textarea
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          placeholder="Type new question scenario here..."
          rows={3}
          className="input-field w-full rounded-xl px-3 py-2.5 text-sm resize-none scrollbar-thin"
        />
        <button
          type="submit"
          disabled={adding || !newQ.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm"
        >
          {adding ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Question
        </button>
      </form>
    </div>
  );
}
