import React, { Fragment } from "react";
import { TabContent, TabPane } from "reactstrap";
import NoDataFoundClass from "./NoDataFound";
import WorkDetails from "./WorkDetails";
import PersonalDetails from "./PersonalDetails";
import PastExperiences from "./PastExperiences";
import Certificate from "./Certificate";
import BankDetails from "./BankDetails";

const TabComponent = ({ activeTab, user }) => {
  return (
    <Fragment>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <PersonalDetails user={user} />
        </TabPane>
        <TabPane tabId="2">
          <WorkDetails user={user} />
        </TabPane>
        <TabPane tabId="3">
          <PastExperiences user={user} />
        </TabPane>
        <TabPane tabId="4">
          <NoDataFoundClass title={"Educational Details"} user={user} />
        </TabPane>
        <TabPane tabId="5">
          <Certificate title={"Certificates"} user={user} />
        </TabPane>
        <TabPane tabId="6">
          <BankDetails title={"Bank Details"} user={user} />
        </TabPane>
        <TabPane tabId="7">
          <NoDataFoundClass title={"Visa Details"} />
        </TabPane>
        <TabPane tabId="8">
          <NoDataFoundClass title={"Other Details"} />
        </TabPane>
        <TabPane tabId="9">
          <NoDataFoundClass title={"Documents"} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default TabComponent;
