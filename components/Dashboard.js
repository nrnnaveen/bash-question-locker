"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { LogOut, RefreshCw, Search, Zap, Lock, CheckCircle } from "lucide-react";
import QuestionCard from "./QuestionCard";
import AdminPanel from "./AdminPanel";
import CountdownTimer from "./CountdownTimer";

export default function Dashboard({ user, onLogout }) {
  const [questions, setQuestions] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | available | locked | mine
  const [fetching, setFetching] = useState(true);

  const fetchQuestions = useCallback(async (silent = false) => {
    if (!silent) setFetching(true);
    try {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      if (!silent) toast.error("Failed to load questions");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
    // Poll every 5s for real-time updates
    const interval = setInterval(() => fetchQuestions(true), 5000);
    return () => clearInterval(interval);
  }, [fetchQuestions]);

  async function handleLock(id) {
    setLoadingId(id);
    try {
      const res = await fetch("/api/lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userName: user.name }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not lock question");
      } else {
        toast.success("🔒 Question locked!");
        await fetchQuestions(true);
      }
    } catch {
      toast.error("Network error. Try again.");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleUnlock(id) {
    setLoadingId(id);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userName: user.name, isAdmin: user.role === "Admin" }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not unlock");
      } else {
        toast.success("🔓 Question unlocked");
        await fetchQuestions(true);
      }
    } catch {
      toast.error("Network error. Try again.");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleReset() {
    setGlobalLoading(true);
    try {
      const res = await fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: true }),
      });
      if (res.ok) {
        toast.success("✅ All locks reset");
        await fetchQuestions(true);
      } else {
        toast.error("Reset failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setGlobalLoading(false);
    }
  }

  async function handleAdd(text) {
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, isAdmin: true }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Question added");
        await fetchQuestions(true);
      } else {
        toast.error(data.error || "Failed to add");
      }
    } catch {
      toast.error("Network error");
    }
  }

  async function handleDelete(id) {
    setLoadingId(id);
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isAdmin: true }),
      });
      if (res.ok) {
        toast.success("🗑️ Question deleted");
        await fetchQuestions(true);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoadingId(null);
    }
  }

  // Filter + search
  const filtered = questions.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "available" && !q.lockedBy) ||
      (filter === "locked" && q.lockedBy) ||
      (filter === "mine" && q.lockedBy === user.name);
    return matchSearch && matchFilter;
  });

  const totalLocked = questions.filter((q) => q.lockedBy).length;
  const myLocked = questions.filter((q) => q.lockedBy === user.name).length;
  const available = questions.filter((q) => !q.lockedBy).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-4 py-3"
        style={{
          background: "rgba(15,14,12,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #2a2520",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500 shrink-0" />
            <span className="font-display font-700 text-white text-lg leading-none">BASH</span>
            <span className="hidden sm:inline text-xs text-[#a09080] font-mono-custom">/ Question Locker</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
              style={{ background: "#1a1814", border: "1px solid #2a2520" }}>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[#a09080]">{user.name}</span>
              {user.role === "Admin" && (
                <span className="text-blue-400 font-600">· Admin</span>
              )}
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[#a09080] hover:text-white transition-colors"
              style={{ border: "1px solid #2a2520" }}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column: sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-4">
            {/* Timer */}
            <CountdownTimer />

            {/* Stats */}
            <div
              className="rounded-2xl p-4"
              style={{ background: "#1a1814", border: "1px solid #2a2520" }}
            >
              <p className="text-xs text-[#a09080] uppercase tracking-wider font-600 mb-3">Session Stats</p>
              <div className="space-y-3">
                <StatRow label="Total Questions" value={questions.length} color="text-white" />
                <StatRow label="Available" value={available} color="text-green-400" />
                <StatRow label="Locked" value={totalLocked} color="text-orange-400" />
                <StatRow label="Your Locks" value={myLocked} color="text-blue-400" />
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#a09080] mb-1.5">
                  <span>Claimed</span>
                  <span>{questions.length ? Math.round((totalLocked / questions.length) * 100) : 0}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#2a2520] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${questions.length ? (totalLocked / questions.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Admin Panel */}
            {user.role === "Admin" && (
              <AdminPanel
                user={user}
                onReset={handleReset}
                onAdd={handleAdd}
                loading={globalLoading}
              />
            )}
          </aside>

          {/* Right column: questions */}
          <div className="flex-1 min-w-0">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#504030]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search scenarios..."
                  className="input-field w-full rounded-xl pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { key: "all", label: "All" },
                  { key: "available", label: "Free" },
                  { key: "locked", label: "Locked" },
                  { key: "mine", label: "Mine" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-3 py-2 rounded-xl text-xs font-display font-600 transition-all whitespace-nowrap ${
                      filter === f.key
                        ? "bg-orange-500/10 border border-orange-500/40 text-orange-400"
                        : "border border-[#2a2520] text-[#a09080] hover:text-white hover:border-[#3d3530]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                <button
                  onClick={() => fetchQuestions()}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#2a2520] text-[#a09080] hover:text-white hover:border-[#3d3530] transition-all"
                  title="Refresh"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${fetching ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-700 text-white">
                Round 1: Survival &amp; Acting
              </h2>
              <span className="text-xs text-[#a09080] font-mono-custom">
                {filtered.length} scenarios
              </span>
            </div>

            {/* Question cards */}
            {fetching && questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#504030]">
                <div className="w-8 h-8 border-2 border-[#3d3530] border-t-orange-500 rounded-full animate-spin mb-4" />
                <p className="text-sm">Loading scenarios...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#504030]">
                <Search className="w-8 h-8 mb-3 opacity-50" />
                <p className="text-sm">No questions match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {filtered.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    user={user}
                    onLock={handleLock}
                    onUnlock={handleUnlock}
                    onDelete={handleDelete}
                    loading={loadingId === q.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatRow({ label, value, color }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#a09080]">{label}</span>
      <span className={`font-mono-custom text-sm font-600 ${color}`}>{value}</span>
    </div>
  );
}
