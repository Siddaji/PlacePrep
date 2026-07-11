const BASE_URL = `${import.meta.env.VITE_API_URL}/api/subjects`;

export async function getSubjects() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch subjects");
  return response.json();
}

