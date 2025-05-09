import { Box, Button, TextField } from "@mui/material"
import { ClassTable } from "../../molecules/Table"
import { ToolBox } from "../../molecules/ToolBox"
import React, { useState } from "react";
import { SMContext } from "../../../context/context";
import { CreateButton } from "../../atoms/button";
import { useNavigate } from "react-router-dom";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { Icon } from "../../atoms/icon";

export const ClassManagement = () => {
    const navigate = useNavigate()
    const context = React.useContext(SMContext);
    const [rows, setRows] = React.useState<ClassTable[]>([]);
    const [originalRows, setOriginalRows] = React.useState<ClassTable[]>([]);
    const [searchText, setSearchText] = React.useState<string>("")
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]); 
    

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedRows(selectionModel); 
    };

    const useEffect = React.useEffect(() => {
    const fetchData = async () => {
      try {
        await context?.CourseStore.getAll();
        const courseMap = new Map(
          context?.CourseStore.courses.map((course) => [course.CourseID, course.CourseName])
        );

        await context?.TeacherStore.getAll();
        const teacherMap = new Map(
          context?.TeacherStore.teachers.map((teacher) => [teacher.TeacherID, teacher.FullName])
        );

        await context?.ClassStore.getAll();
        const fetchedRows = context?.ClassStore.classes.map((item) => ({
            ClassID: item.ClassID,
            CourseID: item.CourseID, // Lưu CourseID
            TeacherID: item.TeacherID, // Lưu TeacherID
            Course : courseMap.get(item.CourseID) || "Unknown",
            Teacher: teacherMap.get(item.TeacherID) || "Unknown",
            ClassName: item.ClassName,
            StudentNumber: item.StudentNumber,
            StartDate: new Date(item.StartDate || ''), 
            EndDate: new Date(item.EndDate || ''),
        }));
        setRows(fetchedRows || []); 
        setOriginalRows(fetchedRows || []);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
        };
        fetchData();
    },[context?.ClassStore.classes.length])

    const handleSearch = () => {
        const filteredRows = originalRows.filter((item) => {
            return item.ClassName.toLowerCase().includes(searchText.toLowerCase())
        })
        setRows(filteredRows || [])
    }

    return (
        <>
            {/* <ToolBox 
                route="createclass"
                onChange={(e) => {
                    setSearchText(e.target.value)
                }}
                onClick={handleSearch}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        handleSearch()
                    }
                }}
            /> */}
            <Box 
                className = 'tool-box'
                sx={{
                    width: '100%',
                    height: '80px',
                    display: 'inline-block',
                    marginTop: '20px',
                }}
            >
                <CreateButton 
                    sx={{marginLeft: '30px'}}
                    onClick={() => {
                        navigate('createstudent')
                    }}
                >Add</CreateButton>
                <Button  
                    disabled={
                        selectedRows.length !== 1 
                    }
                    sx={{}}
                    onClick={() => {
                        const selectedRow = rows.find((row) => row.ClassID === selectedRows[0]);
                        if (selectedRow) {
                            navigate(`/admin/classmanagement/editclass`,{state: selectedRow})
                            console.log(selectedRow)
                        }
                    }}
                >
                    Edit
                </Button>
                <Box 
                    className='search-box'
                    sx={{
                        width: '20%',
                        float: 'right',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginRight: '30px',
                    }}
                >
                    <>
                        <TextField
                        id="search-bar"
                        className="text"
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            }
                        }}
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        />
                        <Box
                        onClick={handleSearch}
                        >
                        <Icon name='search' sx={{cursor: 'pointer'}}></Icon>
                    </Box>
                    </>
                </Box>
            </Box>
            <Box className='table'>
                <ClassTable 
                    rows={rows} 
                    onSelectionModelChange={handleSelectionChange}
                />
            </Box>
        </>
    )
}