const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/problems`;

const CACHE_KEY = "placeprep-problems-data";

export function getCachedProblems() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (err) {
    console.warn("Failed to read cached problems:", err);
    return null;
  }
}

export async function getProblems() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }

  const data = await response.json();

  // Save latest data for faster page loading
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Failed to cache problems:", err);
  }

  return data;
}