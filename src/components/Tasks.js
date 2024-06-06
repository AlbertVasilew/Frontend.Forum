import React, { useContext, useState } from "react"

import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Box, Button, Checkbox, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { utcDateTimeToLocalDate } from "../helpers/common";
import ActionDialog from "./ActionDialog";
import { retrieveCategories, retrieveMenuCounters } from "../helpers/api-calls";
import CategoryContext from "../contexts/categoryContext";
import MenuContext from "../contexts/menuContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DialogContext from "../contexts/dialogContext";

const Tasks = props => {
    const [completeTaskDialog, setCompleteTaskDialog] = useState();
    const [deleteTaskDialog, setDeleteTaskDialog] = useState();
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState();

    const categoryContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);
    const dialogContext = useContext(DialogContext);

    const navigate = useNavigate();

    const deleteTaskHandler = () => {
        axios.delete(`${process.env.REACT_APP_API}/api/Tasks/${deleteTaskDialog.id}`).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setPrimaryMenuCounters);
            setDeleteTaskDialog();
        });
    }

    const completeTaskHandler = () => {
        axios.put(`${process.env.REACT_APP_API}/api/Tasks/complete/${completeTaskDialog.id}`).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setPrimaryMenuCounters);
            setCompleteTaskDialog();
        });
    }

    const deleteCategoryHandler = () => {
        axios.delete(`${process.env.REACT_APP_API}/api/Categories/${props.category.id}`).then(() => {
            retrieveCategories(categoryContext.setCategories);
            retrieveMenuCounters(menuContext.setPrimaryMenuCounters);
            
            navigate("/upcoming", { replace: true });
        });
    }

    return props.tasks && (
        <React.Fragment>
            {deleteTaskDialog && (
                <ActionDialog
                    open={deleteTaskDialog}
                    title={deleteTaskDialog.name}
                    text="Do you really want to delete the task?"
                    actionHandler={deleteTaskHandler}
                    actionText="Delete"
                />
            )}
            {completeTaskDialog && (
                <ActionDialog
                    open={completeTaskDialog}
                    title={completeTaskDialog.name}
                    text="Do you really want to complete the task?"
                    actionHandler={completeTaskHandler}
                    actionText="Complete"
                />
            )}
            {deleteCategoryDialog && (
                <ActionDialog
                    open={deleteCategoryDialog}
                    title={deleteCategoryDialog.name}
                    text="Do you really want to delete the category?"
                    actionHandler={deleteCategoryHandler}
                    actionText="Delete"
                />
            )}
            <Box className="tasks-page-header">
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Typography className="tasks-page-header-title">
                        <Box component="span">{props.title}</Box>
                        <Box component="span" className="tasks-page-header-title__count">{props.tasks.length}</Box>
                    </Typography>
                    {props.category && (
                        <Box sx={{marginLeft: "20px"}}>
                            <IconButton onClick={() => dialogContext.setManageCategoryDialog(props.category)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton sx={{color: "#FF0000"}} onClick={() => setDeleteCategoryDialog(props.category)}>
                                <DeleteIcon />
                            </IconButton>   
                        </Box>
                    )}
                </Box>
                <Button variant="contained" onClick={() => dialogContext.setManageTaskDialog(true)}>Add New Task</Button>
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
                                <IconButton onClick={() => dialogContext.setManageTaskDialog(task)}>
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
                                <Typography className="task-body-item__text">Due {utcDateTimeToLocalDate(task.deadline, true)}</Typography>
                            </Box>
                            {task.category && (
                                <Box className="task-body-item">
                                    <Box className="task-category-color-box" sx={{background: task.category.color}}></Box>
                                    <Typography className="task-body-item__text">{task.category.name}</Typography>
                                </Box>
                            )}
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