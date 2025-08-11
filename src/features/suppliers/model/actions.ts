import {createAsyncThunk} from "@reduxjs/toolkit";
import {INewSupplier, ISupplier} from "../../../models/iSuppliers";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {suppliersAPI} from "../api";

export const fetchAddSupplier = createAsyncThunk("fetch_add_supplier", async (supplier: INewSupplier, ThunkAPI) => {
    try {
        const res = await suppliersAPI.add(supplier);
        return res;
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export const fetchGetSuppliers = createAsyncThunk(
    "suppliers/get_all",
    async (_, ThunkAPI) => {
        try {
            const res = await suppliersAPI.getAll();
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);

export const fetchGetSupplierById = createAsyncThunk(
    "suppliers/get_by_id",
    async (supplierId: string, ThunkAPI) => {
        try {
            const res = await suppliersAPI.getById(supplierId);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);

export const fetchUpdateSupplier = createAsyncThunk("fetch_update_supplier", async (supplier: ISupplier, ThunkAPI) => {
    try {
        const res = await suppliersAPI.update(supplier);
        return res;
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export const fetchDeleteSupplier = createAsyncThunk("fetch_delete_supplier", async (supplierId: number, ThunkAPI) => {
    try {
        const res = await suppliersAPI.delete(supplierId);
        return res;
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
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
        body: JSON.stringify({ query: inn }),
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