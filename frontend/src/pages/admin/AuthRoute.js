import React from "react";
import { Route, Navigate } from "react-router-dom";

function AuthRoute({ authenticated, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Navigate
            to={{ pathname: "/admin/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
