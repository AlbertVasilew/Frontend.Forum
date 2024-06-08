import { useContext } from "react"
import { Navigate } from "react-router-dom";

import AuthContext from "../contexts/authContext";

const ProtectedRoute = props => {
    const authContext = useContext(AuthContext);
    return authContext.user ? props.component : <Navigate to="/" replace />;
}

export default ProtectedRoute;