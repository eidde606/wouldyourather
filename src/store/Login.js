import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./userSlice";
import { authActions } from "./authSlice";
import { useHistory } from "react-router-dom";

import {
  CircularProgress,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "white",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: "25px",
    color: "white",
    fontFamily: "Montserrat",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
  },
  select: {
    color: "white",
    backgroundColor: "#212529",
    width: "330px",
    fontSize: "30px",
  },
  submit: {
    color: "white",
  },
  loader: {
    position: "absolute",
    top: "40%",
    left: "calc(50% - 20px)",
  },
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [selection, setSelection] = useState("");

  const selectionChangeHandler = (evt) => {
    setSelection(evt.target.value);
  };
  const login = () => {
    dispatch(userActions.setCurrentUser(users[selection]));
    dispatch(authActions.login());
    history.replace("/home");
    // also dispatch somthing to toggle authentication check to true
    // useHistory.replace('/polls'); example for routing
  };
  return (
    <div className={classes.title}>
      <h1 style={{ marginBottom: "-5px" }}>Please Log-In</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
          User
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          onChange={selectionChangeHandler}
          color="primary"
        >
          {Object.keys(users).map((user) => (
            <MenuItem key={user} value={user}>
              {users[user].name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        color="primary"
        className={classes.login}
        variant="contained"
        onClick={login}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
