import { getAllQuestions } from "../../../lib/store";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const questions = getAllQuestions();
  return res.status(200).json({ questions });
}
