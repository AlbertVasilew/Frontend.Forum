import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";

import Header from "./components/Header";
import Content from "./components/Content";

import theme from "./themes/default-theme";

import './App.css';
import Menu from "./components/Drawer";

const App = () => (
    <ThemeProvider theme={createTheme(theme)}>
        <Box sx={{display: "flex"}}>
            <Header />
            <Menu />
            <Content />
        </Box>

    </ThemeProvider>
)

export default App;