import { Box } from "@mui/material";
import Navbar from "../organism/NavBar";
import { useLocation } from "react-router-dom";

type MainTemplateProps = {
    children: React.ReactNode;
}

const MainTemplate = ({ children}: MainTemplateProps) => {
    const location = useLocation();
    const { roleID } = location.state || {}
    console.log("roleID:", roleID);
    return (
        <Box>
            <Box>
                <Navbar roleID={roleID}></Navbar>
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    )
}

export default MainTemplate;