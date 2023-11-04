import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthReducerState = {
    userDetails: {}
};

const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<AuthReducerState['userDetails']>) {
            return {
                ...state,
                userDetails: action.payload,
            };
        },
        changeUserDetails(state, action: PayloadAction<AuthReducerState['userDetails']>) {
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