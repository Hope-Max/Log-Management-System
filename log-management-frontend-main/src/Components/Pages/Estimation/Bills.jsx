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

import { Breadcrumbs, Btn } from "../../../AbstractElements";
import { Plus, Target, Info, CheckCircle } from "react-feather";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boqList } from "../../../redux/actions/estimationActions";
import {
  boqTableColumn,
} from "../../../Data/Table/Defaultdata";

const Bills = () => {
  const [activeTab, setActiveTab] = useState("3");
  const dispatch = useDispatch();
  // const history = useNavigate();

  const { boq_list } = useSelector((state) => state.estimation);
  const [boqListFilteredData, setBoqFilteredData] = useState([]);

  useEffect(() => {
    dispatch(boqList());
  }, []);

  useEffect(() => {
    console.log("activeTab", activeTab, boqListFilteredData);
    if (activeTab == "1") {
      setBoqFilteredData(boq_list.filter((item) => item.status != "approved"));
    } else if (activeTab == "2") {
      setBoqFilteredData(boq_list.filter((item) => item.status == "approved"));
    } else {
      setBoqFilteredData(boq_list);
    }
  }, [activeTab, boq_list]);

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Bill of Qauntities"
        title="BOQ"
        parent="Estimation"
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
                    <Link
                      to={"/estimation/boq/create"}
                    // onClick={() =>
                    //   setTimeout(() => window?.location.reload(), 300)
                    // }
                    >
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
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <DataTableComponent
                  data={boqListFilteredData}
                  tableColumns={boqTableColumn}
                  highlightOnHover={true}
                  pointerOnHover
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Bills;
