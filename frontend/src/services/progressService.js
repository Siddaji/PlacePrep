const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/progress`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("placeprep_auth_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const progressService = {
  /**
   * Get all progress for authenticated user grouped by resourceType
   */
  async getAllProgress() {
    try {
      const res = await fetch(BASE_URL, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error("progressService.getAllProgress error:", err);
      return { success: false, message: "Network error", progress: {} };
    }
  },

  /**
   * Get progress array for a specific resourceType
   */
  async getProgress(resourceType) {
    try {
      const res = await fetch(`${BASE_URL}/${resourceType}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error(`progressService.getProgress(${resourceType}) error:`, err);
      return { success: false, message: "Network error", progress: [] };
    }
  },

  /**
   * Mark a resource as completed
   */
  async completeResource(resourceType, resourceId) {
    try {
      const res = await fetch(`${BASE_URL}/${resourceType}/${encodeURIComponent(resourceId)}`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error(`progressService.completeResource(${resourceType}, ${resourceId}) error:`, err);
      return { success: false, message: "Network error" };
    }
  },

  /**
   * Mark a resource as incomplete
   */
  async uncompleteResource(resourceType, resourceId) {
    try {
      const res = await fetch(`${BASE_URL}/${resourceType}/${encodeURIComponent(resourceId)}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error(`progressService.uncompleteResource(${resourceType}, ${resourceId}) error:`, err);
      return { success: false, message: "Network error" };
    }
  },

  /**
   * Bulk sync progress items from client storage
   */
  async bulkSync(items) {
    try {
      const res = await fetch(`${BASE_URL}/bulk-sync`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ items }),
      });
      return await res.json();
    } catch (err) {
      console.error("progressService.bulkSync error:", err);
      return { success: false, message: "Network error" };
    }
  },

  // =========================================================================
  // Backward-compatible DSA Methods
  // =========================================================================

  async getDsaProgress() {
    try {
      const res = await fetch(`${BASE_URL}/dsa`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error("progressService.getDsaProgress error:", err);
      return { success: false, message: "Network error", progress: [] };
    }
  },

  async completeDsaProblem(problemId) {
    try {
      const res = await fetch(`${BASE_URL}/dsa/${problemId}`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error("progressService.completeDsaProblem error:", err);
      return { success: false, message: "Network error" };
    }
  },

  async uncompleteDsaProblem(problemId) {
    try {
      const res = await fetch(`${BASE_URL}/dsa/${problemId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (err) {
      console.error("progressService.uncompleteDsaProblem error:", err);
      return { success: false, message: "Network error" };
    }
  },
};
