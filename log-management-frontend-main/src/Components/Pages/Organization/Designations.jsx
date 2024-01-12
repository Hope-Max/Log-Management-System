import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, Btn, H5, P } from "../../../AbstractElements";
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
    Row,
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import moment from "moment";
import SocialWidget from "../../Common/CommonWidgets/SocialWidget";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import {
    designationTableColumns,
    designationTableColumnss,
    dummytabledata,
    leaveTableColumns,
    tableColumns,
} from "../../../Data/Table/Defaultdata";
import DatePicker from "react-datepicker";
import { leaveTimeType } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import TodoCheckbox from "../../Application/Todo/TodoCheckbox";
import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
    createDesignationAction,
    designationDeleteAction,
    designationListAction,
    designationUpdateAction
} from "../../../redux/actions/organizationActions";
import { SET_INITIAL_ORGANIZATION } from "../../../redux/actions/types";
import { department } from "../../../redux/constants";

const Designations = () => {
    const [date, setDate] = useState(new Date());
    const [designationList, setDesignationList] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [modalAddDesignation, setModalAddDesignation] = useState(false);
    const [modalEditDesignation, setModalEditDesignation] = useState(false);
    const [designationToBeUpdated, setDesignationToBeUpdated] = useState({
        title: "",
        department: "HR Department",
        parent_designation_id: null
    });
    const dispatch = useDispatch();
    const { error, createDesignationSuccess, designationListData, updateDesignationSuccess, deleteDesignationSuccess } = useSelector(
        (state) => state.organizationRes
    );
    const intial_payload = {
        title: "",
        department: "",
        parent_designation_id: null
    }
    const [payload, setPayload] = useState(intial_payload);

    const toggleAdd = () => setModalAddDesignation(!modalAddDesignation);
    const toggleEdit = () => setModalEditDesignation(!modalEditDesignation);

    useEffect(() => {
        dispatch(designationListAction());
    }, []);

    useEffect(() => {
        let ll = designationListData?.map((item) => {
            return { label: item?.title, value: item?.id };
        });
        setDesignationList(ll);
    }, [designationListData]);

    useEffect(() => {
        if (submit) {
            if (Object.keys(createDesignationSuccess).length !== 0) {
                setSubmit(false);
                toggleAdd();
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
                dispatch(designationListAction());
                setPayload(intial_payload)
            } else if (!!error?.data) {
                setSubmit(false);
                // setErrorMsg(error?.data?.msg);
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
                setPayload(intial_payload)
            }
        }
    }, [createDesignationSuccess]);

    useEffect(() => {
        if (submit) {
            if (Object.keys(updateDesignationSuccess).length !== 0) {
                setSubmit(false);
                toggleEdit();
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
                dispatch(designationListAction());
            } else if (!!error?.data) {
                setSubmit(false);
                // setErrorMsg(error?.data?.msg);
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
            }
        }
    }, [updateDesignationSuccess])

    useEffect(() => {
        dispatch(designationListAction());
    }, [deleteDesignationSuccess])

    const handleOnChange = (e, type = null, name) => {
        if (type === "select") {
            setPayload({ ...payload, [name]: e.value });
        } else if (type === "date") {
            setPayload({ ...payload, [name]: e.target.value });
        } else {
            setPayload({ ...payload, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDesignationAction(payload));
        setSubmit(true);
    };

    const handleEdit = (id) => {
        toggleEdit();
        let designationToBeUpdate = designationListData.find(designation => designation.id === id);
        //console.log("payload up", designationToBeUpdate)
        setDesignationToBeUpdated({
            ...designationToBeUpdated,
            id: designationToBeUpdate?.id,
            department: designationToBeUpdate?.department,
            title: designationToBeUpdate?.title,
            parent_designation_id: designationToBeUpdate?.parent_designation_id
        })
        //console.log("original payload", designationToBeUpdated)
    }

    const handleOnChangeEdit = (e, type = null, name) => {
        if (type === "select") {
            setDesignationToBeUpdated({ ...designationToBeUpdated, [name]: e.value });
        } else {
            setDesignationToBeUpdated({ ...designationToBeUpdated, [e.target.name]: e.target.value });
        }
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        //console.log(designationToBeUpdated)
        dispatch(designationUpdateAction(designationToBeUpdated))
        setSubmit(true);
    }

    const handleDelete = (id) => {
        dispatch(designationDeleteAction({ id: id }))
    }

    const designationTableColumns = [
        {
            name: "S. No.",
            cell: (row, index) => index + 1,
            width: "4.25rem",
            center: true
        },
        {
            name: "Designation Name",
            selector: (row) => `${row?.title}`,
            sortable: true,
            center: false,
        },
        {
            name: "Department",
            selector: (row) => `${row.department}`,
            sortable: true,
            center: true,
        },
        {
            name: "Parent Designation",
            selector: (row) => `${row?.parent?.title ?? "N/A"}`,
            sortable: true,
            center: true,
        },
        {
            name: "Action",
            selector: (row) => (
                <div>
                    <div className="cursor__pointer">
                        <span className="m-l-15 btn-link" style={{ cursor: "pointer", textDecoration: "none" }}
                            onClick={() => handleEdit(row.id)}
                        >
                            <i className="icofont icofont-ui-edit"></i>
                        </span>

                        <span className="m-l-15 btn-link" style={{ cursor: "pointer", textDecoration: "none" }}
                            onClick={() => handleDelete(row.id)}
                        >
                            <i className="icofont icofont-ui-delete"></i>
                        </span>
                    </div>
                </div>
            )
        }
    ];
    return (
        <Fragment>
            <Breadcrumbs
                mainTitle="Designations"
                parent="Organization"
                title="Designations"
            />
            <Container fluid={true}>
                <Row>
                    <div className={"d-flex justify-content-end m-b-20"}>
                        <Btn
                            attrBtn={{
                                color: "primary d-flex align-items-center",
                                onClick: toggleAdd,
                            }}
                        >
                            <Plus
                                style={{ width: "18px", height: "18px" }}
                                className="me-2"
                            />{" "}
                            {"Add Designation"}
                        </Btn>
                    </div>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <DataTableComponent
                                    data={designationListData}
                                    tableColumns={designationTableColumns}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modalAddDesignation} toggle={toggleAdd} size="lg">
                <ModalHeader toggle={toggleAdd}>Add Designation</ModalHeader>
                <ModalBody>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md="6 mb-6 m-l-10">
                                    <FormGroup>
                                        <Label className="col-sm-6 col-form-label text-start">
                                            {"Department"}
                                        </Label>
                                        <Select
                                            options={department}
                                            className="js-example-basic-single col-sm-12"
                                            required
                                            name="department"
                                            value={{
                                                label: payload?.department,
                                                value: payload?.department,
                                            }}
                                            onChange={(e) =>
                                                handleOnChange(e, "select", "department")
                                            }
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6 mb-6 m-l-10">
                                    <FormGroup>
                                        <Label className="col-sm-6 col-form-label text-start">
                                            {"Designation Title"}
                                        </Label>
                                        <Input
                                            name="title"
                                            type="text"
                                            placeholder="Designation title"
                                            onChange={handleOnChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6 mb-6 m-l-10">
                                    <FormGroup>
                                        <Label className="col-sm-6 col-form-label text-start">
                                            {"Parent Designation"}
                                        </Label>
                                        <Select
                                            options={
                                                designationListData
                                                    .filter(designation => designation.department === payload.department)
                                                    .map(item => {
                                                        return { label: item?.title, value: item?.id };
                                                    })
                                                ??
                                                designationList
                                            }
                                            className="js-example-basic-single col-sm-12"
                                            name="parent_designation_id"
                                            // value={{ label: payload?.parent_designation_id, value: payload?.parent_designation_id }}
                                            onChange={(e) =>
                                                handleOnChange(e, "select", "parent_designation_id")
                                            }
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button color="secondary" onClick={toggleAdd}>
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit">
                                    Add Designation
                                </Button>{" "}
                            </ModalFooter>
                        </Form>
                    </Row>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalEditDesignation} toggle={toggleEdit} size="lg">
                <ModalHeader toggle={toggleEdit}>Edit Designation</ModalHeader>
                <ModalBody>
                    <Row>
                        <div>
                            <Form className="theme-form" onSubmit={handleSubmitEdit}>
                                <Row>
                                    <Col md="6 mb-6 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-6 col-form-label text-start">
                                                {"Department"}
                                            </Label>
                                            <Select
                                                options={department}
                                                className="js-example-basic-single col-sm-12"
                                                required
                                                name="department"
                                                value={{
                                                    label: designationToBeUpdated?.department,
                                                    value: designationToBeUpdated?.department,
                                                }}
                                                onChange={(e) =>
                                                    handleOnChangeEdit(e, "select", "department")
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6 mb-6 m-l-10">
                                        <FormGroup>
                                            <Label className="col-sm-6 col-form-label text-start">
                                                {"Designation Title"}
                                            </Label>
                                            <Input
                                                name="title"
                                                type="text"
                                                value={designationToBeUpdated?.title}
                                                placeholder="Designation title"
                                                onChange={handleOnChangeEdit}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6 mb-6 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-6 col-form-label text-start">
                                                {"Parent Designation"}
                                            </Label>
                                            <Select
                                                options={
                                                    designationListData
                                                        .filter(designation => designation.department === designationToBeUpdated?.department)
                                                        .map(item => {
                                                            return { label: item?.title, value: item?.id };
                                                        })
                                                    ??
                                                    []
                                                }
                                                className="js-example-basic-single col-sm-12"
                                                name="parent_designation_id"
                                                value={{ label: designationListData.find(d => d.id === designationToBeUpdated?.parent_designation_id)?.title, value: designationToBeUpdated?.parent_designation_id }}
                                                onChange={(e) =>
                                                    handleOnChangeEdit(e, "select", "parent_designation_id")
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <ModalFooter>
                                    <Button color="secondary" onClick={toggleEdit}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Edit Designation
                                    </Button>{" "}
                                </ModalFooter>
                            </Form>
                        </div>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment >
    );
};

export default Designations;
