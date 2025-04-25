import { makeAutoObservable } from "mobx";
import { getAllStudentsInClass, addStudentToClass, getAllClassByStudentId, getAllClassesByTeacherID, deleteStudentFromClass } from "../service/attendanceService";

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
    }

    async addStudent(classId: string, studentId: string) {
        const response = await addStudentToClass(classId, studentId);
        this.attendances.push(response.data);
    }

    async getAllClassByStudentId(studentId: string) {
        const response = await getAllClassByStudentId(studentId);
        this.attendances = response.data;
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