import { OOP_MODULES } from "../../../backend/src/data/oopData.js";

const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/oop`;

let cachedOopModules = OOP_MODULES;

export function getCachedOopModules() {
  return cachedOopModules;
}

export async function getOopModules() {
  if (cachedOopModules && cachedOopModules.length > 0) {
    return cachedOopModules;
  }
  try {
    const res = await fetch(BASE_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        cachedOopModules = data;
        return data;
      }
    }
  } catch (err) {
    // Fallback to local dataset seamlessly
  }
  cachedOopModules = OOP_MODULES;
  return OOP_MODULES;
}

