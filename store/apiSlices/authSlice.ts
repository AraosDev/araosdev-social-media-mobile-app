import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseUrl = process.env.EXPO_PUBLIC_AUTH_API_BASE_URL;
const nonAuthenticatedRoutes = ['login'];
const loginSlice = createApi({
    reducerPath: 'loginSlice',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState, endpoint }) => {
            if (!nonAuthenticatedRoutes.includes(endpoint)) {
                const { token } = (getState() as RootState).authReducer.userDetails;
                if (token) headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginSuccessResponse, LoginRequest>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
        updateAccountData: builder.mutation<UpdateAccountResponse, UpdateAccountRequest>({
            query: (body) => ({
                url: '/updateAccount/me',
                method: 'PATCH',
                body,
            }),
        }),
        updatePassword: builder.mutation<UpdateAccountResponse, UpdateAccountRequest>({
            query: (body) => ({
                url: '/updatePassword/me',
                method: 'PATCH',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useUpdateAccountDataMutation, useUpdatePasswordMutation } = loginSlice;

export default loginSlice;