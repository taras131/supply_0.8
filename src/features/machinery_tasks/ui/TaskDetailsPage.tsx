import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEditor} from "../../../hooks/useEditor";
import {defaultTask, getTaskStatusById, ITask} from "../../../models/IMachineryTasks";
import {taskValidate} from "../../../utils/validators";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskDetails from "./TaskDetails";
import {selectCurrentTask} from "../model/selectors";
import {fetchGetMachineryTasksById} from "../model/actions";
import {fetchGetMachineryById} from "../../machinery/model/actions";
import {convertMillisecondsToDate, formatDateDDMMYYYY} from "../../../utils/services";
import TitleWithValue from "../../../components/TitleWithValue";
import Box from "@mui/material/Box";
import TaskDetailsPageHeader from "./TaskDetailsPageHeader";
import TaskReport from "./TaskReport";

const TaskDetailsPage = () => {
    const dispatch = useAppDispatch();
    const {taskId} = useParams();
    const [expandedIssuePanel, setExpandedIssuePanel] = useState(true);
    const [expandedResultPanel, setExpandedResultPanel] = useState(false);
    const currentTask = useAppSelector(selectCurrentTask);
    const {editedValue, errors, handleFieldChange, setEditedValue, validateValue} = useEditor<ITask>({
        initialValue: JSON.parse(JSON.stringify(defaultTask)),
        validate: taskValidate,
    });
    useEffect(() => {
        if (taskId) {
            dispatch(fetchGetMachineryTasksById(`${taskId}`));
        }
    }, [taskId]);
    useEffect(() => {
        if (currentTask && currentTask.machinery_id) {
            dispatch(fetchGetMachineryById(currentTask.machinery_id));
            setEditedValue(currentTask);
            validateValue();
            setExpandedResultPanel(currentTask.status_id === 3);
        }
    }, [currentTask]);
    if (!currentTask) return null;
    const handleDateChange = (date: any) => {
        if (date && date.isValid && date.isValid()) {
            setEditedValue((prev) => ({
                ...prev,
                due_date: date.toDate().getTime(),
            }));
        }
    };
    return (
        <Stack spacing={2}>
            <TaskDetailsPageHeader/>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
                    gap: "16px",
                }}
            >
            <TaskReport  editedValue={editedValue}
                              fieldChangeHandler={handleFieldChange}
                              handleDateChange={handleDateChange}
                              errors={errors}
                              viewType="issue"/>

            </Box>
            <Accordion expanded={expandedIssuePanel}
                       onChange={() => setExpandedIssuePanel((prev) => !prev)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                  aria-controls="panel1-content"
                                  id="panel1-header">
                    <Box sx={{display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "24px"}}>
                        <TitleWithValue title={"Создана:"}
                                        width={"200px"}
                                        value={formatDateDDMMYYYY(currentTask.created_at)}/>
                        <TitleWithValue title={"Срок выполнения:"}
                                        width={"250px"}
                                        value={convertMillisecondsToDate(+currentTask.due_date)}/>
                        <TitleWithValue title={"Статус:"}
                                        width={"150px"}
                                        value={getTaskStatusById(currentTask.status_id)}/>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <TaskDetails
                        editedValue={editedValue}
                        fieldChangeHandler={handleFieldChange}
                        handleDateChange={handleDateChange}
                        errors={errors}
                        viewType="issue"
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expandedResultPanel} onChange={() => setExpandedResultPanel((prev) => !prev)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2-content" id="panel2-header">
                    <Typography component="h3" fontWeight={600}>Результат выполнения</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TaskDetails
                        editedValue={editedValue}
                        fieldChangeHandler={handleFieldChange}
                        handleDateChange={handleDateChange}
                        errors={errors}
                        viewType="result"
                    />
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
};

export default TaskDetailsPage;
