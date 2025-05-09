import { makeAutoObservable } from "mobx";
import { getAllApplicationInClass, createApplication, updateApplication, getApplicationInClassByStudentID, getAllStudentApplication, getApplicationByID, getAllClassApplication } from "../service/applicationService";
import ClassStore, { Class } from "./ClassStore";

export type Application = {
    ApplicationID: string;
    StudentID: string;
    ClassID: string;
    StatusID: string;
    ApplicationDate: Date;
    ModifiedDate: Date;
    Remarks: string;
}

class ApplicationStore {
    applications: Application[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAllApplication(classId: string) {
        const response = await getAllApplicationInClass(classId); // Replace "1" with the actual class ID
        this.applications = response;
        console.log("Applications:", this.applications);
    }

    async createApplication(studentID: string, classId: string) {
        const response = await createApplication(studentID, classId);
        console.log("Create application response:", response);
        if (!this.applications) {
            this.applications = [];
        }
        this.applications.push(response);
        return response;
    }

    async updateApplication(applicationID: string, statusID: number, Remarks: string|null ) {
        const response = await updateApplication(applicationID, statusID, Remarks);
        const index = this.applications.findIndex(app => app.ApplicationID === applicationID);
        if (index !== -1) {
            this.applications[index] = response;
        }
        return response;
    }

    async getApplicationInClassByStudentID(classID: string, studentID: string ) {
        const response = await getApplicationInClassByStudentID(classID, studentID)
        if(response) {
            return true
        }
        return false
    }

    async getAllStudentApplication(studentID: string) {
        const response = await getAllStudentApplication(studentID); 
        this.applications = response;

        const classes = this.applications
                .map((application) => {
                    ClassStore.getAll();
                    return ClassStore.classes.find((classItem) => classItem.ClassID === application.ClassID);
                })
                .filter((classItem): classItem is Class => classItem !== undefined); 
        
                return classes;
    }

    async getApplicationByID(applicationID: string) {
        const response = await getApplicationByID(applicationID); 
        return response;
    }

    async getAllClassApplication(classID: string) {
        const response = await getAllClassApplication(classID); 
        this.applications = response;
        return response;
    }
}

export default new ApplicationStore();