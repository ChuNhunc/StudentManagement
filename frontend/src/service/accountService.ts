import axios from "./axios"

export const getAllAccount = async () => {
    const response = await axios.get(`account/getAllAccount`)
    return response.data
}

export const getAllStudentAccount = async () => {
    try {
        const response = await axios.get(`account/getAllStudentAccount`);
        console.log("API Response service:", response.data); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching student accounts:", error); 
    }
}

export const getAllTeacherAccount = async () => {
    const response = await axios.get(`account/getAllTeacherAccount`)
    return response.data
}

export const getAllAdminAccount = async () => {
    const response = await axios.get(`account/getAllAdminAccount`)
    return response.data
}