const BASE_URL = `${import.meta.env.VITE_API_URL}/api/roadmap`;

export async function getRoadmap() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch roadmap");
  return response.json();
}