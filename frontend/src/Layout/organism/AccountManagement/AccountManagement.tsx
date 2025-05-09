import { Box, Select } from "@mui/material"
import { ToolBox } from "../../molecules/ToolBox"
import { AccountTable, AccountTableProps, StudentTable } from "../../molecules/Table"
import { SelectItem } from "../../molecules/SelectItem"
import React, { useContext } from "react"
import { SMContext } from "../../../context/context"

export const TeacherAccountManagement = () => {
    const context = useContext(SMContext)
    const [searchText, setSearchText] = React.useState<string>("")
    const [rows, setRows] = React.useState<AccountTable[]>([]);
    const [originalRows, setOriginalRows] = React.useState<AccountTable[]>([]);
    const useEffect = React.useEffect(() => {
    const fetchData = async () => {
        try {
            await context?.AccountStore.getTeacherAccount();
            console.log(context?.AccountStore.account);
            await context?.TeacherStore.getAll();
            const teacherMap = new Map(
                context?.TeacherStore.teachers.map((teacher) => [teacher.AccountID, teacher.FullName])
            );
            const fetchedRows = context?.AccountStore.account.map((item) => ({
                Name: teacherMap.get(item.AccountID) || "Unknown",
                Username: item.Username,
                CreateAt: new Date(item.CreatedAt || ''),
            }));
            setRows(fetchedRows || []);
            setOriginalRows(fetchedRows || []);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
    fetchData();
    },[context?.StudentStore.student.length])

    const handleSearch = () => {
        const filteredRows = originalRows.filter((item) => {
            return item.Name.toLowerCase().includes(searchText.toLowerCase())
        })
        setRows(filteredRows || [])
    }

    return (
        <>
            <ToolBox 
                route="createstudent"
                onChange={(e) => {
                    setSearchText(e.target.value)
                }}
                onClick={handleSearch}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        handleSearch()
                    }
                }}
            />
            <Box className='table'>
                <AccountTable rows={rows}/>
            </Box>
        </>
    )
}

export const StudentAccountManagement = () => {
    const context = useContext(SMContext)
    const [searchText, setSearchText] = React.useState<string>("")
    const [rows, setRows] = React.useState<AccountTable[]>([]);
    const [originalRows, setOriginalRows] = React.useState<AccountTable[]>([]);
    const useEffect = React.useEffect(() => {
    const fetchData = async () => {
        try {
            await context?.AccountStore.getStudentAccount();
            console.log(context?.AccountStore.account);
            await context?.StudentStore.getAll();
            const studentMap = new Map(
              context?.StudentStore.student.map((student) => [student.AccountID, student.FullName])
            );
            const fetchedRows = context?.AccountStore.account.map((item) => ({
              Name: studentMap.get(item.AccountID) || "Unknown",
              Username: item.Username,
              CreateAt: new Date(item.CreatedAt || ''),
            }));
            setRows(fetchedRows || []);
            setOriginalRows(fetchedRows || []);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
    fetchData();
    },[context?.StudentStore.student.length])

    const handleSearch = () => {
        const filteredRows = originalRows.filter((item) => {
            return item.Name.toLowerCase().includes(searchText.toLowerCase())
        })
        setRows(filteredRows || [])
    }

    return (
        <>
            <ToolBox 
                route="createstudent"
                onChange={(e) => {
                    setSearchText(e.target.value)
                }}
                onClick={handleSearch}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        handleSearch()
                    }
                }}
            />
            <Box className='table'>
                <AccountTable rows={rows}/>
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