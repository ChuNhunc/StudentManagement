import { Navigate, useNavigate } from "react-router-dom";

import axios from "./axios"
import { Student } from "../data/StudentStore";
import { Teacher } from "../data/TeacherStore";

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
    localStorage.removeItem('user');
    const response = axios.post("auth/logout", {});
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

const generateTeacherAccount = async (teacher: Teacher) => {
    const TeacherID = teacher.TeacherID;
    if (!teacher.TeacherID) {
        throw new Error('TeacherID is required to generate an account.');
    }

    const response = await axios.post("auth/generateTeacherAccount", {
        TeacherID,
    });
    return response.data;
}
export {login, register, logout, generateStudentAccount, generateTeacherAccount}