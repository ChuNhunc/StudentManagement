import { get } from "http"
import { Schedule } from "../data/ScheduleStore"
import axios from "./axios"

export const getAllSchedules = async () => {
    const response = await axios.get("schedule/getAll")
    return response.data
}

export const getClassSchedule = async (classId: string) => {
    const response = await axios.get(`schedule/getScheduleInClass/${classId}`)
    return response.data
}

export const setSchedule = async (schedule: Schedule) => {
    const response = await axios.post("schedule/setSchedule", schedule)
    return response.data
}

export const deleteSchedule = async (scheduleId: string) => {
    const response = await axios.delete(`deleteSchedule/delete/${scheduleId}`)
    return response.data
}

export const updateSchedule = async (scheduleID: string,schedule: Schedule) => {
    const response = await axios.put(`schedule/updateSchedule/${scheduleID}`, schedule)
    return response.data
}
