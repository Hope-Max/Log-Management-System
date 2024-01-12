import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import Select from "react-select";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumbs, Btn, H5, H6 } from "../../../AbstractElements";
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
import { listProjects } from "../../../redux/actions/projectActions";
import {
  boqById,
  createBillAction,
  createProcureRequest,
  updateBillTableAction,
  updateBoq,
} from "../../../redux/actions/estimationActions";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { getAdminBasedAccess, isEmpty } from "../../../redux/constants";
import { toast } from "react-toastify";

const EditBOQ = () => {
  const dispatch = useDispatch();
  useEffect(() => { }, []);
  const history = useNavigate();
  const { id } = useParams();

  console.log("id", id);

  const { projectsList } = useSelector((state) => state.projectRes);
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
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [addItemsFrom, setAddItemsForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submit, setSubmit] = useState(false);
  const [boqId, setBoqId] = useState(null);
  const [index, setIndex] = useState(1);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(boqById(id));
    }
    return () => {
      console.log("props", "val.current");
      setRowSelectionModel([]);
      setIndex(1);
      setSubmit(false);
      setProjects([]);
      setAddItemsForm(false);
    };
  }, [id]);

  const columns = [
    { field: "sr_no", headerName: "Sr. No.", width: 90, editable: true },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      editable: true,
    },
    {
      field: "subtype",
      headerName: "Sub Type",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Item Description",
      flex: 1,
      minWidth: 400,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 150,
      editable: true,
    },
    {
      field: "unit_price",
      headerName: "Unit Price (AED)",
      width: 180,
      editable: true,
    },
    {
      field: "total",
      headerName: "Total (AED)",
      // description: 'This column has a value getter and is not sortable.',
      width: 150,
      valueGetter: (params) =>
        `${(params.row.quantity || 0) * (params.row.unit_price || 0.0)}`,
    },
    {
      field: "markup_percentage",
      headerName: "Mark Up %",
      width: 150,
      editable: true,
    },
    {
      field: "markup",
      headerName: "Mark Up",
      // description: 'This column has a value getter and is not sortable.',
      width: 150,
      valueGetter: (params) =>
        `${((params.row.total || 0.0) * (params.row.markup_percentage || 0.0)) /
        100
        }`,
    },
    {
      field: "grand_total",
      headerName: "Grand Total",
      // description: 'This column has a value getter and is not sortable.',
      width: 160,
      valueGetter: (params) =>
        `${(params.row.total || 0.0) - (params.row.markup || 0.0)}`,
    },
  ];

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

  useEffect(() => {
    if (!isEmpty(boq_by_id)) {
      console.log("boq_by_id", boq_by_id);
      setItems(boq_by_id?.boq_items);
      setIndex(boq_by_id?.boq_items[boq_by_id?.boq_items?.length - 1]?.id ?? 0);
      setAddItemsForm(true);
      setBoqId(boq_by_id?.id);
      setPayload({
        title: boq_by_id?.title,
        description: boq_by_id?.description,
        project_id: boq_by_id?.project_id,
        label: boq_by_id?.project?.name,
      });
    }
  }, [boq_by_id]);

  useEffect(() => {
    dispatch(listProjects());
  }, []);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setOpenModal(!openModal);


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
        // setErrorMsg(error?.data?.msg);
        // dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
      }
    }
  }, [create_boq_success]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(createProcureRes).length !== 0) {
        setSubmit(false);
        toast.success("Procurement requirement submitted successfully");
        toggle();
        // setBoqId(createProcureRes.id);
        setAddItemsForm(true);
      } else if (!!error?.data) {
        setSubmit(false);
        // setErrorMsg(error?.data?.msg);
        // dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
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
        // setErrorMsg(error?.data?.msg);
        // dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
      }
    }
  }, [updateBillTableRes]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateBoqRes).length !== 0) {
        setSubmit(false);
        history(`${process.env.PUBLIC_URL}/estimation/bills`);
      } else if (!!error?.data) {
        setSubmit(false);
        // setErrorMsg(error?.data?.msg);
        // dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
      }
    }
  }, [updateBoqRes]);

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
    console.log("editedItems", e.id, items);
    let editedItems = items.filter((obj) => obj.id != e.id);
    console.log("editedItems", editedItems);
    let finalEditedItems = [...editedItems, e];
    console.log("finalEditedItems", finalEditedItems);
    setItems(finalEditedItems?.sort((a, b) => a.id - b.id));
  };

  const handleDeleteRow = () => {
    let deletedRow = items.filter((obj) => !rowSelectionModel.includes(obj.id));
    console.log("deltedRow", deletedRow);
    if (deletedRow?.length == 0) {
      setIndex(0);
      setItems(deletedRow?.sort((a, b) => a.id - b.id));
    }
    setItems(deletedRow);
    setRowSelectionModel([]);
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
    if (items.length && !type) {
      let withoutIdPayload = items.map((item) => ({
        sr_no: item?.sr_no,
        boq_id: item?.boq_id,
        type: item?.type,
        subtype: item?.subtype,
        name: item?.name,
        description: item?.description,
        unit: item?.unit,
        quantity: item?.quantity,
        unit_price: item?.unit_price,
        markup_percentage: item?.markup_percentage,
        area: item?.area,
      }));
      setSubmit(true);

      dispatch(
        updateBoq({
          items: {
            title: payload?.title,
            description: payload?.description,
            project_id: payload?.project_id,
          },
          id: boqId,
        })
      );
      dispatch(updateBillTableAction({ items: withoutIdPayload, id: boqId }));
    } else if (type == "approval") {
      setSubmit(true);
      dispatch(
        updateBoq({
          items: {
            id: boqId,
            status: "approval pending",
            approved_by: JSON.parse(localStorage.getItem("user")).id,
          },
          id: boqId,
        })
      );
    } else if (type == "approved") {
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
    } else if (type == "changes needed") {
      setSubmit(true);
      dispatch(
        updateBoq({
          items: {
            id: boqId,
            status: "changes needed",
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
    toProcureItems = toProcureItems.map((item) => ({
      boq_id: item?.boq_id,
      type: item?.type,
      subtype: item?.subtype,
      name: item?.name,
      description: item?.description,
      unit: item?.unit,
      quantity: item?.quantity,
      unit_price: item?.unit_price,
      markup_percentage: item?.markup_percentage,
      area: item?.area,
    }));
    console.log("toProcureItems", toProcureItems);
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

  return (
    <Fragment>
      <Breadcrumbs
        parent="Estimation / BOQ"
        title={boq_by_id?.status === "approved" ? "View" : "Update"}
        mainTitle={boq_by_id?.status === "approved" ? "Bill Details" : "Update Bill"}
      />
      <Container fluid={true}>
        <Form>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <H5>
                        {boq_by_id?.status !== "approved"
                          ? "Edit Items"
                          : `Bill Number - ${boq_by_id?.id}`}
                      </H5>
                    </Col>
                    {boq_by_id?.status !== "approved" ? (
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            gap: "2%",
                          }}
                        >
                          {boq_by_id?.status != "approved" &&
                            boq_by_id?.status != "approval pending" && (
                              <div>
                                <Btn
                                  attrBtn={{
                                    color: "primary d-flex align-items-end",
                                    type: "button",
                                  }}
                                  onClick={(e) => handleSubmit(e, "approval")}
                                >
                                  {"Submit for Approval"}
                                </Btn>
                              </div>
                            )}
                          {getAdminBasedAccess() &&
                            boq_by_id?.status == "approval pending" && (
                              <div>
                                <Btn
                                  attrBtn={{
                                    color: "primary d-flex align-items-end",
                                    type: "button",
                                  }}
                                  onClick={setOpenModal}
                                >
                                  {"Approve / Reject"}
                                </Btn>
                              </div>
                            )}
                          <div>
                            <Btn
                              attrBtn={{
                                color: "primary d-flex align-items-end",
                                type: "button",
                              }}
                              onClick={handleSubmit}
                            >
                              {id ? "Update" : "Save"}
                            </Btn>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      (
                        <Col>
                          <Btn
                            attrBtn={{
                              color: "primary d-flex align-items-end",
                              type: "button",
                            }}
                            style={{ marginLeft: "auto" }}
                            onClick={toggle}
                            disabled={isEmpty(rowSelectionModel)}
                          >
                            {"To Procure"}
                          </Btn>
                        </Col>
                      )
                    )}
                  </Row>
                </CardHeader>
                <CardBody>
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
                          disabled={boq_by_id?.status === 'approved'}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Project</Label>
                        {boq_by_id?.status === 'approved'
                          ?
                          <input
                            className="form-control"
                            name="project_id"
                            value={payload.label}
                            disabled={boq_by_id?.status === 'approved'}
                          />
                          :
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
                        }
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
                          disabled={boq_by_id?.status === 'approved'}
                        />
                        <span style={{ color: "red" }}></span>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Row className="m-b-20">
                    {boq_by_id?.status !== "approved" && (
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "2%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                            }}
                          >
                            <div>
                              <Btn
                                attrBtn={{
                                  color: "success d-flex align-items-end",
                                  type: "button",
                                }}
                                onClick={() => {
                                  setIndex(index + 1);
                                  setItems([
                                    ...items,
                                    {
                                      id: index + 1,
                                      sr_no: index + 1,
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
                                }}
                              >
                                Add Row
                              </Btn>
                            </div>

                            {!isEmpty(rowSelectionModel) && (
                              <div>
                                <Btn
                                  attrBtn={{
                                    color: "danger d-flex align-items-end",
                                    type: "button",
                                  }}
                                  onClick={handleDeleteRow}
                                >
                                  Delete
                                </Btn>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                      // ) : (
                      //   !isEmpty(rowSelectionModel) && (
                      //     <Col>
                      //       <div>
                      //         <Btn
                      //           attrBtn={{
                      //             color: "primary d-flex align-items-end",
                      //             type: "button",
                      //           }}
                      //           onClick={toggle}
                      //         >
                      //           {"To Procure"}
                      //         </Btn>
                      //       </div>
                      //     </Col>
                    )
                    }
                  </Row>

                  <Row className="m-b-10">
                    <Col>
                      <DataGrid
                        rows={items}
                        columns={columns}
                        //   onCellEditCommit={handleCellEditCommit}
                        processRowUpdate={handleCellEditCommit}
                        experimentalFeatures={{ newEditingApi: true }}
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
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                          setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                        pageSizeOptions={[10, 20, 30, 40, 50]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        autoHeight={true}
                        sx={{
                          border: 'none',
                          '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#eeeeee',
                            fontWeight: 700,
                          },
                          '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                          },
                          '& .MuiToolbar-root': {
                            marginTop: "1rem"
                          },
                          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            marginTop: "1rem",
                            color: "#0000008a"
                          },
                        }}
                      />
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>

      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Create Procurement Request</ModalHeader>
        <ModalBody>
          <Row>
            <div style={{ paddingInline: "1.25rem" }}>
              <Form className="theme-form" onSubmit={handleToProcureItems}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="col-sm-6 col-form-label text-start">
                        <H6>{"Title"}</H6>
                      </Label>
                      <Input
                        className="form-input"
                        name="name"
                        value={title}
                        type="text"
                        placeholder="type here the name of project"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12 mb-4">
                    <FormGroup>
                      <Label className="col-sm-12 col-form-label text-start">
                        <H6>{"Description"}</H6>
                      </Label>
                      <Input
                        className="form-input"
                        name="description"
                        type="textarea"
                        value={description}
                        placeholder="Give a brief description of the project here ..."
                        onChange={(e) => setDescription(e.target.value)}
                      // required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <ModalFooter>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>{" "}
                </ModalFooter>
              </Form>
            </div>
          </Row>
        </ModalBody>
      </Modal>

      <Modal isOpen={openModal} toggle={toggle2} size='md'>
        <ModalHeader
          toggle={toggle2}
          className="d-flex justify-content-center"
        >
          <H5>Please confirm your approval / rejection</H5>
        </ModalHeader>
        <ModalBody>
          <div
            className="d-flex justify-content-center m-b-20 text-center"
            style={{ gap: "1rem", paddingInline: "3.5rem" }}
          >
            <form
              onSubmit={(e) => {
                handleSubmit(e, rejected ? "changes needed" : "approved");
              }}
            >
              <div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
                <Btn
                  className="w-30"
                  type="button"
                  attrBtn={{ className: "btn btn-danger", color: "danger" }}
                  onClick={() => setRejected(true)}
                >
                  Reject
                </Btn>
                <Btn
                  className="w-30"
                  type="submit"
                  attrBtn={{ className: "btn btn-success", color: "success" }}
                  disabled={rejected}
                >
                  Approve
                </Btn>
              </div>
              {rejected && (
                <div className="d-flex flex-column m-t-30 m-b-10">
                  <FormGroup>
                    <Label>Please add required remarks</Label>
                    <Input
                      type="textarea"
                      required
                      onChange={(e) => setRejectRemarks(e.target.value)}
                      value={rejectRemarks}
                    />
                  </FormGroup>

                  <Btn
                    className="w-30 m-auto" type="submit"
                    attrBtn={{ className: 'btn btn-light', color: 'light' }}
                  >
                    Submit
                  </Btn>
                </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </Fragment >
  );
};

export default EditBOQ;
