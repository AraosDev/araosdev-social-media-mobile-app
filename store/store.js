import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./apiSlices/loginSlice";
import loginReducer from './slices/loginSlice'

export const store = configureStore({
    reducer: {
        [loginSlice.reducerPath]: loginSlice.reducer,
        loginReducer,
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(loginSlice.middleware),
});