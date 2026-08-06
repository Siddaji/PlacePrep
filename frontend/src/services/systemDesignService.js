const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/system-design`;

export async function getSystemDesignTopics() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch system design topics");
  }
  return response.json();
}

export async function getSystemDesignTopicById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch system design topic with id ${id}`);
  }
  return response.json();
}
