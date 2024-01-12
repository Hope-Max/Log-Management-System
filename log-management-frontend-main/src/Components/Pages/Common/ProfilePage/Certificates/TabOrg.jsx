import React, { Fragment } from "react";
import { Col, Row, TabPane } from "reactstrap";
import { UL, LI } from "../../../../../AbstractElements";

const TabOrg = ({ exp }) => {
  return (
    <Fragment>
      {exp.map((item, i) => {
        console.log("item", item);
        return (
          <>
            <TabPane tabId={i + 1}>
              <Row className="m-t-20 p-10">
                <Col>
                  <UL>
                    <LI className="p-10">
                      <b>Credential ID</b> : {item?.credential_id}
                    </LI>
                    <LI className="p-10">
                      <b>Credential URL</b> : {item?.crendential_url}
                    </LI>
                  </UL>
                </Col>
              </Row>
              <Row className="p-10">
                <Col>
                  <b>Issue Date :</b>
                  <br />
                  {item?.issue_date}
                </Col>
              </Row>
              <Row className="p-10 m-b-20">
                <Col>
                  <b>Expiry Date :</b>
                  <br />
                  {item?.expiry_date}
                </Col>
              </Row>
            </TabPane>
          </>
        );
      })}
    </Fragment>
  );
};

export default TabOrg;
