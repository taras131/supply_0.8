import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICurrentMachinery, IMachinery} from "../../../models/iMachinery";
import {
    fetchAddMachinery,
    fetchAddMachineryComment,
    fetchAddMachineryProblem,
    fetchAddMachineryTask,
    fetchDeleteMachineryComment,
    fetchDeleteMachineryPhoto, fetchGetAllMachinery,
    fetchGetMachineryById,
    fetchUpdateMachinery,
    fetchUpdateMachineryComment,
    fetchUpdateMachineryProblem,
    fetchUpdateMachineryTask,
    fetchUploadMachineryPhoto,
} from "./actions";
import {IComment} from "../../../models/iComents";
import {ITask} from "../../../models/ITasks";
import {IProblem} from "../../../models/IProblems";

interface IMachineryState {
    list: IMachinery[];
    current: ICurrentMachinery | null;
    isLoading: boolean;
    errorMessage: string;
    wsConnected: boolean;
    wsMessage: string | null;
}

const initialState: IMachineryState = {
    list: [],
    current: null,
    isLoading: false,
    errorMessage: "",
    wsConnected: false,
    wsMessage: null,
};

const handlePending = (state: IMachineryState) => {
    state.isLoading = true;
    state.errorMessage = "";
};

const handleRejected = (state: any, action: any) => {
    state.isLoading = false;
    state.errorMessage = action.payload as string;
};

export const MachinerySlice = createSlice({
    name: "machinery",
    initialState,
    reducers: {
        wsConnected: (state) => {
            state.wsConnected = true;
        },
        wsDisconnected: (state) => {
            state.wsConnected = false;
        },
        wsMessageReceived: (state, action: PayloadAction<any>) => {
            state.wsMessage = action.payload;
        },
        updateMachinery(state, action: PayloadAction<IMachinery | ICurrentMachinery>) {
            state.list = state.list.map((machinery) => (machinery.id === action.payload.id ? action.payload : machinery));
        },
        updateMachineryList: (state, action: PayloadAction<IMachinery[]>) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddMachinery.fulfilled, (state, action: PayloadAction<IMachinery>) => {
                state.list = [...state.list, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchGetAllMachinery.fulfilled, (state, action: PayloadAction<IMachinery[]>) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchGetMachineryById.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.current = action.payload;
            })
            .addCase(fetchUpdateMachinery.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.current = action.payload;
            })
            .addCase(fetchAddMachineryComment.fulfilled, (state, action: PayloadAction<IComment>) => {
                state.isLoading = false;
                if (state.current && state.current.comments) {
                    state.current = {
                        ...state.current,
                        comments: [...state.current.comments, action.payload],
                    };
                }
            })
            .addCase(fetchDeleteMachineryComment.fulfilled, (state, action: PayloadAction<number>) => {
                state.isLoading = false;
                if (state.current && state.current.comments) {
                    state.current = {
                        ...state.current,
                        comments: [...state.current.comments.filter((comment) => comment.id !== action.payload)],
                    };
                }
                state.list = [
                    ...state.list.map((machinery) => {
                        if (machinery.comments && machinery.comments.length > 0) {
                            return {
                                ...machinery,
                                comments: [...machinery.comments.filter((comment) => comment.id !== action.payload)],
                            };
                        } else {
                            return machinery;
                        }
                    }),
                ];
            })
            .addCase(fetchUpdateMachineryComment.fulfilled, (state, action: PayloadAction<IComment>) => {
                state.isLoading = false;
                if (state.current && state.current.comments) {
                    state.current = {
                        ...state.current,
                        comments: [
                            ...state.current.comments.map((comment) => {
                                if (action.payload.id === comment.id) {
                                    return action.payload;
                                } else {
                                    return comment;
                                }
                            }),
                        ],
                    };
                }
            })
            .addCase(fetchUploadMachineryPhoto.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.current = action.payload;
            })
            .addCase(fetchDeleteMachineryPhoto.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.current = action.payload;
            })
            .addCase(fetchAddMachineryTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                if (state.current && action.payload.machinery_id) {
                    state.current = {
                        ...state.current,
                        tasks: [...state.current.tasks, action.payload],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchUpdateMachineryTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                if (state.current) {
                    state.current = {
                        ...state.current,
                        tasks: [
                            ...state.current.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
                        ],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchAddMachineryProblem.fulfilled, (state, action: PayloadAction<IProblem>) => {
                if (state.current && action.payload.machinery_id) {
                    state.current = {
                        ...state.current,
                        problems: [...state.current.problems, action.payload],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchUpdateMachineryProblem.fulfilled, (state, action: PayloadAction<IProblem>) => {
                if (state.current && state.current.problems) {
                    state.current = {
                        ...state.current,
                        problems: [
                            ...state.current.problems.map((problem) =>
                                problem.id === action.payload.id ? action.payload : problem,
                            ),
                        ],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchDeleteMachineryPhoto.rejected, handleRejected)
            .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
            .addMatcher((action) => action.type.endsWith("/rejected"), handleRejected);
    },
});

export const {updateMachineryList, wsConnected, wsDisconnected, wsMessageReceived} = MachinerySlice.actions;
export default MachinerySlice.reducer;
