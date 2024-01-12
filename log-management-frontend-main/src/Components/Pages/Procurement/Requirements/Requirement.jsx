import React, { Fragment, useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { Plus, Target, Info, CheckCircle } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs, Btn } from "../../../../AbstractElements";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import {
  boqTableColumn,
  RFQTableColumn,
} from "../../../../Data/Table/Defaultdata";
import {
  listIntents,
  procurementRequirementList,
} from "../../../../redux/actions/procurementActions";
import { getCurrentUser } from "../../../../redux/constants";

const ProcurementRequirements = () => {
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  const history = useNavigate();

  const { procurement_Requirement_List, intentListRes, error } = useSelector(
    (state) => state.procurementRes
  );

  useEffect(async () => {
    dispatch(listIntents({ vendor_id: await getCurrentUser().id }));
  }, []);

  useEffect(() => {
    dispatch(procurementRequirementList());
  }, []);

  console.log("procurement_Requirement_List", procurement_Requirement_List);

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Requirement Requests"
        title="Procurement Requirement Requests"
        parent="Procurement"
      />
      <Container fluid={true}>
        <Row className="project-card">
          <Col md="12" className="project-list">
            <Card>
              {/* <Row>
                <Col md="6">
                  <Nav tabs className="border-tab">
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          setActiveTab("1");
                        }}
                      >
                        <Info />
                        Pending
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          setActiveTab("2");
                        }}
                      >
                        <CheckCircle />
                        Approved
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          setActiveTab("3");
                        }}
                      >
                        <Target />
                        All
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col md="6">
                  <div
                    className={"d-flex justify-content-end align-items-center"}
                  >
                    <Link to={"/estimation/boq/create"}>
                      <Btn
                        attrBtn={{
                          color: "primary d-flex align-items-center",
                        }}
                      >
                        <Plus
                          style={{ width: "18px", height: "18px" }}
                          className="me-2"
                        />{" "}
                        {"Create New Bill"}
                      </Btn>
                    </Link>
                  </div>
                </Col>
              </Row> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <DataTableComponent
                  data={procurement_Requirement_List}
                  tableColumns={RFQTableColumn}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProcurementRequirements;
