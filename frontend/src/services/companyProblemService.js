const API_BASE = import.meta.env.VITE_API_URL || "";
const BASE_URL = `${API_BASE}/api/company-problems`;

export async function getCompanyProblemsData() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch company problems data");
  }
  return response.json();
}

export async function getProblemsByCompany(companyId) {
  const response = await fetch(`${BASE_URL}/company/${companyId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch problems for company ${companyId}`);
  }
  return response.json();
}
