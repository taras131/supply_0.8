import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMachineryProblem} from "../../../models/IMachineryProblems";
import {fetchAddMachineryProblem, fetchDeleteMachineryProblem, fetchUpdateMachineryProblem} from "./actions";

interface IMachineryProblemsState {
    list: IMachineryProblem[];
    isLoading: boolean;
    current: IMachineryProblem | null;
}

const handlePending = (state: IMachineryProblemsState) => {
    state.isLoading = true;
};

const handleRejected = (state: IMachineryProblemsState) => {
    state.isLoading = false;
};

const initialState: IMachineryProblemsState = {
    list: [],
    isLoading: false,
    current: null,
};

export const MachineryProblemsSlice = createSlice({
    name: "machinery_problems_slice",
    initialState,
    reducers: {
        setProblems: (state, action: PayloadAction<IMachineryProblem[]>) => {
            state.list = action.payload;
        },
        setCurrentProblem: (state, action: PayloadAction<IMachineryProblem | null>) => {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddMachineryProblem.fulfilled, (state, action: PayloadAction<IMachineryProblem>) => {
                state.list = [...state.list, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchUpdateMachineryProblem.fulfilled, (state, action: PayloadAction<IMachineryProblem>) => {
                state.list = [...state.list.map(problem => problem.id === action.payload.id
                    ? action.payload
                    : problem)];
                state.current = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchDeleteMachineryProblem.fulfilled, (state, action: PayloadAction<IMachineryProblem>) => {
                state.list = [...state.list.filter(problem => problem.id !== action.payload.id)];
                state.isLoading = false;
            })
            .addCase(fetchAddMachineryProblem.pending, handlePending)
            .addCase(fetchAddMachineryProblem.rejected, handleRejected)
            .addCase(fetchUpdateMachineryProblem.pending, handlePending)
            .addCase(fetchUpdateMachineryProblem.rejected, handleRejected);
    },
});

export const {setProblems, setCurrentProblem} = MachineryProblemsSlice.actions;
export default MachineryProblemsSlice.reducer;