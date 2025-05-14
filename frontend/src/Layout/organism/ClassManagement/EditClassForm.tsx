import { Box, Button, Select } from "@mui/material"
import TextFieldItem, { ClassDatePicker, SelectItem } from "../../molecules/InputForm"
import { FormButton } from "../../molecules/FormButton"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SMContext } from "../../../context/context"
import { ErrorText, StatusText } from "../../atoms/Typography"
import { getAllStudentsInClass } from "../../../service/attendanceService"

export const EditClassForm = () => {
    const navigate = useNavigate()
    const date = new Date()
    const location = useLocation()
    const state = location.state
    const classID = state.ClassID
    const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000) 
    const context = useContext(SMContext)
    const [classNameError, setClassNameError] = useState(false)
    const [studentNumberError, setStudentNumberError] = useState(false)
    const [studentNumberValidate, setStudentNumberValidate] = useState(false)
    const [className, setClassName] = useState<string>(state.ClassName)
    const [course, setCourse] = useState<string>(state.CourseID)
    const [teacher, setTeacher] = useState<string>(state.TeacherID)
    const [studentNumber, setStudentNumber] = useState<number>(state.StudentNumber)
    const [startDate, setStartDate] = useState<Date | null>(state.StartDate)
    const [endDate, setEndDate] = useState<Date | null>(state.EndDate)

    const handleSaveButtonClick = async () => {
        setClassNameError(false)
        setStudentNumberError(false)

        let isValid = true

        try {
            const listStudent = await getAllStudentsInClass(classID)
            console.log(classID)
            console.log(listStudent)

            if(listStudent !== undefined) {
                console.log(listStudent.length)
                const students = listStudent.length
                console.log(studentNumber)
                console.log(students)
                if(studentNumber < students) {
                    setStudentNumberValidate(true)
                    isValid = false
                }
            }
        }catch (error) {
            console.error("Failed to fetch classes:", error);
            return;
        }

        if (className.trim() === '') {
            setClassNameError(true)
            isValid = false
        }
        // if (course.trim() === '') {
        //     setCourseError(true)
        //     isValid = false
        // }
        // if (teacher.trim() === '') {
        //     setTeacherError(true)
        //     isValid = false
        // }
        if (studentNumber <= 0) {
            setStudentNumberError(true)
            isValid = false
        }

        if(isValid === false) {
            return;
        }

        
        if(classID) {
            context?.ClassStore.updateClass(classID,{
                ClassID: classID,
                ClassName: className,
                CourseID: course,
                TeacherID: teacher,
                StudentNumber: studentNumber,
                StartDate: startDate,
                EndDate: endDate,
            })
        }
        navigate(-1)
    }


    return (
        <>
            <Box className="add-class-form"
                sx={{
                    display: 'grid', // Sử dụng Grid
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    padding: '20px 20px 0 20px',
                }}
            >
                <Box>
                    <TextFieldItem 
                        title="Class Name" 
                        placeholder="Enter class name" 
                        value={className}
                        onChange={(e) => {
                            setClassName(e.target.value)
                        }}
                    />
                    <Box sx={{padding: '0 10px',display: classNameError ? 'block' : 'none'}}>
                        <ErrorText>Tên lớp bắt buôc phải nhập</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <SelectItem 
                        title= 'Course' 
                        type="course"
                        value={course}
                        onChange={(e) => {
                            setCourse(String(e.target.value))
                        }}/>
                </Box>
                <Box>
                    <SelectItem 
                        title="Teacher" 
                        type="teacher" 
                        value={teacher}
                        onChange={(e) => setTeacher(String(e.target.value))}/>
                </Box>
                <Box>
                    <TextFieldItem 
                        title="Student Number" 
                        placeholder="Enter student number" 
                        value={studentNumber}
                        onChange={(e) => setStudentNumber(Number(e.target.value))} 
                    />
                    <Box sx={{padding: '0 10px', display: studentNumberError ? 'block' : 'none'}}>
                        <ErrorText>Số lượng học sinh không được để trống</ErrorText>
                    </Box>
                    <Box sx={{padding: '0 10px', display: studentNumberValidate ? 'block' : 'none'}}>
                        <ErrorText>Không thể sửa số lượng học sinh nhỏ hơn số học sinh hiện có trong lớp</ErrorText>
                    </Box>
                </Box>
                <ClassDatePicker defaultValue={date} title="Start Date" onChange={(date) => setStartDate(date)}/>
                <ClassDatePicker defaultValue={nextDate} title="End Date" onChange={(date) => setEndDate(date)}/>
            </Box>
            <Box className="form-button" 
                sx={{
                    display: 'inline-block',
                    margin: '20px 20px 0 0',
                    float: 'right',
                    bottom: '30px',
                    position: 'absolute',
                    right: '0',
                }}
            >
                <Button 
                    variant="outlined" 
                    sx={{marginRight: '10px'}}
                    onClick={() => {
                        navigate(-1)
                    }}
                >Cancel</Button>
                <Button 
                    variant="contained" 
                    sx={{}}
                    onClick={handleSaveButtonClick}
                >Save</Button>
            </Box>
        </>
    )
}

