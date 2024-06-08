import { Box, Button, Typography } from "@mui/material";
import background from '../assets/wallpaper.jpg';

const Home = () => (
    <Box sx={{height: "100vh", backgroundImage: `url(${background})`}}>
        <Box sx={{background: "rgba(255, 255, 255, 0.9)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{ width: "30%"}}>
                <Typography sx={{fontWeight: "bold", fontSize: "50px"}}>Task Organizer</Typography>
                <Typography sx={{margin: "30px 0px"}}>
                    With only the features you need, Task Organizer is customized for 
                    individuals seeking a stress-free way to stay focused on their goals and tasks.
                </Typography>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Button variant="contained" sx={{background: "#FFD43B", width: "100%"}}>Get Started</Button>
                    <Button sx={{color: "black", marginTop: "10px"}} type="text">Already have an account? Sign in</Button>
                </Box>
            </Box>
        </Box>
    </Box>
)

export default Home;