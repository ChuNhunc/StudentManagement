import axios from "./axios"

export const getAllStatus = async () => {
    try {
        const response = await axios.get(`status/getAll`);
        return response.data;
    } catch (error) {
        console.error("Error fetching status:", error);
    }
};