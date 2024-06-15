import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

const ManageTaskDialog = props => (
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
                </Box>
                <Box className="input-container">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            label="Deadline"
                            value={props.fields.deadline.value}
                            onChange={value => props.changeHandler("deadline", value)}
                            slotProps={{
                                textField: {
                                    color: "success",
                                    className: "input-container__field",
                                    error: props.fields.deadline.error,
                                    helperText: props.fields.deadline.errorMessage
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Category"
                        color="success"
                        className="input-container__field"
                        value={props.fields.category.value}
                        onChange={event => props.changeHandler("category", event.target.value)}
                        error={props.fields.category.error}
                        helperText={props.fields.category.errorMessage}
                        select
                    >
                        {props.categories.map(category =>
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                    </TextField>
                </Box>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button color="success" onClick={props.submitHandler}>Save</Button>
        </DialogActions>
    </Dialog>
)

export default ManageTaskDialog;