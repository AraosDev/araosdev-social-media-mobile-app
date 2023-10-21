import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./apiSlices/loginSlice";

export const store = configureStore({
    reducer: {
        [loginSlice.reducerPath]: loginSlice.reducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(loginSlice.middleware),
});