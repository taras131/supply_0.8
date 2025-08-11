import {createAsyncThunk} from "@reduxjs/toolkit";
import {INewSupplier, ISupplier} from "../../../models/iSuppliers";
import {suppliersAPI} from "../api";
import {thunkHandlers} from "../../../store/thunkHandlers";

export const fetchAddSupplier = createAsyncThunk("fetch_add_supplier",
    async (supplier: INewSupplier, {dispatch, rejectWithValue}) => {
        try {
            return await suppliersAPI.add(supplier);
        } catch (e: any) {
            return rejectWithValue(thunkHandlers.error(e.response.data, dispatch));
        }
    });

export const fetchGetSuppliers = createAsyncThunk(
    "suppliers/get_all",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            return await suppliersAPI.getAll();
        } catch (e) {
            return rejectWithValue(thunkHandlers.error(e.response.data, dispatch));
        }
    },
);

export const fetchGetSupplierById = createAsyncThunk(
    "suppliers/get_by_id",
    async (supplierId: string, {dispatch, rejectWithValue}) => {
        try {
            return await suppliersAPI.getById(supplierId);
        } catch (e: any) {
            return rejectWithValue(thunkHandlers.error(e.response.data, dispatch));
        }
    },
);

export const fetchUpdateSupplier = createAsyncThunk("fetch_update_supplier",
    async (supplier: ISupplier, {dispatch, rejectWithValue}) => {
        try {
            return await suppliersAPI.update(supplier);
        } catch (e) {
            return rejectWithValue(thunkHandlers.error(e.response.data, dispatch));
        }
    });

export const fetchDeleteSupplier = createAsyncThunk("fetch_delete_supplier",
    async (supplierId: string, {dispatch, rejectWithValue}) => {
        try {
            return suppliersAPI.delete(supplierId);
        } catch (e: any) {
            return rejectWithValue(thunkHandlers.error(e.response.data, dispatch));
        }
    });

export const fetchCompanyDataByInn = async (inn: number) => {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    const token = "8dc9e4a422c71110f153958d043bc2b42155f920"; // Замените на ваш API-ключ
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({query: inn}),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        return data.suggestions; // Вернет массив компаний
    } catch (error) {
        console.error("Ошибка при запросе данных:", error);
    }
};