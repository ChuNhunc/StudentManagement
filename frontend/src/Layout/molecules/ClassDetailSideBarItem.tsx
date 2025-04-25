import { Box } from "@mui/material"
import { Icon } from "../atoms/icon"
import { Text } from "../atoms/Typography"
import { useNavigate } from "react-router-dom"

type ClassDetailSideBarItemProps = {
    text: string
    route: string
}

export const ClassDetailSideBarItem = ({text, route}: ClassDetailSideBarItemProps) => {
    const navigate = useNavigate()
    return (
        <>
            <Box 
                sx={{
                    display: 'flex', 
                    gap: '10px',
                    alignItems: 'center',
                    width: '100%',
                    height: '50px',
                    paddingLeft: '20px',
                    boxSizing: 'border-box',
                    ":hover": {
                        backgroundColor: '#b3b0b0',
                        cursor: 'pointer'
                    }
                }}
                onClick={() => {
                    navigate(route)
                }}
            >
                <Box className='icon'>
                    <Icon name="arrow-forward" sx={{ fontSize: '20px', color: '#000000' }}></Icon>
                </Box>
                <Text
                    sx={{
                        fontSize: '14px'
                    }}
                >
                    {text}
                </Text>
            </Box>
        </>
    )
}