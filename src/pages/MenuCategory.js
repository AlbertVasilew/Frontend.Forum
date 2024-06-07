import { useContext, useEffect, useState } from "react";

import moment from "moment";
import axios from "axios";

import CategoryContext from "../contexts/categoryContext";
import MenuContext from "../contexts/menuContext";

import Tasks from "../components/Tasks";

const MenuCategory = props => {
    const [tasks, setTasks] = useState();

    const categoryContext = useContext(CategoryContext);
    const primaryMenuContext = useContext(MenuContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/Tasks/${props.endpoint}`, { headers: { "User-Timezone": moment.tz.guess() } })
            .then(response => setTasks(response.data));
    }, [categoryContext.categories, primaryMenuContext.primaryMenuCounters, props.endpoint]);
    
    return <Tasks title={props.title} tasks={tasks} />
}

export default MenuCategory;