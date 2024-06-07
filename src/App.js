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

const App = () => {
    const [categories, setCategories] = useState([]);
    const [primaryMenuCounters, setPrimaryMenuCounters] = useState([]);

    axios.defaults.headers["User-Timezone"] = moment.tz.guess();

    useEffect(() => {    
        retrieveCategories(setCategories);
        retrieveMenuCounters(setPrimaryMenuCounters);
    }, []);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <CategoryContext.Provider value={{categories, setCategories}}>
                <MenuContext.Provider value={{primaryMenuCounters, setPrimaryMenuCounters}}>
                    <Box sx={{display: "flex"}}>
                        <Menu />
                        <Content />
                    </Box>
                </MenuContext.Provider>
            </CategoryContext.Provider>
        </ThemeProvider>
    );
}

export default App;