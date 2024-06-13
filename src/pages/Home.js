import { Box, Button, Typography } from "@mui/material";
import background from '../assets/wallpaper.jpg';
import React, { useState } from "react";
import AuthDialog from "../components/AuthDialog";

const Home = () => {
    const [authAction, setAuthAction] = useState();



    return (
        <React.Fragment>
            <Box sx={{height: "100vh", backgroundImage: `url(${background})`}}>
                <Box sx={{background: "rgba(255, 255, 255, 0.9)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Box sx={{ width: "30%", background: "#F4F4F4", padding: "25px 50px", borderRadius: "10px" }}>
                        <Typography sx={{fontWeight: "bold", fontSize: "50px"}}>Workease</Typography>
                        <Typography sx={{marginBottom: "30px", marginTop: "15px"}}>
                            Designed to give you a straightforward and stress-free way to manage tasks and achieve goals.
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Button onClick={() => setAuthAction("registration")} variant="contained" sx={{background: "#FFD43B", width: "100%"}}>Get Started</Button>
                            <Button onClick={() => setAuthAction("login")} sx={{color: "black", marginTop: "10px"}} type="text">Already have an account</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {authAction && <AuthDialog action={authAction} setAuthAction={setAuthAction} closeHandler={() => setAuthAction()} />}
        </React.Fragment>
    )
}

export default Home;