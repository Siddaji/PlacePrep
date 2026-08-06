import express from "express";
import systemDesignTopics from "../data/systemDesign.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(systemDesignTopics);
});

router.get("/:id", (req, res) => {
  const topicId = Number(req.params.id);
  const topic = systemDesignTopics.find(t => t.id === topicId);
  if (!topic) {
    return res.status(404).json({ message: "System Design topic not found" });
  }
  res.json(topic);
});

export default router;
