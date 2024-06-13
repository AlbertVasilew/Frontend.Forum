import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { changeHandlerFactory, validationHandlerFactory } from "../helpers/forms";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from '../contexts/authContext';
import { jwtDecode } from "jwt-decode";
import { authErrorCodes } from "../helpers/auth";

const AuthDialog = props => {
    const fieldsInitial = {
        email: { value: "", required: true },
        password: { value: "", required: true }
    };

    const [fields, setFields] = useState({...fieldsInitial});
    const [errors, setErrors] = useState();

    const authContext = useContext(AuthContext);

    useEffect(() => {
        setErrors();
        setFields({...fieldsInitial});

        if (props.action === "registration") {
            setFields(prevFields => {
                const fields = structuredClone(prevFields);

                fields.email.validation = { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter valid email" };
                fields.password.validation = { regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/, message: "Must contain at least 8 chars with: special, number, upper and lower" };

                return { ...fields, username: { value: "", required: true } }
            });
        }
    }, [props.action]);


    const changeHandler = changeHandlerFactory(fields, setFields);
    const validationHandler = validationHandlerFactory(fields, setFields);

    const handleSubmit = () => {
        if (!validationHandler()) return;

        if (props.action === "registration") {
            axios.post(
                `${process.env.REACT_APP_API}/api/Identity/register`,
                {
                    email: fields.email.value,
                    username: fields.username.value,
                    password: fields.password.value
                },
                {headers: {'Disable-Axios-Auto-Error-Handling': '400'}}
            ).then(() => {
                props.setAuthAction("login");
            }).catch(error => error.response?.status === 400 && setErrors(error.response.data));
        } else {
            axios.post(
                `${process.env.REACT_APP_API}/api/Identity/login`,
                {email: fields.email.value, password: fields.password.value},
                {headers: {'Disable-Axios-Auto-Error-Handling': '401'}}
            ).then(response => {
                const jwtData = jwtDecode(response.data.token);

                const user = {
                    id: jwtData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                    username: jwtData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    token: response.data.token
                };

                localStorage.setItem("user", JSON.stringify(user));
                authContext.setUser(user);
                props.closeHandler();
            }).catch(error => error.response?.status === 401 && setErrors(["WrongCredentials"]));
        }
    }

    return (
        <Dialog open={props.action != null} onClose={props.closeHandler} fullWidth maxWidth="sm">
            <DialogTitle>{props.action === "login" ? "Sign in to your account" : "Create new account"}</DialogTitle>
            <DialogContent>
                <Box className="dialog-container">
                    <Box className="input-container">
                        <TextField
                            value={fields.email.value}
                            onChange={event => changeHandler("email", event.target.value)}
                            color="success"
                            label="Email"
                            className="input-container__field"
                            error={fields.email.error}
                            helperText={fields.email.errorMessage}
                        />
                    </Box>
                    {props.action === "registration" && fields.username && (
                        <Box className="input-container">
                            <TextField
                                value={fields.username.value}
                                onChange={event => changeHandler("username", event.target.value)}
                                color="success"
                                label="Username"
                                className="input-container__field"
                                error={fields.username.error}
                                helperText={fields.username.errorMessage}
                            />
                        </Box>
                    )}
                    <Box className="input-container">
                        <TextField
                            type="password"
                            value={fields.password.value}
                            onChange={event => changeHandler("password", event.target.value)}
                            color="success"
                            label="Password"
                            className="input-container__field"
                            error={fields.password.error}
                            helperText={fields.password.errorMessage}
                        />
                    </Box>
                    {errors?.map(error => authErrorCodes.hasOwnProperty(error) &&
                        <Typography key={error}>{authErrorCodes[error]}</Typography>)}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="success" onClick={handleSubmit}>{props.action === "login" ? "Sign in" : "Create account"}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AuthDialog;