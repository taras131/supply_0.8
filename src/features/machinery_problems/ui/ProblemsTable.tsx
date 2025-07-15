import React, {FC} from "react";
import {Chip} from "@mui/material";
import {convertMillisecondsToDate, formatDateDDMMYYYY} from "../../../utils/services";
import {
    getCategoryTitleById,
    getPriorityChipColor,
    getPriorityTitleById,
} from "../../machinery/utils/services";
import {ITableColumn} from "../../../models/ITable";
import BaseTable from "../../../components/common/BaseTable";
import {useAppSelector} from "../../../hooks/redux";
import {getCurrentMachineryOperatingTypeId} from "../../machinery/model/selectors";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {IMachineryProblem} from "../../../models/IMachineryProblems";

interface IProps {
    rows: IMachineryProblem[] | null;
    onProblemClick: (problem: IMachineryProblem) => void;
    activeRowId?: number | null;
}

const ProblemsTable: FC<IProps> = ({rows, onProblemClick, activeRowId = null}) => {
    const operatingTypeId = useAppSelector(getCurrentMachineryOperatingTypeId);
    if (!rows) return null;
    const rowClickHandler = (problem: IMachineryProblem) => {
        onProblemClick(problem);
    };
    const columns: ITableColumn<IMachineryProblem>[] = [
        {
            key: "status_id",
            label: "Статус",
            getValue: (row) => (
                <Box display="flex" alignItems="center" justifyContent="center">
                    {row.status_id === 1 && <HourglassBottomIcon color="error"/>}
                    {row.status_id === 2 && <AssignmentIcon color="warning"/>}
                    {row.status_id === 3 && <BuildIcon color="primary"/>}
                    {row.status_id === 4 && <CheckCircleIcon color="success"/>}
                </Box>
            ),
        },
        {
            key: "created_at",
            label: "Дата",
            getValue: (row) => row.created_at,
            formatter: (value) => formatDateDDMMYYYY(value),
        },
        {
            key: "operating",
            label: operatingTypeId === 0 ? "Наработка (часы)" : "Пробег (км)",
        },
        {
            key: "category_id",
            label: "Категория",
            getValue: (row) => getCategoryTitleById(row.category_id),
        },
        {
            key: "title",
            label: "Заголовок",
        },
        {
            key: "description",
            label: "Описание",
        },
        {
            key: "priority_id",
            label: "Приоритет",
            getValue: (row) => {
                const priorityColor = getPriorityChipColor(row.priority_id);
                return <Chip label={getPriorityTitleById(row.priority_id)} color={priorityColor} sx={{width: "100%"}}/>;
            },
        },
    ];

    return <BaseTable rows={rows} columns={columns} onRowClick={rowClickHandler} activeRowId={activeRowId}/>;
};

export default ProblemsTable;
