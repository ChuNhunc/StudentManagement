import { Theme } from "@emotion/react"
import { Box, SxProps, Typography } from "@mui/material"
import { Icon } from "../atoms/icon"

type HeaderTextProps = {
    title: string
    icon: string
    sx?: SxProps<Theme>
    children?: React.ReactNode
}

export const HeaderText = ({title, icon, sx, children}: HeaderTextProps) => {
    return (
        <>
            <Box 
                className='header-left'
                sx={{
                    width: '30%',
                    display: 'flex',
                    color: '#28333E',
                    alignItems: 'center',
                    paddingLeft: '100px'
                }}
            >
                <Icon name={icon}></Icon>
                <Box>
                <Typography 
                    sx={{
                        display: 'inline-block',
                        marginLeft: '5px',
                    }}>
                    {title}
                </Typography>
                </Box>
            </Box>
        </>
    )
}