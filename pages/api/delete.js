import { deleteQuestion } from "../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { id, isAdmin } = req.body;
  if (!isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  const result = deleteQuestion(Number(id));
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  return res.status(200).json(result);
}
