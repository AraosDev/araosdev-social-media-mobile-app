import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.EXPO_PUBLIC_AUTH_API_BASE_URL;
const loginSlice = createApi({
    reducerPath: 'loginSlice',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginSlice;

export default loginSlice;