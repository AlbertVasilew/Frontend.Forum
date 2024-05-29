import { Box, ThemeProvider, createTheme } from "@mui/material";

import Content from "./components/Content";

import './styles/styles.css';
import Menu from "./components/Drawer";
import theme from "./styles/theme";

const App = () => (
    <ThemeProvider theme={createTheme(theme)}>
        <Box sx={{display: "flex"}}>
            <Menu />
            <Content />
        </Box>
    </ThemeProvider>
)

export default App;