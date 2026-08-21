const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/system-design`;

let cachedTopics = null;

export function getCachedSystemDesignTopics() {
  return cachedTopics;
}

export async function getSystemDesignTopics() {
  if (cachedTopics) {
    return cachedTopics;
  }
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch system design topics");
  }
  cachedTopics = await response.json();
  return cachedTopics;
}

export async function getSystemDesignTopicById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch system design topic with id ${id}`);
  }
  return response.json();
}
