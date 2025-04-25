import { Box, styled } from "@mui/material"
import { Class } from "../../data/ClassStore"
import { useContext } from "react"
import { SMContext } from "../../context/context"
import { useNavigate } from "react-router-dom"

export const ClassName = styled('text')({
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#28333E',
})

export const ClassDescription = styled('text')({ 
    fontSize: '14px',
    color: '#28333E',
    fontWeight: '500'
})

type ClassCardProps = {
    className: string,
    courseName: string,
    studentNumber: number,
    onClick?: () => void
}

export const ClassCard = ({className, courseName, studentNumber, onClick}: ClassCardProps) => {
    const navigate = useNavigate()
    return (
        <>
            <Box className="class-card"
                onClick = {onClick}
                sx={{
                    width: '23%',
                    height: '220px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    padding: '0 10px 0 10px'
                }}
            >
                <Box className='class-card-photo'>
                    <Box component='img' src = "/images/ielts.jpg"
                        sx={{
                            width: '100%',
                            objectFit: 'cover',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                        }}
                    />
                    <Box className='class-card-info'
                        sx={{
                            padding: '0 10px 0 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px'
                        }}
                    >
                        <ClassName>{className}</ClassName>
                        <ClassDescription>Course: {courseName}</ClassDescription>
                        <ClassDescription>Student number: {studentNumber}</ClassDescription>
                    </Box>
                </Box>    
            </Box>
        </>
    )
}