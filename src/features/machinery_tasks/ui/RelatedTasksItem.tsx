import React, {FC} from "react";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import StatusIcon from "./StatusIcon";
import {formatDateDDMMYYYY} from "../../../utils/services";
import Box from "@mui/material/Box";
import PriorityChip from "./PriorityChip";
import {ITask} from "../../../models/IMachineryTasks";

interface IProps {
    task: ITask;
    taskClickHandler: () => void;
    isMaintenanceMode: boolean
}

const RelatedTasksItem: FC<IProps> = ({task, taskClickHandler, isMaintenanceMode}) => {
    const maintenanceText = getMaintenanceText(task);
    return (
        <ListItem key={task.id} disablePadding>
            <ListItemButton onClick={taskClickHandler}>
                <ListItemIcon>
                    <StatusIcon statusId={task.status_id}/>
                </ListItemIcon>
                <ListItemText primary={`${formatDateDDMMYYYY(task.created_at ?? "")} - ${task.title}`}/>
                {isMaintenanceMode ? (
                    <Typography>{maintenanceText}</Typography>
                ) : (
                    <Box sx={{width: "85px"}}>
                        <PriorityChip priorityId={task.priority_id}/>
                    </Box>
                )}
            </ListItemButton>
        </ListItem>
    );
};

export default RelatedTasksItem;

const getMaintenanceText = (task: ITask) => {
    if (task.status_id === 3) {
        return task.result_operating
            ? `проведено: ${task.result_operating} ч.`
            : `проведено: ${task.result_operating} км.`;
    }
    return task.issue_operating
        ? `план: ${task.issue_operating} ч.`
        : `план: ${task.issue_odometer} км.`;
};