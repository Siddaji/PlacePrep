import { OS_MODULES } from "../../../backend/src/data/osData.js";

const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/os`;

let cachedOsModules = OS_MODULES;

export function getCachedOsModules() {
  return cachedOsModules;
}

export async function getOsModules() {
  if (cachedOsModules && cachedOsModules.length > 0) {
    return cachedOsModules;
  }
  try {
    const res = await fetch(BASE_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        cachedOsModules = data;
        return data;
      }
    }
  } catch (err) {
    // Fallback to local dataset seamlessly
  }
  cachedOsModules = OS_MODULES;
  return OS_MODULES;
}

