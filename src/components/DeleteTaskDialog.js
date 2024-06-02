import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import axios from "axios"
import { retrieveCategories, retrieveMenuCounters } from "../helpers/api-calls";
import { useContext } from "react";
import CategoryContext from "../contexts/categoryContext";
import MenuContext from "../contexts/menuContext";

const DeleteTaskDialog = props => {
    const categoriesContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);

    const deleteHandler = () =>
        axios.delete(`${process.env.REACT_APP_API}/api/Tasks/${props.task.id}`).then(() => {
            retrieveCategories(categoriesContext.setCategories);
            retrieveMenuCounters(menuContext.setPrimaryMenuCounters);
            props.closeHandler();
        });

    return (
        <Dialog open={props.task} onClose={props.closeHandler}>
            <DialogTitle>{props.task.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>Do you really want to delete the task?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={deleteHandler}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteTaskDialog;