import React, {FC} from "react";
import {IMachinery} from "../../../models/iMachinery";
import BaseTable from "../../../components/common/BaseTable";
import {ITableColumn} from "../../../models/ITable";
import {machineryTypes} from "../utils/const";
import RelatedTasksItem from "../../machinery_tasks/ui/RelatedTasksItem";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";

interface IProps {
    rows: IMachinery[] | null;
    machineryClickHandler: (machinery: IMachinery) => void;
}

const MachineryMaintenanceTable: FC<IProps> = ({rows, machineryClickHandler}) => {
    const navigate = useNavigate();
    if (!rows) return null;
    const columns: ITableColumn<IMachinery>[] = [
        {
            key: "brand",
            label: "Марка",
        },
        {
            key: "model",
            label: "Модель",
        },
        {
            key: "state_number",
            label: "Гос. номер",
        },
        {
            key: "operating",
            label: "Наработка",
        },
        {
            key: "odometer",
            label: "Пробег",
        },
        {
            key: "last_completed_service_task",
            label: "Последнее завершённое ТО",
            getValue: (row) => {
                const taskClickHandler = () => {
                    navigate(routes.machineryTaskDetails.replace(":taskId", row.last_completed_service_task?.id || ""));
                };
                return (<>
                    {row.last_completed_service_task
                        ? (<RelatedTasksItem task={row.last_completed_service_task}
                                             taskClickHandler={taskClickHandler}
                                             isMaintenanceMode={true}/>)
                        : ("Нет завершённых ТО")}
                </>);
            },
        },
        {
            key: "next_service_task",
            label: "Предстоящее ТО",
            getValue: (row) => {
                const taskClickHandler = () => {
                    navigate(routes.machineryTaskDetails.replace(":taskId", row.next_service_task?.id || ""));
                };
                return (<>
                    {row.next_service_task
                        ? (<RelatedTasksItem task={row.next_service_task}
                                             taskClickHandler={taskClickHandler}
                                             isMaintenanceMode={true}/>)
                        : ("Нет запланированных ТО")}
                </>);
            },
        },
    ];
    return (<BaseTable rows={rows}
                       columns={columns}
                       onRowClick={machineryClickHandler}/>);
};

export default MachineryMaintenanceTable;