import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ActionDialog = props => (
    <Dialog open={props.open} onClose={props.closeHandler}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="success" onClick={props.actionHandler}>{props.actionText}</Button>
        </DialogActions>
    </Dialog>
)

export default ActionDialog;