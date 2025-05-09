import { Box, Button } from "@mui/material";
import TextFieldItem, { ClassDatePicker, SelectItem } from "../../molecules/InputForm";
import { useContext, useState } from "react";
import { SMContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../../atoms/Typography";

const GenerateStudentID = async () => {
    const datetime = new Date();
    const year = String(datetime.getFullYear()).slice(-2); // Năm
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const date = String(datetime.getDate()).padStart(2, "0");
    const hours = String(datetime.getHours()).padStart(2, "0");
    const minutes = String(datetime.getMinutes()).padStart(2, "0");
    const seconds = String(datetime.getSeconds()).padStart(2, "0");
  
    // Ghép các thành phần thành chuỗi
    const timestamp = `${year}${month}${date}${hours}${minutes}${seconds}`;
  
    const studentID = `S_${timestamp}`;
    return studentID;
  };

export const AddStudentForm = () => {
    const context = useContext(SMContext);
    const navigate = useNavigate();
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Address, setAddress] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [FullNameError, setFullNameError] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [PhoneNumberError, setPhoneNumberError] = useState(false);

    const handleError = {
        
    }

    const handleCreateStudent = async () => {
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

        const newStudentID = await GenerateStudentID(); 
        context?.StudentStore.create({
            StudentID: newStudentID,
            FullName: FullName,
            DateOfBirth: DateOfBirth,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Address: Address,
            AccountID: null,
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
                    <TextFieldItem title="Full Name" placeholder="Enter student name" 
                        onChange={(e) => setFullName(e.target.value)}
                    ></TextFieldItem>
                     <Box 
                        className ='fullname-error'
                        sx={{padding: '0 10px', display: FullNameError ? 'block' : 'none'}}>
                        <ErrorText>Tên học sinh không được để trống</ErrorText>
                    </Box>
                </Box>
                
                <Box>
                    <ClassDatePicker title="Date of Birth" 
                        onChange={(date) => setDateOfBirth(date)}
                    />
                </Box>
                <Box>
                    <TextFieldItem title="Email" placeholder="Enter student email" 
                        onChange={(e) => setEmail(e.target.value)}
                    ></TextFieldItem>
                    <Box 
                        className='email-error'
                        sx={{padding: '0 10px', display: EmailError ? 'block' : 'none'}}>
                        <ErrorText>Email không đúng</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <TextFieldItem title="PhoneNumber" placeholder="Enter student phone number" 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></TextFieldItem>
                    <Box 
                        className='phonenumber-error'
                        sx={{padding: '0 10px', display: PhoneNumberError ? 'block' : 'none'}}>
                        <ErrorText>Số điện thoại phải có 10 chữ số</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <TextFieldItem title="Address" placeholder="Enter student address" 
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
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
                    onClick={handleCreateStudent}
                >Save</Button>
            </Box>
        </>
    )
}