import {appAPI, nestServerPath} from "../../../api";
import {INewTask, ITask} from "../../../models/IMachineryTasks";

const machineryTasksPath = `${nestServerPath}/machinery-task`;

const prepareTaskDto = (dto: INewTask) => {
    if (!dto.assigned_to_id || dto.assigned_to_id === "-1") delete dto.assigned_to_id;
    if (!dto.problem_id || dto.problem_id === "-1") delete dto.problem_id;
    if (!dto.machinery_id || dto.machinery_id === "-1") delete dto.machinery_id;
    return dto;
};

export const machineryTasksAPI = {
    add: async (newTask: INewTask) => {
        const prepareTask = prepareTaskDto(newTask);
        console.log(prepareTask);
        const res = await appAPI.post(machineryTasksPath, prepareTask);
        console.log(res);
        return res.data;
    },
    getAll: async () => {
        const res = await appAPI.get(machineryTasksPath);
        return res.data;
    },
    getById: async (task_id: string) => {
        const res = await appAPI.get(`${machineryTasksPath}/${task_id}`);
        return res.data;
    },
    update: async (task: ITask) => {
        const res = await appAPI.put(`${machineryTasksPath}/${task.id}/`, task);
        return res.data;
    },
    delete: async (task_id: string) => {
        const res = await appAPI.delete(`${machineryTasksPath}/${task_id}/`);
        return res.data;
    },
};