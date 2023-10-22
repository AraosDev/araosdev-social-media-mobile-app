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
    },
});

export const { setUserDetails } = loginReducer.actions;
export default loginReducer.reducer;