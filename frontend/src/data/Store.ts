import { makeAutoObservable } from "mobx";
import AccountStore from "./AccountStore";
class Store {
    AccountStore = AccountStore;

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store;