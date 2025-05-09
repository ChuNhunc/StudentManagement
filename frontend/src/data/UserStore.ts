import { makeAutoObservable } from "mobx";
import { Student } from "./StudentStore";
import CryptoJS from "crypto-js";
import env from "dotenv";

const secretKey = process.env.REACT_APP_SECRET_KEY 

class UserStore {
    user: Student | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    saveUsserProfile(user: Student) {
        this.user = user;
        console.log ("SecretKey", secretKey);
        if(secretKey) {
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), secretKey).toString();
            localStorage.setItem("user", encryptedData);
        }else {
            throw new Error("Secret key is not defined in environment variables.");
        }
    }

    getUserProfile() {
        const storedData = localStorage.getItem("user");
        if (storedData && secretKey) {
            const decryptedData = JSON.parse(
                CryptoJS.AES.decrypt(storedData, secretKey).toString(CryptoJS.enc.Utf8)
            );
            this.user = decryptedData;
            return this.user;
        }else {
            throw new Error("Stored data or secret key is not defined.");
        }
    }
}

export default new UserStore();