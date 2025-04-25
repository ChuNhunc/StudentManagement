import { Box, Typography } from "@mui/material"
import { Icon } from "../atoms/icon"
import { useNavigate } from "react-router-dom";
import { Text } from "../atoms/Typography";

type SelectItemProps = {
    title: string;
}

export const SelectItem = ({title}: SelectItemProps) => {
    const navigate = useNavigate();
    return (
        <>
            <Box 
                sx={{
                    width: "220px",
                    height: "150px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    padding: '10px',
                    cursor: 'pointer',
                    float: 'left',
                    marginRight: '30px'
                }}
                onClick= {() => {
                    if (title === "Student Account") {
                        navigate("studentaccount")
                    } else if (title === "Teacher Account") {
                        navigate("teacheraccount")
                    } else if (title === "Admin Account") {
                        navigate("adminaccount")
                    }
                }}
            >
                <Box sx={{display: 'flex', gap: '15px'}}>
                    <Box className='icon-box'
                        sx={{
                            width: "25%",
                            backgroundColor: "#A58FFF",
                            borderRadius: "5px",
                        }}    
                    >
                        <Icon name="student-management" sx={{ fontSize: "35px", color: "white", marginLeft: "10px", marginTop: "10px" }} />
                    </Box>
                    <Box className='text-box'
                        sx={{
                            display: 'inline-block',
                            alignSelf: 'center',
                        }}
                    >
                        <Text sx={{fontSize: '15px', fontWeight: '500', color: '#4b4848'}}>{title}</Text>
                    </Box>
                </Box>
            </Box>
        </>
    )
}