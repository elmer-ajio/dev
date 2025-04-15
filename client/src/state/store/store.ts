import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import userReducer from "./user/reducer";

const reducers = combineReducers({
    users: userReducer,
});

const store = configureStore({
    reducer: reducers,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            immutableCheck: false,
          serializableCheck: false,
        }).concat(thunk, ...(process.env.NODE_ENV === "development" ? [logger] : [])),

    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {},
});

export default store;

export type State = ReturnType<typeof  store.getState>;

export type AppDispatch = typeof store.dispatch;
