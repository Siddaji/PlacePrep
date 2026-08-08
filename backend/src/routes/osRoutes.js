import express from "express";
import { OS_MODULES } from "../data/osData.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(OS_MODULES);
});

export default router;
