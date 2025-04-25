import axios from "./axios"

export const getAllLessons = async () => {
    const response = await axios.get("lesson/getAll")
    return response.data
}

export const getAllLessonInCourse = async (courseId: string) => {
    const response = await axios.get(`lesson/getLessonInCourse/${courseId}`)
    return response.data
}

