import { Class } from "../data/ClassStore"
import axios from "./axios"

export const getAllClasses = async () => {
    const response = await axios.get("class/getAll")
    return response.data
}

export const getClassById = async (id: string) => {
    const response = await axios.get(`class/getClassByID/${id}`)
    return response.data
}
export const createClass = async (data: Class) => {
    const response = await axios.post("class/create", data)
    return response.data
}

export const updateClass = async (ClassID: string,data: Class) => {
    const response = await axios.put(`class/updateClass/${ClassID}`, data)
    return response.data
}
