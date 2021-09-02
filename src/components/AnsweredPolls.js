import React from "react";

import { useSelector, useDispatch } from "react-redux";
import AnsweredPoll from "./AnsweredPoll";
import * as backend from "../_DATA";
import { questionActions } from "../store/Questions";
import { userActions } from "../store/userSlice";

const AnsweredPolls = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const questions = useSelector((state) => state.question.questions);
  const polls = useSelector((state) => state.votes.answered);
  const dispatch = useDispatch();

  const pollAnswerHandler = (qid, ans) => {
    console.log(ans);
    backend
      ._saveQuestionAnswer({
        authedUser: currentUser.id,
        qid: qid,
        answer: ans,
      })
      .then(() => {
        backend
          ._getQuestions()
          .then((data) => dispatch(questionActions.setQuestions(data)));
        backend._getUsers().then((users) => {
          dispatch(userActions.setUsers(users));
          dispatch(userActions.setCurrentUser(users[currentUser.id]));
        });
      });
  };

  return (
    <div>
      {Object.keys(polls).map((key) => (
        <AnsweredPoll
          key={key}
          question={questions[key]}
          answerSelection={pollAnswerHandler}
        />
      ))}
    </div>
  );
};

export default AnsweredPolls;
