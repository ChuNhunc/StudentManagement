import { Box } from "@mui/material"
import { ToolBox } from "../../molecules/ToolBox"
import { StudentTable } from "../../molecules/Table"

export const StudentManagement = () => {
    return (
        <>
            <ToolBox route="createstudent"/>
            <Box className='table'>
                <StudentTable/>
            </Box>
        </>
    )
}