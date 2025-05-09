import { Application } from "../data/ApplicationStore"
import axios from "./axios"

export const getAllApplicationInClass = async (classId: string) => {
    const response = await axios.get(`application/getAllApplicationsInClass/${classId}`)
    return response.data
}

export const getApplicationInClassByStudentID = async(classID: string, studentID:string) => {
    const response = await axios.get(`application/getApplicationInClassByStudentID/${classID}/${studentID}`)
    return response.data
}

export const createApplication = async (studentID: string, classID: string) => {
    const response = await axios.post(`application/createApplication`, { studentID, classID })
    return response.data
}

export const updateApplication = async (applicationID: string, statusID: number, Remarks: string|null ) => {
    const response = await axios.put(`application/updateApplication/${applicationID}`, {statusID, Remarks})
    return response.data
}

export const getAllStudentApplication = async (StudentID: string) => {
    const response = await axios.get(`application/getAllStudentApplication/${StudentID}`)
    return response.data
}

export const getApplicationByID = async (ApplicationID: string) => {
    const response = await axios.get(`application/getApplicationByID/${ApplicationID}`)
    return response.data
}

export const getAllClassApplication = async (ClassID: string) => {
    const response = await axios.get(`application/getAllApplicationByClassID/${ClassID}`)
    return response.data
}