import {RootState} from "../../../store";
import {createSelector} from "@reduxjs/toolkit";

const selectMachineryCommentsState = (state: RootState) => state.machineryComments;

export const selectAllMachineryComments = createSelector(
    [selectMachineryCommentsState],
    (machineryCommentsState) => machineryCommentsState.list,
);