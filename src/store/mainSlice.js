import { createSlice } from "@reduxjs/toolkit";

const initialMainState = {
  isLoading: false,
};
const mainSlice = createSlice({
  initialState: initialMainState,
  name: "main",
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const mainActions = mainSlice.actions;
