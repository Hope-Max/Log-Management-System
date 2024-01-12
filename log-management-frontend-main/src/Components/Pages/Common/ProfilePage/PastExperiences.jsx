import React, { Fragment, useCallback, useState } from "react";
import { Row, Col, Card, CardBody, TabContent } from "reactstrap";
import HeaderCard from "../../../Common/Component/HeaderCard";
import NavOrg from "./PastExperiences/NavOrg";
import TabOrg from "./PastExperiences/TabOrg";

const PastExperiences = ({ user }) => {
  const [orgactiveTab, setOrgActiveTab] = useState(1);
  const callback = useCallback((tab) => {
    setOrgActiveTab(tab);
  });

  return (
    <Fragment>
      <Card className="mb-0">
        <HeaderCard title={"Past Work Experiences"} user={user} />
        <CardBody className="p-0">
          <Row className="list-persons">
            <NavOrg callback={callback} exp={user?.work_experience ?? []} />
            <Col xl="8" md="7" className="xl-50">
              <TabContent activeTab={orgactiveTab}>
                <TabOrg exp={user?.work_experience ?? []} />
              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default PastExperiences;
