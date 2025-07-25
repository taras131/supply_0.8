import {createAsyncThunk} from "@reduxjs/toolkit";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {ICurrentMachinery, IMachinery, INewMachinery} from "../../../models/iMachinery";
import {machineryAPI} from "../api";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {IComment, INewComment} from "../../../models/iComents";
import {filesAPI} from "../../files/api";
import {thunkHandlers} from "../../../store/thunkHandlers";
import {AppDispatch, RootState} from "../../../store";
import {selectCurrentMachinery} from "./selectors";
import {setMessage} from "../../messages/model/slice";
import {setDocs} from "../../machinery_docs/model/slice";
import {setProblems} from "../../machinery_problems/model/slice";
import {setTasks} from "../../machinery_tasks/model/slice";

const messages = {
    addMachinery: {error: "Не удалось добавить машину.", success: "Машина добавлена"},
};

type ThunkConfig = {
    dispatch: AppDispatch;
    rejectValue: string;
};

interface IAddMachinery {
    newMachinery: INewMachinery;
    files: File[];
}

export const fetchAddMachinery = createAsyncThunk<IMachinery, IAddMachinery, ThunkConfig>(
    "machinery/fetchAddMachinery",
    async (addMachineryData, {dispatch, rejectWithValue}) => {
        try {
            const {newMachinery, files} = addMachineryData;
            if (files.length > 0) {
                for (const file of files) {
                    const uploadedFile = await filesAPI.upload(file);
                    newMachinery.photos.push(uploadedFile);
                }
            }
            const res = await machineryAPI.add(newMachinery);
            thunkHandlers.success(messages.addMachinery.success, dispatch);
            return res;
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchUpdateMachinery = createAsyncThunk(
    "fetch_update_machinery",
    async (machinery: ICurrentMachinery, {rejectWithValue, dispatch}) => {
        try {
            return await machineryAPI.update(machinery);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить машину.",
                }),
            );
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchGetAllMachinery = createAsyncThunk(
    "fetch_get_all_machinery",
    async (_, {rejectWithValue}) => {
        try {
            return await machineryAPI.getAll();
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchGetMachineryById = createAsyncThunk(
    "fetch_get_machinery_by_id",
    async (machinery_id: string, {rejectWithValue, dispatch}) => {
        try {
            const {docs, problems, tasks, ...machinery} = await machineryAPI.getById(machinery_id);
            dispatch(setDocs(docs));
            dispatch(setProblems(problems));
            dispatch(setTasks(tasks));
            return machinery;
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchAddMachineryComment = createAsyncThunk(
    "fetch_add_machinery_comment",
    async (comment: INewComment, {rejectWithValue, dispatch}) => {
        try {
            return await machineryAPI.addComment(comment);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить заметку.",
                }),
            );
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchDeleteMachineryComment = createAsyncThunk(
    "fetch_delete_machinery_comment",
    async (comment_id: number, {rejectWithValue, dispatch}) => {
        try {
            await machineryAPI.deleteComment(comment_id);
            return comment_id;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось удалить заметку.",
                }),
            );
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchUpdateMachineryComment = createAsyncThunk(
    "fetch_update_machinery_comment",
    async (comment: IComment, {rejectWithValue, dispatch}) => {
        try {
            return await machineryAPI.updateComment(comment);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить машину.",
                }),
            );
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchUploadMachineryPhoto = createAsyncThunk<
    ICurrentMachinery,
    File,
    { state: RootState }
>(
    "fetch_update_machinery_photo",
    async (file: File, {rejectWithValue, dispatch, getState}) => {
        try {
            const currentMachinery = selectCurrentMachinery(getState());
            if (!currentMachinery) return;
            const res = await filesAPI.upload(file);
            const updatedMachinery = {
                ...currentMachinery,
                photos: [...currentMachinery.photos, res],
            };
            return dispatch(fetchUpdateMachinery(updatedMachinery)).unwrap();
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchDeleteMachineryPhoto = createAsyncThunk<
    ICurrentMachinery,
    string,
    { state: RootState }
>(
    "fetch_delete_machinery_photo",
    async (deletePhotoName: string, {rejectWithValue, dispatch, getState}) => {
        try {
            const currentMachinery = selectCurrentMachinery(getState());
            if (!currentMachinery) return;
            const res = await filesAPI.delete(deletePhotoName);
            if (!res) return;
            const updatedMachinery = {
                ...currentMachinery,
                photos: [...currentMachinery.photos.filter(photo => photo !== deletePhotoName)],
            };
            return dispatch(fetchUpdateMachinery(updatedMachinery)).unwrap();
        } catch (e) {
            return rejectWithValue(handlerError(e));
        }
    },
);










