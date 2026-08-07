const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/oop`;

export async function getOopModules() {
  try {
    const res = await fetch(BASE_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    // Fallback to local dataset seamlessly
  }
  return OOP_MODULES;
}
