import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser, IUserWithPassport} from "../../../models/IUser";
import {
    fetchRemoveUserPhoto,
    fetchUpdateUser,
    fetchUploadUserPhoto,
    fetchGetAllUsers,
} from "./actions";

export const userRoles = [
    {id: 1, title: "Директор"},
    {id: 2, title: "Бухгалтер"},
    {id: 3, title: "Снабженец"},
    {id: 4, title: "Механик"},
    {id: 5, title: "Слесарь"},
    {id: 6, title: "Электрик"},
    {id: 7, title: "Энергетик"},
];

export const userStatus = [
    {id: 1, title: "Работает"},
    {id: 2, title: "В отпуске"},
    {id: 3, title: "На больничном"},
    {id: 4, title: "Уволился"},
];

export interface IUserState {
    isLoading: boolean;
    list: IUser[];
    current: IUserWithPassport | null;
}

const initialState: IUserState = {
    isLoading: false,
    list: [],
    current: null,
};

const userAsyncActions = [
    fetchUploadUserPhoto,
    fetchUpdateUser,
    fetchRemoveUserPhoto,
];

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<IUser[]>) {
            state.list = action.payload;
        },
        setCurrentUser(state, action: PayloadAction<IUser>) {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        userAsyncActions.forEach(action => {
            builder.addCase(action.fulfilled, (state, action: PayloadAction<IUserWithPassport>) => {
                state.current = action.payload;
                state.isLoading = false;
            });
            builder.addCase(action.pending, state => {
                state.isLoading = true;
            });
            builder.addCase(action.rejected, state => {
                state.isLoading = false;
            });
        });

        builder.addCase(fetchGetAllUsers.fulfilled, (state, {payload}) => {
            state.list = payload;
            state.isLoading = false;
        });
        builder.addCase(fetchGetAllUsers.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(fetchGetAllUsers.rejected, state => {
            state.isLoading = false;
        });
    },
});

export const {setUsers, setCurrentUser} = UsersSlice.actions;
export default UsersSlice.reducer;