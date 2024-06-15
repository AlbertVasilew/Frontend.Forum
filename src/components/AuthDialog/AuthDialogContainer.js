import { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import AuthContext from '../../contexts/AuthContext';
import AuthDialog from './AuthDialog';

import { changeHandlerFactory, validationHandlerFactory } from '../../helpers/forms';
import { authErrorCodes } from '../../helpers/auth';
import { authActions } from '../../helpers/auth';

const AuthDialogContainer = props => {
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

        if (props.action === authActions.registration) {
            setFields(prevFields => {
                const fields = structuredClone(prevFields);

                fields.email.validation = {
                    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter valid email"
                };

                fields.password.validation = {
                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
                    message: "Must contain at least 8 chars with: special, number, upper and lower"
                };

                return { ...fields, username: { value: "", required: true } }
            });
        }
    }, [props.action]);

    const changeHandler = changeHandlerFactory(fields, setFields);
    const validationHandler = validationHandlerFactory(fields, setFields);

    const submitHandler = () => {
        if (!validationHandler())
            return;

        if (props.action === authActions.registration) {
            axios.post(`${process.env.REACT_APP_API}/api/Identity/register`,
                {email: fields.email.value, username: fields.username.value, password: fields.password.value},
                {headers: {'Disable-Axios-Auto-Error-Handling': '400'}}
            )
            .then(() => props.setAuthAction("login"))
            .catch(error => error.response?.status === 400 && setErrors(error.response.data));

        } else {
            axios.post(`${process.env.REACT_APP_API}/api/Identity/login`,
                {email: fields.email.value, password: fields.password.value},
                {headers: {'Disable-Axios-Auto-Error-Handling': '401'}}
            )
            .then(response => {
                const jwtData = jwtDecode(response.data.token);

                const user = {
                    username: jwtData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    token: response.data.token
                };

                localStorage.setItem("user", JSON.stringify(user));
                authContext.setUser(user);

                props.closeHandler();
            })
            .catch(error => error.response?.status === 401 && setErrors(["WrongCredentials"]));
        }
    }

    return (
        <AuthDialog
            open={props.open}
            closeHandler={props.closeHandler}
            title={props.action === authActions.login ? "Sign in to your account" : "Create new account"}
            errors={errors}
            fields={fields}
            action={props.action}
            authActions={authActions}
            authErrorCodes={authErrorCodes}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            submitText={props.action === authActions.login ? "Sign in" : "Create account"}
        />
    )
}

export default AuthDialogContainer;