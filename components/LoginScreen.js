"use client";

import { useState } from "react";
import { Zap, User, Shield } from "lucide-react";

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Member");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: name.trim(), role });
      setLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
            <Zap className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="font-display text-4xl font-800 tracking-tight text-white mb-2">
            BASH SESSION
          </h1>
          <p className="text-sm text-orange-400 font-mono-custom tracking-widest uppercase">
            Round 1 — Question Locker
          </p>
          <p className="text-[#a09080] mt-3 text-sm">
            The Critical Situation: 30s Survival &amp; Acting
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "#1a1814",
            border: "1px solid #2a2520",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(249,115,22,0.05)",
          }}
        >
          <h2 className="font-display text-xl font-700 text-white mb-6">
            Join the Session
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-600 text-[#a09080] uppercase tracking-wider mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09080]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  maxLength={40}
                  required
                  className="input-field w-full rounded-xl pl-10 pr-4 py-3 text-sm"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-600 text-[#a09080] uppercase tracking-wider mb-2">
                Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Member", "Admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-600 transition-all duration-150 border ${
                      role === r
                        ? "bg-orange-500/10 border-orange-500/40 text-orange-400"
                        : "bg-white/[0.03] border-[#2a2520] text-[#a09080] hover:border-[#3d3530] hover:text-white"
                    }`}
                  >
                    {r === "Admin" ? (
                      <Shield className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="btn-primary w-full rounded-xl py-3 text-sm mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining...
                </span>
              ) : (
                "Enter Session →"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#504030] mt-6">
          No password required · Session is shared · Have fun!
        </p>
      </div>
    </div>
  );
}
