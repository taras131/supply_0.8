import React, {useEffect} from "react";
import {TaskList} from "./TasksList";
import {useAppDispatch} from "../../../hooks/redux";
import {fetchGetAllMachineryTasks} from "../model/actions";

const TasksPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGetAllMachineryTasks());
    }, []);
    return (
        <TaskList/>
    );
};

export default TasksPage;