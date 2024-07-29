import { Box, Checkbox, IconButton, Typography } from '@mui/material';

import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { utcDateTimeToLocalDate } from '../../helpers/common';

const Task = props => (
    <Box className="task">
        <Checkbox
            color="success"
            checked={props.task.completedOn != null}
            disabled={props.task.completedOn != null}
            onClick={props.openCompleteTaskDialog}
        />
        <Box key={props.task.id} className="task__container">
            <Box className="task__header">
                <Typography className="task__header-title">{props.task.name}</Typography>
                <Box>
                    <IconButton onClick={props.openManageTaskDialog}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className="icon--delete" onClick={props.openDeleteTaskDialog}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box className="task__body">
                <Box className="task__body-item">
                    <EventBusyIcon />
                    <Typography className="task__body-item-text">
                        {utcDateTimeToLocalDate(props.task.deadline)}
                    </Typography>
                </Box>
                {props.task.category && (
                    <Box className="task__body-item">
                        <Box className="task__category-color-box" sx={{background: props.task.category.color}}></Box>
                        <Typography className="task__body-item-text">{props.task.category.name}</Typography>
                    </Box>
                )}
                {props.task.completedOn && (
                    <Box className="task__body-item">
                        <EventAvailableIcon />
                        <Typography className="task__body-item-text">
                            {utcDateTimeToLocalDate(props.task.completedOn)}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    </Box>  
)

export default Task;