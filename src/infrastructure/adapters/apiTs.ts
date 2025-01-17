export async function getData() {
    try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}