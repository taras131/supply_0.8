import {RootState} from "../../../store";
import {createSelector} from "@reduxjs/toolkit";

const selectMachineryTasksState = (state: RootState) => state.machineryTasks;

export const selectAllMachineryTasks = createSelector(
    [selectMachineryTasksState],
    (machineryTasksState) => machineryTasksState.list,
);

export const selectMachineryTasksIsLoading = createSelector(
    [selectMachineryTasksState],
    (machineryTasksState) => machineryTasksState.isLoading,
);

export const selectCurrentTask = createSelector(
    [selectMachineryTasksState],
    (machineryTasksState) => machineryTasksState.current,
);