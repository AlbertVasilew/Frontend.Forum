import { Box, ThemeProvider, createTheme } from "@mui/material";

import Content from "./components/Content";

import './styles/styles.css';
import Menu from "./components/Drawer";
import theme from "./styles/theme";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryContext from "./contexts/categoryContext";

const App = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {    
        axios.get(`${process.env.REACT_APP_API}/api/Categories`)
          .then(response => setCategories(response.data));
      }, []);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <CategoryContext.Provider value={{categories}}>
                <Box sx={{display: "flex"}}>
                    <Menu />
                    <Content />
                </Box>
            </CategoryContext.Provider>
        </ThemeProvider>
    );
}

export default App;