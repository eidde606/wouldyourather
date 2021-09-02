import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false
};
const authSlice = createSlice({
    initialState: initialAuthState,
    name: 'user',
    reducers: {
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
        }
    }
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
