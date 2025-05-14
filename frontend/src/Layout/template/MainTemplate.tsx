import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Header } from "../organism/Header";
import { AdminNavBar, StudentNavBar } from "../organism/NavBar";
import { StatusText } from "../atoms/Typography";

type MainTemplateProps = {
    children: React.ReactNode;
}

export const AdminTemplate = ({ children}: MainTemplateProps) => {
    const location = useLocation();
    const state = location.state;
    return (
        <Box>
            <Box
                sx={{
                    float: 'left',
                }}
            >
                <AdminNavBar></AdminNavBar>
            </Box>
            <Box 
                sx={{
                    width: 'calc(100% - 100px)',
                    float: 'right',
                }}
            >
                <Header headerText={state}/>
                {children}
            </Box>
        </Box>
    )
}

export const StudentTemplate = ({ children}: MainTemplateProps) => {
    const location = useLocation();
    const state = location.state;
    return (
        <Box>
            <Box
                sx={{
                    float: 'left',
                }}
            >
                <StudentNavBar></StudentNavBar>
            </Box>
            <Box 
                sx={{
                    width: 'calc(100% - 100px)',
                    float: 'right',
                }}
            >
                <Header headerText={state}/>
                {children}
            </Box>
        </Box>
    )
}
