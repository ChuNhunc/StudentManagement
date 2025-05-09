import { Box } from "@mui/material"
import { StudentClassDetailSideBar } from "./StudentClassDetailSideBar"
import { Outlet } from "react-router-dom"
import { GeneralInformation } from "../ClassManagement/ClassDetail/GeneralInformation"

export const StudentClassDetail = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#f0f0f0',
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <StudentClassDetailSideBar/>
                <Box 
                    sx={{
                        width: '78%',
                        minHeight: '100vh',
                        float: 'right',
                    }}>
                    <GeneralInformation/>
                </Box>
            </Box>
        </>
    )
}