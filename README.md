# 🎭 Bash Session — Question Locker App

A real-time question locking app for the **Bash Session Round 1: Critical Situation (30s Survival & Acting)** event.

Participants log in, browse 20 fun acting scenarios, and lock the one they want to perform — preventing others from picking the same one.

---

## ✨ Features

- **🔐 Login** — Enter name + choose Member/Admin role (no password)
- **📋 20 Questions** — All extracted from your PDF, displayed as cards
- **🔒 Lock System** — Click Lock to claim a scenario; others see it as taken
- **👑 Admin Controls** — Reset all locks, add new questions, delete questions
- **⏱️ 45-min Countdown Timer** — Start/pause/reset for session management
- **🔍 Search & Filter** — Find by keyword or filter by Available/Locked/Mine
- **🔄 Auto-refresh** — Polls every 5 seconds for live updates
- **📱 Mobile Responsive** — Works great on phones

---


## 🗂️ Project Structure

```
/
├── app/
│   ├── layout.js          # Root layout + Toaster
│   └── page.js            # Main page (login gate)
├── components/
│   ├── LoginScreen.js     # Login UI
│   ├── Dashboard.js       # Main dashboard (questions + sidebar)
│   ├── QuestionCard.js    # Individual question card
│   ├── AdminPanel.js      # Admin controls
│   └── CountdownTimer.js  # 45-min countdown
├── pages/
│   └── api/
│       ├── questions/
│       │   └── index.js   # GET all questions
│       ├── lock.js        # POST lock a question
│       ├── unlock.js      # POST unlock a question
│       ├── reset.js       # POST reset all locks (admin)
│       ├── add.js         # POST add question (admin)
│       └── delete.js      # POST delete question (admin)
├── lib/
│   └── store.js           # In-memory store (seeded from JSON)
├── data/
│   └── questions.json     # All 20 questions from the PDF
├── styles/
│   └── globals.css        # Tailwind + custom design system
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json
```
## 👤 Roles

| Role | Can Lock | Can Unlock Own | Can Unlock Others | Admin Panel |
|------|----------|----------------|-------------------|-------------|
| Member | ✅ | ✅ | ❌ | ❌ |
| Admin | ✅ | ✅ | ✅ (force unlock) | ✅ |

---
***-- Lumina Bashers***
