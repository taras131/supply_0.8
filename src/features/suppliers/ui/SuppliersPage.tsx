import React, {ChangeEvent, useEffect, useState} from "react";
import {
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import SuppliersPageHeader from "./SuppliersPageHeader";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {selectSuppliers, selectSuppliersIsLoading} from "../model/selectors";
import {fetchGetSupplierById, fetchGetSuppliers} from "../model/actions";
import SuppliersTable from "./SuppliersTable";
import Preloader from "../../../components/Preloader";
import SupplierAddNew from "./SuppliersAddNew";
import {ISupplier} from "../../../models/iSuppliers";
import SupplierDetails from "./SupplierDetails";
import ASuppliersMigration from "./ASuppliersMigration";

const SuppliersPage = () => {
    const dispatch = useAppDispatch();
    const [isOpenAddDrawer, setIsOpenAddDrawer] = useState(false);
    const toggleIsOpenAddDrawer = () => {
        setIsOpenAddDrawer(prev => !prev);
    };
    const isLoading = useAppSelector(selectSuppliersIsLoading);
    const [suppliersFilter, setSuppliersFilter] = useState({
        name: "",
    });
    let filteredSuppliers = useAppSelector(selectSuppliers);
    useEffect(() => {
        dispatch(fetchGetSuppliers());
    }, []);
    const supplierClickHandler = (supplier: ISupplier) => {
        dispatch(fetchGetSupplierById(supplier.id));
    };
    const filterChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => {
        if (e && e.target.name) {
            setSuppliersFilter(prev => ({...prev, [e.target.name]: e.target.value}));
        }
    };
    if (suppliersFilter.name.length > 0) {
        filteredSuppliers = filteredSuppliers.filter(supplier => supplier.name.toLowerCase().includes(suppliersFilter.name.toLowerCase()));
    }
    if (isLoading) return (<Preloader/>);
    return (
        <Stack spacing={4} pt={3}>
            <SuppliersPageHeader suppliersFilter={suppliersFilter}
                                 handleAddClick={toggleIsOpenAddDrawer}
                                 filterChangeHandler={filterChangeHandler}/>
            <SuppliersTable rows={filteredSuppliers}
                            supplierClickHandler={supplierClickHandler}
            />
            {isOpenAddDrawer && (
                <SupplierAddNew isOpen={isOpenAddDrawer}
                                onClose={toggleIsOpenAddDrawer}/>
            )}
            <SupplierDetails/>
            <ASuppliersMigration/>
        </Stack>
    );
};

export default SuppliersPage;
