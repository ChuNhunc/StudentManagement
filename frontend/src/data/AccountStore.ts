import axios from "axios";
import { makeAutoObservable } from "mobx";
import { getAllAccount , getAllStudentAccount, getAllTeacherAccount, getAllAdminAccount} from "../service/accountService";

export type Account = {
    AccountID: number;
    Username: string;
    Password: string;
    RoleID: number;
    CreatedAt: Date;
}

class AccountStore {
    account: Account[] = [];
   

    constructor() {
        makeAutoObservable(this)
    }

    async getAll() {
        try {
            const response = await getAllAccount();
            this.account = response ;
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    }
    
    async getStudentAccount() {
        try {
            const response = await getAllStudentAccount();
            console.log("API Response:", response);
            this.account = response;
        } catch (error) {
            console.error("Error fetching student accounts:", error);
        }
    }

    async getTeacherAccount() {
        try {
            const response = await getAllTeacherAccount();
            this.account = response ;
        } catch (error) {
            console.error("Error fetching teacher accounts:", error);
        }
    }

    async getAdminAccount() {
        try {
            const response = await getAllAdminAccount();
            this.account = response ;
        } catch (error) {
            console.error("Error fetching admin accounts:", error);
        }
    }
}

export default new AccountStore();

