import React, {ChangeEvent, FC, useState} from "react";
import Card from "@mui/material/Card";
import TaskDetailsPhotos from "./TaskDetailsPhotos";
import TaskIssueView from "./TaskIssueView";
import TaskResultView from "./TaskResultView";
import ButtonsEditCancelSave from "../../../components/common/ButtonsEditCancelSave";
import {ITask} from "../../../models/IMachineryTasks";
import {ValidationErrors} from "../../../utils/validators";
import {SelectChangeEvent, Typography} from "@mui/material";
import {useAppDispatch} from "../../../hooks/redux";
import {fetchUpdateMachineryTask} from "../model/actions";

interface IProps {
    editedValue: ITask | null;
    errors?: ValidationErrors;
    fieldChangeHandler: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>,
    ) => void;
    handleDateChange: (date: any) => void;
    viewType: "issue" | "result";
}

const TaskReport: FC<IProps> = ({editedValue, errors, fieldChangeHandler, handleDateChange, viewType}) => {
    const dispatch = useAppDispatch();
    const [isEditModeIssue, setIsEditModeIssue] = useState(false);
    const [isEditResult, setIsEditResult] = useState(false);
    if (!editedValue) return null;
    const toggleIsEditIssue = () => {
        setIsEditModeIssue(prev => !prev);
    };
    const toggleIsEditResult = () => {
        setIsEditResult(prev => !prev);
    };
    const saveTaskClickHandler = () => {
        const updatedTask = viewType === "result" ? {...editedValue, status_id: 3} : editedValue;
        dispatch(fetchUpdateMachineryTask(updatedTask));
        setIsEditModeIssue(false);
        setIsEditResult(false);
    };
    return (
        <>
            <Card sx={{
                position: "relative",
                padding: "24px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}>
                <Typography sx={{marginBottom: "36px"}} variant="h5" color="primary">
                    {viewType === "issue" ? "Задача:" : "Результат:"}
                </Typography>
                {viewType === "issue" ? (
                    <TaskIssueView
                        isEditMode={isEditModeIssue}
                        task={editedValue}
                        fieldChangeHandler={fieldChangeHandler}
                        handleDateChange={handleDateChange}
                        errors={errors}
                    />
                ) : (
                    <TaskResultView
                        isEditMode={isEditResult}
                        task={editedValue}
                        fieldChangeHandler={fieldChangeHandler}
                        errors={errors}
                    />
                )}
                <ButtonsEditCancelSave
                    isEditMode={viewType === "issue" ? isEditModeIssue : isEditResult}
                    isValid={!Object.keys(errors).length}
                    toggleIsEditMode={viewType === "issue" ? toggleIsEditIssue : toggleIsEditResult}
                    updateHandler={saveTaskClickHandler}
                    cancelUpdateHandler={viewType === "issue" ? toggleIsEditIssue : toggleIsEditResult}
                />
            </Card>
            <TaskDetailsPhotos
                viewType={viewType}
                photos={viewType === "issue"
                    ? editedValue.issue_photos
                    : editedValue.result_photos}/>
        </>
    )
        ;
};

export default TaskReport;