import { makeAutoObservable } from "mobx";
import { createStudent, getAllStudents, getStudentById, getStudentByName, updateStudent, deleteStudent } from "../service/studentService";

export type Student = {
    StudentID: string;
    AccountID: number | null;
    FullName: string;
    DateOfBirth: Date | null;
    Email: string;
    PhoneNumber: string;
    Address: string;
}

class StudentStore {
    student: Student[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAll() {
        this.student = await getAllStudents();
    }

    async getById(studentId: string) {
        const student = await getStudentById(studentId);
        return student;
    }

    async getByName(name: string) {
        const student = await getStudentByName(name);
        return student;
    }

    async create(student: Student) {
        const newStudent = await createStudent(student);
        this.student.push(newStudent);
    }

    async update(StudentID: string, student: Student) {
        await updateStudent(StudentID, student);
        const index = this.student.findIndex(s => s.StudentID === student.StudentID);
        if (index !== -1) {
            this.student[index] = { ...this.student[index], ...student };
        }
    }

    async delete(studentId: string) {
        await deleteStudent(studentId);
    }
}

export default new StudentStore();