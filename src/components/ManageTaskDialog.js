import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";

import { changeHandlerFactory, validationHandlerFactory } from "../helpers/forms";
import moment from "moment-timezone";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import CategoryContext from "../contexts/categoryContext";
import { retrieveCategories, retrieveMenuCounters } from "../helpers/api-calls";
import MenuContext from "../contexts/menuContext";
import axios from "axios";

const ManageTaskDialog = props => {
    const [fields, setFields] = useState({
        name: { value: props.data.name ?? "", required: true },
        description: { value: props.data.description ?? "", required: false },
        deadline: { value: props.data.deadline ? moment(props.data.deadline) : null, required: true },
        category: { value: props.data.category?.id, required: false }
    });

    console.log(props.data);

    const categoryContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);

    const changeHandler = changeHandlerFactory(fields, setFields);
    const validationHandler = validationHandlerFactory(fields, setFields);

    const handleSubmit = () => {
        if (!validationHandler()) return;

        const request = {
            method: props.data.id ? "put" : "post",
            url: `${process.env.REACT_APP_API}/api/Tasks`,
            data: {
                name: fields.name.value,
                deadline: fields.deadline.value.utc(),
                categoryId: fields.category.value,
                description: fields.description.value
            }
        }

        if (props.data.id)
            request.url += `/${props.data.id}`;

        axios(request).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setPrimaryMenuCounters)
            props.closeHandler();
        });
    }

    return (
        <Dialog open={props.open} onClose={props.closeHandler} fullWidth maxWidth="sm">
            <DialogTitle>{props.data.id ? "Edit task" : "Add new task"}</DialogTitle>
            <DialogContent>
                <Box className="manage-category-dialog">
                    <Box className="input-container">
                        <TextField
                            value={fields.name.value}
                            onChange={event => changeHandler("name", event.target.value)}
                            color="success"
                            label="Name"
                            className="input-container__field"
                            error={fields.name.error}
                            helperText={fields.name.errorMessage}
                        />
                    </Box>
                    <Box className="input-container">
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DateTimePicker
                                className="input-container__field"
                                label="Deadline"
                                value={fields.deadline.value}
                                onChange={value => changeHandler("deadline", value)}
                                slotProps={{
                                    textField: {
                                        color: "success",
                                      error: fields.deadline.error,
                                      helperText: fields.deadline.errorMessage
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        <TextField
                            value={fields.category.value}
                            label="Category"
                            color="success"
                            select
                            className="input-container__field"
                            error={fields.category.error}
                            helperText={fields.category.errorMessage}
                            onChange={event => changeHandler("category", event.target.value)}
                        >
                            {categoryContext.categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
                        </TextField>
                    </Box>
                    <Box className="input-container">
                        <TextField
                            multiline
                            value={fields.description.value}
                            onChange={event => changeHandler("description", event.target.value)}
                            color="success"
                            label="Description"
                            className="input-container__field"
                            error={fields.description.error}
                            helperText={fields.description.errorMessage}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="success" onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ManageTaskDialog;