import { Application } from "../data/ApplicationStore"
import axios from "./axios"

export const getAllApplicationInClass = async (classId: string) => {
    try {
        const response = await axios.get(`application/getAllApplicationsInClass/${classId}`)
        return response.data
    } catch (error) {
        console.error("Error fetching applications:", error)
    }
}

export const createApplication = async (application: Application) => {
    const response = await axios.post(`application/createApplication`, application)
    return response.data
}

export const updateApplication = async (applicationID: string, statusID: number, Remarks: string|null ) => {
    const response = await axios.put(`application/updateApplication/${applicationID}`, {statusID, Remarks})
    return response.data
}