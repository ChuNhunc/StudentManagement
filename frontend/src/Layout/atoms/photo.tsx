import { Theme } from "@emotion/react"
import { Menu, MenuItem, SxProps } from "@mui/material"
import { borderRadius, Box } from "@mui/system"
import React from "react"
import { logout } from "../../service/authService"
import { useNavigate } from "react-router-dom"

type ProfilePhotoProps = {
    src?: string
    alt?: string
    sx?: SxProps<Theme>
    children?: React.ReactNode
}

export const ProfilePhoto = ({sx, children}: ProfilePhotoProps) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleLogout = () => {
        logout()
        navigate('/login')
      }
    
    return (
        <>
            <Box component='img' src = "/images/profilePhoto.jpg"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    ...sx
                }}
                onClick={handleClick}
            >
            </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
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