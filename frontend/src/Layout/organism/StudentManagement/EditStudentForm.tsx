import { Box, Button } from "@mui/material";
import TextFieldItem, { ClassDatePicker, SelectItem } from "../../molecules/InputForm";
import { useContext, useState } from "react";
import { SMContext } from "../../../context/context";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorText } from "../../atoms/Typography";

export const EditStudentForm = () => {
    const context = useContext(SMContext);
    const location = useLocation();
    const state = location.state
    console.log(state)
    const navigate = useNavigate();
    const [FullName, setFullName] = useState(state.FullName);
    const [Email, setEmail] = useState(state.Email);
    const [PhoneNumber, setPhoneNumber] = useState(state.PhoneNumber);
    const [Address, setAddress] = useState(state.Address);
    const [DateOfBirth, setDateOfBirth] = useState<Date | null>(state.DateOfBirth ? new Date(state.DateOfBirth) : null);
    const [FullNameError, setFullNameError] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [AccountID, setAccountID] = useState<number|null>(state.AccountID);
    const [PhoneNumberError, setPhoneNumberError] = useState(false);


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

        const studentID = state.StudentID
        if(studentID) {
            context?.StudentStore.update(studentID, {
                StudentID: studentID.trim(),
                FullName: FullName.trim(),
                DateOfBirth: DateOfBirth,
                Email: Email.trim(),
                PhoneNumber: PhoneNumber.trim(),
                Address: Address.trim(),
                AccountID: AccountID,
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
                        title="Full Name" 
                        placeholder="Enter student name" 
                        value={FullName}
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
                        defaultValue={DateOfBirth}
                    />
                </Box>
                <Box>
                    <TextFieldItem 
                        title="Email" 
                        placeholder="Enter student email" 
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></TextFieldItem>
                    <Box 
                        className='email-error'
                        sx={{padding: '0 10px', display: EmailError ? 'block' : 'none'}}>
                        <ErrorText>Email không đúng</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <TextFieldItem 
                        title="PhoneNumber" 
                        placeholder="Enter student phone number" 
                        value={PhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></TextFieldItem>
                    <Box 
                        className='phonenumber-error'
                        sx={{padding: '0 10px', display: PhoneNumberError ? 'block' : 'none'}}>
                        <ErrorText>Số điện thoại phải có 10 chữ số</ErrorText>
                    </Box>
                </Box>
                <Box>
                    <TextFieldItem 
                        title="Address" 
                        placeholder="Enter student address" 
                        value={Address}
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