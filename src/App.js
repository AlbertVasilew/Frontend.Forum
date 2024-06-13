import { useEffect, useState } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";

import CategoryContext from "./contexts/categoryContext";
import MenuContext from "./contexts/menuContext";

import Content from "./components/Content";
import Menu from "./components/Drawer";

import { retrieveCategories, retrieveMenuCounters } from "./helpers/api-calls";

import theme from "./styles/theme";
import './styles/styles.css';
import { Outlet } from "react-router-dom";
import AuthContext from "./contexts/authContext";
import AxiosMiddleware from "./components/AxiosMiddleware/AxiosMiddleware";
import { logoutHandler } from "./helpers/auth";

const App = () => {
    const [user, setUser] = useState();

    const [categories, setCategories] = useState([]);
    const [primaryMenuCounters, setPrimaryMenuCounters] = useState([]);;

    useEffect(() => {
        if (user) {
            retrieveCategories(setCategories);
            retrieveMenuCounters(setPrimaryMenuCounters);
        }

        let userData = localStorage.getItem("user");

        if (userData)
            setUser(JSON.parse(userData));
    }, []);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <AuthContext.Provider value={{user, setUser}}>
                <CategoryContext.Provider value={{categories, setCategories}}>
                    <MenuContext.Provider value={{primaryMenuCounters, setPrimaryMenuCounters}}>
                        <AxiosMiddleware
                            unauthorizedHandler={() =>  logoutHandler(setUser)}
                            authHeader={{type: "Bearer", token: user?.token}}
                        />
                        {user ? (
                            <Box sx={{
                                display: "flex",
                                minHeight: "100vh",
                                background: "rgba(255, 255, 255, 0.9)"
                            }}>
                                <Menu />
                                <Content />
                            </Box>
                        ) : <Outlet />}
                    </MenuContext.Provider>
                </CategoryContext.Provider>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;