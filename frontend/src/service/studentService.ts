import axios from "./axios"

export const getAllStudents = async () => {
    const response = await axios.get("student/getAllStudent")
    return response.data
}

export const getStudentById = async (studentId: string) => {
    const response = await axios.get(`student/getStudentByID/${studentId}`)
    return response.data
}

export const getStudentByName = async (name: string) => {
    const response = await axios.get(`student/getStudentByName/${name}`)
    return response.data
}

export const createStudent = async (student: any) => {
    const response = await axios.post("student/createStudent", student)
    return response.data
}

export const updateStudent = async (StudentID: string, student: any) => {
    const response = await axios.put(`student/updateStudent/${StudentID}`, student)
    return response.data
}

export const deleteStudent = async (studentId: string) => {
    const response = await axios.delete(`student/deleteStudent/${studentId}`)
    return response.data
}




