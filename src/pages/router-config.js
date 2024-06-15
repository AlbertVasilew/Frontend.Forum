import App from '../App';
import CategoryTasks from './CategoryTasks';
import MenuTasks from './MenuTasks';
import ProtectedRoute from '../components/ProtectedRoute';
import HomeRouteMediator from '../components/HomeRouteMediator';

const routerConfig = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomeRouteMediator />
            },
            {
                path: "upcoming",
                element: <ProtectedRoute component={<MenuTasks title="Upcoming" endpoint="upcoming" /> } />
            },
            {
                path: "today",
                element: <ProtectedRoute component={<MenuTasks title="Today" endpoint="upcoming?onlyToday=true" />} />
            },
            {
                path: "overdue",
                element: <ProtectedRoute component={<MenuTasks title="Overdue" endpoint="overdue" />} />
            },
            {
                path: "completed",
                element: <ProtectedRoute component={<MenuTasks title="Completed" endpoint="completed" />} /> 
            },
            {
                path: "category/:categoryId",
                element: <ProtectedRoute component={<CategoryTasks />} />
            }
        ]
    }
];

export default routerConfig;