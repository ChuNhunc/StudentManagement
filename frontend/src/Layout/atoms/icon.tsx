import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import ExploreIcon from '@mui/icons-material/Explore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
        case 'home':
            return (
                <HomeIcon sx={sx} className= {'icon ' + name}>{children}</HomeIcon>
            )
        case 'task':
            return (
                <TaskIcon sx={sx} className= {'icon ' + name}>{children}</TaskIcon>
            )
        case 'account-management':
            return (
                <FormatListBulletedIcon sx={sx} className= {'icon ' + name}>{children}</FormatListBulletedIcon>
            )
        case 'student-management':
            return (
                <PersonIcon sx={sx} className= {'icon ' + name}>{children}</PersonIcon>
            )
        case 'class-management':
            return (
                <SchoolIcon sx={sx} className= {'icon ' + name}>{children}</SchoolIcon>
            )   
        case 'arrow-forward':
            return (
                <ArrowForwardIcon sx={sx} className= {'icon ' + name}>{children}</ArrowForwardIcon>
            )  
    }
    return (
        <></>
    )
}