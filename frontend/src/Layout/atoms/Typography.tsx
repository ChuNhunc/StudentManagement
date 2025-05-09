import { Theme } from "@emotion/react"
import { SxProps, Typography } from "@mui/material"

type TextProps = {
    children: React.ReactNode
    sx?: SxProps<Theme>
    statusData?: number
    className?: string
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

export const ErrorText = ({ children, sx, className }: TextProps) => {
    return (
        <>
            <Text
                className={className} 
                sx={{
                    color: '#d32f2f',
                    ...sx,
                }}>
                {children}
            </Text>
        </>
    )
}

export const StatusText = ({sx, statusData}: TextProps) => {
    switch (statusData) {
        case 1: 
            return (
                <>
                    <Text 
                        sx={{
                            color: '#F77B00',
                            fontSize: '10px',
                            lineHeight: '20px',
                            fontWeight: '600',
                            ...sx,
                        }}>
                        Pending Approval
                    </Text>
                </>
            )
        case 2: 
        return (
            <>
                <Text 
                    sx={{
                        color: '#d32f2f',
                        fontSize: '10px',
                        lineHeight: '20px',
                        fontWeight: '600',
                        ...sx,
                    }}>
                    Rejected
                </Text>
            </>
        )
        case 3: 
        return (
            <>
                <Text 
                    sx={{
                        color: '#22B532',
                        fontSize: '10px',
                        lineHeight: '20px',
                        fontWeight: '600',
                        ...sx,
                    }}>
                    Approved
                </Text>
            </>
        )
        default:
            return null
    }
}  

export const ClassNameText = ({ children, sx }: TextProps) => {
    return (
        <>
            <Text 
                sx={{
                    color: 'black',
                    fontSize: '24px',
                    lineHeight: '30px',
                    fontWeight: '600',
                    ...sx,
                }}>
                {children}
            </Text>
        </>
    )
}



