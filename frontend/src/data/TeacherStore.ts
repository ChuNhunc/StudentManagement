import { makeAutoObservable } from "mobx";
import { createTeacher, getAllTeachers, getTeacherByID, getTeacherByName, updateTeacher, deleteTeacher } from "../service/teacherService";
export type Teacher = {
    TeacherID: string;
    AccountID: number | null;
    FullName: string;
    Email: string;
    PhoneNumber: string;
    Introduction: string;
}

class TeacherStore {
    teachers: Teacher[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAll() {
        this.teachers = await getAllTeachers();
    }

    async getById(teacherId: string) {
        const teacher = await getTeacherByID(teacherId);
        return teacher;
    }

    async getByName(name: string) {
        const teacher = await getTeacherByName(name);
        return teacher;
    }

    async create(teacher: Teacher) {
        const newTeacher = await createTeacher(teacher);
        this.teachers.push(newTeacher);
    }

    async update(TeacherID: string, teacher: Teacher) {
        await updateTeacher(TeacherID, teacher);
        const index = this.teachers.findIndex(t => t.TeacherID === teacher.TeacherID);
        if (index !== -1) {
            this.teachers[index] = { ...this.teachers[index], ...teacher };
        }
    }

    async delete(teacherId: string) {
        await deleteTeacher(teacherId);
    }
}

export default new TeacherStore();