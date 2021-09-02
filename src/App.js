import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";
import { questionActions } from "./store/Questions";

import Login from "./store/Login";
import Main from "./components/Main";
import Header from "./components/Header";
import * as backend from "./_DATA";
import { Route, Redirect, Switch } from "react-router-dom";
import NewQuestion from "./components/NewQuestion";
import Results from "./components/Results";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    backend._getUsers().then((users) => {
      dispatch(userActions.setUsers(users));
      dispatch(userActions.setCurrentUser());
    });

    backend._getQuestions().then((data) => {
      const pollKeys = Object.keys(data);
      dispatch(questionActions.setQuestions(data));
      dispatch(questionActions.setKeys(pollKeys));
    });
  }, []);

  return (
    <div>
      <Header />
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      {!isAuth && (
        <Route path="/login">
          <Login />
        </Route>
      )}
      {isAuth && (
        <Switch>
          <Route path="/home">
            <Main />
          </Route>
          <Route path="/newQuestion">
            <NewQuestion />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
