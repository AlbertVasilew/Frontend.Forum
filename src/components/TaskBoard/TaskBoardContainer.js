import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import CategoryContext from '../../contexts/CategoryContext';
import MenuContext from '../../contexts/MenuContext';

import TaskBoard from './TaskBoard';
import { retrieveCategories, retrieveMenuCounters } from '../../helpers/api-calls';
import menuItems from '../Menu/helpers/menu-items';

const TaskBoardContainer = props => {
    const [completeTaskDialog, setCompleteTaskDialog] = useState();
    const [deleteTaskDialog, setDeleteTaskDialog] = useState();
    const [manageTaskDialog, setManageTaskDialog] = useState();
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState();
    const [manageCategoryDialog, setManageCategoryDialog] = useState();

    const categoryContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);

    const navigate = useNavigate();

    const deleteTaskHandler = () => {
        axios.delete(`${process.env.REACT_APP_API}/api/Tasks/${deleteTaskDialog.id}`).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setCounters);
            setDeleteTaskDialog();
        });
    }

    const completeTaskHandler = () => {
        axios.put(`${process.env.REACT_APP_API}/api/Tasks/complete/${completeTaskDialog.id}`).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setCounters);
            setCompleteTaskDialog();
        });
    }

    const deleteCategoryHandler = () => {
        axios.delete(`${process.env.REACT_APP_API}/api/Categories/${props.category.id}`).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setCounters);
            navigate(`/${menuItems[0].path}`, { replace: true });
        });
    }

    return (
        <TaskBoard
            title={props.title}
            tasks={props.tasks}
            category={props.category}
            deleteTaskHandler={deleteTaskHandler}
            completeTaskHandler={completeTaskHandler}
            manageTaskDialog={manageTaskDialog}
            setManageTaskDialog={setManageTaskDialog}
            completeTaskDialog={completeTaskDialog}
            setCompleteTaskDialog={setCompleteTaskDialog}
            deleteTaskDialog={deleteTaskDialog}
            setDeleteTaskDialog={setDeleteTaskDialog}
            deleteCategoryHandler={deleteCategoryHandler}
            manageCategoryDialog={manageCategoryDialog}
            setManageCategoryDialog={setManageCategoryDialog}
            deleteCategoryDialog={deleteCategoryDialog}
            setDeleteCategoryDialog={setDeleteCategoryDialog}
        />
    )
}

export default TaskBoardContainer;