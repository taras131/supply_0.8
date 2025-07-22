import React, {ChangeEvent, FC} from "react";
import {ValidationErrors} from "../../../utils/validators";
import {SelectChangeEvent, Stack} from "@mui/material";
import {INewTask, ITask, taskStatus, taskTypes} from "../../../models/IMachineryTasks";
import FieldControl from "../../../components/common/FieldControl";
import {PRIORITIES} from "../../machinery/utils/const";
import {useAppSelector} from "../../../hooks/redux";
import {selectUsersFromOptions} from "../../users/model/selectors";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useProblemDrawer} from "../../../hooks/useProblemDrawer";
import {selectActiveProblemsFromOptions} from "../../machinery_problems/model/selectors";

interface IProps {
    task: INewTask | ITask | null;
    errors?: ValidationErrors;
    isEditMode?: boolean;
    isNewTask?: boolean;
    handleDateChange: (date: any) => void;
    fieldChangeHandler: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>,
    ) => void;
}

const TaskIssueView: FC<IProps> = ({
                                       task,
                                       errors,
                                       isEditMode = true,
                                       isNewTask = false,
                                       fieldChangeHandler,
                                       handleDateChange,
                                   }) => {
    const {drawerState, openDrawer, closeDrawer} = useProblemDrawer();
    /*  const handleProblemClick = () => {
        if (task && task.problem_id) openDrawer("view", task.problem_id);
      };*/
    const usersList = useAppSelector(selectUsersFromOptions);
    const activeProblemList = useAppSelector(selectActiveProblemsFromOptions);
    if (!task) return null;
    return (
        <>
            <Stack direction="row" spacing={2} alignItems={"center"}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <DatePicker
                        label="Срок выполнения"
                        value={dayjs(task.due_date)}
                        onChange={handleDateChange}
                        format="DD.MM.YYYY"
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                variant: "outlined",
                            },
                        }}
                    />
                </LocalizationProvider>
                {!isNewTask && (
                    <FieldControl
                        label="Статус"
                        name="status_id"
                        id="status_id"
                        value={task.status_id}
                        error={errors?.status_id}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                        options={taskStatus}
                    />
                )}
            </Stack>
            <Stack direction="row"
                   spacing={2}
                   alignItems="center"
                   justifyContent="space-between"
                   mt={isEditMode ? 3 : 0}>
                <FieldControl
                    label="Приоритет"
                    name="priority_id"
                    id="priority_id"
                    value={task.priority_id}
                    error={errors?.priority_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={PRIORITIES}
                    isRequired
                />
                <FieldControl
                    label="Тип работ"
                    name="type_id"
                    id="type_id"
                    value={task.type_id}
                    error={errors?.type_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={taskTypes}
                />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                {isEditMode ? (
                    <>


                    </>
                ) : (
                    <>
                        {/*<Typography ml={2} variant="subtitle2" sx={{width: "100%"}}>
                            Срок до:
                            <span style={{
                                display: "block",
                                marginTop: "2px",
                            }}>{convertMillisecondsToDate(task.due_date)}</span>
                        </Typography>
                        <Typography ml={2} variant="subtitle2" sx={{width: "100%"}}>
                            Основание:
                            <span style={{display: "block", marginTop: "2px", cursor: "pointer"}}
                                  onClick={handleProblemClick}>
                                {problemTitle}
                            </span>
                        </Typography>*/}
                    </>
                )}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <FieldControl
                    label="Заголовок"
                    name="title"
                    id="title"
                    value={task.title}
                    error={errors?.title}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    isRequired
                />

            </Stack>
            <FieldControl
                label="Описание"
                name="description"
                id="description"
                value={task.description}
                error={errors?.description}
                isEditMode={isEditMode}
                onChange={fieldChangeHandler}
                isRequired
                isMultiline
            />

            <Stack direction="row" spacing={2}>
                {/*    <FieldControl
          label="Автор"
          name="author_id"
          id="author_id"
          value={task.author_id}
          error={errors?.author_id}
          isEditMode={isEditMode}
          onChange={fieldChangeHandler}
          options={usersList}
        />*/}
                <FieldControl
                    label="Основание"
                    name="problem_id"
                    id="problem_id"
                    value={task.problem_id}
                    error={errors?.problem_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={activeProblemList}
                />
                <FieldControl
                    label="Исполнитель"
                    name="assigned_to_id"
                    id="assigned_to_id"
                    value={task.assigned_to_id}
                    error={errors?.assigned_to_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={usersList}
                />
            </Stack>
            {/*{task.problem_id && (
        <ProblemDetails currentProblemId={task.problem_id} isOpen={drawerState.isOpen} onClose={closeDrawer} />
      )}*/}
        </>
    );
};

export default TaskIssueView;
