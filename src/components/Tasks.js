import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Box, Button, Typography } from "@mui/material";
import React from "react"

const Tasks = props => {

    return (
        <React.Fragment>
            <Box className="tasks-page-header">
                <Typography className="tasks-page-header-title">
                    <Box component="span">{props.title}</Box>
                    <Box component="span" className="tasks-page-header-title__count">{props.tasks.length}</Box>
                </Typography>
                <Button variant="contained">Add New Task</Button>
            </Box>
            {props.tasks.map(task => (
                <Box key={task.id} className="task-container">
                    <Box className="task-header">
                        <Typography className="task-header__title">{task.name}</Typography>
                        <Typography>Completed on undefined</Typography>
                    </Box>
                    <Box className="task-body">
                        <Typography className="task-body-item">
                            <CalendarMonth />
                            <Box className="task-body-item__text">{task.createdOn}</Box>
                        </Typography>
                        {task.categories.map(category => (
                            <Typography className="task-body-item">
                                <Box className="task-category-color-box" sx={{background: category.color}}></Box>
                                <Box className="task-body-item__text">{category.name}</Box>
                            </Typography>
                        ))}
                    </Box>
                </Box>
            ))}
        </React.Fragment>
    )
}

export default Tasks;