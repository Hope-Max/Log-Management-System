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

import { Breadcrumbs, Btn } from "../../../../AbstractElements";
import { Plus, Target, Info, CheckCircle } from "react-feather";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RequirementRequestList } from "../../../../redux/actions/projectActions";
import {
  clientTableColumns,
  requirementRequestColumns,
} from "../../../../Data/Table/Defaultdata";

const Requirements = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [activeTab, setActiveTab] = useState("1");

  const { requirementRequestListRes, error } = useSelector(
    (state) => state.projectRes
  );

  useEffect(() => {
    dispatch(RequirementRequestList());
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Requirements"
        title="Requirements"
        parent="Projects"
      />
      <Container fluid={true}>
        <Row className="project-card">
          <Col md="12" className="project-list">
            <Card>
              <Row>
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
                        In Process
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
                        Fullfilled
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
                    <Link to={"/projects/requirements/add"}>
                      <Btn
                        attrBtn={{
                          color: "primary d-flex align-items-center",
                        }}
                      >
                        <Plus
                          style={{ width: "18px", height: "18px" }}
                          className="me-2"
                        />{" "}
                        {"Add Requirement"}
                      </Btn>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <DataTableComponent
                  data={requirementRequestListRes}
                  tableColumns={requirementRequestColumns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Requirements;
