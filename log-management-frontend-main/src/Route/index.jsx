import React from "react";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  configureFakeBackend,
  authHeader,
  handleResponse,
} from "../Services/fack.backend";
import Callback from "../Auth/Callback";
import Loader from "../Layout/Loader";
import LayoutRoutes from "../Route/LayoutRoutes";
import Signin from "../Auth/Signin";
import PrivateRoute from "./PrivateRoute";
import { classes } from "../Data/Layouts";
import { authRoutes } from "./AuthRoutes";
import SetPassword from "../Auth/Tabs/LoginTab/setPassword";

// setup fake backend
configureFakeBackend();
const Routers = () => {
  const currentUser = useState(false)[0];
  const [authenticated, setAuthenticated] = useState(false);
  const jwt_token = localStorage.getItem("token");
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    let abortController = new AbortController();
    const requestOptions = { method: "GET", headers: authHeader() };
    fetch("/users", requestOptions).then(handleResponse);

    setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return () => {
      abortController.abort();
    };
  }, []);

  console.log(
    "JSON.parse(localStorage.getItem",
    localStorage.getItem("jwtToken"),
    JSON.parse(localStorage.getItem("user"))?.password_reseted == 1
  );

  return (
    <BrowserRouter basename={"/"}>
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={"/"} element={<PrivateRoute />}>
              {localStorage.getItem("jwtToken") ? (
                JSON.parse(localStorage.getItem("user"))?.password_reseted ==
                  1 ? (
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}`}
                    element={
                      <Navigate to={`${process.env.PUBLIC_URL}/set-password`} />
                    }
                  />
                ) : (
                  <>
                    <Route
                      exact
                      path={`${process.env.PUBLIC_URL}`}
                      element={
                        <Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />
                      }
                    />
                    <Route
                      exact
                      path={`/`}
                      element={
                        <Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />
                      }
                    />
                  </>
                )
              ) : (
                <Route
                  exact
                  path={`/`}
                  element={<Navigate to={`${process.env.PUBLIC_URL}/login`} />}
                />
              )}
              <Route path={`/*`} element={<LayoutRoutes />} />
            </Route>
            <Route
              path={`${process.env.PUBLIC_URL}/callback`}
              render={() => <Callback />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              element={<Signin />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/set-password`}
              element={<SetPassword />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/mfa/login`}
              element={<Signin />}
            />
            {authRoutes.map(({ path, Component }, i) => (
              <Route
                path={path}
                render={(props) => <Component {...props} props={"HOLA"} />}
                key={i}
              />
            ))}
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  );
};

export default Routers;
