import { Box, Button } from "@mui/material";
import TextFieldItem, { ClassDatePicker, SelectItem } from "../../molecules/InputForm";
import { useContext, useState } from "react";
import { SMContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";

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

    return (
        <>
             <Box className="add-class-form"
                sx={{
                    display: 'grid', // Sử dụng Grid
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    padding: '20px 20px 0 20px',
                }}
            >
                <TextFieldItem title="Full Name" placeholder="Enter student name" 
                    onChange={(e) => setFullName(e.target.value)}
                />
                <ClassDatePicker title="Date of Birth" 
                    onChange={(date) => setDateOfBirth(date)}
                />
                <TextFieldItem title="Email" placeholder="Enter student email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextFieldItem title="PhoneNumber" placeholder="Enter student phone number" 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextFieldItem title="Address" placeholder="Enter student address" 
                    onChange={(e) => setAddress(e.target.value)}
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
                    // onClick={() => {
                    //     navigate(-1)
                    // }}
                >Cancel</Button>
                <Button 
                    variant="contained" 
                    sx={{}}
                    onClick={async () => {
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
                    }}
                >Save</Button>
            </Box>
        </>
    )
}