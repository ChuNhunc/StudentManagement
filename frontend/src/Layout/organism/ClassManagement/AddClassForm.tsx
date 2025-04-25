import { Box, Button, Select } from "@mui/material"
import TextFieldItem, { ClassDatePicker, SelectItem } from "../../molecules/InputForm"
import { FormButton } from "../../molecules/FormButton"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SMContext } from "../../../context/context"

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
    const context = useContext(SMContext)
    const [className, setClassName] = useState<string>('')
    const [course, setCourse] = useState<string>('')
    const [teacher, setTeacher] = useState<string>('')
    const [studentNumber, setStudentNumber] = useState<number>(0)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    return (
        <>
            <Box className="add-class-form"
                sx={{
                    display: 'grid', // Sử dụng Grid
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    padding: '20px 20px 0 20px',
                }}
            >
                <TextFieldItem title="Class Name" placeholder="Enter class name" 
                    onChange={(e) => setClassName(e.target.value)}
                />
                <SelectItem title= 'Course' type="course" onChange={(e) => setCourse(String(e.target.value))}/>
                <SelectItem title="Teacher" type="teacher" onChange={(e) => setTeacher(String(e.target.value))}/>
                <TextFieldItem 
                    title="Student Number" 
                    placeholder="Enter student number" 
                    onChange={(e) => setStudentNumber(Number(e.target.value))} 
                />
                <ClassDatePicker title="Start Date" onChange={(date) => setStartDate(date)}/>
                <ClassDatePicker title="End Date" onChange={(date) => setEndDate(date)}/>
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
                    onClick={async () => {
                        const newClassID = await generateClassID(course); 
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
                    }}
                >Save</Button>
            </Box>
        </>
    )
}

