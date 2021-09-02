import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& div.MuiToggleButtonGroup-root": {
      backgroundColor: "#cddafa",
    },
    "& span.MuiToggleButton-label": { color: "black" },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
  },
  navMenu: {
    flexGrow: 1,
    margin: "0 0.9rem",
  },
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch((state) => state.user.logoutHandler);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };

  const [location, setLocation] = useState("home");

  const locationHandler = (event, newLocation) => {
    console.log(
      "location: ",
      location,
      "\nnewLocation: ",
      newLocation,
      typeof newLocation
    );
    if (newLocation && location !== newLocation) {
      setLocation(newLocation);
      history.push(`/${newLocation}`);
    }
  };

  const navToggle = (
    <ToggleButtonGroup value={location} exclusive onChange={locationHandler}>
      <ToggleButton value="home">Home</ToggleButton>
      <ToggleButton value="newQuestion">New Question</ToggleButton>
      <ToggleButton value="results">Results</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.menuButton}>
        <Toolbar>
          {isAuth && (
            <Typography variant="h6" className={classes.title}>
              {currentUser.name}
            </Typography>
          )}
          {isAuth && <div className={classes.navMenu}>{navToggle}</div>}
          {isAuth && (
            <Button
              color="secondary"
              variant="contained"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
