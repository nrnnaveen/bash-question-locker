"use client";

import { useState, useEffect } from "react";
import LoginScreen from "../components/LoginScreen";
import Dashboard from "../components/Dashboard";

const SESSION_KEY = "bash_session_user";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {}
    setHydrated(true);
  }, []);

  function handleLogin(userData) {
    setUser(userData);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    } catch {}
  }

  function handleLogout() {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
