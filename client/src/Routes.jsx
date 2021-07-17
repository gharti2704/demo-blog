import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Activate from "./components/Activate";
import Private from "./components/Private";
import Feed from "./components/Feed";
import PrivateRoute from "./components/PrivateRoute";
import PostRoute from "./components/PostRoute";
import Post from "./components/Post";
import UpdateProfileRoute from "./components/UpdateProfileRoute";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/ResetPassword";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/activate/:token" component={Activate} />
        <PrivateRoute exact path="/private" component={Private} />
        <Route exact path="/feed" component={Feed} />
        <PostRoute exact path="/post" component={Post} />
        <Route exact path="/password" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <UpdateProfileRoute
          exact
          path="/update-profile"
          component={UpdateProfile}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
