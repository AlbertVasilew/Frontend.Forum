import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import axios from "axios"

const CompleteTaskDialig = props => {
    const completeHandler = () =>
        axios.put(`${process.env.REACT_APP_API}/api/Tasks/complete/${props.task.id}`).then(() => props.closeHandler());

    return (
        <Dialog open={props.task} onClose={props.closeHandler}>
            <DialogTitle>{props.task.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>Do you really want to complete the task?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="success" onClick={completeHandler}>Complete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CompleteTaskDialig;