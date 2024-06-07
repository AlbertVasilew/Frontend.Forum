import { Navigate } from "react-router-dom";

import App from "../App";
import CategoryTasks from "./CategoryTasks";
import MenuTasks from "./MenuTasks";
import Home from "./Home";
import ProtectedRoute from "../components/ProtectedRoute";

const routerConfig = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home />},
            { path: "upcoming", element: <ProtectedRoute component={<MenuTasks title="Upcoming" endpoint="upcoming" /> } />},
            { path: "today", element: <ProtectedRoute component={<MenuTasks title="Today" endpoint="upcoming?onlyToday=true" />} /> },
            { path: "overdue", element: <ProtectedRoute component={<MenuTasks title="Overdue" endpoint="overdue" />} />},
            { path: "completed", element: <ProtectedRoute component={<MenuTasks title="Completed" endpoint="completed" />} /> },
            { path: "category/:categoryId", element: <ProtectedRoute component={<CategoryTasks />} /> }
        ]
    }
];

export default routerConfig;