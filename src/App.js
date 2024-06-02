import { Box, ThemeProvider, createTheme } from "@mui/material";

import Content from "./components/Content";

import './styles/styles.css';
import Menu from "./components/Drawer";
import theme from "./styles/theme";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryContext from "./contexts/categoryContext";
import MenuContext from "./contexts/menuContext";
import { retrieveCategories, retrieveMenuCounters } from "./helpers/api-calls";

const App = () => {
    const [categories, setCategories] = useState([]);
    const [primaryMenuCounters, setPrimaryMenuCounters] = useState([]);

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