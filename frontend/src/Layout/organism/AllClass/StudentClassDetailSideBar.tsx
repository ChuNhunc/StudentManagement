import { Box, Button } from "@mui/material"

export const StudentClassDetailSideBar = () => {
    const handleApply = async () => {
        
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
                }}
            >
                <Box className= 'apply-button' sx={{textAlign: 'center'}}>
                    <Button 
                        variant="contained"
                        sx={{
                            alignSelf: 'center',
                        }}
                        onClick={() => {

                        }}
                    >Apply</Button>
                </Box>
            </Box>
        </>
    )
}