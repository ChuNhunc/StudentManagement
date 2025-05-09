import { Box, Button, TextField } from "@mui/material"
import TextFieldItem, { SearchBox } from "./InputForm"
import { CreateButton } from "../atoms/button"
import { useNavigate } from "react-router-dom"
import { Icon } from "../atoms/icon"

type ToolBoxProps = {
    route: string
    onClick?: () => void
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const ToolBox = ({route, onClick, onChange, onKeyDown}: ToolBoxProps) => {
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
                    <>
                          <TextField
                            id="search-bar"
                            className="text"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                          />
                          <Box
                            onClick={onClick}
                          >
                            <Icon name='search' sx={{cursor: 'pointer'}}></Icon>
                        </Box>
                        </>
                </Box>
            </Box>
        </>
    )
}