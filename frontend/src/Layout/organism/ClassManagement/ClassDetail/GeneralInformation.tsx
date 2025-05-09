import { Box } from "@mui/material"
import { ClassHeader } from "../../../molecules/ClassHeader"
import { useContext, useEffect, useState } from "react"
import { SMContext } from "../../../../context/context"
import { useParams } from "react-router-dom"
import { Class } from "../../../../data/ClassStore"
import { ClassDuration } from "../../../molecules/ClassDuration"
import { stringify } from "querystring"
import { styled } from "@mui/system"
import LessonStore, { Lesson } from "../../../../data/LessonStore"
import { ClassStructure } from "../../../molecules/ClassStructure"

const ClassInformationContainer = styled(Box)({
    width: '90%',
    backgroundColor: 'white',
    margin: 'auto',
    marginTop: '20px',
})

export const GeneralInformation = () => {
    const context = useContext(SMContext)
    const { classID } = useParams<{ classID: string }>();
    const [classData, setClassData] = useState<Class>();
    const [lesson, setLesson] = useState<Lesson[]>([]);

    useEffect(() => {
        const fetchClassData = async () => {
            if (classID) {
                const data = await context?.ClassStore.getsById(classID);
                setClassData(data);
            }
        };
        fetchClassData();
    }, [classID, context]);

    useEffect(() => {
        const fetchLessonData = async () => {
            if (classData) {
                const data = await context?.LessonStore.getAllLessonInCourse(classData.CourseID);
                setLesson(data || []);
            }
        };
        fetchLessonData();
    }, [classData, context]);

    return (
        <>
            <ClassHeader classID={classData?.ClassID} className={classData?.ClassName}/>
            <ClassInformationContainer className='class-infor'>
                <Box className='class-duration'>
                    <ClassDuration startDate={String(classData?.StartDate)} endDate={String(classData?.EndDate)}/>
                </Box>
            </ClassInformationContainer>
            <ClassInformationContainer>
                <Box className='course-structure'>
                    <ClassStructure listLessons={lesson}/>
                </Box>
            </ClassInformationContainer>
        </>
    )
}