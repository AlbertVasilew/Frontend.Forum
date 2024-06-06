import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";

import { HexColorPicker } from "react-colorful";
import { changeHandlerFactory, validationHandlerFactory } from "../helpers/forms";
import axios from "axios";
import { retrieveCategories } from "../helpers/api-calls";
import CategoryContext from "../contexts/categoryContext";

const ManageCategoryDialog = props => {
    const [fields, setFields] = useState({
        color: { value: props.data.color ?? "", required: true },
        name: { value: props.data.name ?? "", required: true }
    });

    const categoryContext = useContext(CategoryContext);

    const changeHandler = changeHandlerFactory(fields, setFields);
    const validationHandler = validationHandlerFactory(fields, setFields);

    const handleSubmit = () => {
        if (!validationHandler()) return;

        const request = {
            method: props.data.id ? "put" : "post",
            url: `${process.env.REACT_APP_API}/api/Categories`,
            data: { name: fields.name.value, color: fields.color.value }
        }

        if (props.data.id)
            request.url += `/${props.data.id}`;

        axios(request).then(() => {
            retrieveCategories(categoryContext.setCategories);
            props.closeHandler();
        });
    }

    return (
        <Dialog open={props.open} onClose={props.closeHandler} fullWidth maxWidth="sm">
            <DialogTitle>{props.data.id ? "Edit category" : "Add new category"}</DialogTitle>
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
                        <TextField
                            disabled
                            value={fields.color.value}
                            color="success"
                            label="Color"
                            className="input-container__field"
                            error={fields.color.error}
                            helperText={fields.color.errorMessage}
                        />
                    </Box>
                    <HexColorPicker  value={fields.color.value} onChange={color => changeHandler("color", color)} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="success" onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ManageCategoryDialog;