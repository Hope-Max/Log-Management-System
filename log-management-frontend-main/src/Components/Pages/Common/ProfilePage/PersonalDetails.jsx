import React, { Fragment } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";
import { toTitleCase } from "../../../../Utils";

const PersonalDetails = ({ user }) => {
  return (
    <Fragment>
      <Card>
        <HeaderCard
          mainClasses="d-flex"
          title={"Personal Details"}
          user={user}
        />
        <CardBody>
          <Row>
            <Col xl="8" md="7" className="xl-100">
              <TabContent>
                <TabPane className="d-flex flex-column" style={{ gap: "1rem" }}>
                  <Row>
                    <Col md="4">Name</Col>:<Col lg="6">{user?.full_name}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Email</Col>:<Col lg="6">{user?.email}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Mobile</Col>:<Col>{user?.phone}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Date of Birth</Col>:<Col>{user?.dob}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Prsent Address</Col>:
                    <Col lg="6">{user?.address1}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Prsent Address</Col>:
                    <Col lg="6">{user?.address2}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Gender</Col>:
                    <Col lg="6">{toTitleCase(user?.gender ?? "")}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Nationality</Col>:
                    <Col lg="6">{user?.nationality}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Religion</Col>:
                    <Col lg="6">{user?.religion}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Marital Status</Col>:
                    <Col lg="6">{user?.marital_status}</Col>
                  </Row>
                  {user?.marital_status === "Married" && (
                    <Row>
                      <Col md="4">Anniversary</Col>:
                      <Col lg="6">{user?.anniversary}</Col>
                    </Row>
                  )}
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default PersonalDetails;
