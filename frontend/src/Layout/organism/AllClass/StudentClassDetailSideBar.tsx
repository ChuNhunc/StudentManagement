import { Box, Button, styled } from "@mui/material"
import React, { useContext, useState } from "react"
import { SMContext } from "../../../context/context"
import { useParams } from "react-router-dom"
import { ErrorText, Text } from "../../atoms/Typography";
import Alert from '@mui/material/Alert';

const CustomButton = styled(Button)(({ theme }) => ({
    alignSelf: 'center',
    "&.Mui-disabled": {
        backgroundColor: "white",
        color: "#0000FF",          
        borderColor: "#0000FF",    
    },
}));

type StudentClassDetailSideBarProps = {
    onClick?: () => void;
}

export const StudentClassDetailSideBar = ({onClick}: StudentClassDetailSideBarProps) => {
    const context = useContext(SMContext)
    const { classID } = useParams<{ classID: string }>();
    const studentID = context?.UserStore.getUserProfile()?.StudentID
    const [alertMessage, setAlertMessage] = useState<string | null>(null); // Thêm state để lưu thông báo lỗi
    const [isApply, setIsApply] = useState<boolean | undefined>(false)
    const [isStart, setIsStart] = useState<boolean>(false)
    const useEffect = React.useEffect(() => {
        const fetchData = async () => {
          try {
            if(studentID && classID) {
                const date = new Date().toISOString().split('T')[0];
                const classData = await context.ClassStore.getsById(classID)
                if(date > classData.StartDate) {
                    setIsApply(true)
                    setIsStart(true)
                }
                const applyData = await context?.ApplicationStore.getApplicationInClassByStudentID(classID, studentID)
                setIsApply(!!applyData)
            }
          } catch (error) {
              console.error("Failed to fetch classes:", error);
          }
        };
      fetchData();
      },[])
    const handleApply = async () => {
        console.log(studentID, classID)
        if(studentID && classID) {
            try {
                const res = await context?.ApplicationStore.createApplication(studentID, classID)
                if (res) {
                    setIsApply(true)
                    alert("Apply successfully")
                } else {
                    alert("Apply failed")
                }
            } catch (error: any) {
                if (error.response?.status === 400 && error.response?.data?.message === "Class is full. Cannot create application.") {
                    setAlertMessage("Lớp đã đủ học sinh"); 
                    setTimeout(() => {
                        setAlertMessage(null);
                    }, 5000);
                } else {
                    alert("Apply failed");
                }
            }
        }
    }
    return (
        <>
            <Box 
                sx={{
                    width: '20%',
                    float: 'left',
                    height: 'calc(100vh - 70px)',
                    backgroundColor: 'white',
                    paddingTop: '50px',
                    position: 'fixed',
                }}
            >
                <Box className= 'apply-button' 
                    sx={{
                        textAlign: 'center',
                        marginTop: '70px',
                    }}>
                    <CustomButton 
                        variant={isApply ? "outlined" : "contained"}
                        onClick={handleApply}
                        disabled={isApply}
                    >{isApply ? "Applied" : "Apply"}</CustomButton>
                </Box>
                <Box sx={{textAlign: 'center', marginTop: '20px', width: '100%', display: isStart ? 'block' : 'none'}}>
                    <ErrorText>Lớp đã bắt đầu</ErrorText>
                </Box>
                {alertMessage && (
                    <Alert 
                        onClose={() => setAlertMessage(null)} 
                        severity="error"
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                        }}
                    >
                        {alertMessage}
                    </Alert>
                )}
            </Box>
        </>
    )
}