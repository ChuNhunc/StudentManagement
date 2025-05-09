import axios from "./axios"

export const getAllStudentsInClass = async (ClassId: string) => {
    const response = await axios.get(`attendance/getAllStudentsInClass/${ClassId}`)
    console.log(response.data)
    return response.data
}

export const addStudentToClass = async (classId: string, studentId: string) => {
    const response = await axios.post(`attendance/addStudentToClass`, { classId, studentId })
    return response.data
}

export const getAllClassByStudentId = async (studentId: string) => {
    const response = await axios.get(`attendance/getAllClassByStudentId/${studentId}`)
    return response.data
}

export const getAllClassesByTeacherID = async (classId: string) => {
    const response = await axios.get(`attendance/getAllClassByTeacherID/${classId}`)
    return response.data
}

export const deleteStudentFromClass = async (classId: string, studentId: string) => {
    const response = await axios.post(`attendance/deleteStudentFromClass`, { classId, studentId })
    return response.data
}