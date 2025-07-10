import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getMachinery, selectAllMachinery} from "../model/selectors";
import MachineryTable from "./MachineryTable";
import MachineryPageHeader from "./MachineryPageHeader";
import {fetchGetAllMachinery} from "../model/actions";

const MachineryPage = () => {
    const dispatch = useAppDispatch();
    const machinery = useAppSelector(selectAllMachinery);
    useEffect(() => {
        dispatch(fetchGetAllMachinery());
    }, []);
    return (
        <Stack spacing={3} sx={{height: "100%"}}>
            <MachineryPageHeader/>
            {/* <CustomersFilters />*/}
            <MachineryTable rows={machinery}/>
        </Stack>
    );
};

export default MachineryPage;
