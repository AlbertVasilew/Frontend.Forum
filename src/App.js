import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import Header from "./components/Header";
import theme from "./themes/default-theme";

import './App.css';

const App = () => (
    <ThemeProvider theme={createTheme(theme)}>
        <Header />
    </ThemeProvider>
)

export default App;