import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import Select from "react-select";
import { DataGrid } from "@mui/x-data-grid";
import CreatableSelect from "react-select/creatable";
import { Breadcrumbs, Btn, H5, H6, P } from "../../../../AbstractElements";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { listProjects } from "../../../../redux/actions/projectActions";
import { updateBoq } from "../../../../redux/actions/estimationActions";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import {
  getCurrentUser,
  isEmpty,
  NoItemsAdded,
} from "../../../../redux/constants";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone-uploader";
import {
  productTableColumns,
  RFQNotEditablecolumns,
} from "../../../../Data/Table/Defaultdata";
import {
  AddBidItems,
  approveIntent,
  createRFQ,
  getBidItems,
  getIntent,
  getRFQ,
  productList,
  RemoveBidItems,
  updateIntent,
  updateIntentToBid,
  updateRFQ,
} from "../../../../redux/actions/procurementActions";
import { Search } from "react-feather";
import { green } from "@mui/material/colors";

const OpenBidding = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id, intent } = useParams();

  console.log("id", id, intent);

  const { projectsList } = useSelector((state) => state.projectRes);
  const [quantity, setQuantity] = useState(0);
  const [unit_price, setUnitPrice] = useState(0);
  const {
    vendorBidItemRes,
    rfqData,
    addBidItemRes,
    removeBidItemRes,
    updateIntentRes,
    getInstantRes,
    updateRealIntentRes,
    error,
  } = useSelector((state) => state.procurementRes);

  const [projects, setProjects] = useState([]);
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    project_id: null,
    label: "",
  });

  const initial_item = {
    product_id: null,
    name: "",
    description: "",
    brand: "",
    model: "",
    dimensions: {},
    notes: null,
    quantity: 0,
    is_mandatory: false,
  };
  const [item, setItem] = useState(initial_item);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [products, setProducts] = useState([]);
  const [addItemsFrom, setAddItemsForm] = useState(false);
  const [deliveryScheduleData, setDeliveryScheduleData] = useState([
    {
      address: "",
      quantity: "",
      delivery_date: new Date(),
    },
  ]);
  const [submit, setSubmit] = useState(false);
  const [dimensionsData, setDimensionsData] = useState([
    {
      attr: "",
      value: "",
    },
  ]);
  const [boqId, setBoqId] = useState(null);
  const [index, setIndex] = useState(1);
  const [RFQrowSelectionModel, setRFQRowSelectionModel] = useState([]);
  const [newRFQRowSelectionModel, setNewRFQrowSelectionModel] = useState([]);

  useEffect(async () => {
    if (id && intent) {
      dispatch(getRFQ({ id: id }));
      dispatch(getIntent(intent));
      dispatch(
        getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
      );
    }
  }, [id]);

  useEffect(() => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    setRFQItems(vendorBidItemRes);
  }, [vendorBidItemRes]);

  useEffect(async () => {
    if (submit) {
      if (Object.keys(updateIntentRes).length !== 0) {
        setSubmit(false);
        toggle();
        dispatch(getRFQ({ id: id }));
        dispatch(getIntent(intent));
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      } else if (!!error?.data) {
        setSubmit(false);
        toggle();
        dispatch(getRFQ({ id: id }));
        dispatch(getIntent(intent));
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      }
    }
  }, [updateIntentRes]);

  useEffect(async () => {
    if (submit) {
      if (Object.keys(updateRealIntentRes).length !== 0) {
        setSubmit(false);
        setModal2(false);
        setModal3(false);
        dispatch(getRFQ({ id: id }));
        dispatch(getIntent(intent));
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      } else if (!!error?.data) {
        setSubmit(false);
        setModal2(false);
        setModal3(false);
        dispatch(getRFQ({ id: id }));
        dispatch(getIntent(intent));
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      }
    }
  }, [updateRealIntentRes]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(vendorBidItemRes).length !== 0) {
        setSubmit(false);
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [vendorBidItemRes]);

  useEffect(async () => {
    if (submit) {
      if (Object.keys(addBidItemRes).length !== 0) {
        setSubmit(false);
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      } else if (!!error?.data) {
        setSubmit(false);
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      }
    }
  }, [addBidItemRes]);

  useEffect(async () => {
    if (submit) {
      if (Object.keys(removeBidItemRes).length !== 0) {
        setSubmit(false);
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      } else if (!!error?.data) {
        setSubmit(false);
        dispatch(
          getBidItems({ rfq_id: id, vendor_id: await getCurrentUser().id })
        );
      }
    }
  }, [removeBidItemRes]);

  const [items, setItems] = useState([
    {
      id: index,
      sr_no: index,
      boq_id: boqId,
      type: "",
      subtype: "",
      name: "",
      description: "",
      unit: "",
      quantity: null,
      unit_price: null,
      markup_percentage: null,
      area: "",
    },
  ]);

  const [RFQitems, setRFQItems] = useState([]);

  useEffect(() => {
    if (!isEmpty(rfqData)) {
      console.log("boq_by_id", rfqData);
      setItems(rfqData?.rfq_products);
      !isEmpty(rfqData?.rfq_products) &&
        setIndex(rfqData?.rfq_products[rfqData?.rfq_products?.length - 1]?.id);
      setAddItemsForm(true);
    }
  }, [rfqData]);

  useEffect(() => {
    dispatch(listProjects());
  }, []);

  useEffect(() => {
    console.log("newRFQRowSelectionModel", newRFQRowSelectionModel);
    if (newRFQRowSelectionModel?.length > 1) {
      toast.error("Please select only one row at a time.");
      setNewRFQrowSelectionModel([]);
      setItem(initial_item);
      setDimensionsData([
        {
          attr: null,
          value: "null",
        },
      ]);
      setQuantity(0);
    } else if (newRFQRowSelectionModel?.length == 1) {
      let selectedRow = rfqData?.rfq_products?.find(
        (obj) => obj.id == newRFQRowSelectionModel[0]
      );
      console.log("selectedRow!!", selectedRow);
      setItem({
        product_id: selectedRow?.product?.id,
        ...selectedRow?.product,
      });
      setDimensionsData(selectedRow?.product?.dimensions);
      setQuantity(selectedRow?.quantity);
    }
  }, [newRFQRowSelectionModel]);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);
  const toggle3 = () => setModal3(!modal3);

  useEffect(() => {
    let allProjects = projectsList?.map((project) => {
      return {
        label: project?.name,
        value: project?.id,
      };
    });
    setProjects(allProjects);
  }, [projectsList]);

  const handleShortlistSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    dispatch(updateIntent({ id: intent, items: { status: "shortlisted" } }));
  };

  const updateFieldChanged = (e, index, type = null, name, funcName = null) => {
    console.log("updateFieldChanged", e, index, type, name);

    if (funcName) {
      let newArr = deliveryScheduleData.map((item, i) => {
        if (index === i) {
          console.log("deliveryScheduleData", item, i);
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
      console.log("updateFieldChanged", newArr);
      setDeliveryScheduleData(newArr);
      return;
    }
    let newArr = dimensionsData.map((item, i) => {
      if (index === i) {
        console.log("updateFieldChanged", item, i);
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
    console.log("updateFieldChanged", newArr);
    setDimensionsData(newArr);
  };

  const handleSubmit = async (e, type = null) => {
    e.preventDefault();
    setSubmit(true);
    dispatch(
      updateIntentToBid({ rfq_id: id, vendor_id: await getCurrentUser().id })
    );
  };

  const handleApproveBidSubmit = async (e, type = null) => {
    e.preventDefault();
    setSubmit(true);
    setSubmit(true);
    dispatch(approveIntent({ id: intent, items: { rfq_id: id } }));
  };

  console.log("rowSelectionModel", item);
  const AddItem = () => {
    return (
      <>
        <Card>
          <CardBody>
            <Row className="m-b-20">
              <Col style={{ textAlign: "center" }}>
                <H5>Items' Details</H5>
              </Col>
            </Row>
            <Row className="m-b-10">
              <Col md="4">
                <FormGroup>
                  <Label>Product Title*</Label>
                  <input
                    className="form-control"
                    name="name"
                    value={item?.name}
                    disabled
                    placeholder=""
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Brand*</Label>
                  <input
                    className="form-control"
                    name="brand"
                    placeholder=""
                    value={item?.brand}
                    disabled
                    onChange={(e) =>
                      setItem({
                        ...item,
                        brand: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Model*</Label>
                  <input
                    className="form-control"
                    name="model"
                    placeholder=""
                    value={item?.model}
                    disabled
                    onChange={(e) =>
                      setItem({
                        ...item,
                        model: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="m-b-10">
              <Col>
                <FormGroup>
                  <Label>Description</Label>
                  <textarea
                    className="form-control"
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "0.375rem",
                    }}
                    name="description"
                    rows="2"
                    required
                    value={item?.description}
                    onChange={(e) =>
                      setItem({
                        ...item,
                        description: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            {dimensionsData &&
              dimensionsData?.length > 1 &&
              dimensionsData.map((item, i) => {
                if (i !== dimensionsData?.length - 1)
                  return (
                    <Row>
                      <Col md="4 mb-3">
                        <FormGroup>
                          <Label>Attribute Name</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. Length / Height / Power / Weight"
                            value={item.attr}
                            onChange={(e) =>
                              updateFieldChanged(e, i, null, "attr")
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4 mb-3">
                        <FormGroup>
                          <Label>Attribute Value</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                            value={item.value}
                            onChange={(e) =>
                              updateFieldChanged(e, i, null, "value")
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col
                        md="4 mb-3"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Btn
                          attrBtn={{ color: "transparent" }}
                          onClick={() => {
                            let newDimensions = dimensionsData.filter(function (
                              obj,
                              index
                            ) {
                              return index !== i;
                            });
                            //   delete newDimensions[`${key}`];
                            setDimensionsData(newDimensions);
                          }}
                          style={{ color: "red", padding: "0" }}
                        >
                          - Remove
                        </Btn>
                      </Col>
                    </Row>
                  );
              })}
            <Row>
              <Col md="4 mb-3">
                <FormGroup>
                  <Label>Dimension Attribute</Label>
                  <input
                    className="form-control"
                    placeholder="Ex. Length / Height / Power / Weight"
                    value={dimensionsData[dimensionsData?.length - 1].attr}
                    onChange={(e) => {
                      updateFieldChanged(
                        e,
                        dimensionsData?.length - 1,
                        null,
                        "attr"
                      );
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="4 mb-3">
                <Label>Dimension Value</Label>
                <FormGroup>
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
                    value={dimensionsData[dimensionsData?.length - 1].value}
                  />
                </FormGroup>
              </Col>
              <Col
                md="4 mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Btn
                  attrBtn={{ color: "transparent" }}
                  onClick={() => {
                    dimensionsData[dimensionsData?.length - 1].attr &&
                      dimensionsData[dimensionsData?.length - 1].value &&
                      setDimensionsData([
                        ...dimensionsData,
                        { attr: "", value: "" },
                      ]);
                  }}
                  style={{ color: "#7366ff", padding: "0" }}
                >
                  + Add Extra Attribute
                </Btn>
              </Col>
            </Row>
            {deliveryScheduleData &&
              deliveryScheduleData?.length > 1 &&
              deliveryScheduleData.map((item, i) => {
                if (i !== deliveryScheduleData?.length - 1)
                  return (
                    <Row>
                      <Col md="4 mb-3">
                        <FormGroup>
                          <Label>Delivery Date</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. Length / Height / Power / Weight"
                            value={item.delivery_date}
                            type="date"
                            onChange={(e) =>
                              updateFieldChanged(
                                e,
                                i,
                                "date",
                                "delivery_date",
                                "deliveryScheduleData"
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4 mb-3">
                        <FormGroup>
                          <Label>Delivery Address</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                            value={item.address}
                            onChange={(e) =>
                              updateFieldChanged(
                                e,
                                i,
                                null,
                                "address",
                                "deliveryScheduleData"
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4 mb-3">
                        <FormGroup>
                          <Label>Delivery Quantity</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                            value={item.quantity}
                            onChange={(e) =>
                              updateFieldChanged(
                                e,
                                i,
                                null,
                                "quantity",
                                "deliveryScheduleData"
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col
                        md="4 mb-3"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Btn
                          attrBtn={{ color: "transparent" }}
                          onClick={() => {
                            let newDimensions = deliveryScheduleData.filter(
                              function (obj, index) {
                                return index !== i;
                              }
                            );
                            //   delete newDimensions[`${key}`];
                            setDeliveryScheduleData(newDimensions);
                          }}
                          style={{ color: "red", padding: "0" }}
                        >
                          - Remove
                        </Btn>
                      </Col>
                    </Row>
                  );
              })}
            <Row>
              <H5>Delivery Schedule details</H5>
            </Row>
            <Row>
              <Col md="4 mb-3">
                <FormGroup>
                  <Label>Delivery Date</Label>
                  <input
                    className="form-control"
                    placeholder="Ex. Length / Height / Power / Weight"
                    type="date"
                    value={
                      deliveryScheduleData[deliveryScheduleData?.length - 1]
                        .delivery_date
                    }
                    onChange={(e) => {
                      updateFieldChanged(
                        e,
                        deliveryScheduleData?.length - 1,
                        null,
                        "delivery_date",
                        "deliveryScheduleData"
                      );
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="4 mb-3">
                <Label>Delivery Address</Label>
                <FormGroup>
                  <input
                    className="form-control"
                    placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                    onChange={(e) =>
                      updateFieldChanged(
                        e,
                        deliveryScheduleData?.length - 1,
                        null,
                        "address",
                        "deliveryScheduleData"
                      )
                    }
                    value={
                      deliveryScheduleData[deliveryScheduleData?.length - 1]
                        .address
                    }
                  />
                </FormGroup>
              </Col>
              <Col md="4 mb-3">
                <Label>Delivery Quantity</Label>
                <FormGroup>
                  <input
                    className="form-control"
                    placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                    onChange={(e) =>
                      updateFieldChanged(
                        e,
                        deliveryScheduleData?.length - 1,
                        null,
                        "quantity",
                        "deliveryScheduleData"
                      )
                    }
                    value={
                      deliveryScheduleData[deliveryScheduleData?.length - 1]
                        .quantity
                    }
                  />
                </FormGroup>
              </Col>
              <Col
                md="4 mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Btn
                  attrBtn={{ color: "transparent" }}
                  onClick={() => {
                    deliveryScheduleData[deliveryScheduleData?.length - 1]
                      .address &&
                      deliveryScheduleData[deliveryScheduleData?.length - 1]
                        .delivery_date &&
                      deliveryScheduleData[deliveryScheduleData?.length - 1]
                        .quantity &&
                      setDeliveryScheduleData([
                        ...deliveryScheduleData,
                        {
                          address: "",
                          delivery_date: new Date(),
                          quantity: "",
                        },
                      ]);
                  }}
                  style={{ color: "#7366ff", padding: "0" }}
                >
                  + Add Extra Delivery Schedule
                </Btn>
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Required Quantity*</Label>
                  <input
                    className="form-control"
                    name="quantity"
                    type="tel"
                    value={quantity}
                    disabled
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setItem({
                        ...item,
                        quantity: e.target.value,
                      });
                    }}
                    required
                  />
                  <span style={{ color: "red" }}></span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Unit Price*</Label>
                  <input
                    className="form-control"
                    name="unit_price"
                    type="tel"
                    value={unit_price}
                    onChange={(e) => {
                      setUnitPrice(e.target.value);
                      setItem({
                        ...item,
                        unit_price: e.target.value,
                      });
                    }}
                    required
                  />
                  <span style={{ color: "red" }}></span>
                </FormGroup>
              </Col>
            </Row>
            <Row className="m-b-30 d-flex flex-row-reverse">
              <Col style={{ display: "grid", placeItems: "end" }}>
                <Btn
                  attrBtn={{ color: "primary d-flex align-items-end" }}
                  onClick={async () => {
                    if (
                      item?.name &&
                      item?.brand &&
                      item?.model &&
                      !isEmpty(dimensionsData) &&
                      !isEmpty(deliveryScheduleData)
                    ) {
                      let items = {
                        ...item,
                        dimensions: dimensionsData,
                        delivery_schedule: deliveryScheduleData,
                      };
                      setProducts([...products, items]);
                      setRFQItems([...RFQitems, items]);
                      setDimensionsData([
                        {
                          attr: "",
                          value: "",
                        },
                      ]);
                      setQuantity(0);
                      setItem(initial_item);
                      setSubmit(true);
                      dispatch(
                        AddBidItems({
                          rfq_id: id,
                          vendor_id: await getCurrentUser().id,
                          rfq_product_id: items.id,
                          unit_price: unit_price,
                          product_id: items?.product_id,
                          quantity: quantity,
                          total_amount:
                            parseInt(unit_price) * parseInt(quantity),
                          description: items.description,
                          dimensions: dimensionsData,
                          delivery_schedule: deliveryScheduleData,
                        })
                      );
                    } else {
                      toast.error("Please fill required detail first.");
                    }
                  }}
                >
                  + Add Item
                </Btn>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    );
  };

  const ExpandedComponent = ({ data }) => {
    return (
      <>
        {data.dimensions && (
          <>
            <div
              style={{
                backgroundColor: "#f7f8f9",
                padding: "1rem",
                // boxShadow: "inset 0 0 4px #aeaeae"
              }}
            >
              <H5> Dimensions </H5>
              {!isEmpty(data?.dimensions) &&
                data?.dimensions?.map((item, i) => {
                  return (
                    <Row>
                      <Col md="3">
                        <P>{item?.attr ?? "NA"}</P>
                      </Col>
                      :
                      <Col>
                        <P>{item?.value ?? "NA"}</P>
                      </Col>
                    </Row>
                  );
                })}
            </div>
          </>
        )}
        {data.delivery_schedule && (
          <>
            <div
              style={{
                backgroundColor: "#f7f8f9",
                padding: "1rem",
                // boxShadow: "inset 0 0 4px #aeaeae"
              }}
            >
              <H5> Delivery Schedule </H5>
              {!isEmpty(data?.delivery_schedule) &&
                data?.delivery_schedule?.map((item, i) => {
                  return (
                    <Col>
                      <Row>
                        <Col md="3">
                          <P>{"Delivery Address"}</P>
                        </Col>
                        :
                        <Col>
                          <P>{item?.address ?? "NA"}</P>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3">
                          <P>{"Delivery Date"}</P>
                        </Col>
                        :
                        <Col>
                          <P>{item?.delivery_date ?? "NA"}</P>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3">
                          <P>{"Delivery Quantity"}</P>
                        </Col>
                        :
                        <Col>
                          <P>{item?.quantity ?? "NA"}</P>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
            </div>
          </>
        )}
      </>
    );
  };

  const productColumns = [
    {
      name: "S. No.",
      cell: (row, index) => index + 1,
      width: "4.25rem",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row?.product?.name,
      sortable: true,
      center: false,
    },
    {
      name: "Brand",
      selector: (row) => row?.product?.brand,
      sortable: true,
      center: false,
    },
    {
      name: "Model",
      selector: (row) => row?.product?.model,
      sortable: true,
      center: false,
    },
    {
      name: "Quantity",
      selector: (row) => `${row.quantity}`,
      sortable: true,
      center: true,
    },
    {
      name: "Is Mandatory",
      selector: (row) => `${row?.product?.is_mandatory ? "Yes" : "No"}`,
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      selector: (row, index) => {
        return (
          <>
            {!["submitted", "shortlisted", "approved", "rejected"].includes(
              getInstantRes?.status?.toLowerCase()
            ) && (
                <Btn
                  theme="danger"
                  onClick={() => {
                    setSubmit(true);
                    dispatch(RemoveBidItems(row.id));
                  }}
                >
                  Delete
                </Btn>
              )}
          </>
        );
      },
      sortable: false,
      center: false,
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Manage Bid" title="Manage Bid" parent="Bidding" />
      <Container fluid={true}>
        <>
          <Row>
            {!["submitted", "shortlisted", "approved", "rejected"].includes(
              getInstantRes?.status?.toLowerCase()
            ) && (
                <>
                  <Row md="12">
                    <Row>
                      <Form>
                        <Row>
                          <Col sm="12">
                            <Card>
                              <CardHeader>
                                <Row>
                                  <Col>
                                    <H5>Required Items</H5>
                                  </Col>
                                </Row>
                              </CardHeader>
                              <CardBody>
                                <Row className="m-b-10">
                                  <Col>
                                    <DataGrid
                                      rows={items}
                                      columns={RFQEditableColumns}
                                      experimentalFeatures={{
                                        newEditingApi: true,
                                      }}
                                      initialState={{
                                        pagination: {
                                          paginationModel: {
                                            pageSize: 10,
                                          },
                                        },
                                      }}
                                      onRowSelectionModelChange={(
                                        newRFQRowSelectionModel
                                      ) => {
                                        setNewRFQrowSelectionModel(
                                          newRFQRowSelectionModel
                                        );
                                      }}
                                      rowSelectionModel={newRFQRowSelectionModel}
                                      pageSizeOptions={[10, 20, 30, 40, 50]}
                                      checkboxSelection
                                      isRowEditable={false}
                                      disableRowSelectionOnClick
                                      autoHeight={true}
                                    />
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Form>
                    </Row>
                  </Row>
                  <Row md="12">{AddItem()}</Row>{" "}
                </>
              )}
            <Row md="12">
              <Col>
                <Row>
                  <Form>
                    <Row>
                      <Col sm="12">
                        <Card>
                          <CardHeader>
                            <Row>
                              <Col>
                                <H5>Bidding Items</H5>
                              </Col>

                              <Col>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    gap: "2%",
                                  }}
                                >
                                  <div>
                                    <P style={{ color: "green" }}>
                                      <Label>{"status"}</Label> :
                                      <Label style={{ color: "green" }}>
                                        {getCurrentUser()?.department?.toLowerCase() ==
                                          "director" ||
                                          getCurrentUser()?.department?.toLowerCase() ==
                                          "procurement department"
                                          ? getInstantRes?.status?.toUpperCase()
                                          : getInstantRes?.status ===
                                            "shortlisted"
                                            ? "SUBMITTED"
                                            : getInstantRes?.status?.toUpperCase()}
                                      </Label>
                                    </P>
                                  </div>
                                  {![
                                    "submitted",
                                    "shortlisted",
                                    "approved",
                                    "rejected",
                                  ].includes(
                                    getInstantRes?.status?.toLowerCase()
                                  ) && (
                                      <div>
                                        <Btn
                                          attrBtn={{
                                            color:
                                              "primary d-flex align-items-end",
                                            type: "button",
                                          }}
                                          onClick={toggle}
                                        >
                                          {"Submit Bid"}
                                        </Btn>
                                      </div>
                                    )}
                                  {(getCurrentUser()?.department?.toLowerCase() ==
                                    "director" ||
                                    getCurrentUser()?.department?.toLowerCase() ==
                                    "procurement department") &&
                                    getInstantRes?.status === "submitted" && (
                                      <div>
                                        <Btn
                                          attrBtn={{
                                            color:
                                              "primary d-flex align-items-end",
                                            type: "button",
                                          }}
                                          onClick={toggle2}
                                        >
                                          {"Shortlist Current BID"}
                                        </Btn>
                                      </div>
                                    )}
                                  {getCurrentUser()?.department?.toLowerCase() ==
                                    "director" &&
                                    getInstantRes?.status.toLowerCase() ===
                                    "shortlisted" && (
                                      <div>
                                        <Btn
                                          attrBtn={{
                                            color:
                                              "primary d-flex align-items-end",
                                            type: "button",
                                          }}
                                          onClick={toggle3}
                                        >
                                          {"Approve BID"}
                                        </Btn>
                                      </div>
                                    )}
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <CardBody>
                            <Row className="m-b-10">
                              <Col>
                                <DataTableComponent
                                  data={RFQitems}
                                  tableColumns={productColumns}
                                  noDataComponent={<NoItemsAdded />}
                                  expandableRows
                                  expandableRowsComponent={ExpandedComponent}
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </Col>
            </Row>
          </Row>
        </>
      </Container>

      <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle} className="d-flex justify-content-center">
          <H5> Do you really want to submit the bid?</H5>
        </ModalHeader>
        <ModalBody>
          <div
            className="d-flex justify-content-center m-b-20 text-center"
            style={{ gap: "1rem", paddingInline: "3.5rem" }}
          >
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <FormGroup>
                <Label style={{ color: "red" }}>After the submission of bid you will not be able to edit or update it.</Label>
              </FormGroup>
              <div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
                <Btn
                  className="w-30"
                  type="button"
                  attrBtn={{ className: "btn btn-danger", color: "danger" }}
                  onClick={toggle}
                >
                  Cancel
                </Btn>
                <Btn
                  className="w-30"
                  type="submit"
                  attrBtn={{ className: "btn btn-light", color: "success" }}
                >
                  Submit
                </Btn>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal2} toggle={toggle2} size="md">
        <ModalHeader toggle={toggle2} className="d-flex justify-content-center">
          <H5> Do you really want to shortlist this bid?</H5>
        </ModalHeader>
        <ModalBody>
          <div
            className="d-flex justify-content-center m-b-20 text-center"
            style={{ gap: "1rem", paddingInline: "3.5rem" }}
          >
            <form
              onSubmit={(e) => {
                handleShortlistSubmit(e);
              }}
            >
              <FormGroup>
                <Label style={{ color: "red" }}>Once the bid is hortlisted, it's status can not be changed.</Label>
              </FormGroup>
              <div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
                <Btn
                  className="w-30"
                  type="button"
                  attrBtn={{ className: "btn btn-danger", color: "danger" }}
                  onClick={toggle2}
                >
                  Cancel
                </Btn>
                <Btn
                  className="w-30"
                  type="submit"
                  attrBtn={{ className: "btn btn-success", color: "success" }}
                >
                  Shortlist
                </Btn>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal3} toggle={toggle3} size="md">
        <ModalHeader toggle={toggle3} className="d-flex justify-content-center">
          <H5>Do you really want to approve this Quotation?</H5>
        </ModalHeader>
        <ModalBody>
          <div
            className="d-flex justify-content-center m-b-20 text-center"
            style={{ gap: "1rem", paddingInline: "2.5rem" }}
          >
            <form
              onSubmit={(e) => {
                handleApproveBidSubmit(e);
              }}
            >
              <FormGroup>
                <Label style={{ color: "red" }}>Once the quotation is approved, all other quotations of the requirement will be rejected, so be sure before confirming.</Label>
              </FormGroup>
              <div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
                <Btn
                  className="w-30"
                  type="button"
                  attrBtn={{ className: "btn btn-danger", color: "danger" }}
                  onClick={toggle3}
                >
                  Cancel
                </Btn>
                <Btn
                  className="w-30"
                  type="submit"
                  attrBtn={{ className: "btn btn-success", color: "success" }}
                >
                  Confirm
                </Btn>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default OpenBidding;

const RFQEditableColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
    valueGetter: (params) => {
      return params.row?.product?.name ?? null;
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    editable: false,
    valueGetter: (params) => {
      return params.row?.product?.category ?? null;
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
    editable: false,
  },
  {
    field: "avg_unit_price",
    headerName: "Unit Price (AED)",
    width: 180,
    editable: false,
    valueGetter: (params) => {
      return params.row?.product?.avg_unit_price ?? null;
    },
  },

  {
    field: "is_mandatory",
    headerName: "Mandatory",
    // description: 'This column has a value getter and is not sortable.',
    width: 150,
    valueGetter: (params) => {
      return params.row.is_mandatory ?? false;
    },
    editable: false,
  },
];
