import { Box, Button } from "@mui/material";
import TextFieldItem, { ClassDatePicker, SelectItem } from "../../molecules/InputForm";
import { useContext, useState } from "react";
import { SMContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../../atoms/Typography";

const GenerateTeacherID = async () => {
    const datetime = new Date();
    const year = String(datetime.getFullYear()).slice(-2); // Năm
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const date = String(datetime.getDate()).padStart(2, "0");
    const hours = String(datetime.getHours()).padStart(2, "0");
    const minutes = String(datetime.getMinutes()).padStart(2, "0");
    const seconds = String(datetime.getSeconds()).padStart(2, "0");
  
    // Ghép các thành phần thành chuỗi
    const timestamp = `${year}${month}${date}${hours}${minutes}${seconds}`;
  
    const TeacherID = `T_${timestamp}`;
    return TeacherID;
  };

export const AddTeacherForm = () => {
    const context = useContext(SMContext);
    const navigate = useNavigate();
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Introduction, setIntroduction] = useState('');
    const [FullNameError, setFullNameError] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [PhoneNumberError, setPhoneNumberError] = useState(false);

    const handleError = {
        
    }

    const handleCreateTeacher = async () => {
        setFullNameError(false);
        setEmailError(false);
        setPhoneNumberError(false);
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(Email)) {
            setEmailError(true);
            isValid = false;
        }

        if (PhoneNumber.length !== 10) {
            setPhoneNumberError(true);
            isValid = false;
        }

        if (FullName.trim() === '') {
            setFullNameError(true);
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const newTeacher = await GenerateTeacherID(); 
        context?.TeacherStore.create({
            TeacherID: newTeacher,
            FullName: FullName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Introduction: Introduction,
            AccountID: null,
        }).then(() => {
            alert("Thêm giáo viên thành công")
        }).catch((error) => {
            console.log(error)
            alert("Thêm giáo viên thất bại")
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
                    <TextFieldItem title="Full Name" placeholder="Enter teacher name" 
                        onChange={(e) => setFullName(e.target.value)}
                    ></TextFieldItem>
                     <Box 
                        className ='fullname-error'
                        sx={{padding: '0 10px', display: FullNameError ? 'block' : 'none'}}>
                        <ErrorText>Tên học sinh không được để trống</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <TextFieldItem title="Email" placeholder="Enter teacher email" 
                        onChange={(e) => setEmail(e.target.value)}
                    ></TextFieldItem>
                    <Box 
                        className='email-error'
                        sx={{padding: '0 10px', display: EmailError ? 'block' : 'none'}}>
                        <ErrorText>Email không đúng</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <TextFieldItem title="PhoneNumber" placeholder="Enter teacher phone number" 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></TextFieldItem>
                    <Box 
                        className='phonenumber-error'
                        sx={{padding: '0 10px', display: PhoneNumberError ? 'block' : 'none'}}>
                        <ErrorText>Số điện thoại phải có 10 chữ số</ErrorText>
                    </Box>
                </Box>
                <TextFieldItem title="Introduction" placeholder="Enter teacher introduction" 
                    onChange={(e) => setIntroduction(e.target.value)}
                />
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
                    onClick={handleCreateTeacher}
                >Save</Button>
            </Box>
        </>
    )
}