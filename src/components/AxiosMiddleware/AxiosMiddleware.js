import React, { useEffect, useState } from 'react';

import {
    Typography, Dialog, DialogContent, DialogContentText, DialogTitle, Box, CircularProgress, Backdrop
} from '@mui/material';

import moment from "moment-timezone";
import axios from 'axios';

import './AxiosMiddleware.css';

const AxiosMiddleware = props => {
    const [axiosRequest, setAxiosRequest] = useState({error: false, loading: false});

    useEffect(() => {
        axios.interceptors.response.use(
            response => {
                setAxiosRequest({...axiosRequest, loading: false});
                return response
            },
            error => {
                let stateError = error;

                if (error.response) {
                    if (error.config.headers['Disable-Axios-Auto-Error-Handling'] === error.response.status.toString()) {
                        stateError = null;
                    }
                    else {
                        if (typeof props.unauthorizedHandler === 'function' && error.response.status === 401) {
                            props.unauthorizedHandler();
                            stateError = null;
                        }
                    }
                }

                setAxiosRequest({loading: false, error: stateError });
                return Promise.reject(error);
            });
    
        axios.interceptors.request.use(config => {
            setAxiosRequest({...axiosRequest, loading: true});

            if (props.authHeader?.token)
                config.headers.Authorization = `${props.authHeader.type} ${props.authHeader.token}`;

            config.headers["User-Timezone"] = moment.tz.guess();

            return config
        });
    }, [props.authHeader]);

    return (
        <React.Fragment>
            {axiosRequest.error && (
                <Dialog open={axiosRequest.error} onClose={() => setAxiosRequest({...axiosRequest, error: null})}>
                    <DialogTitle className="ErrorDialogTitle">Възникна проблем със заявка към сървъра</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Box className="ErrorFragmentWrapper">
                                <Typography className="ErrorFragmentWrapper__type">Код</Typography>
                                <Typography>{axiosRequest.error.code}</Typography>
                            </Box>
                            <Box className="ErrorFragmentWrapper">
                                <Typography className="ErrorFragmentWrapper__type">Съобщение</Typography>
                                <Typography>{axiosRequest.error.message}</Typography>
                            </Box>
                            <Box className="ErrorFragmentWrapper">
                                <Typography className="ErrorFragmentWrapper__type">Ендпойнт</Typography>
                                <Typography>{axiosRequest.error.config.url}</Typography>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            )}
            <Backdrop className="Backdrop" open={axiosRequest.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>
    )
}

export default AxiosMiddleware;