import React, { useState } from "react"

import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Box, Button, Checkbox, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CompleteTaskDialig from "./CompleteTaskDialog";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import DeleteTaskDialog from "./DeleteTaskDialog";
import { utcDateTimeToLocalDate } from "../helpers/common";

const Tasks = props => {
    const [completeTaskDialog, setCompleteTaskDialog] = useState();
    const [deleteTaskDialog, setDeleteTaskDialog] = useState();

    return props.tasks && (
        <React.Fragment>
            {completeTaskDialog && <CompleteTaskDialig task={completeTaskDialog} closeHandler={() => setCompleteTaskDialog()} />}
            {deleteTaskDialog && <DeleteTaskDialog task={deleteTaskDialog} closeHandler={() => setDeleteTaskDialog()} />}
            <Box className="tasks-page-header">
                <Typography className="tasks-page-header-title">
                    <Box component="span">{props.title}</Box>
                    <Box component="span" className="tasks-page-header-title__count">{props.tasks.length}</Box>
                </Typography>
                <Button variant="contained">Add New Task</Button>
            </Box>
            {props.tasks.map(task => (
                <Box sx={{display: "flex", alignItems: "flex-start"}}>
                    <Checkbox
                        color="success"
                        checked={task.completedOn != null} disabled={task.completedOn != null}
                        onClick={() => setCompleteTaskDialog(task)}
                    />
                    <Box key={task.id} className="task-container">
                        <Box className="task-header">
                            <Typography className="task-header__title">{task.name}</Typography>
                            <Box>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton sx={{color: "#FF0000"}} onClick={() => setDeleteTaskDialog(task)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box className="task-body">
                            <Box className="task-body-item">
                                <CalendarMonth />
                                <Typography className="task-body-item__text">Due {utcDateTimeToLocalDate(task.deadline)}</Typography>
                            </Box>
                            {task.categories.map(category => (
                                <Box className="task-body-item">
                                    <Box className="task-category-color-box" sx={{background: category.color}}></Box>
                                    <Typography className="task-body-item__text">{category.name}</Typography>
                                </Box>
                            ))}
                            {task.completedOn != null && (
                                    <Box className="task-body-item">
                                    <EventAvailableIcon />
                                    <Typography className="task-body-item__text">Completed {utcDateTimeToLocalDate(task.completedOn, true)}</Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>  
            ))}
        </React.Fragment>
    )
}

export default Tasks;