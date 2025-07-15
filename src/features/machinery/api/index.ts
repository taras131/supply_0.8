import { IMachinery, INewMachinery } from "../../../models/iMachinery";
import { IComment, INewComment } from "../../../models/iComents";
import {appAPI, nestServerPath} from "../../../api";
import { INewTask, ITask } from "../../../models/ITasks";

const machineryPath = `${nestServerPath}/machinery`;
const noticePath = "comment";
const tasksPath = "tasks";

export const machineryAPI = {
  add: async (machinery: INewMachinery) => {
    try {
      const res = await appAPI.post(machineryPath, machinery);
      return res.data;
    } catch (error: any) {
      const message =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          `Ошибка сервера: ${error.response?.status} ${error.response?.statusText}`;
      throw new Error(message);
    }
  },
  getAll: async () => {
    const res = await appAPI.get(machineryPath);
    return res.data;
  },
  getById: async (machinery_id: string) => {
    const res = await appAPI.get(`${machineryPath}/${machinery_id}`);
    return res.data;
  },
  update: async (machinery: IMachinery) => {
    try {
      const res = await appAPI.put(`${machineryPath}/${machinery.id}/`, machinery);
      return res.data;
    } catch (error: any) {
      const message =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          `Ошибка сервера: ${error.response?.status} ${error.response?.statusText}`;
      throw new Error(message);
    }
  },

  addComment: async (comment: INewComment) => {
    const res = await fetch(`${machineryPath}/${noticePath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },
  deleteComment: async (comment_id: number) => {
    const res = await fetch(`${machineryPath}/${noticePath}/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
    }
    return true;
  },
  updateComment: async (comment: IComment) => {
    const res = await fetch(`${machineryPath}/${noticePath}/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.detail || `Ошибка сервера: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },
  addNewTask: async (newTask: INewTask) => {
    const res = await fetch(`${machineryPath}/${tasksPath}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },
  updateTask: async (task: ITask) => {
    const res = await fetch(`${machineryPath}/${tasksPath}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(errorDetails.detail || `Ошибка сервера: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  },

};
