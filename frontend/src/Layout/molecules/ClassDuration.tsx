import { Box, styled } from "@mui/material";
import { Text } from "../atoms/Typography";

type ClassDurationProps = {
    startDate: string;
    endDate: string;
}

export const ClassInformationBox = styled(Box) ({
    width: '49%',
    backgroundColor: '#F4F7FC', 
    height: '50px', 
    textAlign: 'center'
})

export const ClassDuration = ({startDate, endDate}: ClassDurationProps) => {
    return (
        <>
            <Box sx={{ padding: '10px', marginBottom: '20px' }}>
                <Text sx={{fontWeight: '700'}}>COURSE DURATION</Text>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                    <ClassInformationBox>
                        <Text sx={{lineHeight: '50px'}}>Start date: {startDate}</Text>
                    </ClassInformationBox>
                    <ClassInformationBox>
                        <Text sx={{lineHeight: '50px'}}>End date: {endDate}</Text>
                    </ClassInformationBox>
                </Box>
            </Box>
        </>
    )
}