import { Navigate, useNavigate } from "react-router-dom";

import axios from "./axios"
import { Student } from "../data/StudentStore";

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

const generateStudentAccount = async (student: Student) => {
    const StudentID = student.StudentID;
    if (!student.StudentID) {
        throw new Error('StudentID is required to generate an account.');
    }

    const response = await axios.post("auth/generateStudentAccount", {
        StudentID,
    });
    return response.data;
}
export {login, register, logout, generateStudentAccount}