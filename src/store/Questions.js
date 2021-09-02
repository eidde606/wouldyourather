import { createSlice } from "@reduxjs/toolkit";

const initialQuestionState = {
  questions: {},
  keys: [],
};
const questionSlice = createSlice({
  initialState: initialQuestionState,
  name: "question",
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setKeys(state, action) {
      state.keys = action.payload;
    },
  },
});

export default questionSlice.reducer;
export const questionActions = questionSlice.actions;
