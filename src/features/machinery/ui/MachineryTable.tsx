import React, {FC} from "react";
import {IMachinery} from "../../../models/iMachinery";
import {Stack} from "@mui/material";
import {ITableColumn} from "../../../models/ITable";
import {machineryTypes} from "../utils/const";
import {nestServerPath} from "../../../api";
import photoPlaceholder from "../../../assets/images/placeholder.png";
import {setMessage} from "../../messages/model/slice";
import {MESSAGE_SEVERITY, VIN_COPY_TEXT} from "../../../utils/const";
import {CENTER, ROW, SUCCESS} from "../../../styles/const";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BaseTable from "../../../components/common/BaseTable";
import {useAppDispatch} from "../../../hooks/redux";
import {styled} from "@mui/material/styles";
import MachineryStatusChip from "./MachineryStatusChip";

const StyledImage = styled("img")({
    width: "100%",
    height: "70px",
    objectFit: "contain",
    backgroundColor: "white",
    borderRadius: "8px",
});

interface IProps {
    rows: IMachinery[] | null;
    machineryClickHandler: (machinery: IMachinery) => void;
    activeRowId?: number | null;
}

const MachineryTable: FC<IProps> = ({rows, machineryClickHandler, activeRowId}) => {
    const dispatch = useAppDispatch();
    if (!rows) return null;
    const columns: ITableColumn<IMachinery>[] = [
        {
            key: "photos",
            label: "Фото",
            getValue: (row) => {
                const photoPath = row.photos[0]
                    ? `${nestServerPath}/static/${row.photos[0]}`
                    : photoPlaceholder;
                return (<StyledImage src={photoPath} alt="machinery_photo"/>);
            },
        },
        {
            key: "type_id",
            label: "Тип",
            getValue: (row) => (machineryTypes.find(type => type.id === row.type_id)?.title || ""),
        },
        {
            key: "brand",
            label: "Марка",
        },
        {
            key: "model",
            label: "Модель",
        },
        {
            key: "year_manufacture",
            label: "Год выпуска",
        },
        {
            key: "state_number",
            label: "Гос. номер",
        },
        {
            key: "vin",
            label: "VIN",
            getValue: (row) => {
                const handleVINClick = (e: any) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(row.vin);
                    dispatch(setMessage({text: VIN_COPY_TEXT, severity: MESSAGE_SEVERITY.success}));
                };
                return (<Stack onClick={handleVINClick}
                               sx={{cursor: "pointer"}}
                               direction={ROW}
                               alignItems={CENTER}
                               spacing={1}>
                    <ContentCopyIcon color={SUCCESS}/>
                    {row.vin}
                </Stack>);
            },
        },
        {
            key: "status",
            label: "Статус",
            getValue: (row) => (<MachineryStatusChip status={row.status}/>),
        },
    ];
    return (<BaseTable rows={rows}
                       columns={columns}
                       onRowClick={machineryClickHandler}
                       activeRowId={activeRowId}/>);
};

export default MachineryTable;
