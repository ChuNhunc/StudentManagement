import axios from "./axios"

export const getAllCourses = async () => {
    const response = await axios.get("course/getAll")
    return response.data
}

export const getCourseById = async (courseId: string) => {
    const response = await axios.get(`course/get/${courseId}`)
    return response.data
}