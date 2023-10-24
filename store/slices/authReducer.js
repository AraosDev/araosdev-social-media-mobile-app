import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {}
};

const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setUserDetails(state, action) {
            return {
                ...state,
                userDetails: action.payload
            };
        },
        changeUserDetails(state, action) {
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    ...action.payload,
                }
            }
        },
        logOut(state) {
            return {
                ...state,
                userDetails: {},
            }
        }
    },
});

export const { setUserDetails, changeUserDetails, logOut } = authReducer.actions;
export default authReducer.reducer;