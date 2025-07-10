import {createAsyncThunk} from "@reduxjs/toolkit";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {filesAPI} from "../../files/api";
import {machineryDocsAPI} from "../api";
import {INewMachineryDoc} from "../../../models/IMachineryDoc";

interface IAddData {
    doc: INewMachineryDoc,
    file: File
}

export const fetchAddMachineryDoc = createAsyncThunk("machinery_docs/add"
    , async (addData: IAddData, ThunkAPI) => {
        try {
            const res = await filesAPI.upload(addData.file);
            if (!res) return;
            return await machineryDocsAPI.add({...addData.doc, file_name: res});
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    });