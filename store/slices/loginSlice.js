import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {}
};

const loginReducer = createSlice({
    name: 'loginReducer',
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

export const { setUserDetails, changeUserDetails, logOut } = loginReducer.actions;
export default loginReducer.reducer;