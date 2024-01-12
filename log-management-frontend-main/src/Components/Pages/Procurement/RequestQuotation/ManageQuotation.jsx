import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import Select from "react-select";
import { DataGrid } from "@mui/x-data-grid";
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
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import { listProjects } from "../../../../redux/actions/projectActions";
import {
  boqById,
  createBillAction,
  createProcureRequest,
  updateBillTableAction,
  updateBoq,
} from "../../../../redux/actions/estimationActions";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import { isEmpty, NoItemsAdded, NoItemsFound } from "../../../../redux/constants";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone-uploader";
import {
  productTableColumns,
  RFQNotEditablecolumns,
  searchedProductTableColumns,
} from "../../../../Data/Table/Defaultdata";
import {
  createRFQ,
  getRFQ,
  productList,
  updateRFQ,
} from "../../../../redux/actions/procurementActions";
import { Search } from "react-feather";

const ManageQuotation = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  console.log("id", id);

  const { projectsList } = useSelector((state) => state.projectRes);
  const { productsListData, rfqData } = useSelector(
    (state) => state.procurementRes
  );
  const {
    create_boq_success,
    updateBillTableRes,
    boq_by_id,
    updateBoqRes,
    createProcureRes,
    error,
  } = useSelector((state) => state.estimation);

  const [projects, setProjects] = useState([]);
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    project_id: null,
    label: "",
  });
  const [searchText, setSearchText] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [addItemsFrom, setAddItemsForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submit, setSubmit] = useState(false);
  const [boqId, setBoqId] = useState(null);
  const [index, setIndex] = useState(1);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [RFQrowSelectionModel, setRFQRowSelectionModel] = useState([]);

  useEffect(() => {
    if (boqId) {
      dispatch(boqById(boqId));
    }
  }, [boqId]);

  useEffect(() => {
    if (!isEmpty(rfqData)) {
      console.log("rfqData", rfqData);
      setBoqId(rfqData?.project_id);
      setRFQItems(rfqData?.rfq_products);
      setPayload({
        title: rfqData?.title,
        description: rfqData?.description,
        project_id: rfqData?.project_id,
        label: rfqData?.project?.name,
      });
    }
  }, [rfqData]);

  useEffect(() => {
    if (id) {
      dispatch(getRFQ({ id: id }));
    }
  }, [id]);

  useEffect(() => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    if (isEmpty(searchText)) {
      setSearchedProducts(productsListData);
    } else {
      let postSearchData = productsListData?.filter((item) =>
        (item?.name).toLowerCase()?.includes(searchText.toLowerCase())
      );
      setSearchedProducts(postSearchData);
    }
  }, [searchText, productsListData]);

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
    if (!isEmpty(boq_by_id)) {
      console.log("boq_by_id", boq_by_id);
      setItems(boq_by_id?.boq_items);
      !isEmpty(boq_by_id?.boq_items) &&
        setIndex(boq_by_id?.boq_items[boq_by_id?.boq_items?.length - 1]?.id);
      setAddItemsForm(true);
      // setBoqId(boq_by_id?.id);
    }
  }, [boq_by_id]);

  useEffect(() => {
    dispatch(listProjects());
  }, []);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    let allProjects = projectsList?.map((project) => {
      return {
        label: project?.name,
        value: project?.id,
      };
    });
    setProjects(allProjects);
  }, [projectsList]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(create_boq_success).length !== 0) {
        setSubmit(false);
        setBoqId(create_boq_success.id);
        setAddItemsForm(true);
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [create_boq_success]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(createProcureRes).length !== 0) {
        setSubmit(false);
        toast.success("Procurement requirement submitted successfully");
        toggle();
        setAddItemsForm(true);
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [createProcureRes]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateBillTableRes).length !== 0) {
        setSubmit(false);
        history(`${process.env.PUBLIC_URL}/estimation/bills`);
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [updateBillTableRes]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(rfqData).length !== 0) {
        setSubmit(false);
        toast.success("RFQ created successfully");
        history(`${process.env.PUBLIC_URL}/procurement/quotation-requests`);
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [rfqData]);

  const handleOnChange = (e, type = null, name) => {
    if (type === "select") {
      setPayload({ ...payload, [name]: e.value });
    } else if (type === "date") {
      setPayload({ ...payload, [name]: moment(e).format("YYYY-MM-DD") });
    } else {
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const createBill = (e) => {
    e.preventDefault();
    dispatch(createBillAction(payload));
    setSubmit(true);
  };
  const handleCellEditCommit = (e) => {
    console.log("handleCellEditCommit", e);
    console.log("editedItems", e.id, RFQitems);
    let editedItems = RFQitems.filter((obj) => obj.id != e.id);
    console.log("editedItems", editedItems);
    let finalEditedItems = [...editedItems, e];
    console.log("finalEditedItems", finalEditedItems);
    setRFQItems(finalEditedItems?.sort((a, b) => a.id - b.id));
  };

  const handleDeleteRow = () => {
    let deletedRow = items.filter(
      (obj) => !RFQrowSelectionModel.includes(obj.id)
    );
    console.log("deltedRow", deletedRow);
    if (deletedRow?.length == 0) {
      setRFQItems(deletedRow?.sort((a, b) => a.id - b.id));
    }
    setRFQItems(deletedRow);
    setRFQRowSelectionModel([]);
  };

  const getToProcureItems = () => {
    let deletedRow = items.filter((obj) => rowSelectionModel.includes(obj.id));
    console.log("deltedRow", deletedRow);
    if (deletedRow?.length == 0) {
      setIndex(0);
      setItems(deletedRow?.sort((a, b) => a.id - b.id));
    }
    setRowSelectionModel([]);
    return deletedRow;
  };

  const handleSubmit = (e, type = null) => {
    e.preventDefault();
    if (RFQitems.length && !type) {
      let withoutIdPayload = RFQitems.map((item) => ({
        product_id: item?.product_id,
        quantity: item?.quantity,
        is_mandatory: item?.is_mandatory ? true : false,
        rfq_id: rfqData?.id,
      }));
      setSubmit(true);
      dispatch(
        updateRFQ({
          items: {
            title: payload?.title,
            description: payload?.description,
            project_id: payload?.project_id,
            products: withoutIdPayload,
            boq_id: rfqData?.boq_id,
          },
          id: id,
        })
      );
    } else if (type == "approval") {
      setSubmit(true);
      dispatch(
        updateBoq({
          items: {
            id: boqId,
            status: "approved",
            approved_by: JSON.parse(localStorage.getItem("user")).id,
          },
          id: boqId,
        })
      );
    }
  };

  const handleToProcureItems = async (e) => {
    e.preventDefault();
    setSubmit(true);
    let toProcureItems = await getToProcureItems();
    dispatch(
      createProcureRequest({
        items: {
          project_id: boq_by_id?.project?.id,
          title: title,
          description: description,
          products: toProcureItems,
        },
        id: boqId,
      })
    );
  };

  const handleAddProduct = (data) => {
    if (RFQitems?.find((obj) => obj.id == data.id)) {
      toast.error("Product is already added.");
    } else setRFQItems([...RFQitems, data]);
  };

  console.log("rowSelectionModel", searchedProducts);

  const ExpandedComponent = ({ data }) =>
    data ? (
      <div
        style={{
          backgroundColor: "#f7f8f9",
          padding: "1rem"
          // boxShadow: "inset 0 0 4px #aeaeae"
        }}
      >
        <Row>
          <Row>
            <Col md="6">
              <P>Product Name</P>
            </Col>
            :
            <Col>
              <P>{data.name}</P>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <P>Average Price</P>
            </Col>
            :
            <Col>
              <P>{data?.avg_unit_price ?? "NA"}</P>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <P>Available Quantity</P>
            </Col>
            :
            <Col>
              <P>{data?.qty_available ?? "NA"}</P>
            </Col>
          </Row>
          {!isEmpty(data?.dimensions) &&
            data?.dimensions?.map((item, i) => {
              return (
                <Row>
                  <Col md="6">
                    <P>{item?.attr ?? "NA"} :</P>
                  </Col>
                  :
                  <Col>
                    <P>{item?.value ?? "NA"}</P>
                  </Col>
                </Row>
              );
            })}
        </Row>
        <Row>
          <Col className="m-t-20">
            <Btn
              attrBtn={{
                color: "primary d-flex align-items-end",
                type: "button",
                // className: "ms-auto"
              }}
              onClick={() => handleAddProduct(data)}
            >
              Add Product
            </Btn>
          </Col>
        </Row>
      </div>
    ) : (
      <></>
    );

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Manage RFQ"
        title="Manage RFQ"
        parent="Procurement"
      />
      <Container fluid={true}>
        <>
          <Row>
            <Row md="12">
              <Row>
                <Form>
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardHeader>
                          <Row>
                            <Col>
                              <H5>
                                {boq_by_id?.status !== "approved"
                                  ? "Procure Items"
                                  : "Add Items"}
                              </H5>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          <Row className="m-b-10">
                            <Col>
                              <DataGrid
                                rows={items}
                                columns={RFQNotEditablecolumns}
                                experimentalFeatures={{ newEditingApi: true }}
                                initialState={{
                                  pagination: {
                                    paginationModel: {
                                      pageSize: 10,
                                    },
                                  },
                                }}
                                onRowSelectionModelChange={(
                                  newRowSelectionModel
                                ) => {
                                  setRowSelectionModel(newRowSelectionModel);
                                }}
                                rowSelectionModel={rowSelectionModel}
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
            <Row md="12">
              <Col md="8">
                <Row>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="12">
                        <Card>
                          <CardHeader>
                            <Row>
                              <Col>
                                <H5>
                                  {boq_by_id?.status !== "approved"
                                    ? "Create RFQ"
                                    : "Add Items"}
                                </H5>
                              </Col>

                              <Col>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    gap: "2%",
                                  }}
                                >
                                  {!isEmpty(RFQrowSelectionModel) && (
                                    <div>
                                      <Btn
                                        attrBtn={{
                                          color:
                                            "danger d-flex align-items-end",
                                          type: "button",
                                        }}
                                        onClick={handleDeleteRow}
                                      >
                                        Delete
                                      </Btn>
                                    </div>
                                  )}
                                  {/* <div>
                                      <Btn
                                        attrBtn={{
                                          color:
                                            "primary d-flex align-items-end",
                                          type: "button",
                                        }}
                                        onClick={(e) =>
                                          handleSubmit(e, "approval")
                                        }
                                      >
                                        {"Submit for Approval"}
                                      </Btn>
                                    </div> */}
                                  <div>
                                    <Btn
                                      attrBtn={{
                                        color: "primary d-flex align-items-end",
                                        type: "button",
                                      }}
                                      type="submit"
                                    >
                                      {"Update RFQ"}
                                    </Btn>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <CardBody>
                            {/* <Row className="m-b-20">
                              <Col style={{ textAlign: "center" }}>
                                <H5>Requirement Details</H5>
                              </Col>
                            </Row> */}
                            <Row className="m-b-10">
                              <Col md="8">
                                <FormGroup>
                                  <Label>Title</Label>
                                  <input
                                    className="form-control"
                                    name="title"
                                    placeholder="Requirement title"
                                    onChange={handleOnChange}
                                    value={payload?.title}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Project</Label>
                                  <Select
                                    options={projects}
                                    value={{
                                      label: payload?.label,
                                      value: payload.project_id,
                                    }}
                                    className=""
                                    name="project_id"
                                    onChange={(e) =>
                                      handleOnChange(e, "select", "project_id")
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
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
                                    rows="3"
                                    value={payload?.description}
                                    onChange={handleOnChange}
                                    required
                                  />
                                  <span style={{ color: "red" }}></span>
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row className="m-b-10">
                              <Col>
                                <DataGrid
                                  rows={RFQitems}
                                  columns={RFQEditableColumns}
                                  onCellEditCommit={handleCellEditCommit}
                                  processRowUpdate={handleCellEditCommit}
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
                                  onRowEditCommit={(e) =>
                                    console.log("onRowEditCommit", e)
                                  }
                                  onRowSelectionModelChange={(
                                    newRowSelectionModel
                                  ) => {
                                    setRFQRowSelectionModel(
                                      newRowSelectionModel
                                    );
                                  }}
                                  rowSelectionModel={RFQrowSelectionModel}
                                  pageSizeOptions={[10, 20, 30, 40, 50]}
                                  checkboxSelection
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
              </Col>
              <Col md="4">
                <Row>
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col md="7">
                          <div className="job-filter">
                            <div className="faq-form">
                              <Input
                                className="form-control w-100"
                                type="text"
                                placeholder="Search Product.."
                                value={searchText}
                                onChange={(e) =>
                                  setSearchText(e.target.value)
                                }
                              />
                              <Search className="search-icon" />
                            </div>
                          </div>
                        </Col>
                        <Col md="5">
                          <Btn
                            attrBtn={{
                              color: "primary d-flex align-items-end",
                              className: "ms-auto",
                              type: "button"
                            }}
                            onClick={() =>
                              history(
                                `${process.env.PUBLIC_URL}/procurement/products/add`
                              )
                            }
                          >
                            Create Product
                          </Btn>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col
                          style={{
                            marginInline: "0.75rem",
                            border: "1px solid #ced4da",
                            borderRadius: "0.375rem",
                            paddingBottom: "1rem"
                          }}
                        >
                          <Row>
                            <Col>
                              <DataTableComponent
                                data={searchedProducts}
                                tableColumns={searchedProductTableColumns}
                                noDataComponent={<NoItemsFound />}
                                expandableRows
                                expandableRowsComponent={
                                  ExpandedComponent
                                }
                                pagination={false}
                                highlightOnHover
                                pointerOnHover
                                striped={false}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Row>
              </Col>
            </Row>
          </Row>
        </>
      </Container>
    </Fragment>
  );
};

export default ManageQuotation;

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
    editable: true,
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
    editable: true,
  },
];
