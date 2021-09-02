import React, { useState } from "react";
import { makeStyles, TextField, Container, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import * as backend from "../_DATA";
import { questionActions } from "../store/Questions";

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "1rem",
      width: "75ch",
    },
  },
  spacer: {
    margin: "2rem",
  },
});

const NewQuestion = () => {
  const user = useSelector((state) => state.user.currentUser);
  const questions = useSelector((state) => state.question.questions);
  const dispatch = useDispatch();
  const classes = useStyles();
  const newQuestionForm = {
    optionOne: "",
    optionTwo: "",
  };
  const [form, setForm] = useState(newQuestionForm);

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    console.log(form);
    backend
      ._saveQuestion({
        optionOneText: form.optionOne,
        optionTwoText: form.optionTwo,
        author: user.id,
      })
      .then((newQuestion) => {
        console.log("new question: ", newQuestion);
        const newQuestions = { ...questions };
        newQuestions[newQuestion.id] = newQuestion;
        dispatch(questionActions.setQuestions(newQuestions));
        dispatch(questionActions.setKeys(Object.keys(newQuestions)));
      });
  };

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  return (
    <Container maxWidth="sm" className={classes.root}>
      <div>
        <h2>Create New Question</h2>
        <form onSubmit={formSubmitHandler}>
          <div>
            <TextField
              id="optionOne"
              label="Option One"
              defaultValue=""
              variant="outlined"
              value={form.optionOne}
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes.spacer} />
          <div>
            <TextField
              id="optionTwo"
              label="Option Two"
              defaultValue=""
              variant="outlined"
              value={form.optionTwo}
              onChange={inputChangeHandler}
            />
          </div>
          <div className={classes.spacer} />
          <div>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default NewQuestion;
