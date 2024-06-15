import React, { useEffect, useState } from 'react';

import moment from 'moment-timezone';
import axios from 'axios';

import AxiosMiddleware from './AxiosMiddleware';

const AxiosMiddlewareContainer = props => {
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
                    else if (typeof props.unauthorizedHandler === 'function' && error.response.status === 401) {
                        props.unauthorizedHandler();
                        stateError = null;
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
        <AxiosMiddleware
            axiosRequest={axiosRequest}
            errorDialogCloseHandler={() => setAxiosRequest({...axiosRequest, error: null})}
        />
    )
}

export default AxiosMiddlewareContainer;