import React from 'react';

import {
    Typography, Dialog, DialogContent, DialogContentText, DialogTitle, Box, CircularProgress, Backdrop
} from '@mui/material';

const AxiosMiddleware = props => (
    <React.Fragment>
        {props.axiosRequest.error && (
            <Dialog open={props.axiosRequest.error != null} onClose={props.errorDialogCloseHandler}>
                <DialogTitle>Error occured during the request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box className="error-fragment-wrapper">
                            <Typography className="error-fragment-wrapper__type">Code</Typography>
                            <Typography>{props.axiosRequest.error.code}</Typography>
                        </Box>
                        <Box className="error-fragment-wrapper">
                            <Typography className="error-fragment-wrapper__type">Message</Typography>
                            <Typography>{props.axiosRequest.error.message}</Typography>
                        </Box>
                        <Box className="error-fragment-wrapper">
                            <Typography className="error-fragment-wrapper__type">Endpoint</Typography>
                            <Typography>{props.axiosRequest.error.config.url}</Typography>
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        )}
        <Backdrop className="backdrop" open={props.axiosRequest.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </React.Fragment>
);

export default AxiosMiddleware;