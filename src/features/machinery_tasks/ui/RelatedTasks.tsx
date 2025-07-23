import React, {FC} from "react";
import {ITask} from "../../../models/IMachineryTasks";
import {IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import {formatDateDDMMYYYY} from "../../../utils/services";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface IProps {
    machineryId: string;
    problemId: string;
    tasks: ITask[];
}

const RelatedTasks: FC<IProps> = ({tasks, machineryId, problemId}) => {
    const navigate = useNavigate();
    const taskClickHandler = (taskId: string) => () => {
        navigate(
            routes.machineryTaskDetails.replace(":taskId", taskId));
    };
    const addTaskClickHandler = () => {
        navigate(routes.machineryAddTask.replace(":machineryId", machineryId), {
            state: {problemId: problemId},
        });
    };
    const tasksList = tasks.map(task => <ListItem key={task.id} disablePadding>
        <ListItemButton onClick={taskClickHandler(task.id)}>
            <ListItemText primary={`${formatDateDDMMYYYY(task.created_at ?? "")} - ${task.title}`}/>
        </ListItemButton>
    </ListItem>);
    return (
        <Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Typography component={"h4"} fontWeight={500}>Связанные задачи:</Typography>
                <IconButton onClick={addTaskClickHandler}
                            aria-label="add_task"
                            color="primary">
                    <AddBoxIcon fontSize="inherit"/>
                </IconButton>
            </Stack>
            <List>
                {tasksList}
            </List>
        </Stack>
    );
};

export default RelatedTasks;