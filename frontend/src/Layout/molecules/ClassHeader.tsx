import { Box } from "@mui/material"
import { ClassNameText } from "../atoms/Typography"

type ClassHeaderProps = {
    className?: string
    classID?: string
}

export const ClassHeader = ({className, classID}: ClassHeaderProps) => {
    return (
        <>
            <Box
                sx={{
                    width: "100%", 
                    height: "200px", 
                    position: "relative", 
                    overflow: "hidden", 
                }}
            >
                <Box 
                    component={'img'}
                    src="/images/class_image.png"
                    className='class-header'
                    sx={{
                        objectFit: "cover", 
                        width: "100%", 
                        height: "100%", 
                        position: "absolute", 
                        top: 0, 
                        left: 0, 
                        verticalAlign: 'middle',
                        zIndex: 0, 
                    }}
                />
                <ClassNameText
                    sx={{
                        zIndex: 1, 
                        position: "absolute", 
                        left: '20px',
                        bottom: '20px',
                        color: '#27313C',
                    }}
                >[{classID}] {className}</ClassNameText>
            </Box>
        </>
    )
}