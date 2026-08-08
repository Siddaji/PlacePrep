import { OS_MODULES } from "../../../backend/src/data/osData.js";

const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/os`;

export async function getOsModules() {
  try {
    const res = await fetch(BASE_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    // Fallback to local dataset seamlessly
  }
  return OS_MODULES;
}
