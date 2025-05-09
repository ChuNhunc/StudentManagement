import React, { createContext, useState, useContext } from "react";
import { Student } from "../data/StudentStore";

type StudentContextType = {
    student: Student | null;
    setStudent: (student: Student) => void;
};

// Tạo context
const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Tạo provider
export const StudentProvider: React.FC<{ children: React.ReactNode; roleID: number }> = ({ children, roleID }) => {
    const [student, setStudent] = useState<Student | null>(null);

    if (roleID !== 1) {
        // Nếu không phải student, không cung cấp context
        return <>{children}</>;
    }

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    );
};

// Custom hook để sử dụng StudentContext
export const useStudent = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error("useStudent must be used within a StudentProvider");
    }
    return context;
};