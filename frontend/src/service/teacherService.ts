import { Teacher } from "../data/TeacherStore"
import axios from "./axios"

export const getAllTeachers = async () => {
    const response = await axios.get("teacher/getAll")
    return response.data
}

export const getTeacherByID = async (id: string) => {
    const response = await axios.get(`teacher/getTeacherByID/${id}`)
    return response.data
}

export const getTeacherByName = async (name: string) => {
    const response = await axios.get("teacher/getTeacherByName", {
        params: { name }, 
    });
    return response.data
}

export const createTeacher = async (teacher: Teacher) => {
    const response = await axios.post("teacher/createTeacher", teacher)
    return response.data
}

export const updateTeacher = async (teacher: Teacher) => {
    const response = await axios.put("teacher/updateTeacher", teacher)
    return response.data
}

export const deleteTeacher = async (id: string) => {
    const response = await axios.delete(`teacher/deleteTeacher/${id}`)
    return response.data
}


