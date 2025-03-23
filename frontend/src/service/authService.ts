import { Navigate, useNavigate } from "react-router-dom";
import axios from "./axios"

const login = async (username: string, password: string) => {
    const response = await axios.post("auth/login", {
        username,
        password,
    });
    const { token, role } = response.data;
    localStorage.setItem("token", token);
    return role
}

const register = async (username: string, password: string, roleid: number) => {
    const response = await axios.post("auth/register", {
        username,
        password,
        roleid,
    });
    console.log("Tạo tài khoản thành công",response.data);
    return response.data;
}

const logout = () => {
    localStorage.removeItem('token');
}
export {login, register, logout}