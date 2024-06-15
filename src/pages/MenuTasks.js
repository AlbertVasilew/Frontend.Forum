import { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import CategoryContext from '../contexts/CategoryContext';
import MenuContext from '../contexts/MenuContext';

import TaskBoard from '../components/TaskBoard';

const MenuTasks = props => {
    const [tasks, setTasks] = useState();

    const categoryContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/Tasks/${props.endpoint}`)
            .then(response => setTasks(response.data));
    }, [categoryContext.categories, menuContext.counters, props.endpoint]);
    
    return <TaskBoard title={props.title} tasks={tasks} />
}

export default MenuTasks;