import { Box } from "@mui/material";
import App from "../App";
import Category from "./Category";
import MenuCategory from "./MenuCategory";

const routerConfig = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Box></Box>},
            { path: "upcoming", element: <MenuCategory title="Upcoming" endpoint="upcoming" /> },
            { path: "today", element: <MenuCategory title="Today" endpoint="upcoming?onlyToday=true" /> },
            { path: "overdue", element: <MenuCategory title="Overdue" endpoint="overdue" /> },
            { path: "completed", element: <MenuCategory title="Completed" endpoint="completed" /> },
            { path: "category/:categoryId", element: <Category /> }
        ]
    }
];

export default routerConfig;