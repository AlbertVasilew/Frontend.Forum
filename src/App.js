import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';

import AuthContext from './contexts/AuthContext';
import CategoryContext from './contexts/CategoryContext';
import MenuContext from './contexts/MenuContext';

import Menu from './components/Menu';
import AxiosMiddleware from './components/AxiosMiddleware';

import { logoutHandler } from './helpers/auth';
import { retrieveCategories, retrieveMenuCounters } from './helpers/api-calls';

import theme from './styles/theme';
import './styles/styles.css';

const App = () => {
    const [user, setUser] = useState();
    const [categories, setCategories] = useState([]);
    const [counters, setCounters] = useState([]);;

    useEffect(() => {
        if (user) {
            retrieveCategories(setCategories);
            retrieveMenuCounters(setCounters);
        } else {
            let userData = localStorage.getItem("user");

            if (userData)
                setUser(JSON.parse(userData));
        }
    }, [user]);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <AuthContext.Provider value={{user, setUser}}>
                <CategoryContext.Provider value={{categories, setCategories}}>
                    <MenuContext.Provider value={{counters, setCounters}}>
                        <AxiosMiddleware
                            unauthorizedHandler={() =>  logoutHandler(setUser)}
                            authHeader={{type: "Bearer", token: user?.token}}
                        />
                        <Box className="application-wrapper">
                            {user ? (
                                <React.Fragment>
                                    <Menu />
                                    <Box className="content">
                                        <Outlet />
                                    </Box>
                                </React.Fragment>
                            ) : <Outlet />}
                        </Box>
                    </MenuContext.Provider>
                </CategoryContext.Provider>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;