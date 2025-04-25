import { Box, Button } from "@mui/material"
import TextFieldItem, { SearchBox } from "./InputForm"
import { CreateButton } from "../atoms/button"
import { useNavigate } from "react-router-dom"

type ToolBoxProps = {
    route: string
}

export const ToolBox = ({route}: ToolBoxProps) => {
    const navigate = useNavigate()
    return (
        <>
            <Box 
                className = 'tool-box'
                sx={{
                    width: '100%',
                    height: '80px',
                    display: 'inline-block',
                    marginTop: '20px',
                }}
            >
                <CreateButton 
                    sx={{marginLeft: '30px'}}
                    onClick={() => {
                        navigate(route)
                    }}
                >Add</CreateButton>
                <Box 
                    className='search-box'
                    sx={{
                        width: '20%',
                        float: 'right',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginRight: '30px',
                    }}
                >
                    <SearchBox/>
                </Box>
            </Box>
        </>
    )
}