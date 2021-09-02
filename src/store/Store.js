import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import mainSlice from "./mainSlice";
import questionSlice from "./Questions";
import userSlice from "./userSlice";
import voteSlice from "./voteSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    question: questionSlice,
    votes: voteSlice,
    main: mainSlice,
  },
});

export default store;
