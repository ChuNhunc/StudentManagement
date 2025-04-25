import { Button, SxProps, Theme } from "@mui/material"

type ButtonProps = {
    onClick?: () => void;
    children?: React.ReactNode;
    sx?: SxProps<Theme>
}

export const AccountTableAction = ({children, onClick,sx}: ButtonProps) => {
    return (
        <>
            <Button
                onClick={onClick}
                sx={{
                    padding: '5px 10px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    float: 'right',
                    fontSize: '12px',
                    ...sx,
                }}
            >
                {children}
            </Button>
        </>
    )
}

export const StudentTableAction = ({children, onClick,sx}: ButtonProps) => {
    return (
        <>
            <Button
                onClick={onClick}
                sx={{
                    padding: '5px 10px',
                    fontSize: '10px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    ...sx
                }}
            >
                {children}
            </Button>
        </>
    )
}