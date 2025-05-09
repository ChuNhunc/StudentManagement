import { makeAutoObservable } from "mobx";
import { getAllStudentsInClass, addStudentToClass, getAllClassByStudentId, getAllClassesByTeacherID, deleteStudentFromClass } from "../service/attendanceService";
import ClassStore, { Class } from "./ClassStore";

export type Attendance = {
    AttendanceID: string;
    StudentID: string;
    ClassID: string;
}

class AttendanceStore {
    attendances: Attendance[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAllStudent(classId: string) {
        const response = await getAllStudentsInClass(classId);
        this.attendances = response.data;
        console.log("AttendanceStore attendances", response.data);
        return response.data;
    }

    async addStudent(classId: string, studentId: string) {
        const response = await addStudentToClass(classId, studentId);
        this.attendances.push(response.data);
    }

    async getAllClassByStudentId(studentId: string) {
        const response = await getAllClassByStudentId(studentId);
        this.attendances = response;

        // Lấy danh sách Class dựa trên ClassID từ Attendance
        const classes = this.attendances
        .map((attendance) => {
            ClassStore.getAll();
            return ClassStore.classes.find((classItem) => classItem.ClassID === attendance.ClassID);
        })
        .filter((classItem): classItem is Class => classItem !== undefined); // Loại bỏ undefined

        return classes;
    }

    async getAllClassesByTeacherID(teacherId: string) {
        const response = await getAllClassesByTeacherID(teacherId);
        this.attendances = response.data;
    }

    async deleteStudent(classId: string, studentId: string) {
        const response = await deleteStudentFromClass(classId, studentId);
        this.attendances = this.attendances.filter(attendance => attendance.StudentID !== studentId);
    }

}

export default new AttendanceStore();