import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const Content = () => (
    <Box className="content">
        <Toolbar />
        <Outlet />
    </Box>
)

export default Content;