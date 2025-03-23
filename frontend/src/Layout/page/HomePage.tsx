
import { useLocation, useNavigate } from "react-router-dom";
import MainTemplate from "../template/MainTemplate";

const HomePage = () => {
    const location = useLocation();
    const roleID = location.state.roleID;
    return (
        <MainTemplate>
            <h1>Student HomePage</h1>
        </MainTemplate>
    )
}

export default HomePage;