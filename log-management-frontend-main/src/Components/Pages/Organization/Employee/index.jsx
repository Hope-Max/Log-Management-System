import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Breadcrumbs, Btn, H5, Image, P } from "../../../../AbstractElements";
import user1 from "../../../../assets/images/user/1.jpg";
import { Plus, Search } from "react-feather";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import { employeeTableColumns } from "../../../../Data/Table/Defaultdata";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListUsers } from "../../../../redux/actions/commonApiAction";
import { isEmpty } from "../../../../redux/constants";
import {
  deleteUserAction,
  resetPassword,
} from "../../../../redux/actions/authAction";
import { SET_INITIAL_AUTH } from "../../../../redux/actions/types";
import { toast } from "react-toastify";
import Select from "react-select";

const Employee = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [submit, setSubmit] = useState(false);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const { usersList } = useSelector((state) => state.commonApi);
  const [userTableData, setUserTableData] = useState([]);
  const { deleteUserRes, error } = useSelector((state) => state.auth);
  const [type, setType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    dispatch(ListUsers());
  }, []);

  useEffect(() => {
    if (submit) {
      if (Object.keys(deleteUserRes).length !== 0) {
        setSubmit(false);
        dispatch(ListUsers());
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
        toast.success("User Deleted Successfully");
        toggle();
        // history(`${process.env.PUBLIC_URL}/me/leave`);
      } else if (!!error?.data) {
        setSubmit(false);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [deleteUserRes]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    !isEmpty(usersList) && setUserTableData(usersList);
  }, [usersList]);

  useEffect(() => {
    if (!isEmpty(searchText)) {
      if (type === "Name") {
        let postSearchData = usersList?.filter((item) =>
          item?.full_name?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setUserTableData(postSearchData);
      } else if (type === "Departments") {
        let postSearchData = usersList?.filter((item) =>
          item?.department?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setUserTableData(postSearchData);
      } else if (type === "Designation") {
        let postSearchData = usersList?.filter((item) =>
          item?.designation?.title
            ?.toLowerCase()
            ?.includes(searchText?.toLowerCase())
        );
        setUserTableData(postSearchData);
      } else if (type === "Employee Id") {
        let postSearchData = usersList?.filter((item) =>
          item?.employee_id?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setUserTableData(postSearchData);
      } else if (type === "Email") {
        let postSearchData = usersList?.filter((item) =>
          item?.email?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setUserTableData(postSearchData);
      }
    } else {
      setUserTableData(usersList);
    }
  }, [type, searchText]);

  useEffect(() => {
    let rowData = [];

    console.log("Backedn userlist", userTableData);

    !isEmpty(userTableData) &&
      userTableData?.map((item) =>
        rowData?.push({
          name: (
            <Media
              className="d-flex"
              onClick={() =>
                history(
                  `${process.env.PUBLIC_URL}/organization/employee/${item?.id}`,
                  { state: { id: item?.id } }
                )
              }
            >
              <Image
                attrImage={{
                  className: "rounded-circle img-30 me-3",
                  src: item?.photo_url ? item?.photo_url : `${user1}`,
                  alt: "Generic placeholder image",
                }}
                style={{ height: "30px" }}
              />
              <Media
                body
                className="align-self-center"
                style={{ color: "black" }}
              >
                <div>{item.full_name}</div>
              </Media>
            </Media>
          ),
          email: item?.email ?? "N/A",
          userRole: item?.userRole?.toUpperCase(),
          employee_id: item?.employee_id ?? "N/A",
          department: item?.department ?? "N/A",
          designation: !isEmpty(item?.designation)
            ? item?.designation?.title
            : "N/A",
          supervisor: !isEmpty(item?.supervisor)
            ? item?.supervisor.full_name
            : "N/A",
          is_active: item?.is_active ? (
            <span className="badge badge-light-primary">Active</span>
          ) : (
            <span className="badge badge-light-primary">InActive</span>
          ),
          priority: (
            <div>
              <div className="cursor__pointer d-flex">
                <Link to={`/organization/employee/edit-employee/${item?.id}`}>
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="icofont icofont-ui-edit"></i>
                  </span>
                </Link>
                <div
                  onClick={() => {
                    setUserId(item?.id);
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
                <div
                  onClick={() => {
                    dispatch(resetPassword(item?.id));
                    setSubmit(true);
                  }}
                  style={{ color: "green" }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="fa fa-key"></i>
                  </span>
                </div>
              </div>
            </div>
          ),
          // budget: '$3142.00'
        })
      );
    console.log("userTableData!!", rowData);
    setTableData(rowData);
  }, [userTableData]);
  console.log("usersList", tableData);
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Employee"
        parent="Organization"
        title="Employee"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <H5>My Employees</H5>
                  </div>
                  <Link to={"/organization/employee/add-employee"}>
                    <Btn
                      attrBtn={{
                        color: "primary d-flex align-items-center",
                        // onClick: openTaskWrapper
                      }}
                    >
                      <Plus
                        style={{ width: "18px", height: "18px" }}
                        className="me-2"
                      />{" "}
                      {"Add new Employee"}
                    </Btn>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="3 mb-3">
                    <Label>Filter Type</Label>
                    <Select
                      options={[
                        {
                          label: "Name",
                          value: "Name",
                        },
                        {
                          label: "Email",
                          value: "Email",
                        },
                        {
                          label: "Employee Id",
                          value: "Employee Id",
                        },
                        {
                          label: "Departments",
                          value: "Departments",
                        },
                        {
                          label: "Designation",
                          value: "Designation",
                        },
                      ]}
                      className="js-example-basic-single col-sm-12"
                      required
                      name="nationality"
                      value={{
                        label: type,
                        value: type,
                      }}
                      onChange={(e) => setType(e.value)}
                    />
                  </Col>
                  <Col md="9 mb-3">
                    <Label>Search Employee {type && `by ${type}`}</Label>
                    <div className="job-filter">
                      <div className="faq-form">
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Search.."
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Search className="search-icon" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <DataTableComponent
                  data={tableData}
                  tableColumns={employeeTableColumns}
                  highlightOnHover={true}
                  pointerOnHover
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete</ModalHeader>
        <ModalBody>Are you sure want to delete this user.</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(deleteUserAction(userId));
              setSubmit(true);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Employee;
