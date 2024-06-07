import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Content = () => (
    <Box className="content">
        <Outlet />
    </Box>
)

export default Content;