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
                    <LI>
                      <b>Start Date</b> : {item?.start_date}
                    </LI>
                    <LI>
                      <b>End Date</b> : {item?.end_date}
                    </LI>
                  </UL>
                </Col>
              </Row>
              <Row className="p-10 m-b-20">
                <Col>
                  <b>Description :</b>
                  <br />
                  {item?.job_description}
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
