import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CategoryContext from "../contexts/categoryContext";
import Tasks from "../components/Tasks";

const Category = () => {
    const { categoryId } = useParams();
    const [tasks, setTasks] = useState();

    const categoryContext = useContext(CategoryContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/Tasks/category/${categoryId}`)
            .then(response => setTasks(response.data));
    }, [categoryId])

    const category = categoryContext.categories?.find(x => x.id == categoryId);

    return <Tasks title={category.name} tasks={tasks} />
}

export default Category;