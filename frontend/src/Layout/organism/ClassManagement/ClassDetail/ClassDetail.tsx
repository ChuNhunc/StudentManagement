import { Box } from "@mui/material"
import { ClassDetailSideBar } from "./SideBar"
import { Outlet } from "react-router-dom"

export const ClassDetail = () => {
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
                <ClassDetailSideBar/>
                <Box 
                    sx={{
                        width: '78%',
                        height: '100%',
                        float: 'right',
                    }}>
                    <Outlet/>
                </Box>
            </Box>
        </>
    )
}