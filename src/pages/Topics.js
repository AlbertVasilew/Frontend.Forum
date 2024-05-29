import { Box, Button, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Topics = () => {

    return (
        <Box>
            <Box className="tasks-page-header">
                <Typography className="tasks-page-header-title">
                    <Box component="span">Personal</Box>
                    <Box component="span" className="tasks-page-header-title__count">1</Box>
                </Typography>
                <Button variant="contained">Add New Task</Button>
            </Box>

            <Box>
                <Box className="task-container">
                    <Box className="task-header">
                        <Typography className="task-header__title">Buy products for Banica</Typography>
                        <Typography>Completed on 28-07-2024</Typography>
                    </Box>
                    <Box className="task-body">
                        <Typography className="task-body-item">
                            <CalendarMonthIcon />
                            <Box className="task-body-item__text">25-07-24</Box>
                        </Typography>
                        <Typography className="task-body-item">
                            <Box className="task-category-color-box" sx={{background: "blue"}}></Box>
                            <Box className="task-body-item__text">Personal</Box>
                        </Typography>
                    </Box>
                </Box>
                <Box className="task-container">
                    <Box className="task-header">
                        <Typography className="task-header__title">Wash car</Typography>
                        <Button variant="contained">Complete</Button>
                    </Box>
                    <Box className="task-body">
                        <Typography className="task-body-item">
                            <CalendarMonthIcon />
                            <Box className="task-body-item__text">25-07-24</Box>
                        </Typography>
                        <Typography className="task-body-item">
                            <Box className="task-category-color-box" sx={{background: "blue"}}></Box>
                            <Box className="task-body-item__text">Personal</Box>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Topics;