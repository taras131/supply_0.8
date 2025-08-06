import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchGetAllMachinery} from "../model/actions";
import {selectAllMachinery} from "../model/selectors";
import MachineryMaintenanceTable from "./MachineryMaintenanceTable";
import {IMachinery} from "../../../models/iMachinery";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";

const MachineryMaintenancePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const machinery = useAppSelector(selectAllMachinery);
    useEffect(() => {
        dispatch(fetchGetAllMachinery());
    }, []);
    const machineryClickHandler = (machinery: IMachinery) => {
        navigate(`${routes.machinery}/${machinery.id}/?tab=3`);
    };
    return (
        <div>
            <MachineryMaintenanceTable rows={machinery} machineryClickHandler={machineryClickHandler}/>
        </div>
    );
};

export default MachineryMaintenancePage;