import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import AuthDialog from '../components/AuthDialog';
import { authActions } from '../helpers/auth';

const Home = () => {
    const [authAction, setAuthAction] = useState();
    
    return (
        <React.Fragment>
           <Box className="home">
                <Box className="home__welcome-box">
                    <Typography className="home__welcome-title">Workease</Typography>
                    <Typography className="home__welcome-text">
                        Designed to give you a straightforward and stress-free way to manage tasks and achieve goals.
                    </Typography>
                    <Box className="home__action-buttons">
                        <Button
                            variant="contained"
                            className="home__registration-button"
                            onClick={() => setAuthAction(authActions.registration)}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="text"
                            className="home__login-button"
                            onClick={() => setAuthAction(authActions.login)}
                        >
                            Already have an account
                        </Button>
                    </Box>
                </Box>
            </Box>
            {authAction && (
                <AuthDialog
                    open={authAction != null}
                    closeHandler={() => setAuthAction()}
                    action={authAction}
                    setAuthAction={setAuthAction}
                />
            )}
        </React.Fragment>
    )
}

export default Home;