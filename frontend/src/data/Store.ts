import { makeAutoObservable } from "mobx";
import AccountStore from "./AccountStore";
import CourseStore from "./CourseStore";
import ClassStore from "./ClassStore";
import TeacherStore from "./TeacherStore";
import StudentStore from "./StudentStore";
import AttendanceStore from "./AttendaceStore";
import ScheduleStore from "./ScheduleStore";
import LessonStore from "./LessonStore";
import ApplicationStore from "./ApplicationStore";
import StatusStore from "./StatusStore";

class Store {
    AccountStore = AccountStore;
    CourseStore = CourseStore;
    ClassStore = ClassStore;
    TeacherStore = TeacherStore;
    StudentStore = StudentStore;
    AttendanceStore = AttendanceStore;
    ScheduleStore = ScheduleStore;
    LessonStore = LessonStore;
    ApplicationStore = ApplicationStore;
    StatusStore = StatusStore;

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store;