import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import ExploreIcon from '@mui/icons-material/Explore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';

type IconProps = {
    name: string
    sx?: SxProps<Theme>
    children?: React.ReactNode
}
export const Icon = ({name, sx, children}: IconProps) => {
    switch(name) {
        case 'explore':
            return (
                <ExploreIcon sx={sx} className= {'icon ' + name}>{children}</ExploreIcon>
            ) 
        case 'book':
            return (
                <MenuBookIcon sx={sx} className= {'icon ' + name}>{children}</MenuBookIcon>
            )
        case 'search': 
            return (
                <SearchIcon sx={sx} className= {'icon ' + name}>{children}</SearchIcon>
            )
        case 'notification':
            return (
                <NotificationsIcon sx={sx} className= {'icon ' + name}>{children}</NotificationsIcon>
            )
        case 'help':
            return (
                <HelpIcon sx={sx} className= {'icon ' + name}>{children}</HelpIcon>
            )
    }
    return (
        <></>
    )
}