import { unlockQuestion } from "../../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { id, userName, isAdmin } = req.body;
  if (!id || !userName) {
    return res.status(400).json({ error: "id and userName are required" });
  }
  const result = unlockQuestion(Number(id), userName, isAdmin === true);
  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }
  return res.status(200).json(result);
}
