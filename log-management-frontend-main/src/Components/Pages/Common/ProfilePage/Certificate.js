import React, { Fragment, useCallback, useState } from "react";
import { Card, CardBody, Col, Row, TabContent } from "reactstrap";
import { P } from "../../../../AbstractElements";
import { NoDataFound } from "../../../../Constant";
import HeaderCard from "../../../Common/Component/HeaderCard";
import NavOrg from "./Certificates/NavOrg";
import TabOrg from "./Certificates/TabOrg";

const Certificate = ({ title, user }) => {
  const [orgactiveTab, setOrgActiveTab] = useState(1);
  const callback = useCallback((tab) => {
    setOrgActiveTab(tab);
  });

  console.log("user", user);

  return (
    <Fragment>
      <Card className="mb-0">
        <HeaderCard title={title} user={user} />
        <CardBody className="p-0">
          <Row className="list-persons">
            <NavOrg
              callback={callback}
              exp={user?.certificates_details ?? []}
            />
            <Col xl="8" md="7" className="xl-50">
              <TabContent activeTab={orgactiveTab}>
                <TabOrg exp={user?.certificates_details ?? []} />
              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Certificate;
