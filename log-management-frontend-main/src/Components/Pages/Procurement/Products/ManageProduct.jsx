import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

import {
  createClient,
  getClientDetails,
  updateClient,
} from "../../../../redux/actions/projectActions";

import { Breadcrumbs, Btn, H5 } from "../../../../AbstractElements";
import { isEmpty } from "../../../../redux/constants";

import "react-phone-input-2/lib/style.css";
import {
  createProduct,
  getProductDetails,
  listVendors,
  updateProduct,
} from "../../../../redux/actions/procurementActions";
import Select from "react-select";

const AddProduct = (props) => {
  const dispatch = useDispatch();

  const [dimension, setDimension] = useState("");
  const [value, setValue] = useState("");
  const [dimensionsData, setDimensionsData] = useState([
    {
      attr: "",
      value: "",
    },
  ]);

  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [vendorList, setVendorsList] = useState([]);
  const { id } = useParams();

  const history = useNavigate();
  const {
    createProductSuccess,
    updateProductSuccess,
    vendorsList,
    productData,
    loading,
    error,
  } = useSelector((state) => state.procurementRes);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
    dispatch(listVendors());
  }, [id]);

  useEffect(() => {
    if (!isEmpty(vendorsList)) {
      let ll = vendorsList?.map((item) => {
        return {
          label: item.company_name,
          value: item?.id,
        };
      });
      console.log("vendorsList", ll);
      setVendorsList(ll);
    }
  }, [vendorsList]);

  const [payload, setPayload] = useState({
    name: productData?.name ?? "",
    brand: productData?.brand ?? "",
    model: productData?.model ?? "",
    category: productData?.category ?? "",
    barcode: productData?.barcode ?? "",
    qty_available: productData?.qty_available ?? 0,
    dimensions: productData?.dimensions ?? [],
    usage: productData?.usage ?? "",
    description: productData?.description ?? "",
    vendors: productData?.vendors ?? [],
  });

  useEffect(() => {
    if (!isEmpty(productData)) {
      setPayload({
        id: productData?.id ?? null,
        name: productData?.name ?? "",
        brand: productData?.brand ?? "",
        model: productData?.model ?? "",
        category: productData?.category ?? "",
        barcode: productData?.barcode ?? "",
        qty_available: productData?.qty_available ?? 0,
        dimensions: productData?.dimensions ?? [],
        usage: productData?.usage ?? "",
        description: productData?.description ?? "",
        vendors: productData?.vendors ?? [],
      });
      if (!isEmpty(productData?.dimensions)) {
        setDimensionsData(productData?.dimensions);
      }
    }
  }, [productData]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(createProductSuccess).length !== 0) {
        setSubmit(false);
        console.log("LOGALOGA", createProductSuccess);
        // setStep(1);
        history(`${process.env.PUBLIC_URL}/procurement/products`);
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
      }
    }
  }, [createProductSuccess]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateProductSuccess).length !== 0) {
        setSubmit(false);
        history(`${process.env.PUBLIC_URL}/procurement/products`);
      } else if (!!error?.data) {
        setSubmit(false);
        console.log("VERIFY ", error);
        setErrorMsg(error?.data?.msg);
      }
    }
  }, [updateProductSuccess]);

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
      setPayload({ ...payload, vendors: e.map((obj) => obj.value) });
    } else {
      // console.log("e", e.target.name, e.target.value);
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const updateFieldChanged = (e, index, type = null, name) => {
    let newArr = dimensionsData.map((item, i) => {
      if (index === i) {
        if (type === "select") {
          return { ...item, [name]: e.value };
        } else if (type === "date") {
          return { ...item, [name]: e.target.value };
        } else {
          return { ...item, [name]: e.target.value };
        }
      } else {
        return item;
      }
    });
    setDimensionsData(newArr);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (payload) {
      console.log("payload", payload);
      if (isEmpty(productData)) {
        setSubmit(true);
        dispatch(createProduct({ ...payload, dimensions: dimensionsData }));
      } else {
        setSubmit(true);
        dispatch(updateProduct({ ...payload, dimensions: dimensionsData }));
      }
    }
  };

  const extraDimensionRow = () => {
    console.log("dimensionsDatadimensionsData", dimensionsData);
    return (
      dimensionsData &&
      dimensionsData?.length > 1 &&
      dimensionsData.map((item, i) => {
        if (i !== dimensionsData?.length - 1)
          return (
            <Row>
              <Col md="4 mb-3">
                <Label>Attribute Name</Label>
                <input
                  className="form-control"
                  name="attr"
                  placeholder="Ex. Length / Height / Power / Weight"
                  value={item.attr}
                />
              </Col>
              <Col md="4 mb-3">
                <Label>Attribute Value</Label>
                <input
                  className="form-control"
                  name="value"
                  placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                  value={item.value}
                />
              </Col>
              <Col md="4 mb-3" style={{ display: "flex", alignItems: "end" }}>
                <Btn
                  attrBtn={{ color: "transparent" }}
                  onClick={() => {
                    setDimensionsData(
                      dimensionsData.filter(function (item, index) {
                        return index !== i;
                      })
                    );
                  }}
                  style={{ color: "red", padding: "0" }}
                >
                  - Remove
                </Btn>
              </Col>
            </Row>
          );
      })
    );
  };

  console.log("dimensionsData", dimensionsData);

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Manage Product"
        parent="Procurement"
        title="Products"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <H5>Product Details</H5>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <p style={{ color: "red", fontSize: 25 }}>{errorMsg}</p>
                </div>
                <Col sm="12">
                  <Form className="needs-validation" onSubmit={onSubmit}>
                    <div className="form-row">
                      <Row>
                        <Col md="4 mb-3">
                          <Label>Title*</Label>
                          <input
                            className="form-control"
                            name="name"
                            type="text"
                            placeholder="Enter title of the product"
                            required
                            value={payload?.name}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col md="4 mb-3">
                          <Label>Brand</Label>
                          <input
                            className="form-control"
                            name="brand"
                            type="text"
                            placeholder="brand"
                            required
                            value={payload?.brand}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col md="4 mb-3">
                          <Label>Model</Label>
                          <input
                            className="form-control"
                            name="model"
                            type="text"
                            placeholder="model"
                            required
                            value={payload?.model}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4 mb-3">
                          <Label>Category</Label>
                          <input
                            className="form-control"
                            name="category"
                            type="text"
                            placeholder="ex: Fuel, Food"
                            required
                            value={payload?.category}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col md="4 mb-3">
                          <Label>Barcode</Label>
                          <input
                            className="form-control"
                            name="barcode"
                            type="text"
                            placeholder="Ex: 10000001"
                            value={payload?.barcode}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col md="4 mb-3">
                          <Label>Available Quantity</Label>
                          <input
                            className="form-control"
                            name="qty_available"
                            type="number"
                            //pattern="\d"
                            placeholder="0"
                            value={payload?.qty_available}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>

                        {/* <Col md="4 mb-3">
                          <Label>Average Unit Price</Label>
                          <input
                            className="form-control"
                            name="avg_unit_price"
                            type="number"
                            //pattern="\d"
                            placeholder="0"
                            value={payload?.avg_unit_price}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col> */}
                        {/* <Col>
                          <Label>Description</Label>
                          <textarea
                            className="form-control"
                            name="description"
                            type="textarea"
                            placeholder="Enter Description"
                            value={payload?.description}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col> */}
                        {/* <Col md="4 mb-3">
                          <Label>Notes</Label>
                          <input
                            className="form-control"
                            name="notes"
                            type="textarea"
                            placeholder="Enter extra Notes"
                            value={payload?.notes}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col> */}
                      </Row>
                      {extraDimensionRow()}
                      <Row>
                        <Col md="4 mb-3">
                          <Label>Attribute Name</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. Length / Height / Power / Weight"
                            value={
                              dimensionsData[dimensionsData?.length - 1].attr
                            }
                            onChange={(e) => {
                              updateFieldChanged(
                                e,
                                dimensionsData?.length - 1,
                                null,
                                "attr"
                              );
                            }}
                          />
                        </Col>
                        <Col md="4 mb-3">
                          <Label>Attribute Value</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                            onChange={(e) =>
                              updateFieldChanged(
                                e,
                                dimensionsData?.length - 1,
                                null,
                                "value"
                              )
                            }
                            value={
                              dimensionsData[dimensionsData?.length - 1].value
                            }
                          />
                        </Col>
                        <Col
                          md="4 mb-3"
                          style={{ display: "flex", alignItems: "end" }}
                        >
                          <Btn
                            attrBtn={{ color: "transparent" }}
                            onClick={() => {
                              dimensionsData[dimensionsData?.length - 1].attr &&
                                dimensionsData[dimensionsData?.length - 1]
                                  .value &&
                                setDimensionsData([
                                  ...dimensionsData,
                                  { attr: "", value: "" },
                                ]);
                            }}
                            style={{ color: "#7366ff", padding: "0" }}
                          >
                            + Add More Dimension
                          </Btn>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mb-3">
                          <Label>Usage</Label>
                          <textarea
                            className="form-control"
                            name="usage"
                            type="textarea"
                            rows={2}
                            placeholder=""
                            required
                            value={payload?.usage}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                      </Row>
                      <Row className="m-b-30">
                        <Col>
                          <Label>Description</Label>
                          <textarea
                            className="form-control"
                            name="description"
                            type="textarea"
                            rows={3}
                            placeholder="Enter Description"
                            value={payload?.description}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                      </Row>
                      <Row className="m-b-30">
                        <Col>
                          <Label>Vendors</Label>
                          <Select
                            options={vendorList}
                            className="js-example-basic-single col-sm-12"
                            defaultValue={vendorsList?.map((item) => {
                              if (payload?.vendors.includes(item.id))
                                return {
                                  label: item.company_name,
                                  value: item?.id,
                                };
                            })}
                            isMulti
                            onChange={(e) => handleOnChange(e, "multi")}
                          />

                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div
                            className="d-flex flex-row-reverse"
                            style={{ gap: "1rem" }}
                          >
                            <Btn
                              attrBtn={{
                                color: "primary d-flex align-items-end",
                                type: "submit",
                              }}
                            >
                              {isEmpty(productData)
                                ? "Add Product"
                                : "Update Product"}
                            </Btn>

                            <Btn
                              attrBtn={{
                                color: "primary",
                                className: "d-flex align-items-center ",
                              }}
                              style={{
                                gap: "0.5rem",
                                paddingInline: "16px 32px",
                              }}
                              onClick={() =>
                                history(
                                  `${process.env.PUBLIC_URL}/procurement/products`
                                )
                              }
                            >
                              <i className="icofont icofont-reply"></i>
                              {"Cancel"}
                            </Btn>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddProduct;
