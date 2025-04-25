import { Box } from "@mui/material"
import { StudentClassDetailSideBar } from "./StudentClassDetailSideBar"
import { Outlet } from "react-router-dom"

export const StudentClassDetail = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#f0f0f0',
                    display: 'inline-block',
                    width: '100%',
                    height: '100%'
                }}
            >
                <StudentClassDetailSideBar/>
                <Box 
                    sx={{
                        width: '80%',
                        height: 'calc(100vh - 70px)',
                        float: 'left',
                    }}>
                    <Outlet/>
                </Box>
            </Box>
        </>
    )
}