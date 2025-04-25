import { makeAutoObservable } from "mobx";
import { getAllApplicationInClass, createApplication, updateApplication } from "../service/applicationService";

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

    async createApplication(application: Application) {
        const response = await createApplication(application);
        this.applications.push(response);
    }

    async updateApplication(applicationID: string, statusID: number, Remarks: string|null ) {
        const response = await updateApplication(applicationID, statusID, Remarks);
        const index = this.applications.findIndex(app => app.ApplicationID === applicationID);
        if (index !== -1) {
            this.applications[index] = response;
        }
        return response;
    }
}

export default new ApplicationStore();