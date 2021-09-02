import { createSlice } from "@reduxjs/toolkit";

const initialUSerState = {
    users: {},
    currentUser: {}
};
const userSlice = createSlice({
    initialState: initialUSerState,
    name: 'user',
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        }
    }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
