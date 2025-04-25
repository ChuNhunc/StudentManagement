import { Box } from "@mui/material"
import { HeaderText } from "../molecules/HeaderText"
import { HeaderRight } from "../molecules/HeaderRight"

export const Header = () => {
    return (
        <>
            <Box
                sx={{
                    height: '70px',
                    display: 'fixed',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                    paddingRight: '60px',
                    backgroundColor: '#F8FAFB'
                }}
            >
                <HeaderText title='Student Management' icon='explore'></HeaderText>
                <HeaderRight/>
            </Box>
        </>
    )
}