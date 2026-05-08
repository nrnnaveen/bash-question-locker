import questionsData from "../data/questions.json";

// Global in-memory store that persists across requests in the same server process
// For Vercel serverless, we seed from the JSON file on first access
let store = {
  questions: null,
  initialized: false,
};

function getStore() {
  if (!store.initialized) {
    store.questions = JSON.parse(JSON.stringify(questionsData));
    store.initialized = true;
  }
  return store;
}

export function getAllQuestions() {
  return getStore().questions;
}

export function lockQuestion(id, userName) {
  const s = getStore();
  const q = s.questions.find((q) => q.id === id);
  if (!q) return { success: false, error: "Question not found" };
  if (q.lockedBy !== null) {
    return { success: false, error: `Already locked by ${q.lockedBy}` };
  }
  q.lockedBy = userName;
  q.lockedAt = new Date().toISOString();
  return { success: true, question: q };
}

export function unlockQuestion(id, userName, isAdmin) {
  const s = getStore();
  const q = s.questions.find((q) => q.id === id);
  if (!q) return { success: false, error: "Question not found" };
  if (!isAdmin && q.lockedBy !== userName) {
    return { success: false, error: "You can only unlock your own questions" };
  }
  q.lockedBy = null;
  q.lockedAt = null;
  return { success: true, question: q };
}

export function resetAllLocks() {
  const s = getStore();
  s.questions.forEach((q) => {
    q.lockedBy = null;
    q.lockedAt = null;
  });
  return { success: true };
}

export function addQuestion(text) {
  const s = getStore();
  const maxId = s.questions.reduce((m, q) => Math.max(m, q.id), 0);
  const newQ = {
    id: maxId + 1,
    question: text,
    lockedBy: null,
    lockedAt: null,
  };
  s.questions.push(newQ);
  return { success: true, question: newQ };
}

export function deleteQuestion(id) {
  const s = getStore();
  const idx = s.questions.findIndex((q) => q.id === id);
  if (idx === -1) return { success: false, error: "Question not found" };
  s.questions.splice(idx, 1);
  return { success: true };
}
