import axios from "./axios"

export const getAllClasses = async () => {
    const response = await axios.get("class/getAll")
    return response.data
}

export const getClassById = async (id: string) => {
    const response = await axios.get(`class/get/${id}`)
    return response.data
}
export const createClass = async (data: any) => {
    const response = await axios.post("class/create", data)
    return response.data
}
