import { IMachinery, INewMachinery } from "../../../models/iMachinery";
import {appAPI, nestServerPath} from "../../../api";

const machineryPath = `${nestServerPath}/machinery`;

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
};
