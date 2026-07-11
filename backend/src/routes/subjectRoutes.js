import express from "express";
import subjects from "../data/subjects.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(subjects);
});

router.get("/:id", (req, res) => {
  const subject = subjects.find(s => s.id === req.params.id);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }
  res.json(subject);
});

export default router;