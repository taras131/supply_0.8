import { Middleware } from "redux";
import {updateMachineryList, wsConnected, wsDisconnected} from "./slice";

const WEBSOCKET_URL = "wss://212.74.224.210/api/v1/machinery/ws";
//const WEBSOCKET_URL = "ws://supplyserver2-production.up.railway.app/api/v1/machinery/ws";

export const machineryWebsocketMiddleware: Middleware = (store) => {
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
        socket = new WebSocket(WEBSOCKET_URL);

        socket.onopen = () => {
            store.dispatch(wsConnected());
        };
        socket.onmessage = (event) => {
            const machinery = JSON.parse(event.data);

            if (machinery.length) {
                store.dispatch(updateMachineryList(machinery));
            }
        };

        socket.onclose = () => {
            store.dispatch(wsDisconnected());
            console.log("WebSocket Disconnected");
            // Переподключение через 5 секунд
            setTimeout(() => {
                connectWebSocket();
            }, 5000);
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            socket?.close();
        };
    };

    connectWebSocket();

    return (next) => (action) => next(action);
};