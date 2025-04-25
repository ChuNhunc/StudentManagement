import { Box, SxProps, Typography } from "@mui/material";
import { Icon } from "../atoms/icon";
import { Theme } from "@emotion/react";
import { Text } from "../atoms/Typography";

export type NavItemProps = {
    title: string;
    icon: string;
    sx?: SxProps<Theme>
    route?: string;
    onClick?: () => void;
}
export const NavItem = ({icon, title, sx, onClick} : NavItemProps) => {
    return (
        <>
            <Box
                sx={{
                    width: '80%',
                    textAlign: 'center',
                    height: '80px',
                    padding: '3px',
                    marginBottom: '5px',
                    borderRadius: '10%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundColor: '#D5DAF2',
                        cursor: 'pointer',
                    }
                }}
                className = 'nav-item'
                onClick = {onClick}   
            >
                <Icon 
                    name={icon} 
                    sx={{
                        color: '#4b4848',
                        ...sx
                    }}
                />
                <Text
                    sx={{
                        fontWeight: '400',
                        fontSize: '13px'
                    }}
                >{title}</Text>
            </Box>
        </>
    )
}