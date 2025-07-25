import {appAPI, nestServerPath} from "../../../api";
import {transliterate} from "../../../utils/services";

export const filesPath = `${nestServerPath}/file`;

export const filesAPI = {
    upload: async (file: File) => {
        const ext = file.name.split(".").pop();
        const baseNameRaw = file.name.replace(/\.[^/.]+$/, "");
        const baseNameTranslit = transliterate(baseNameRaw)
            .replace(/[^a-zA-Z0-9]/g, "_");
        const uniqueName = `${baseNameTranslit}_${Date.now()}.${ext}`;
        const renamedFile = new File([file], uniqueName, {type: file.type});
        const formData = new FormData();
        formData.append("file", renamedFile);
        const response = await appAPI.post("/file", formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return response.data.name;
    },
    delete: async (filename: string) => {
        try {
            const response = await appAPI.delete(`/file/${filename}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
};
