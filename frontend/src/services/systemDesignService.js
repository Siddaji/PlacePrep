const BASE_URL = `${import.meta.env.VITE_API_URL}/api/system-design`;

export async function getSystemDesignTopics() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch system design topics");
  }
  return response.json();
}