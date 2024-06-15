import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import Home from '../pages/Home';

const HomeRouteMediator = () => {
    const authContext = useContext(AuthContext);
    return authContext.user ? <Navigate to="/upcoming" replace /> : <Home />;
}

export default HomeRouteMediator;