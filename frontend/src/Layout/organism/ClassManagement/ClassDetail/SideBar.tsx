import { Box } from "@mui/material"
import { ClassDetailSideBarItem } from "../../../molecules/ClassDetailSideBarItem"

const classDetailSideBarItems = [
    {
        text: 'General Information',
        route: 'generalinformation'
    }, 
    {
        text: 'Application List',
        route: 'applicationlist'
    }, 
    {
        text: 'Enrollment List',
        route: 'enrollmentlist'
    }, 
    {
        text: 'Lesson List',
        route: 'lessonlist'
    }, 
    {
        text: 'Class Schedule',
        route: 'classschedule'
    }, 
]

export const ClassDetailSideBar = () => {
    return (
        <>
            <Box 
                sx={{
                    width: '20%',
                    float: 'left',
                    height: 'calc(100vh - 70px)',
                    backgroundColor: 'white',
                    paddingTop: '50px',
                }}
            >
                {classDetailSideBarItems.map((item, index) => {
                    return(
                        <ClassDetailSideBarItem key={index} text={item.text} route={item.route}/> 
                    )
                })}
            </Box>
        </>
    )
}

