import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEditor} from "../../../hooks/useEditor";
import {defaultTask, ITask} from "../../../models/IMachineryTasks";
import {taskValidate} from "../../../utils/validators";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskDetails from "./TaskDetails";
import {selectCurrentTask} from "../model/selectors";
import {fetchGetMachineryTasksById} from "../model/actions";
import {fetchGetMachineryById} from "../../machinery/model/actions";
import {selectCurrentMachineryTitle} from "../../machinery/model/selectors";

const TaskDetailsPage = () => {
    const dispatch = useAppDispatch();
    const {taskId} = useParams();
    const navigate = useNavigate();
    const [expandedIssuePanel, setExpandedIssuePanel] = useState(true);
    const [expandedResultPanel, setExpandedResultPanel] = useState(false);
    const currentTask = useAppSelector(selectCurrentTask);
    const currentMachineryTitle = useAppSelector(selectCurrentMachineryTitle);
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
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Назад
                </Button>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    {currentMachineryTitle}
                </Typography>
            </Stack>
            <Accordion expanded={expandedIssuePanel} onChange={() => setExpandedIssuePanel((prev) => !prev)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
                    <Typography component="h3" fontWeight={600}>Постановка задачи</Typography>
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
