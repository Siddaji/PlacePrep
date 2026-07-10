const BASE_URL = `${import.meta.env.VITE_API_URL}/api/problems`;

export async function getProblems() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch problems");
  }
  return response.json();
}