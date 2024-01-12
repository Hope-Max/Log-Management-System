import React, { Fragment } from "react";
import { Col, Row, TabPane } from "reactstrap";
import { UL, LI } from "../../../../../AbstractElements";

const TabOrg = ({ exp }) => {
  return (
    <Fragment>
      {exp.map((item, i) => {
        return (
          <>
            <TabPane tabId={i + 1}>
              <Row className="m-t-20 p-10">
                <Col>
                  <UL>
                    <LI>
                      <b>University</b> : {item?.university}
                    </LI>
                    {/* <LI>
                      <b>Completion Date</b> : {item?.completion_date}
                    </LI> */}
                  </UL>
                </Col>
              </Row>
              <Row className="p-10 m-b-20">
                <Col>
                  <b>Completion Date :</b>
                  <br />
                  {item?.completion_date}
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
