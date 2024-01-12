import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Media,
  Row,
} from "reactstrap";
import { Breadcrumbs, Btn, H5, Image, P } from "../../../../AbstractElements";
import user1 from "../../../../assets/images/user/1.jpg";
import { Plus } from "react-feather";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import {
  clientTableColumns,
  employeeTableColumns,
} from "../../../../Data/Table/Defaultdata";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../../redux/constants";
import { deleteUserAction } from "../../../../redux/actions/authAction";
import {
  CLIENT_DETAIL_SUCCESS,
  SET_INITIAL_AUTH,
} from "../../../../redux/actions/types";
import {
  ClientsList,
  deleteClient,
} from "../../../../redux/actions/projectActions";

const Clients = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [submit, setSubmit] = useState(false);
  const { deleteUserRes } = useSelector((state) => state.auth);
  const {
    clientListData,
    createClientSuccess,
    updateClientSuccess,
    deleteClientSuccess,
    clientData,
    loading,
    error,
  } = useSelector((state) => state.projectRes);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch({ type: CLIENT_DETAIL_SUCCESS, payload: {} });
    dispatch(ClientsList());
  }, []);

  useEffect(() => {
    if (submit) {
      if (Object.keys(deleteClientSuccess).length !== 0) {
        setSubmit(false);
        dispatch(ClientsList());
        // history(`${process.env.PUBLIC_URL}/me/leave`);
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [deleteClientSuccess]);

  useEffect(() => {
    let rowData = [];

    console.log("Backedn userlist", clientListData);

    !isEmpty(clientListData) &&
      clientListData?.map((item) =>
        rowData?.push({
          company: item?.company_name,
          contact_person: <div>{item.full_name}</div>,
          email: item?.email,
          phone: !isEmpty(item?.phone)
            ? "+" + item?.country_code + "-" + item?.phone
            : "N/A",
          is_active: item?.is_active ? (
            <span className="badge badge-light-primary">Active</span>
          ) : (
            <span className="badge badge-light-primary">InActive</span>
          ),
          priority: (
            <div>
              <div className="cursor__pointer ">
                <Link to={`/projects/clients/edit/${item?.id}`}>
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="icofont icofont-ui-edit"> edit</i>
                  </span>
                </Link>
                {/* <Link
                  onClick={() => {
                    dispatch(deleteClient(item?.id));
                    setSubmit(true);
                  }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="icofont icofont-ui-delete"></i>
                  </span>
                </Link> */}
              </div>
            </div>
          ),
          // budget: '$3142.00'
        })
      );
    console.log("clientListData!!", rowData);
    setTableData(rowData);
  }, [clientListData]);
  console.log("clientListData", tableData);
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Clients"
        parent="Project Management"
        title="Clients"
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
                    <H5>Clients</H5>
                  </div>
                  <Link to={"/projects/clients/add"}>
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
                      {"Add new Client"}
                    </Btn>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <DataTableComponent
                  data={tableData}
                  tableColumns={clientTableColumns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Clients;
