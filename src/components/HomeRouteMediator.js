import { useContext } from "react"
import AuthContext from "../contexts/authContext"
import { useNavigate } from "react-router";
import Home from "../pages/Home";

const HomeRouteMediator = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    return authContext.user ? navigate("/upcoming") : <Home />
}

export default HomeRouteMediator;