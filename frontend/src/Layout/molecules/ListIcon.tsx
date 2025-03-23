import { Theme } from "@emotion/react"
import { SxProps } from "@mui/material"
import { Box } from "@mui/system"
import { Icon } from "../atoms/icon"

type ListIconProps = {
    list: string[]
    sx?: SxProps<Theme>
}
export const ListIcon = ({list, sx}: ListIconProps) => {
    list.map((item) => {
        return (
            <>
                <Box sx={sx}>
                    {list.map((iconName, index) => (
                        <Icon key={index} name={iconName} />
                    ))}
                </Box>
            </>
        )
    })
   return <></>
}