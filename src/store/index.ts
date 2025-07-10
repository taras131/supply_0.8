import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import SuppliersReducer from "./reducers/suppliers";
import MessageReducer from "features/messages/model/slice";
import InvoicesReducer from "features/invoices/model/slice";
import authReducer from "../features/auth/model/slice";
import commentsReducer from "./reducers/coments";
import shipmentsReducer from "features/shipments/model/slice";
import ordersReducer from "features/orders/model/slice";
import machineryReducer from "../features/machinery/model/slice";
import usersReducer from "../features/users/model/slice";
import filesReducer from "../features/files/model/slice";
import companiesReducer from "../features/companies/model/slice";

const rootReducer = combineReducers({
  invoices: InvoicesReducer,
  suppliers: SuppliersReducer,
  message: MessageReducer,
  auth: authReducer,
  comments: commentsReducer,
  shipments: shipmentsReducer,
  orders: ordersReducer,
  machinery: machineryReducer,
  users: usersReducer,
  files: filesReducer,
  companies: companiesReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
/*    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(machineryWebsocketMiddleware),*/
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
