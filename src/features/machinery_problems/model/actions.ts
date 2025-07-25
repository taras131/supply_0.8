import {createAsyncThunk} from "@reduxjs/toolkit";
import {filesAPI} from "../../files/api";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {machineryProblemsAPI} from "../api";
import {IMachineryProblem, INewMachineryProblem} from "../../../models/IMachineryProblems";
import {RootState} from "../../../store";
import {selectCurrentMachineryId} from "../../machinery/model/selectors";
import {selectCurrentProblem} from "./selectors";

function cleanProblemForUpdate(problem: IMachineryProblem) {
    const { author, updated_author, ...rest } = problem;
    return rest;
}

export interface IAddProblem {
    newProblem: INewMachineryProblem;
    files: File[];
}

export const fetchAddMachineryProblem = createAsyncThunk<
    string,
    IAddProblem,
    { state: RootState }
>(
    "machinery_problems/add",
    async (addProblemData: IAddProblem, {rejectWithValue, getState}) => {
        try {
            console.log(addProblemData.newProblem);
            const {newProblem, files} = addProblemData;
            const problem_in = {...newProblem};
            const currentMachineryId = selectCurrentMachineryId(getState());
            if (files.length > 0) {
                for (const file of files) {
                    const uploadedFile = await filesAPI.upload(file);
                    problem_in.photos.push(uploadedFile);
                }
            }
            if(!currentMachineryId) return;
            return await machineryProblemsAPI.add(currentMachineryId,problem_in);
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchUpdateMachineryProblem = createAsyncThunk(
    "machinery_problems/update",
    async (problem: IMachineryProblem, {rejectWithValue}) => {
        try {
            return await machineryProblemsAPI.update(cleanProblemForUpdate(problem));
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchUploadMachineryProblemPhoto = createAsyncThunk<
    string,
    File,
    { state: RootState }
>(
    "machinery_problems/upload_photo",
    async ( file: File, {rejectWithValue, dispatch, getState}) => {
        try {
            const res = await filesAPI.upload(file);
            const problem = selectCurrentProblem(getState());
            if(!problem) return;
            const updatedProblem = {
                ...problem,
                photos: [...problem.photos, res],
            };
            return dispatch(fetchUpdateMachineryProblem(updatedProblem)).unwrap();
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchDeleteMachineryProblemPhoto = createAsyncThunk<
    string,
    string,
    { state: RootState }
>(
    "machinery_problems/delete_photo",
    async (deletePhotoName: string, {rejectWithValue, dispatch, getState}) => {
        try {
            const problem = selectCurrentProblem(getState());
            if(!problem) return;
            const updatedProblem = {
                ...problem,
                photos: [...problem.photos.filter(photo => photo !== deletePhotoName)],
            };
            await filesAPI.delete(deletePhotoName);
            return dispatch(fetchUpdateMachineryProblem(updatedProblem)).unwrap();
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchDeleteMachineryProblem = createAsyncThunk(
    "machinery_problems/delete",
    async (problemId: string, {rejectWithValue}) => {
        try {
            return await machineryProblemsAPI.delete(problemId);
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);