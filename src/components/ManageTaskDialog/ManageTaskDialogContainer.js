import { useContext, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

import ManageTaskDialog from './ManageTaskDialog';

import CategoryContext from '../../contexts/CategoryContext';
import MenuContext from '../../contexts/MenuContext';

import { changeHandlerFactory, validationHandlerFactory } from '../../helpers/forms';
import { retrieveCategories, retrieveMenuCounters } from '../../helpers/api-calls';

const ManageTaskDialogContainer = props => {
    const [fields, setFields] = useState({
        name: { value: props.task.name ?? "", required: true },
        deadline: { value: props.task.deadline ? moment(props.task.deadline) : null, required: true },
        category: { value: props.task.category?.id, required: false }
    });

    const categoryContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);

    const changeHandler = changeHandlerFactory(fields, setFields);
    const validationHandler = validationHandlerFactory(fields, setFields);

    const taskId = props.task?.id;

    const submitHandler = () => {
        if (!validationHandler())
            return;

        const method = taskId ? "put" : "post";
        const url = `${process.env.REACT_APP_API}/api/Tasks${taskId ? `/${taskId}` : ""}`;

        const data = {
            name: fields.name.value,
            deadline: fields.deadline.value.utc(),
            categoryId: fields.category.value
        };

        axios({ method, url, data }).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setCounters)
            props.closeHandler();
        });
    }

    return (
        <ManageTaskDialog
            open={props.open}
            closeHandler={props.closeHandler}
            title={taskId ? "Edit task" : "Add new task"}
            task={props.task}
            fields={fields}
            categories={categoryContext.categories}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
        />
    )
}

export default ManageTaskDialogContainer;