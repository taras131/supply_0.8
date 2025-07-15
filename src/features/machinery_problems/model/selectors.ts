import {RootState} from "../../../store";
import {createSelector} from "@reduxjs/toolkit";

const selectMachineryProblemsState = (state: RootState) => state.machineryProblems;

export const selectAllMachineryProblems = createSelector(
    [selectMachineryProblemsState],
    (machineryProblemsState) => machineryProblemsState.list,
);

export const selectMachineryProblemsIsLoading = createSelector(
    [selectMachineryProblemsState],
    (machineryProblemsState) => machineryProblemsState.isLoading,
);

export const selectCurrentProblem = createSelector(
    [selectMachineryProblemsState],
    (machineryProblemsState) => machineryProblemsState.current,
)