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
  VendorTableColumns,
} from "../../../../Data/Table/Defaultdata";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../../redux/constants";
import { deleteUserAction } from "../../../../redux/actions/authAction";
import {
  CLIENT_DETAIL_SUCCESS,
  SET_INITIAL_AUTH,
  VENDOR_SHOW_SUCCESS,
} from "../../../../redux/actions/types";
import {
  ClientsList,
  deleteClient,
} from "../../../../redux/actions/projectActions";
import { listVendors } from "../../../../redux/actions/procurementActions";

const Vendors = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [submit, setSubmit] = useState(false);
  const { deleteUserRes } = useSelector((state) => state.auth);
  const { vendorsList, deleteClientSuccess, error } = useSelector(
    (state) => state.procurementRes
  );
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch({ type: VENDOR_SHOW_SUCCESS, payload: {} });
    dispatch(listVendors());
  }, []);

  useEffect(() => {
    if (submit) {
      if (Object.keys(deleteClientSuccess).length !== 0) {
        setSubmit(false);
        dispatch(listVendors());
        // history(`${process.env.PUBLIC_URL}/me/leave`);
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [deleteClientSuccess]);

  useEffect(() => {
    let rowData = [];

    console.log("Backedn userlist", vendorsList);

    !isEmpty(vendorsList) &&
      vendorsList?.map((item) =>
        rowData?.push({
          company_name: item?.company_name ?? 'N/A',
          category: item?.category ?? "N/A",
          name: item?.name,
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
                <Link to={`/procurement/vendors/edit/${item?.id}`}>
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="icofont icofont-ui-edit"></i>
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
    console.log("vendorsList!!", rowData);
    setTableData(rowData);
  }, [vendorsList]);
  console.log("vendorsList", tableData);
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Vendors"
        parent="Project Management"
        title="Vendors"
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
                    <H5>Vendors</H5>
                  </div>
                  <Link to={"/procurement/vendors/add"}>
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
                      {"Add new Vendor"}
                    </Btn>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <DataTableComponent
                  data={tableData}
                  tableColumns={VendorTableColumns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Vendors;
