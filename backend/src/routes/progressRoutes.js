import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllProgress,
  getProgressByType,
  completeResource,
  uncompleteResource,
  bulkSyncProgress,
  completeDsaProblem,
  uncompleteDsaProblem,
  getDsaProgress,
} from "../controller/progressController.js";

const router = express.Router();

// Bulk synchronization route
router.post("/bulk-sync", protect, bulkSyncProgress);

// Backward-compatible DSA specific routes
router.get("/dsa", protect, getDsaProgress);
router.post("/dsa/:problemId", protect, completeDsaProblem);
router.delete("/dsa/:problemId", protect, uncompleteDsaProblem);

// Generic progress routes
router.get("/", protect, getAllProgress);
router.get("/:resourceType", protect, getProgressByType);
router.post("/:resourceType/:resourceId", protect, completeResource);
router.delete("/:resourceType/:resourceId", protect, uncompleteResource);

export default router;
