import { makeAutoObservable } from "mobx";
import { getAllCourses, getCourseById } from "../service/courseService";

export type Course = {
    CourseID: string;
    CourseName: string;
    Description: string;
}

class CourseStore {
    courses: Course[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAll() {
        this.courses = await getAllCourses();
    }

    async getById(courseId: string) {
        const course = await getCourseById(courseId);
        return course;
    }
}

export default new CourseStore();