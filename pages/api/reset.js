import { resetAllLocks } from "../../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { isAdmin } = req.body;
  if (!isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  const result = resetAllLocks();
  return res.status(200).json(result);
}
