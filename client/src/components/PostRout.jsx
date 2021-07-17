import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../helpers/auth";

const PostRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signup",
            state: { from: props.location },
          }}
        />
      )
    }
  ></Route>
);

export default PostRoute;
