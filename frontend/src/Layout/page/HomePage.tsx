
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminTemplate, StudentTemplate } from "../template/MainTemplate";

export const AdminHomePage = () => {
    const location = useLocation();
    return (
        <AdminTemplate>
            <Outlet/>
        </AdminTemplate>
    )
}

export const StudentHomePage = () => {
    const location = useLocation();
    return (
        <StudentTemplate>
            <Outlet/>
        </StudentTemplate>
    )
}
