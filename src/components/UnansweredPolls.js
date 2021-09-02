import React from "react";

import { useSelector, useDispatch } from "react-redux";
import Poll from "./Poll";
import * as backend from "../_DATA";
import { questionActions } from "../store/Questions";
import { userActions } from "../store/userSlice";
import { mainActions } from "../store/mainSlice";

const UnansweredPolls = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const questions = useSelector((state) => state.question.questions);
  const polls = useSelector((state) => state.votes.unanswered);
  const isLoading = useSelector((state) => state.main.isLoading);
  const keys = useSelector((state) => state.question.keys);
  const dispatch = useDispatch();

  const pollAnswerHandler = (qid, ans) => {
    dispatch(mainActions.setIsLoading(true));
    backend
      ._saveQuestionAnswer({
        authedUser: currentUser.id,
        qid: qid,
        answer: ans,
      })
      .then(() => {
        backend._getUsers().then((users) => {
          dispatch(userActions.setUsers(users));
          dispatch(userActions.setCurrentUser(users[currentUser.id]));
          dispatch(mainActions.setIsLoading(false));
        });
        backend._getQuestions().then((data) => {
          dispatch(questionActions.setQuestions(data));
        });
      });
  };

  return (
    <div>
      {polls.map((key) => (
        <Poll
          key={key}
          question={questions[key]}
          answerSelection={pollAnswerHandler}
        />
      ))}
    </div>
  );
};

export default UnansweredPolls;
