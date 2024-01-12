import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { getCurrentUser } from "../redux/constants";
import AppLayout from "../Layout/Layout";
import {
  routes,
  vendorRoutes
} from "./Routes";

const LayoutRoutes = () => {
  return (
    <>
      <Routes>
        {getCurrentUser()?.userType === "vendor"
          ?
          (vendorRoutes.map(({ path, Component }, i) => (
            <Fragment key={i}>
              <Route element={<AppLayout />} key={i}>
                <Route path={path} element={Component} />
              </Route>
            </Fragment>
          )))
          :
          (routes.map(({ path, Component }, i) => (
            <Fragment key={i}>
              <Route element={<AppLayout />} key={i}>
                <Route path={path} element={Component} />
              </Route>
            </Fragment>
          )))
        }
      </Routes>
    </>
  );
};

export default LayoutRoutes;
