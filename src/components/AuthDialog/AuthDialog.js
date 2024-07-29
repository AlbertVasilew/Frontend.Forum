import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const AuthDialog = props => (
    <Dialog open={props.open} onClose={props.closeHandler} fullWidth maxWidth="sm">
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            <Box className="dialog-container">
                <Box className="input-container">
                    <TextField
                        value={props.fields.email.value}
                        onChange={event => props.changeHandler("email", event.target.value)}
                        color="success"
                        label="Email"
                        className="input-container__field"
                        error={props.fields.email.error}
                        helperText={props.fields.email.errorMessage}
                    />
                </Box>
                {props.action === props.authActions.registration && props.fields.username && (
                    <Box className="input-container">
                        <TextField
                            value={props.fields.username.value}
                            onChange={event => props.changeHandler("username", event.target.value)}
                            color="success"
                            label="Username"
                            className="input-container__field"
                            error={props.fields.username.error}
                            helperText={props.fields.username.errorMessage}
                        />
                    </Box>
                )}
                <Box className="input-container">
                    <TextField
                        type="password"
                        value={props.fields.password.value}
                        onChange={event => props.changeHandler("password", event.target.value)}
                        color="success"
                        label="Password"
                        className="input-container__field"
                        error={props.fields.password.error}
                        helperText={props.fields.password.errorMessage}
                    />
                </Box>
                {props.errors?.map(error => props.authErrorCodes.hasOwnProperty(error) &&
                    <Typography key={error}>{props.authErrorCodes[error]}</Typography>)}
            </Box>
        </DialogContent>
        <DialogActions>
            <Button color="success" onClick={props.submitHandler}>{props.submitText}</Button>
        </DialogActions>
    </Dialog>
)

export default AuthDialog;