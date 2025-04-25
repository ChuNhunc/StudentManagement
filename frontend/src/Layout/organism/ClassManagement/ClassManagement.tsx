import { Box } from "@mui/material"
import { ClassTable } from "../../molecules/Table"
import { ToolBox } from "../../molecules/ToolBox"

export const ClassManagement = () => {
    return (
        <>
            <ToolBox route="createclass"/>
            <Box className='table'>
                <ClassTable/>
            </Box>
        </>
    )
}