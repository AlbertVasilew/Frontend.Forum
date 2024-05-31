import { Box, Button, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from "react";
import axios from "axios";

import Tasks from "../components/Tasks";

const Upcoming = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/Tasks/upcoming`)
            .then(response => setTasks(response.data));
    }, [])
    

    return (
        <Box>
            <Tasks title="Upcoming" tasks={tasks} />
        </Box>
    )
}

export default Upcoming;