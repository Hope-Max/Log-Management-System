import React, { Fragment } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";
import {
  getWorkTenure,
  remainingProbationPeriod,
  toTitleCase,
} from "../../../../Utils";

const WorkDetails = ({ user }) => {
  return (
    <Fragment>
      <Card>
        <HeaderCard mainClasses="d-flex" title={"Work Details"} user={user} />
        <CardBody>
          <Row>
            <Col xl="8" md="7" className="xl-50">
              <TabContent>
                <TabPane className="d-flex flex-column" style={{ gap: "1rem" }}>
                  <Row>
                    <Col md="4">Employee ID</Col>:<Col>{user?.employee_id}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Work Email</Col>:<Col>{user?.email}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Employee Type</Col>:
                    <Col>{toTitleCase(user?.staff_type ?? "")}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Department</Col>:
                    <Col>{user?.department}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Designation</Col>:
                    <Col>{user?.designation?.title}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Supervisor</Col>:
                    <Col>{user?.supervisor?.full_name}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Date of Joining</Col>:<Col>{user?.doj}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Work Tenure</Col>:
                    <Col>{`${getWorkTenure(user?.doj ?? 0)} Years`}</Col>
                  </Row>
                  {user?.is_probation === 1 && (
                    <Row>
                      <Col md="4">Remaining Probation period</Col>:
                      <Col>
                        {remainingProbationPeriod(
                          user?.doj,
                          user?.probation_period_in_months
                        )}
                      </Col>
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

export default WorkDetails;
