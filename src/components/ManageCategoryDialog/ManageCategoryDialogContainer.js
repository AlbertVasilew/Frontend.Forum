import { useContext, useState } from 'react';
import axios from 'axios';

import CategoryContext from '../../contexts/CategoryContext';
import ManageCategoryDialog from './ManageCategoryDialog';

import { changeHandlerFactory, validationHandlerFactory } from '../../helpers/forms';
import { retrieveCategories } from '../../helpers/api-calls';

const ManageCategoryDialogContainer = props => {
    const [fields, setFields] = useState({
        color: { value: props.category.color ?? "", required: true },
        name: { value: props.category.name ?? "", required: true }
    });

    const categoryContext = useContext(CategoryContext);

    const changeHandler = changeHandlerFactory(fields, setFields);
    const validationHandler = validationHandlerFactory(fields, setFields);

    const categoryId = props.category.id;

    const submitHandler = () => {
        if (!validationHandler())
            return;

        const method = categoryId ? "put" : "post";
        const url = `${process.env.REACT_APP_API}/api/Categories${categoryId ? `/${categoryId}` : ""}`;
        const data = { name: fields.name.value, color: fields.color.value };

        axios({ method, url, data }).then(() => {
            retrieveCategories(categoryContext.setCategories);
            props.closeHandler();
        });
    }

    return (
        <ManageCategoryDialog
            open={props.open}
            closeHandler={props.closeHandler}
            title={categoryId ? "Edit category" : "Add new category"}
            category={props.category}
            fields={fields}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
        />
    )
}

export default ManageCategoryDialogContainer;