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
          color="primary"
          variant="contained"
        >
          {question.optionOne.text}
        </Button>
        <Button
          onClick={() => answerSelection(question.id, "optionTwo")}
          color="primary"
          variant="contained"
        >
          {question.optionTwo.text}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Poll;
