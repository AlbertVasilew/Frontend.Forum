import { Box } from "@mui/material";
import App from "../App";
import Category from "./Category";
import Upcoming from "./Upcoming";

const routerConfig = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Box></Box>},
            { path: "upcoming", element: <Upcoming /> },
            { path: "category/:categoryId", element: <Category /> }
        ]
    }
];

export default routerConfig;