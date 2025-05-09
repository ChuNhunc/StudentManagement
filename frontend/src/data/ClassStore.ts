import { makeAutoObservable } from "mobx";
import { createClass, getAllClasses, getClassById, updateClass } from "../service/classService";

export type Class = {
    ClassID: string;
    CourseID: string;
    TeacherID: string;
    ClassName: string;
    StudentNumber: number;
    StartDate: Date | null;
    EndDate: Date | null;
}

class ClassStore {
    classes: Class[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAll() {
        this.classes = await getAllClasses();
    }

    async getsById(id: string) {
        const response = await getClassById(id);
        return response;
    }

    async createClass(data: Class) {
        const newClass = await createClass(data);
        this.classes.push(newClass);
    }

    async updateClass(ClassID: string, data: Class) {
        const updatedClass = await updateClass(ClassID, data);
        const index = this.classes.findIndex((item) => item.ClassID === ClassID);
        if (index !== -1) {
            this.classes[index] = updatedClass;
        }
    }
}

export default new ClassStore();