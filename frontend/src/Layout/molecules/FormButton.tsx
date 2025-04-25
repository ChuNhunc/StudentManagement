import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const FormButton = () => {
    const navigate = useNavigate();
    return (
        <>
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
                <Button variant="contained" sx={{}}>Save</Button>
            </Box>
        </>
    )
}