import React, {FC} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {formatDateDDMMYYYY} from "../../../utils/services";
import ProblemDetails from "./ProblemDetails";
import {IMachineryProblem} from "../../../models/IMachineryProblems";
import {setCurrentProblem} from "../model/slice";
import StatusIcon from "../../machinery_tasks/ui/StatusIcon";
import PriorityChip from "../../machinery_tasks/ui/PriorityChip";
import Box from "@mui/material/Box";

interface IProps {
    problem: IMachineryProblem
}

const RelatedProblemsItem: FC<IProps> = ({problem}) => {
    const dispatch = useAppDispatch();
    if (!problem) return null;
    const problemClickHandler = () => {
        dispatch(setCurrentProblem(problem));
    };
    return (
        <>
            <ListItemButton onClick={problemClickHandler}>
                <ListItemIcon>
                    <StatusIcon statusId={problem.status_id}/>
                </ListItemIcon>
                <ListItemText
                    primary={`${formatDateDDMMYYYY(problem.created_at ?? "")} - ${problem.title}`}/>
                <Box sx={{width: "85px"}}>
                    <PriorityChip priorityId={problem.priority_id}/>
                </Box>
            </ListItemButton>
            <ProblemDetails/>
        </>
    );
};

export default RelatedProblemsItem;