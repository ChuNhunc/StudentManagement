import axios from "axios";
import { makeAutoObservable } from "mobx";

type Account = {
    username: string;
    password: string;
    role: number;
}

class AccountStore {
    account: Account | null = null;
    token: string = '';

    constructor() {
        makeAutoObservable(this)
    }

    loadAccount() {}
    
    setToken(token: string) {
      this.token = token;
    }

    async login() {
        try {
            const response = await axios.post('http://localhost:3000/login', {
              userName: this.account?.username,
              passWord: this.account?.password,
            });
            this.setToken(response.data.token);
            console.log('Login successful:', response.data);
          } catch (error: any) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
          }
      }
}

export default new AccountStore();

