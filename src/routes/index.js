import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import Customers from "../Pages/Customers";
import New from "../Pages/New";
export default () => {
  let history = useHistory();
  let location = useLocation();
  const { signed } = useContext(AuthContext);
  if (signed) {
    if (location.pathname === "/" || location.pathname === "/register")
      history.push("/dashboard");
  }
  let PrivateRoute = ({ children, ...rest }) => {
    return <Route {...rest}>{signed ? children : <Redirect to="/" />}</Route>;
  };

  return (
    <>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute exact path="/customers">
          <Customers />
        </PrivateRoute>
        <PrivateRoute exact path="/new">
          <New />
        </PrivateRoute>
        <PrivateRoute exact path="/new/:id">
          <New />
        </PrivateRoute>
        <Route exact path="/register">
          <SignUp />
        </Route>
      </Switch>
    </>
  );
};

/*

import { Switch } from "react-router";
import Route from "./Route";
import SingIn from "../Pages/SingIn";
import SingUp from "../Pages/SingUp";
import Dashboard from "../Pages/Dashboard";
export default () => {
  return (
    <Switch>
      <Route exact path="/" component={SingIn} />
      <Route exact path="/register" component={SingUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};




*/
