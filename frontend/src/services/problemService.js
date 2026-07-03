const BASE_URL = "http://localhost:5000/api/problems";

export async function getProblems() {
  const response = await fetch(BASE_URL);

  if(!response){
    throw new Error("Failed to fetch the problems");
  }

  return response.json();
  
}