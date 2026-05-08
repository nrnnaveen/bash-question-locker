import { addQuestion } from "../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { text, isAdmin } = req.body;
  if (!isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  if (!text || text.trim().length < 5) {
    return res.status(400).json({ error: "Question text is too short" });
  }
  const result = addQuestion(text.trim());
  return res.status(200).json(result);
}
