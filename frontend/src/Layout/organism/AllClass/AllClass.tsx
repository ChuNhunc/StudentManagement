import React, { useContext, useEffect, useState } from "react"
import { SMContext } from "../../../context/context"
import { Box } from "@mui/material";
import { ClassCard } from "../../molecules/ClassCard";
import { Class } from "../../../data/ClassStore";
import { SearchBox } from "../../molecules/InputForm";
import { useNavigate } from "react-router-dom";

export const AllClass = () => {
    const context = useContext(SMContext)
    const navigate = useNavigate()
    const [classes, setClasses] = useState<Class[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [orginalClasses, setOrginalClasses] = useState<Class[]>([]);
    const [courseMap, setCourseMap] = useState<Map<string, string>>(new Map());
    const useEffect = React.useEffect(() => {
      const fetchData = async () => {
        try {
            await context?.ClassStore.getAll();
            await context?.CourseStore.getAll();

            const courseMap = new Map(
                context?.CourseStore.courses.map((course) => [course.CourseID, course.CourseName])
            );
            setCourseMap(courseMap);

            // Lưu danh sách lớp học vào state
            setClasses(context?.ClassStore.classes || []);
            setOrginalClasses(context?.ClassStore.classes || []);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
      };
      fetchData();
    },[])

    const handleSearch = () => {
        const filteredRows = orginalClasses.filter((item) => {
            return item.ClassName.toLowerCase().includes(searchText.toLowerCase())
        })
        setClasses(filteredRows || [])
    }

    return (
        <>
            <Box sx={{padding:'20px'}}>
                <Box>
                    <Box 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '10px',
                            marginRight: '30px',
                        }}
                        className='search-box'
                    >
                        <SearchBox
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
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    paddingTop: '20px',
                }}>
                    {classes.map((classItem) => {
                        return (
                            <ClassCard 
                                onClick={() => {
                                    navigate(`/student/allclass/${classItem.ClassID}`)
                                }}
                                key={classItem.ClassID} 
                                className={classItem.ClassName}
                                courseName={courseMap.get(classItem.CourseID) || ""}
                                studentNumber={classItem.StudentNumber}
                            />
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}