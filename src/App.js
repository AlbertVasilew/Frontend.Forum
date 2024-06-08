import { useEffect, useState } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";

import moment from "moment-timezone";
import axios from "axios";

import CategoryContext from "./contexts/categoryContext";
import MenuContext from "./contexts/menuContext";

import Content from "./components/Content";
import Menu from "./components/Drawer";

import { retrieveCategories, retrieveMenuCounters } from "./helpers/api-calls";

import theme from "./styles/theme";
import './styles/styles.css';
import { Outlet } from "react-router-dom";
import AuthContext from "./contexts/authContext";

const App = () => {
    const [user, setUser] = useState(true);

    const [categories, setCategories] = useState([]);
    const [primaryMenuCounters, setPrimaryMenuCounters] = useState([]);;

    axios.defaults.headers["User-Timezone"] = moment.tz.guess();

    useEffect(() => {
        if (user) {
            retrieveCategories(setCategories);
            retrieveMenuCounters(setPrimaryMenuCounters);
        }
    }, []);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <AuthContext.Provider value={{user, setUser}}>
                <CategoryContext.Provider value={{categories, setCategories}}>
                    <MenuContext.Provider value={{primaryMenuCounters, setPrimaryMenuCounters}}>
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