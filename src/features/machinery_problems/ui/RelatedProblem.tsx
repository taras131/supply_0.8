import React, {FC} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {ListItemButton, ListItemText} from "@mui/material";
import {formatDateDDMMYYYY} from "../../../utils/services";
import ProblemDetails from "./ProblemDetails";
import {IMachineryProblem} from "../../../models/IMachineryProblems";
import {setCurrentProblem} from "../model/slice";

interface IProps {
    problem: IMachineryProblem
}

const RelatedProblem: FC<IProps> = ({problem}) => {
    const dispatch = useAppDispatch();
    if (!problem) return null;
    const problemClickHandler = () => {
        dispatch(setCurrentProblem(problem));
    };
    return (
        <>
            <ListItemButton onClick={problemClickHandler}>
                <ListItemText
                    primary={`${formatDateDDMMYYYY(problem.created_at ?? "")} - ${problem.title}`}/>
            </ListItemButton>
            <ProblemDetails/>
        </>
    );
};

export default RelatedProblem;