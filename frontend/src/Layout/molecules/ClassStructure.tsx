import { Box } from "@mui/material";
import { Lesson } from "../../data/LessonStore";
import { Text } from "../atoms/Typography";
import { ClassInformationBox } from "./ClassDuration";

type ClassStructureProps = {
    listLessons: Lesson[];
}

export const ClassStructure = ({listLessons}: ClassStructureProps) => {
    return (
        <>
            <Box sx={{ padding: '10px', marginBottom: '20px' }}>
                <Text sx={{fontWeight: '700'}}>COURSE STRUCTURE</Text>
                <Box 
                    sx={{
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: '10px', 
                        marginTop: '10px',
                    }}>
                    {listLessons.map((lesson, index) => (
                        <Box key={index} sx={{backgroundColor: '#F4F7FC', height: '50px', textAlign: 'center'}}>
                            <Text sx={{lineHeight: '50px'}}>{lesson.Detail}</Text>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}