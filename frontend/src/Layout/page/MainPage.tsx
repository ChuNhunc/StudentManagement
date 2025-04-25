import { Outlet } from "react-router-dom"
import { ClassManagement } from "../organism/ClassManagement/ClassManagement"
import { AdminTemplate } from "../template/MainTemplate"

export const MainPage = ({ children }: { children?: React.ReactNode }) => {
    return (
        <>
            <Outlet/>
        </>
    )
}
