import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Breadcrumbs, Btn, H5 } from "../../../../AbstractElements";
import { Plus } from "react-feather";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import { productTableColumns } from "../../../../Data/Table/Defaultdata";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../../redux/constants";
import { productList } from "../../../../redux/actions/procurementActions";

const Products = () => {
  const dispatch = useDispatch();
  const { productsListData } = useSelector((state) => state.procurementRes);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(productList());
  }, []);

  console.log("productsListData!!", productsListData);

  useEffect(() => {
    let rowData = [];

    !isEmpty(productsListData) &&
      productsListData?.map((item) =>
        rowData?.push({
          name: item?.name,
          description: <div>{item.description}</div>,
          brand: item?.brand,
          model: item?.model,
          category: (
            <span className="badge badge-light-primary">{item?.category}</span>
          ),
          qty_available: item?.qty_available,
          priority: (
            <div>
              <div className="cursor__pointer ">
                <Link to={`/procurement/products/edit/${item?.id}`}>
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="icofont icofont-ui-edit"></i>
                  </span>
                </Link>
              </div>
            </div>
          ),
          // budget: '$3142.00'
        })
      );
    console.log("productsListData!!", rowData);
    setTableData(rowData);
  }, [productsListData]);
  console.log("productsListData", tableData);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Products" parent="Procurement" title="Products" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <H5>Products</H5>
                  </div>
                  <Link to={"/procurement/products/add"}>
                    <Btn
                      attrBtn={{ color: "primary d-flex align-items-center" }}
                    >
                      <Plus
                        style={{ width: "18px", height: "18px" }}
                        className="me-2"
                      />{" "}
                      {"Add new Product"}
                    </Btn>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <DataTableComponent
                  data={tableData}
                  tableColumns={productTableColumns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Products;
