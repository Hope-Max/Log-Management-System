import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, Btn, H5, P } from "../../../AbstractElements";
import "./index.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import {
  dummytabledata,
  leaveTableColumns,
  pastExpenseTableColumns,
} from "../../../Data/Table/Defaultdata";
import {
  expenseCategories,
  leaveTimeType,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import { department } from "../../../redux/constants";
import { Info, PlusCircle, Target } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseAction,
  listExpenseAction,
  updateExpenseAction,
} from "../../../redux/actions/expenseActions";
import { ListUsers, getProfile } from "../../../redux/actions/commonApiAction";
import { SET_INITIAL_EXPENSE } from "../../../redux/actions/types";
import { Textarea } from "@mobiscroll/react-lite";

const ExpenseAndTravels = () => {
  const [filterDepartment, setFilterDepartment] = useState({
    value: "null",
    label: "Select department",
  });
  const [activeTab, setActiveTab] = useState("open");
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [rejectModal, setRejectModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [projectList, setProjectList] = useState({
    label: "Select Project...",
    value: null,
  });
  const { addExpenseSuccess, expenseListData, updateExpenseSuccess, error } =
    useSelector((state) => state.expenseRes);
  const { usersList, profile } = useSelector((state) => state.commonApi);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    user_id: JSON.parse(localStorage.getItem("user"))?.id,
    head: "",
    amount: 0,
    description: "",
    date: "2023-12-12",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    //console.log("User", profile)
    let projects = profile?.projects?.map((project) => {
      console.log(project);
      return {
        label: project?.name,
        value: project?.id,
      };
    });
    //console.log("projects", projects)
    setProjectList(projects);
  }, [profile]);

  useEffect(() => {
    dispatch(listExpenseAction(activeTab));
  }, [activeTab]);

  useEffect(() => {
    setExpenseList(expenseListData);
  }, [expenseListData]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(addExpenseSuccess).length !== 0) {
        setSubmit(false);
        setModal(false);
        dispatch({ type: SET_INITIAL_EXPENSE, payload: {} });
        dispatch(listExpenseAction(activeTab));
      } else if (!!error?.data) {
        setSubmit(false);
        // setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_EXPENSE, payload: {} });
      }
    }
  }, [addExpenseSuccess]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateExpenseSuccess).length !== 0) {
        setSubmit(false);
        setRejectModal(false);
        setCancelReason("");
        setExpenseId(null);
        dispatch({ type: SET_INITIAL_EXPENSE, payload: {} });
        dispatch(listExpenseAction(activeTab));
      } else if (!!error?.data) {
        setSubmit(false);
        // setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_EXPENSE, payload: {} });
      }
    }
  }, [updateExpenseSuccess]);

  const toggle = () => setModal(!modal);
  const toggle1 = () => setRejectModal(!rejectModal);

  const handleDepartmentFilter = (e) => {
    const { value } = e;
    setFilterDepartment(e);
  };

  useEffect(() => {
    const organizationExpenseList = expenseListData;
    if (filterDepartment?.value) {
      let filteredExpenses = organizationExpenseList?.filter(
        (item) => item?.department == filterDepartment?.value
      );
      setExpenseList(filteredExpenses ?? []);
    } else {
      setExpenseList(expenseListData);
    }
  }, [filterDepartment]);

  const handleOnChange = (e, type = null, name) => {
    if (type == "select") {
      setPayload({ ...payload, [name]: e.value });
    } else if (type == "date") {
      setPayload({ ...payload, [name]: e.target.value });
    } else {
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpenseAction(payload));
    setSubmit(true);
  };

  const handleReject = (e) => {
    e.preventDefault();
    dispatch(
      updateExpenseAction({
        id: expenseId,
        status: "rejected",
        cancel_reason: cancelReason,
      })
    );
    setSubmit(true);
  };

  const expenseTableColumns = [
    {
      name: "S. No.",
      cell: (row, index) => index + 1,
      width: "4.25rem",
      center: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      center: false,
    },
    {
      name: "Category",
      selector: (row) => `${row.head}`,
      sortable: true,
      center: true,
    },
    {
      name: "Department",
      selector: (row) => `${row.department}`,
      sortable: true,
      center: true,
    },
    {
      name: "Amount",
      selector: (row) => `${row.amount}`,
      sortable: true,
      center: true,
    },
    {
      name: "Requested Date",
      selector: (row) => `${row.date}`,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => `${row.description}`,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => {
        let statusClassName =
          row.status == "open"
            ? "badge-light-info"
            : row.status == "approved"
            ? "badge-light-success"
            : "badge-light-danger";
        return (
          <span className={`badge ${statusClassName}`}>
            {row?.status?.toUpperCase()}
          </span>
        );
      },
      sortable: true,
      center: true,
    },
  ];

  //console.log('expenseListData', expenseListData);

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Expense & Travels"
        parent="Me"
        title="Expense & Travels"
      />
      <Container fluid={true}>
        <Col md="12" className="project-list">
          <Card>
            <Row className="align-items-center">
              <Col md="8">
                <Row>
                  <Col md="6">
                    <Nav tabs className="border-tab">
                      <NavItem>
                        <NavLink
                          className={activeTab === "open" ? "active" : ""}
                          onClick={() => {
                            setActiveTab("open");
                            setFilterDepartment({
                              value: "null",
                              label: "Select department",
                            });
                          }}
                        >
                          <Target />
                          {"Pending expense"}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={activeTab === "past" ? "active" : ""}
                          onClick={() => {
                            setActiveTab("past");
                            setFilterDepartment({
                              value: "null",
                              label: "Select department",
                            });
                          }}
                        >
                          <Info />
                          {"Past claims"}
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
              </Col>
              <Col md="4">
                <div className="text-end">
                  <Btn
                    attrBtn={{
                      className: "btn btn-air-primary",
                      color: "primary",
                    }}
                    onClick={toggle}
                  >
                    Add expense
                  </Btn>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col className="mainCardHeader">
                    <div className="paddingTop">
                      <p>Expense & Travels</p>
                    </div>
                  </Col>
                  <Col md="3" className="ms-auto">
                    <FormGroup className="form-group">
                      {/* <Label className=" col-form-label text-start">{'Department'}</Label> */}
                      <Select
                        options={department}
                        className="js-example-basic-single "
                        defaultValue={{
                          value: "null",
                          label: "Filter department-wise",
                        }}
                        value={filterDepartment}
                        onChange={(v) => handleDepartmentFilter(v)}
                        // isMulti
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="open">
                    <Row>
                      <DataTableComponent
                        data={expenseList}
                        tableColumns={expenseTableColumns}
                      />
                    </Row>
                  </TabPane>
                  <TabPane tabId="past">
                    <Row>
                      <DataTableComponent
                        data={expenseList}
                        tableColumns={pastExpenseTableColumns}
                      />
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle} className={"leave-modal-css"}>
        <ModalHeader toggle={toggle} className="d-flex justify-content-center">
          Add Expense
        </ModalHeader>
        <ModalBody>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Row className="d-flex gap-10">
                <Col md="4 mb-4 m-l-10">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Expense title"}
                    </Label>
                    <Input
                      className="form-control"
                      type="text"
                      name="title"
                      required
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="4 mb-4 m-l-10">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Date"}
                    </Label>
                    <Input
                      className="form-control"
                      type="date"
                      required
                      onChange={(e) => handleOnChange(e, "date", "date")}
                    />
                  </FormGroup>
                </Col>
                <Col md="3 mb-3 p-l-10">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Department"}
                    </Label>
                    <Select
                      options={department}
                      className="js-example-basic-single "
                      value={department?.find(
                        (obj) => obj.value === payload?.value
                      )}
                      onChange={(e) =>
                        handleOnChange(e, "select", "department")
                      }
                      // isMulti
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="d-flex gap-10">
                <Col md="4 mb-4 m-l-10">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Amount"}
                    </Label>
                    <Input
                      className="form-control"
                      type="text"
                      required
                      name="amount"
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>

                <Col md="4 mb-4">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Expense Category "}
                    </Label>
                    <Select
                      options={expenseCategories}
                      className="js-example-basic-single"
                      // value={}
                      required
                      onChange={(e) => handleOnChange(e, "select", "head")}
                    />
                  </FormGroup>
                </Col>
                {payload?.head === "Project Expense" && (
                  <Col md="3 mb-3">
                    <FormGroup className="form-group row">
                      <Label className=" col-form-label text-start">
                        {"Project / Coast center"}
                      </Label>
                      <Select
                        options={projectList}
                        className="js-example-basic-single"
                        // value={{ value: 'FH', label: 'First half' }}
                      />
                    </FormGroup>
                  </Col>
                )}
              </Row>

              <Row className="d-flex gap-10">
                <Col md="4 mb-4 m-l-10">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Description"}
                    </Label>
                    <textarea
                      className="form-control"
                      type="text"
                      required
                      name="description"
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="4 mb-4 m-l-10">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Upload receipt"}
                    </Label>
                    <Input className="form-control" type="file" />
                  </FormGroup>
                </Col>
              </Row>

              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add expense
                </Button>{" "}
              </ModalFooter>
            </Form>
          </Row>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={rejectModal}
        toggle={toggle1}
        className={"leave-modal-css"}
      >
        <ModalHeader toggle={toggle1} className="d-flex justify-content-center">
          Add Expense
        </ModalHeader>
        <ModalBody>
          <Row>
            <Form onSubmit={handleReject}>
              <Row className="d-flex gap-10">
                <Col md="4 mb-4 m-l-10">
                  <FormGroup className="form-group row">
                    <Label className=" col-form-label text-start">
                      {"Expense title"}
                    </Label>
                    <Textarea
                      className="form-control"
                      type="text"
                      name="title"
                      required
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <ModalFooter>
                <Button color="secondary" onClick={toggle1}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Rejected
                </Button>{" "}
              </ModalFooter>
            </Form>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ExpenseAndTravels;
