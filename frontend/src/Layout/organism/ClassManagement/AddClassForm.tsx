import { Box, Button, Select } from "@mui/material"
import TextFieldItem, { ClassDatePicker, SelectItem } from "../../molecules/InputForm"
import { FormButton } from "../../molecules/FormButton"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SMContext } from "../../../context/context"
import { ErrorText } from "../../atoms/Typography"
import dayjs from "dayjs"

const generateClassID = async (courseID: string) => {
    const datetime = new Date();
    const year = String(datetime.getFullYear()).slice(-2); // Năm
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const date = String(datetime.getDate()).padStart(2, "0");
    const hours = String(datetime.getHours()).padStart(2, "0");
    const minutes = String(datetime.getMinutes()).padStart(2, "0");
    const seconds = String(datetime.getSeconds()).padStart(2, "0");
  
    // Ghép các thành phần thành chuỗi
    const timestamp = `${year}${month}${date}${hours}${minutes}${seconds}`;
  
    // Tạo ClassID bằng cách kết hợp courseID và timestamp
    const classID = `${courseID}_${timestamp}`;
  
    return classID;
  };

export const AddClassForm = () => {
    const navigate = useNavigate()
    const date = new Date()
    const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000) 
    const context = useContext(SMContext)
    const [classNameError, setClassNameError] = useState(false)
    const [courseError, setCourseError] = useState(false)
    const [teacherError, setTeacherError] = useState(false)
    const [studentNumberError, setStudentNumberError] = useState(false)
    const [className, setClassName] = useState<string>('')
    const [course, setCourse] = useState<string>('')
    const [teacher, setTeacher] = useState<string>('')
    const [studentNumber, setStudentNumber] = useState<number>(0)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const handleSaveButtonClick = async () => {
        const newClassID = await generateClassID(course); 
        setClassNameError(false)
        setCourseError(false)
        setTeacherError(false)
        setStudentNumberError(false)

        let isValid = true
        if (className.trim() === '') {
            setClassNameError(true)
            isValid = false
        }
        if (course.trim() === '') {
            setCourseError(true)
            isValid = false
        }
        if (teacher.trim() === '') {
            setTeacherError(true)
            isValid = false
        }
        if (studentNumber <= 0) {
            setStudentNumberError(true)
            isValid = false
        }

        if(isValid === false) {
            return;
        }

        context?.ClassStore.createClass({
            ClassID: newClassID,
            ClassName: className,
            CourseID: course,
            TeacherID: teacher,
            StudentNumber: studentNumber,
            StartDate: startDate,
            EndDate: endDate,
        })
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
                    <TextFieldItem title="Class Name" placeholder="Enter class name" 
                        onChange={(e) => {
                            setClassName(e.target.value)
                        }}
                    />
                    <Box sx={{padding: '0 10px',display: classNameError ? 'block' : 'none'}}>
                        <ErrorText>Tên lớp bắt buôc phải nhập</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <SelectItem title= 'Course' type="course" 
                        onChange={(e) => {
                            setCourse(String(e.target.value))
                        }}/>
                    <Box sx={{padding: '0 10px', display: courseError ? 'block' : 'none'}}>
                        <ErrorText>Vui lòng chọn khóa học</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <SelectItem title="Teacher" type="teacher" 
                        onChange={(e) => setTeacher(String(e.target.value))}/>
                    <Box sx={{padding: '0 10px', display: teacherError ? 'block' : 'none'}}>
                        <ErrorText>Vui lòng chọn giáo viên</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <TextFieldItem 
                        title="Student Number" 
                        placeholder="Enter student number" 
                        onChange={(e) => setStudentNumber(Number(e.target.value))} 
                    />
                    <Box sx={{padding: '0 10px', display: studentNumberError ? 'block' : 'none'}}>
                        <ErrorText>Số lượng học sinh không được để trống</ErrorText>
                    </Box>
                </Box>
                <ClassDatePicker minDate={dayjs(date).toDate()} defaultValue={date} title="Start Date" onChange={(date) => setStartDate(date)}/>
                <ClassDatePicker minDate={dayjs(date).toDate()} defaultValue={nextDate} title="End Date" onChange={(date) => setEndDate(date)}/>
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

