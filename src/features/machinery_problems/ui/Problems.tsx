import React, {FC, useState} from "react";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProblemsTable from "./ProblemsTable";
import ProblemAddNew from "./ProblemAddNew";
import ProblemDetails from "./ProblemDetails";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectAllMachineryProblems} from "../model/selectors";
import {IMachineryProblem} from "../../../models/IMachineryProblems";
import {setCurrentProblem} from "../model/slice";

const Problems: FC = () => {
    const dispatch = useAppDispatch();
    const [isOpenAddDrawer, setIsOpenAddDrawer] = useState(false);
    const problems = useAppSelector(selectAllMachineryProblems);
    const toggleIsOpenAddDrawer = () => {
        setIsOpenAddDrawer(prev => !prev);
    };
    const handleProblemClick = (problem: IMachineryProblem) => {
        dispatch(setCurrentProblem(problem));
    };
    return (
        <Stack spacing={4}>
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Замечания</Typography>
                <Button onClick={toggleIsOpenAddDrawer} startIcon={<AddIcon/>} variant="contained">
                    Добавить
                </Button>
            </Stack>
            <ProblemsTable rows={problems} onProblemClick={handleProblemClick}/>
            <ProblemAddNew isOpen={isOpenAddDrawer} onClose={toggleIsOpenAddDrawer}/>
            <ProblemDetails/>
        </Stack>
    );
};

export default Problems;
