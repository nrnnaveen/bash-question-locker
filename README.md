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

## 🚀 Quick Start (Local)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/bash-session-question-locker
cd bash-session-question-locker

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deploy to Vercel (1-Click)

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: GitHub Import
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Click **Deploy** — done!

> **Note:** No environment variables are needed. The app uses in-memory storage which resets on each Vercel function cold start. This is perfect for a single-session event.

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

---

## 🎨 Design System

- **Theme**: Dark, moody, orange-accented
- **Fonts**: Syne (display) + DM Sans (body) + JetBrains Mono (code)
- **Color**: Deep charcoal background with orange (#f97316) as brand accent

---

## 👤 Roles

| Role | Can Lock | Can Unlock Own | Can Unlock Others | Admin Panel |
|------|----------|----------------|-------------------|-------------|
| Member | ✅ | ✅ | ❌ | ❌ |
| Admin | ✅ | ✅ | ✅ (force unlock) | ✅ |

---

## 📝 Notes

- Storage is **in-memory** — locks reset if the server restarts
- For a persistent single event session, this is perfectly fine
- Auto-polls every **5 seconds** to sync across devices
- Built with **Next.js 14 App Router** + **Pages API Routes** hybrid

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Toasts**: React Hot Toast
- **Storage**: In-memory (Node.js global)
- **Deployment**: Vercel (zero config)
