import { makeAutoObservable } from "mobx";
import {getAllSchedules, getClassSchedule, setSchedule, deleteSchedule, updateSchedule} from "../service/scheduleService";

export type Schedule = {
    ScheduleID: string;
    ClassID: string;
    LessonID: string;
    StartTime: string;
    EndTime: string;
    Room: string;
    Notes: string;
}

class ScheduleStore {
    schedules: Schedule[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAll() {
        this.schedules = await getAllSchedules();
    }

    async getClassSchedule(classId: string) {
        const schedule = await getClassSchedule(classId);
        return schedule;
    }

    async setSchedule(schedule: Schedule) {
        const newSchedule = await setSchedule(schedule);
        this.schedules.push(newSchedule);
    }

    async deleteSchedule(scheduleId: string) {
        await deleteSchedule(scheduleId);
        this.schedules = this.schedules.filter(schedule => schedule.ScheduleID !== scheduleId);
    }

    async updateSchedule(scheduleID: string, schedule: Schedule) {
        await updateSchedule(scheduleID, schedule);
        const index = this.schedules.findIndex(s => s.ScheduleID === scheduleID);
        if (index !== -1) {
            this.schedules[index] = { ...this.schedules[index], ...schedule };
        }
    }

}

export default new ScheduleStore();