import React, { Fragment, useEffect } from "react";
import GreetingCard from "./GreetingCard";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const history = useNavigate();
  useEffect(() => {
    // if (JSON.parse(localStorage.getItem("user"))?.password_reseted == 1) {
    //   history("/set-password");
    // }
  }, []);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Dashboard" parent="Dashboard" title="" />
      <Container fluid={true}>
        <Row>
          {/* <GreetingCard /> */}
          <iframe src="https://localhost:5601/app/dashboards#/view/0621c2d0-2fc6-11ee-8aa6-6d2da7336f01?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=()&show-query-input=true&show-time-filter=true" height="600" width="800"></iframe>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DashBoard;
