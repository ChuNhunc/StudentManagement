import { Theme } from "@emotion/react"
import { SxProps } from "@mui/material"
import { borderRadius, Box } from "@mui/system"

type ProfilePhotoProps = {
    src: string
    alt: string
    sx?: SxProps<Theme>
    children?: React.ReactNode
}

export const ProfilePhoto = ({src, alt, sx, children}: ProfilePhotoProps) => {
    return (
        <>
            <Box component='img' src = "/images/profilePhoto.jpg"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    ...sx
                }}
            >
                {children}
            </Box>
        </>
    )
}

export const Logo = ({src, alt, sx, children}: ProfilePhotoProps) => {
    return (
        <>
            <Box component='img' src = "/images/logo.png"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    ...sx
                }}
            >
                {children}
            </Box>
        </>
    )
}