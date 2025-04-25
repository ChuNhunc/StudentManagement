import { Box, Select } from "@mui/material"
import { ToolBox } from "../../molecules/ToolBox"
import { AccountTable, StudentTable } from "../../molecules/Table"
import { SelectItem } from "../../molecules/SelectItem"

export const TeacherAccountManagement = () => {
    return (
        <>
            <ToolBox route="createstudent"/>
            <Box className='table'>
                <AccountTable type="teacher"/>
            </Box>
        </>
    )
}

export const StudentAccountManagement = () => {
    return (
        <>
            <ToolBox route="createstudent"/>
            <Box className='table'>
                <AccountTable type="student"/>
            </Box>
        </>
    )
}

// export const AdminAccountManagement = () => {
//     return (
//         <>
//             <ToolBox route="createadmin"/>
//             <Box className='table'>
//                 <AccountTable type="admin"/>
//             </Box>
//         </>
//     )
// }

export const AccountManagement = () => {
    return (
        <>
            <Box 
                sx={{
                    display: 'inline-block',
                    padding: '30px'
                }}
                >
                <SelectItem title="Student Account"/>
                <SelectItem title="Teacher Account"/>
                <SelectItem title="Admin Account"/>
            </Box>
        </>
    )
}