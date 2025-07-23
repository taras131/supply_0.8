import React, {ChangeEvent, FC, useState} from "react";
import Box from "@mui/material/Box";
import TaskIssueView from "./TaskIssueView";
import {ITask} from "../../../models/IMachineryTasks";
import {SelectChangeEvent, Stack} from "@mui/material";
import {ValidationErrors} from "../../../utils/validators";
import {useAppDispatch} from "../../../hooks/redux";
import TaskResultView from "./TaskResultView";
import {fetchUpdateMachineryTask} from "../model/actions";
import ButtonsEditCancelSave from "../../../components/common/ButtonsEditCancelSave";
import TaskDetailsPhotos from "./TaskDetailsPhotos";

interface IProps {
    editedValue: ITask | null;
    errors?: ValidationErrors;
    fieldChangeHandler: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>,
    ) => void;
    handleDateChange: (date: any) => void;
    viewType: "issue" | "result";
}

const TaskDetails: FC<IProps> = ({editedValue, errors, fieldChangeHandler, handleDateChange, viewType}) => {
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
        <Stack direction="row" alignItems="center" justifyContent={"center"} spacing={2}>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
                    gap: "26px",
                    placeItems: "center",
                }}
            >
                <Stack sx={{position: "relative", width: "100%"}} spacing={isEditModeIssue ? 1 : 3}>
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
                </Stack>
                <TaskDetailsPhotos
                    viewType={viewType}
                    photos={viewType === "issue"
                        ? editedValue.issue_photos
                        : editedValue.result_photos}/>
            </Box>
        </Stack>
    );
};

export default TaskDetails;
