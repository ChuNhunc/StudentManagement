import React, { useContext, useState } from "react"
import { SMContext } from "../../../context/context"
import { Box } from "@mui/material"
import { SearchBox } from "../../molecules/InputForm"
import { ClassCard, MyClassCard } from "../../molecules/ClassCard"
import { useNavigate } from "react-router-dom"
import { Class } from "../../../data/ClassStore"

export const MyClass = () => {
    const navigate = useNavigate()
    const [classes, setClasses] = useState<Class[]>([]);
    const [courseMap, setCourseMap] = useState<Map<string, string>>(new Map());
    const [statusMap, setStatusMap] = useState<Map<string, number>>(new Map())
    const context = useContext(SMContext)
    const studentID = context?.UserStore.getUserProfile()?.StudentID
    const useEffect = React.useEffect(() => {
        const fetchData = async () => {
        try {
            await context?.ClassStore.getAll();
            await context?.CourseStore.getAll();
            await context?.ApplicationStore.getAllStudentApplication(studentID!)

            const courseMap = new Map(
                context?.CourseStore.courses.map((course) => [course.CourseID, course.CourseName])
            );

            const statusMap = new Map(
                context?.ApplicationStore.applications.map((application) => [application.ClassID, Number(application.StatusID)])
            )
            setCourseMap(courseMap);
            setStatusMap(statusMap)

            if(studentID) {
                // await context?.AttendanceStore.getAllClassByStudentId(studentID)
                const listClass = await context.ApplicationStore.getAllStudentApplication(studentID)
                console.log("list class:",listClass)
                setClasses(listClass);
            }
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
        };
        fetchData();
    },[])
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
                        <SearchBox/>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    paddingTop: '20px',
                }}>
                    {classes.map((classItem) => {
                        return (
                            <MyClassCard 
                                onClick={() => {
                                    navigate(`/student/myclass/${classItem.ClassID}`)
                                }}
                                key={classItem.ClassID} 
                                className={classItem.ClassName}
                                courseName={courseMap.get(classItem.CourseID) || ""}
                                studentNumber={classItem.StudentNumber}
                                statusData = {statusMap.get(classItem.ClassID) || 0}
                            />
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}