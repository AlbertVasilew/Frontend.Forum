import { Box, Button, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DoneIcon from '@mui/icons-material/Done';

const Topics = () => {

    return (
        <Box>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Typography sx={{fontWeight: "bold", fontSize: "40px"}}>
                    <Box component="span">Personal</Box>
                    <Box component="span" sx={{marginLeft: "20px", border: "1px solid #eee", padding: "0px 10px", borderRadius: "5px"}}>1</Box>
                </Typography>
                <Button variant="contained">Add New Task</Button>
            </Box>

            <Box>
                <Box sx={{background: "#f4f4f4", padding: "10px", border: "1px solid #F4F4F4", borderRadius: "5px", margin: "10px 0px"}}>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography sx={{fontWeight: "bold", marginBottom: "10px"}}>Buy products for Banica</Typography>
                        <Typography>Completed on 28-07-2024</Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignContent: "center"}}>
                        <Typography sx={{marginRight: "20px", color: "#888", display: "flex", alignItems: "center", lineHeight: "inherit"}}>
                            <CalendarMonthIcon />
                            <Box sx={{marginLeft: "5px"}}>25-07-24</Box>
                        </Typography>
                        <Typography sx={{marginRight: "20px", color: "#888", display: "flex", alignItems: "center", lineHeight: "inherit"}}>
                            <Box sx={{width: "15px", height: "15px", background: "blue", borderRadius: "5px"}}></Box>
                            <Box sx={{marginLeft: "5px"}}>Personal</Box>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{background: "#f4f4f4", padding: "10px", border: "1px solid #F4F4F4", borderRadius: "5px", margin: "10px 0px"}}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography sx={{fontWeight: "bold", marginBottom: "10px"}}>Wash car</Typography>
                        <Button variant="contained">Complete</Button>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignContent: "center"}}>
                        <Typography sx={{marginRight: "20px", color: "#888", display: "flex", alignItems: "center", lineHeight: "inherit"}}>
                            <CalendarMonthIcon />
                            <Box sx={{marginLeft: "5px"}}>25-07-24</Box>
                        </Typography>
                        <Typography sx={{marginRight: "20px", color: "#888", display: "flex", alignItems: "center", lineHeight: "inherit"}}>
                            <Box sx={{width: "15px", height: "15px", background: "blue", borderRadius: "5px"}}></Box>
                            <Box sx={{marginLeft: "5px"}}>Personal</Box>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Topics;