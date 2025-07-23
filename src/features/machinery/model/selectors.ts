import {RootState} from "../../../store";
import {ICurrentMachinery, IMachinery, IMachineryDoc} from "../../../models/iMachinery";
import {useAppSelector} from "../../../hooks/redux";
import {IOrder} from "../../../models/iOrders";
import {ITask} from "../../../models/IMachineryTasks";
import {IProblem} from "../../../models/IProblems";
import {createSelector} from "@reduxjs/toolkit";

const collator = new Intl.Collator("ru");

const selectMachineryState = (state: RootState) => state.machinery;

export const selectAllMachinery = createSelector(
    [selectMachineryState],
    (machineryState) => machineryState.list,
);

export const selectCurrentMachinery = createSelector(
    [selectMachineryState],
    (machineryState) => machineryState.current,
);

export const selectCurrentMachineryId = createSelector(
    [selectMachineryState],
    (machineryState) => machineryState.current?.id,
);

export const selectCurrentMachineryPhotos = createSelector(
    [selectMachineryState],
    (machineryState) => machineryState.current?.photos,
);

export const selectCurrentMachineryTitle = createSelector(
    [selectMachineryState],
    (machineryState) => machineryState.current
        ? `${machineryState.current.brand} ${machineryState.current.model}`
        : "",
);

export const getMachineryIsLoading = (state: RootState): boolean => {
    return state.machinery.isLoading;
};

export const getMachinery = (state: RootState): (IMachinery | ICurrentMachinery)[] => {
    return state.machinery.list;
};
export const getMachineryById = (state: RootState, machineryId: number): IMachinery | ICurrentMachinery => {
    return state.machinery.list.filter((machinery) => machinery.id !== machineryId)[0];
};

export const getMachineryByTypeId = (state: RootState, typeId: number) => {
    return state.machinery.list.filter((machinery) => machinery.type_id === typeId);
};

export const getCurrentMachinery = (state: RootState): ICurrentMachinery | null => {
    return state.machinery.current;
};

export const getCurrentMachineryTitle = (state: RootState): string => {
    const currentMachinery = getCurrentMachinery(state);
    if (currentMachinery) {
        return `${currentMachinery.brand} ${currentMachinery.model}`;
    } else {
        return "";
    }
};
export const getCurrentMachineryOperatingTypeId = (state: RootState): number | null => {
    return state.machinery.current?.operating_type_id || null;
};

export const getCurrentMachineryId = (state: RootState): number | null => {
    return state.machinery.current?.id || null;
};

export const getCurrentMachineryTasks = (state: RootState): ITask[] | [] => {
    return state.machinery.current?.tasks || [];
};

export const getTaskById = (state: RootState, taskId: number): ITask | null => {
    return state.machinery.current?.tasks.find((task) => task.id === taskId) || null;
};

export const getLastMaintenance = (state: RootState): ITask | null => {
    const tasks = state.machinery.current?.tasks;
    if (!tasks) return null;
    const filteredTasks = tasks.filter((task) => task.status_id === 3 && task.type_id === 1);
    if (filteredTasks.length === 0) return null;
    return filteredTasks.reduce(
        (latestTask, currentTask) => (currentTask.due_date > latestTask.due_date ? currentTask : latestTask),
        filteredTasks[0],
    );
};

export const getUpcomingMaintenance = (state: RootState): ITask | null => {
    // Получаем список задач текущей техники
    const tasks = state.machinery.current?.tasks;
    if (!tasks) return null;

    // Фильтруем задачи по условиям: status_id (1 или 2) и type_id (1)
    const filteredTasks = tasks.filter((task) => (task.status_id === 1 || task.status_id === 2) && task.type_id === 1);
    if (filteredTasks.length === 0) return null;

    // Ищем задачу с минимальным значением due_date (ближайшую)
    return filteredTasks.reduce(
        (nearestTask, currentTask) => (currentTask.due_date < nearestTask.due_date ? currentTask : nearestTask),
        filteredTasks[0],
    );
};

export const getRelatedMachineryByInvoiceId = (state: RootState, invoiceId: string): IMachinery[] => {
    const relatedMachinery: IMachinery[] = [];
    const relatedOrders: IOrder[] = [];
    state.orders.list.forEach((order) => {
        const include = order.orderItems.some((orderItems) => orderItems.invoiceId && orderItems.invoiceId === invoiceId);
        if (include) {
            relatedOrders.push(order);
        }
    });
    if (relatedOrders.length > 0) {
        const relatedMachineryIds: string[] = [];
        relatedOrders.forEach((relatedOrder) => {
            if (relatedOrder.machineryId && relatedOrder.machineryId.length > 0) {
                relatedMachineryIds.push(relatedOrder.machineryId);
            }
        });
        if (relatedMachineryIds.length > 0) {
            relatedMachineryIds.forEach((relatedMachineryId) => {
                const machinery = useAppSelector((state) => getMachineryById(state, +relatedMachineryId));
                relatedMachinery.push(machinery[0]);
            });
        }
    }
    return relatedMachinery;
};
