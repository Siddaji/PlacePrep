const BASE_URL = "http://localhost:5000/api/system-design";

export async function getSystemDesignTopics() {
    const response = await fetch(BASE_URL);
    if(!response){
        throw new Error("Failed to fetch system design topics");
    }
    return response.json();
    
}