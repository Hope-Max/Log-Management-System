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
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";

import { Plus, Target, Info, CheckCircle } from "react-feather";
import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import { Breadcrumbs, Btn, H6, P } from "../../../../AbstractElements";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";

import {
  listRFQ,
  listVendors,
  updateRFQ,
} from "../../../../redux/actions/procurementActions";
import Select from "react-select";
import { isEmpty } from "../../../../redux/constants";
import { toast } from "react-toastify";
import moment from "moment";

const RequestQuotations = () => {
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  const history = useNavigate();

  const { rfqList, rfqData, vendorsList, error } = useSelector(
    (state) => state.procurementRes
  );
  const [RFQId, setRFQId] = useState(null);
  const [modal, setModal] = useState(false);
  const [vendorList, setVendorsList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [payload, setPayload] = useState({
    vendors: [],
    type: "",
    id: null,
  });

  useEffect(() => {
    if (!isEmpty(vendorsList)) {
      let ll = vendorsList?.map((item) => {
        return {
          label: `${item.name}, Company Name - ${item.company_name ?? "N/A"}`,
          value: item?.id,
        };
      });
      console.log("vendorsList", ll);
      setVendorsList(ll);
    }
  }, [vendorsList]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(rfqData).length !== 0) {
        setSubmit(false);
        toast.success("RFQ created successfully");
        // history(`${process.env.PUBLIC_URL}/procurement/quotation-requests`);
        setRFQId(null);
        toggle();
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [rfqData]);

  useEffect(() => {
    dispatch(listRFQ());
    dispatch(listVendors());
  }, []);

  const toggle = () => setModal(!modal);

  const handleOnChange = (e, type = null, name, i) => {
    // console.log('NONO', e.target.name, e.target.value);
    if (type === "select") {
      // console.log("name", name, e);
      if (name === "phone") {
        setPayload({
          ...payload,
          country_code: e.split("-")[0],
          phone: e.split("-")[1],
        });
      } else {
        setPayload({ ...payload, [name]: e.value });
      }
    } else if (type === "date") {
      // console.log(e)
      // setPayload({ ...payload, [name]: moment(e).format('YYYY-MM-DD') }); -> use in case of DatePicker
      setPayload({ ...payload, [name]: e.target.value });
    } else if (type === "multi") {
      console.log("vendors", payload.vendors, e);
      setPayload({ ...payload, vendors: e.map((obj) => obj.value) });
    } else {
      // console.log("e", e.target.name, e.target.value);
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    dispatch(
      updateRFQ({
        items: {
          meta: {
            vendors: payload.vendors,
          },
          products: [],
          type: payload?.type,
          status: "sent",
          expire_at: payload?.expire_at,
        },
        id: payload?.id,
      })
    );
  };

  const QuotationRequestsTableColumn = [
    {
      name: "S. No.",
      cell: (row, index) => index + 1,
      width: "4.25rem",
      center: true,
    },
    {
      name: "Title",
      selector: (row) => {
        return (
          <div
            onClick={() =>
              history(
                `${process.env.PUBLIC_URL}/procurement/quotation-responses/${row.id}`
              )
            }
          >
            <P>{row.title}</P>
          </div>
        );
      },
      sortable: true,
      center: false,
    },
    {
      name: "Project",
      selector: (row) => row?.project?.name,
      sortable: true,
      center: false,
    },
    {
      name: "Description",
      selector: (row) => row["description"],
      sortable: true,
      center: false,
    },
    {
      name: "Status",
      selector: (row) => row["status"],
      sortable: true,
      center: true,
    },

    {
      name: "Action",
      selector: (row) => {
        return (
          <div>
            <div className="cursor__pointer d-flex">
              <div>
                <Link to={`/procurement/manage-quotation-requests/${row?.id}`}>
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="icofont icofont-ui-edit"></i>
                  </span>
                </Link>
              </div>
              <div
                onClick={() => {
                  setPayload({ ...payload, id: row.id });
                  toggle();
                }}
              >
                <span className="m-l-15" style={{ cursor: "pointer" }}>
                  <i
                    className="icofont icofont-ui-delete"
                    style={{ color: "red" }}
                  ></i>
                </span>
              </div>
              <div>
                <span className="m-l-15" style={{ cursor: "pointer" }}>
                  <i
                    className="icofont icofont-ui-delete"
                    style={{ color: "red" }}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        );
      },
      sortable: false,
      center: true,
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Quotation Requests"
        title="Procurement Quotation Requests"
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
                  data={rfqList}
                  tableColumns={QuotationRequestsTableColumn}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Request Quotation From Vendor</ModalHeader>
        <ModalBody>
          <Row>
            <div style={{ paddingInline: "1.25rem" }}>
              <form className="theme-form" onSubmit={handleSubmit}>
                <Row>
                  <Col md="4">
                    <Label>Request Type</Label>
                    <Select
                      options={[
                        { label: "Open Bidding", value: "open_bidding" },
                        {
                          label: "Restricted Bidding",
                          value: "restricted_bidding",
                        },
                        { label: "Directly send to vendors", value: "direct" },
                      ]}
                      value={[
                        { label: "Open Bidding", value: "open_bidding" },
                        {
                          label: "Restricted Bidding",
                          value: "restricted_bidding",
                        },
                        { label: "Directly send to vendors", value: "direct" },
                      ]?.find((item) => item.value == payload?.type)}
                      className=""
                      name="type"
                      onChange={(e) => handleOnChange(e, "select", "type")}
                      required
                    />
                  </Col>
                  <Col md="4">
                    <Label>Expiry Date</Label>
                    <input
                      className="form-control"
                      name="expire_at"
                      type="datetime-local"
                      min={moment(new Date()).format("YYYY-MM-DD")}
                      required
                      value={payload?.expire_at}
                      onChange={(e) => handleOnChange(e, "date", "expire_at")}
                    />
                  </Col>
                </Row>
                {(payload.type == "restricted_bidding" ||
                  payload.type == "direct") && (
                  <Row className="m-b-30">
                    <Col>
                      <Label>Vendors</Label>
                      <Select
                        options={vendorList}
                        className="js-example-basic-single col-sm-12"
                        defaultValue={
                          vendorsList &&
                          vendorsList?.map((item) => {
                            if (payload?.vendors?.includes(item.id))
                              return {
                                label: `${item.name}, Company Name - ${
                                  item.company_name ?? "N/A"
                                }`,
                                value: item?.id,
                              };
                          })
                        }
                        isMulti
                        onChange={(e) => handleOnChange(e, "multi")}
                      />

                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </Row>
                )}
                <ModalFooter>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>{" "}
                </ModalFooter>
              </form>
            </div>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default RequestQuotations;
