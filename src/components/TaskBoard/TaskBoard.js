import React from 'react'

import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ActionDialog from '../ActionDialog';
import ManageCategoryDialog from '../ManageCategoryDialog';
import ManageTaskDialog from '../ManageTaskDialog';
import Task from './Task';

const TaskBoard = props => props.tasks && (
    <React.Fragment>
        <Box className="task-board-header">
            <Box className="task-board-header__left-section">
                <Typography className="task-board-header__title">
                    <Box component="span">{props.title}</Box>
                    <Box component="span" className="task-board-header__count">{props.tasks.length}</Box>
                </Typography>
                {props.category && (
                    <Box className="task-board-header__settings-container">
                        <IconButton onClick={() => props.setManageCategoryDialog(props.category)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            className="icon--delete"
                            onClick={() => props.setDeleteCategoryDialog(props.category)}>
                            <DeleteIcon />
                        </IconButton>   
                    </Box>
                )}
            </Box>
            <Button variant="contained" onClick={() => props.setManageTaskDialog({})}>Add New Task</Button>
        </Box>
        {props.tasks.map(task => (
            <Task
                key={task.id}
                task={task}
                openManageTaskDialog={() => props.setManageTaskDialog(task)}
                openCompleteTaskDialog={() => props.setCompleteTaskDialog(task)}
                openDeleteTaskDialog={() => props.setDeleteTaskDialog(task)}
            />
        ))}
        {props.deleteTaskDialog && (
            <ActionDialog
                open={props.deleteTaskDialog !== null}
                closeHandler={() => props.setDeleteTaskDialog()}
                title={props.deleteTaskDialog.name}
                text="Do you really want to delete the task?"
                actionHandler={props.deleteTaskHandler}
                actionText="Delete"
            />
        )}
        {props.completeTaskDialog && (
            <ActionDialog
                open={props.completeTaskDialog !== null}
                closeHandler={() => props.setCompleteTaskDialog()}
                title={props.completeTaskDialog.name}
                text="Do you really want to complete the task?"
                actionHandler={props.completeTaskHandler}
                actionText="Complete"
            />
        )}
        {props.deleteCategoryDialog && (
            <ActionDialog
                open={props.deleteCategoryDialog !== null}
                closeHandler={() => props.setDeleteCategoryDialog()}
                title={props.deleteCategoryDialog.name}
                text="Do you really want to delete the category?"
                actionHandler={props.deleteCategoryHandler}
                actionText="Delete"
            />
        )}
        {props.manageCategoryDialog &&
            <ManageCategoryDialog
                open={props.manageCategoryDialog != null}
                closeHandler={() => props.setManageCategoryDialog()}
                category={props.manageCategoryDialog}
            />}
        {props.manageTaskDialog &&
            <ManageTaskDialog
                open={props.manageTaskDialog != null}
                closeHandler={() => props.setManageTaskDialog()}
                task={props.manageTaskDialog}
            />}
    </React.Fragment>
)

export default TaskBoard;