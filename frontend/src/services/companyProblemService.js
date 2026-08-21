const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/company-problems`;

const CACHE_KEY = "placeprep-company-problems-data";

export async function getCompanyProblemsData() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch company problems data");
  }

  const data = await response.json();

  // Cache the latest data for faster page transitions
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Failed to cache company problems data:", err);
  }

  return data;
}

export function getCachedCompanyProblemsData() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (err) {
    console.warn("Failed to read cached company problems data:", err);
    return null;
  }
}

export async function getProblemsByCompany(companyId) {
  const response = await fetch(`${BASE_URL}/company/${companyId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch problems for company ${companyId}`);
  }

  return response.json();
}