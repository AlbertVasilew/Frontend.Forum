import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import Header from "./components/Header";
import Content from "./components/Content";

import theme from "./themes/default-theme";

import './App.css';

const App = () => (
    <ThemeProvider theme={createTheme(theme)}>
        <Header />
        <Content />
    </ThemeProvider>
)

export default App;