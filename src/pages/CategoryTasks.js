import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import CategoryContext from '../contexts/CategoryContext';
import TaskBoard from '../components/TaskBoard';

const CategoryTasks = () => {
    const { categoryId } = useParams();
    const [tasks, setTasks] = useState();

    const categoryContext = useContext(CategoryContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/Tasks/category/${categoryId}`)
            .then(response => setTasks(response.data));
    }, [categoryId])

    const category = categoryContext.categories?.find(x => x.id === parseInt(categoryId));
    return category && <TaskBoard title={category.name} tasks={tasks} category={category} />
}

export default CategoryTasks;