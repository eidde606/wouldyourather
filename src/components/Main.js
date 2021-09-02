import React, { useState, useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import {
  Container,
  Toolbar,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import UnansweredPolls from "./UnansweredPolls";
import { voteActions } from "../store/voteSlice";
import AnsweredPolls from "./AnsweredPolls";

const useStyles = makeStyles({
  toolbar: {
    width: "100%",
    backgroundColor: "#cddafa",
    marginTop: "1rem",
  },
  title: {
    flexGrow: 1,
  },
  spinner: {
    margin: "20px",
  },
});

const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.main.isLoading);
  const user = useSelector((state) => state.user.currentUser);
  const polls = useSelector((state) => state.question.questions);
  const keys = useSelector((state) => state.question.keys);
  const [location, setLocation] = useState("/");

  useEffect(() => {
    const unanswered = [];
    const answered = Object.keys(user.answers);
    console.log("loading state: ", isLoading);
    keys.forEach((key) => {
      if (!answered.find((el) => el === key)) {
        unanswered.push(key);
      }
    });
    console.log(unanswered);
    dispatch(voteActions.setAnswered(user.answers));
    dispatch(voteActions.setUnanswered(unanswered));
  }, [polls]);

  const locationHandler = (event, newLocation) => {
    if (newLocation && location !== newLocation) {
      setLocation(newLocation);
      pollRouteHandler(newLocation);
    }
  };

  const pollRouteHandler = (path) => {
    if (path === "/") {
      history.push(`/home`);
    }

    if (path === "/answered") {
      history.push(`/home${path}`);
    }
  };
  return (
    <Container maxWidth="sm">
      <Toolbar variant="regular" className={classes.toolbar}>
        <ToggleButtonGroup
          value={location}
          exclusive
          onChange={locationHandler}
        >
          <ToggleButton value="/">Unanswered</ToggleButton>
          <ToggleButton value="/answered">Answered</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
      <div>
        <Route path="/home" exact>
          {isLoading && (
            <CircularProgress className={classes.spinner} color="primary" />
          )}
          {!isLoading && <UnansweredPolls />}
        </Route>
        <Route path="/home/answered">
          <AnsweredPolls />
        </Route>
      </div>
    </Container>
  );
};

export default Main;
