import { Box } from "@mui/material"
import { ListIcon } from "./ListIcon"
import { Icon } from "../atoms/icon"
import { ProfilePhoto } from "../atoms/photo"
import { HeaderMenu } from "./HeaderMenu"

export const HeaderRight = () => {
    const listIcon = ['help', 'notification']
    return (
        <>
            <Box
                className='header-right'
                sx={{
                    float: 'right',
                    alignItems: 'center',
                    display: 'flex',
                    alignContent: 'right',
                    marginLeft: 'auto',
                    
                }}
            >
                <Box>
                    {listIcon.map((iconName, index) => (
                        <Icon 
                            key={index} 
                            name={iconName} 
                            sx={{
                                marginRight: '10px',
                            }}
                        />
                    ))}
                </Box>
                <Box
                    sx={{
                        height: '30px',
                        width: '30px',
                    }}
                >
                    <HeaderMenu></HeaderMenu>
                </Box>
            </Box>
        </>
    )
}