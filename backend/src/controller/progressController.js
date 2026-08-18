import UserProgress from "../models/UserProgress.js";

export const ALLOWED_RESOURCE_TYPES = [
  "dsa",
  "company-dsa",
  "system-design",
  "os",
  "oop",
  "subjects",
];

const isValidResourceType = (type) => ALLOWED_RESOURCE_TYPES.includes(type);

const sanitizeResourceId = (id) => {
  if (id === null || id === undefined) return null;
  const str = String(id).trim();
  if (!str || str.length > 100) return null;
  return str;
};

/**
 * Get all progress for the authenticated user grouped by resourceType
 * GET /api/progress
 */
export const getAllProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await UserProgress.find({
      userId,
      status: "completed",
    }).sort({ completedAt: -1 });

    const grouped = {};
    for (const type of ALLOWED_RESOURCE_TYPES) {
      grouped[type] = [];
    }

    for (const r of records) {
      if (grouped[r.resourceType]) {
        grouped[r.resourceType].push(r.resourceId);
      }
    }

    return res.status(200).json({
      success: true,
      progress: grouped,
    });
  } catch (error) {
    console.error("Error fetching all progress:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching user progress",
    });
  }
};

/**
 * Get progress for a specific resourceType
 * GET /api/progress/:resourceType
 */
export const getProgressByType = async (req, res) => {
  try {
    const userId = req.user._id;
    const { resourceType } = req.params;

    if (!isValidResourceType(resourceType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid resource type. Allowed types: ${ALLOWED_RESOURCE_TYPES.join(", ")}`,
      });
    }

    const records = await UserProgress.find({
      userId,
      resourceType,
      status: "completed",
    }).sort({ completedAt: -1 });

    const ids = records.map((r) => r.resourceId);

    return res.status(200).json({
      success: true,
      resourceType,
      progress: ids,
    });
  } catch (error) {
    console.error(`Error fetching progress for ${req.params.resourceType}:`, error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching resource progress",
    });
  }
};

/**
 * Mark a resource as completed (Atomic upsert)
 * POST /api/progress/:resourceType/:resourceId
 */
export const completeResource = async (req, res) => {
  try {
    const userId = req.user._id;
    const { resourceType, resourceId } = req.params;

    if (!isValidResourceType(resourceType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid resource type. Allowed types: ${ALLOWED_RESOURCE_TYPES.join(", ")}`,
      });
    }

    const sanitizedId = sanitizeResourceId(resourceId);
    if (!sanitizedId) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID parameter",
      });
    }

    const progressDoc = await UserProgress.findOneAndUpdate(
      { userId, resourceType, resourceId: sanitizedId },
      { status: "completed", completedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Resource marked as completed",
      progress: {
        resourceType: progressDoc.resourceType,
        resourceId: progressDoc.resourceId,
        status: progressDoc.status,
        completedAt: progressDoc.completedAt,
      },
    });
  } catch (error) {
    console.error("Error completing resource:", error);
    return res.status(500).json({
      success: false,
      message: "Server error marking resource as completed",
    });
  }
};

/**
 * Mark a resource as incomplete (Delete record)
 * DELETE /api/progress/:resourceType/:resourceId
 */
export const uncompleteResource = async (req, res) => {
  try {
    const userId = req.user._id;
    const { resourceType, resourceId } = req.params;

    if (!isValidResourceType(resourceType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid resource type. Allowed types: ${ALLOWED_RESOURCE_TYPES.join(", ")}`,
      });
    }

    const sanitizedId = sanitizeResourceId(resourceId);
    if (!sanitizedId) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID parameter",
      });
    }

    await UserProgress.deleteOne({
      userId,
      resourceType,
      resourceId: sanitizedId,
    });

    return res.status(200).json({
      success: true,
      message: "Resource marked as incomplete",
    });
  } catch (error) {
    console.error("Error removing resource completion:", error);
    return res.status(500).json({
      success: false,
      message: "Server error marking resource as incomplete",
    });
  }
};

/**
 * Bulk synchronize progress items from localStorage / client cache
 * POST /api/progress/bulk-sync
 */
export const bulkSyncProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain an 'items' array",
      });
    }

    if (items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No items to sync",
        syncedCount: 0,
      });
    }

    const validOperations = [];
    const seen = new Set();

    for (const item of items) {
      if (
        item &&
        isValidResourceType(item.resourceType) &&
        item.resourceId
      ) {
        const sanitizedId = sanitizeResourceId(item.resourceId);
        if (sanitizedId) {
          const key = `${item.resourceType}:${sanitizedId}`;
          if (!seen.has(key)) {
            seen.add(key);
            validOperations.push({
              updateOne: {
                filter: {
                  userId,
                  resourceType: item.resourceType,
                  resourceId: sanitizedId,
                },
                update: {
                  $setOnInsert: {
                    status: "completed",
                    completedAt: item.completedAt ? new Date(item.completedAt) : new Date(),
                  },
                },
                upsert: true,
              },
            });
          }
        }
      }
    }

    if (validOperations.length > 0) {
      await UserProgress.bulkWrite(validOperations, { ordered: false });
    }

    return res.status(200).json({
      success: true,
      message: "Bulk progress synchronized successfully",
      syncedCount: validOperations.length,
    });
  } catch (error) {
    console.error("Error bulk syncing progress:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during bulk progress synchronization",
    });
  }
};

// =========================================================================
// Backward Compatibility Endpoints for DSA
// =========================================================================

/**
 * Backward-compatible wrapper for completing DSA problem
 * POST /api/progress/dsa/:problemId
 */
export const completeDsaProblem = async (req, res) => {
  req.params.resourceType = "dsa";
  req.params.resourceId = req.params.problemId;
  return completeResource(req, res);
};

/**
 * Backward-compatible wrapper for uncompleting DSA problem
 * DELETE /api/progress/dsa/:problemId
 */
export const uncompleteDsaProblem = async (req, res) => {
  req.params.resourceType = "dsa";
  req.params.resourceId = req.params.problemId;
  return uncompleteResource(req, res);
};

/**
 * Backward-compatible wrapper for getting DSA progress
 * GET /api/progress/dsa
 */
export const getDsaProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await UserProgress.find({
      userId,
      resourceType: "dsa",
      status: "completed",
    }).sort({ completedAt: -1 });

    const progress = records.map((r) => ({
      problemId: isNaN(Number(r.resourceId)) ? r.resourceId : Number(r.resourceId),
      status: r.status,
      completedAt: r.completedAt,
    }));

    return res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Error fetching DSA progress:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching DSA progress",
    });
  }
};
