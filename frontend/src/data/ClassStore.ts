import { makeAutoObservable } from "mobx";
import { createClass, getAllClasses, getClassById } from "../service/classService";

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
        this.classes = await getClassById(id);
    }

    async createClass(data: Class) {
        const newClass = await createClass(data);
        this.classes.push(newClass);
    }
}

export default new ClassStore();