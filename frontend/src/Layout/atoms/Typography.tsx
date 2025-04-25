import { Theme } from "@emotion/react"
import { SxProps, Typography } from "@mui/material"

type TextProps = {
    children: React.ReactNode
    sx?: SxProps<Theme>
}

export const Text = ({ children, sx }: TextProps) => {
    return (
        <>
            <Typography 
                sx={{
                    color: '#4b4848',
                    ...sx,
                }}>
                {children}
            </Typography>
        </>
    )
}



