import React, { Fragment } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";
import {
  getWorkTenure,
  remainingProbationPeriod,
  toTitleCase,
} from "../../../../Utils";

const BankDetails = ({ user }) => {
  return (
    <Fragment>
      <Card>
        <HeaderCard mainClasses="d-flex" title={"Bank Details"} user={user} />
        <CardBody>
          <Row>
            <Col xl="8" md="7" className="xl-50">
              <TabContent>
                <TabPane className="d-flex flex-column" style={{ gap: "1rem" }}>
                  <Row>
                    <Col md="4">Bank Name</Col>:<Col>{user?.bank_name}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Acc. Holder Name</Col>:
                    <Col>{user?.bank_account_holder}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Account No.</Col>:
                    <Col>{toTitleCase(user?.bank_account_no)}</Col>
                  </Row>
                  <Row>
                    <Col md="4">Bank Code</Col>:
                    <Col>{user?.bank_code ?? "N/A"}</Col>
                  </Row>
                  <Row>
                    <Col md="4">IBAN No.</Col>:<Col>{user?.bank_iban_no}</Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default BankDetails;
