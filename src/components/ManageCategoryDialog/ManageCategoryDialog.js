import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { HexColorPicker } from 'react-colorful';

const ManageCategoryDialog = props => (
    <Dialog open={props.open} onClose={props.closeHandler} fullWidth maxWidth="sm">
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            <Box className="dialog-container">
                <Box className="input-container">
                    <TextField
                        label="Name"
                        color="success"
                        className="input-container__field"
                        value={props.fields.name.value}
                        onChange={event => props.changeHandler("name", event.target.value)}
                        error={props.fields.name.error}
                        helperText={props.fields.name.errorMessage}
                    />
                    <TextField
                        label="Color"
                        color="success"
                        className="input-container__field"
                        value={props.fields.color.value}
                        error={props.fields.color.error}
                        helperText={props.fields.color.errorMessage}
                        disabled
                    />
                </Box>
                <HexColorPicker
                    value={props.fields.color.value}
                    onChange={color => props.changeHandler("color", color)}
                />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button color="success" onClick={props.submitHandler}>Save</Button>
        </DialogActions>
    </Dialog>
)

export default ManageCategoryDialog;