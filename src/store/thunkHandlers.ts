import {AppDispatch} from "./index";
import {MESSAGE_SEVERITY} from "../utils/const";
import {setMessage, setModalMessage} from "../features/messages/model/slice";

export const handlerError = (e: unknown): string => {
    if (e instanceof Error) return e.message;
    if (typeof e === "string") return e;
    return "неизвестная ошибка";
};

export const thunkHandlers = {
    error: (e: unknown, dispatch: any) => {
        const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
        dispatch(setModalMessage(errorMessage));
        return handlerError(e);
    },
    success: (message: string, dispatch: AppDispatch) => {
        dispatch(
            setMessage({
                severity: MESSAGE_SEVERITY.success,
                text: message,
            }),
        );
    },
};
