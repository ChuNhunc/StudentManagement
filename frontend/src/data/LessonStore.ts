import { makeAutoObservable } from "mobx";
import { getAllLessons, getAllLessonInCourse } from "../service/lessonService";

export type Lesson = {
    LessonID: string;
    Serial_Num: number;
    CourseID: string;
    Detail: string;
    SkillID: string;
}

class LessonStore {
    lessons: Lesson[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAll() {
        this.lessons = await getAllLessons();
    }

    async getAllLessonInCourse(courseId: string) {
        this.lessons = await getAllLessonInCourse(courseId);
    }
}

export default new LessonStore();