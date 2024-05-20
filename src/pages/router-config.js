import App from "../App";
import Topics from "./Topics";

const routerConfig = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Topics />}
        ]
    }
];

export default routerConfig;