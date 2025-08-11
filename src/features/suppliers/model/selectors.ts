import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../../store";

const selectSuppliersState = (state: RootState) => state.suppliers;

export const selectSuppliers = createSelector(
    [selectSuppliersState],
    (suppliersState) => {
        const list = suppliersState.list || [];
        return list.slice().sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "ru");
        });
    }
);

export const selectSupplierById = createSelector(
    [
        (state: RootState) => state.suppliers.list,
        (_state: RootState, supplierId: string) => supplierId,
    ],
    (suppliers, supplierId) => {
        return suppliers.find(supplier => supplier.id === supplierId) || null;
    }
);

export const selectSuppliersIsLoading = createSelector(
    [(state: RootState) => state.suppliers],
    (suppliers) => {
        return suppliers.isLoading;
    }
);

export const selectCurrentSupplier = createSelector(
    [(state: RootState) => state.suppliers],
    (suppliers) => {
        return suppliers.current;
    }
);

export const selectSupplierNameById = createSelector(
    [
        (state: RootState) => state.suppliers,
        (_state: RootState, supplierId: string) => supplierId,
    ],
    (suppliers, supplierId) => {
        return suppliers.list.filter(supplier => supplier.id === supplierId)[0].name;
    }
);

export const selectSupplierINNById = createSelector(
    [
        (state: RootState) => state.suppliers,
        (_state: RootState, supplierId: string) => supplierId,
    ],
    (suppliers, supplierId) => {
        return suppliers.list.filter(supplier => supplier.id === supplierId)[0].INN;
    }
);
