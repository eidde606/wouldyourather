import { createSlice } from "@reduxjs/toolkit";

const initialVoteState = {
  answered: {},
  unanswered: [],
};

const voteSlice = createSlice({
  name: "votes",
  initialState: initialVoteState,
  reducers: {
    setAnswered(state, action) {
      state.answered = {
        ...action.payload,
      };
    },
    setUnanswered(state, action) {
      state.unanswered = [...action.payload];
    },
  },
});

export default voteSlice.reducer;
export const voteActions = voteSlice.actions;
