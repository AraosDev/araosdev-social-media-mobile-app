import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./apiSlices/authSlice";
import authReducer from './slices/authReducer'

export const store = configureStore({
    reducer: {
        [authSlice.reducerPath]: authSlice.reducer,
        authReducer,
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authSlice.middleware),
});