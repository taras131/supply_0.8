import {db, storage} from "../firebase";
import {addDoc, collection} from "firebase/firestore";
import {ref, deleteObject, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {INewSupplier} from "models/iSuppliers";
import {getDateInMilliseconds, transliterate} from "utils/services";
import {INewComment} from "models/iComent";
import {IFileData} from "features/invoices/model/actions";
import axios from "axios";

export const nestServerPath = "http://localhost:3000";
export const basePath = "https://mylittleserver.ru/api/v1";

//export const basePath ="https://supplyserver2-production.up.railway.app/api/v1";

class Api {
    addSupplier = async (supplier: INewSupplier) => {
        const res = await addDoc(collection(db, "suppliers"), supplier);
        return res;
    };
    addComment = async (comment: INewComment) => {
        const res = await addDoc(collection(db, "comments"), comment);
        return res;
    };

    uploadFile = async (fileData: IFileData) => {
        const name = `${getDateInMilliseconds()}-${transliterate(fileData.file.name.replace(" ", "_"))}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, fileData.file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                switch (snapshot.state) {
                    case "paused":
                        break;
                    case "running":
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                alert("Ошибка загрузки");
                switch (error.code) {
                    case "storage/unauthorized":
                        break;
                    case "storage/canceled":
                        break;
                    case "storage/unknown":
                        break;
                    default:
                        break;
                }
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    fileData.updateFile(name, downloadURL);
                    fileData.setIsUpdateFileLoading(false);
                });
            },
        );
    };
    removeFile = async (fileName: string) => {
        const desertRef = ref(storage, fileName);
        deleteObject(desertRef)
            .then(() => {
                // File deleted successfully
            })
            .catch((e) => {
                alert(e);
            });
    };
}

export async function getNewAccessToken() {
    const response = await fetch(`${nestServerPath}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Не удалось обновить токен");
    }
    const data = await response.json();
    // Бэкенд присылает в ответе { access_token: ... }
    return data.access_token;
}

const api = new Api();

export default api;

export const appAPI = axios.create({
    baseURL: nestServerPath,
    withCredentials: true,
});

appAPI.interceptors.response.use(
    resp => resp,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await getNewAccessToken();
                localStorage.setItem("access_token", newToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (e) {
                // Обработка если refresh не сработал (вылогинить пользователя)
            }
        }
        return Promise.reject(error);
    }
);

appAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
