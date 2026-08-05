import express from "express";
import companyData from "../data/companyProblems.js";

const router = express.Router();

// Get all company problems + metadata
router.get("/", (req, res) => {
  res.json(companyData);
});

// Get problems filtered by company ID
router.get("/company/:companyId", (req, res) => {
  const { companyId } = req.params;
  const filtered = companyData.problems.filter(
    (p) => p.companyId.toLowerCase() === companyId.toLowerCase()
  );
  res.json(filtered);
});

export default router;
