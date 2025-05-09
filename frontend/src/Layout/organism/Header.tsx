import { Box } from "@mui/material"
import { HeaderText } from "../molecules/HeaderText"
import { HeaderRight } from "../molecules/HeaderRight"

type HeaderProps = {
    headerText: string
}

export const Header = ({headerText}: HeaderProps) => {
    return (
        <>
            <Box
                sx={{
                    height: '70px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                    paddingRight: '60px',
                    display: 'flex',
                    backgroundColor: '#F8FAFB',
                    position: 'fixed',
                    width: 'calc(100% - 100px)',
                    zIndex: 3,
                    padding: '0 20px',
                }}
            >
                <HeaderText title={headerText} icon='explore'></HeaderText>
                <HeaderRight/>
            </Box>
            <Box sx={{ height: '70px' }} /> {/* Tạo khoảng trống cho Header */}
        </>
    )
}