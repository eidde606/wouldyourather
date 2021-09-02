import React from "react";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    margin: "0.8rem",
    width: "100%",
  },
});

const Poll = ({ question, answerSelection }) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="h2">
            Asked By: {question.author} | Would You Rather:
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => answerSelection(question.id, "optionOne")}
          disabled="question.optionOne.votes.indexOf(currentUser.id) === -1"
          style={{
            backgroundColor:
              question.optionOne.votes.indexOf(currentUser.id) !== -1
                ? "#ccffe6"
                : "",
            color: "black",
          }}
        >
          {question.optionOne.text}
        </Button>
        <Button
          onClick={() => answerSelection(question.id, "optionTwo")}
          disabled="question.optionTwo.votes.indexOf(currentUser.id) === -1"
          style={{
            backgroundColor:
              question.optionTwo.votes.indexOf(currentUser.id) !== -1
                ? "#ccffe6"
                : "",
            color: "black",
          }}
        >
          {question.optionTwo.text}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Poll;
