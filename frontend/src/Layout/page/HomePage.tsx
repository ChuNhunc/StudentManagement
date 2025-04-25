
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminTemplate, StudentTemplate } from "../template/MainTemplate";

export const AdminHomePage = () => {
    const location = useLocation();
    // const roleID = location.state.roleID;
    return (
        <AdminTemplate>
            <Outlet/>
        </AdminTemplate>
        // <>
        //     {roleID === 1 ? (
        //         <StudentTemplate>
        //             <Outlet />
        //         </StudentTemplate>
        //     ) : roleID === 2 ? (
        //         <StudentTemplate>
        //             <Outlet />
        //         </StudentTemplate>
        //     ) : roleID === 3 ? (
        //         <AdminTemplate>
        //             <Outlet />
        //         </AdminTemplate>
        //     ) : (
        //         <div>Không có quyền truy cập</div>
        //     )}
        // </>
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
