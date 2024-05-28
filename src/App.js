import { Box, ThemeProvider, createTheme } from "@mui/material";

import Content from "./components/Content";

import './App.css';
import Menu from "./components/Drawer";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#ffffff',
        },
        secondary: {
          main: '#f50057',
        }
      }
})

const App = () => (
    <ThemeProvider theme={theme}>
        <Box sx={{display: "flex"}}>
            <Menu />
            <Content />
        </Box>
    </ThemeProvider>
)

export default App;