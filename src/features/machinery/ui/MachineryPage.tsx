import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectAllMachinery} from "../model/selectors";
import MachineryTable from "./MachineryTable";
import MachineryPageHeader from "./MachineryPageHeader";
import {fetchGetAllMachinery} from "../model/actions";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import {IMachinery} from "../../../models/iMachinery";
import AMachineryMigration from "./AMachineryMigration";

const MachineryPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const machinery = useAppSelector(selectAllMachinery);
    const machineryClickHandler = (machinery: IMachinery) => {
        navigate(`${routes.machinery}/${machinery.id}`);
    };
    useEffect(() => {
        dispatch(fetchGetAllMachinery());
    }, []);
    return (
        <Stack spacing={3} sx={{height: "100%"}}>
            <MachineryPageHeader/>
            {/* <CustomersFilters />*/}
            <MachineryTable rows={machinery}
                            machineryClickHandler={machineryClickHandler}/>
            <AMachineryMigration/>
        </Stack>
    );
};

export default MachineryPage;
