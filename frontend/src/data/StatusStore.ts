import { makeAutoObservable } from "mobx";
import { getAllStatus } from "../service/statusService";

export type Status = {
    StatusID: number;
    Status: string;
}

class StatusStore {
    status: Status[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getAllStatus() {
        const response = await getAllStatus();
        this.status = response;
    }
}

export default new StatusStore();