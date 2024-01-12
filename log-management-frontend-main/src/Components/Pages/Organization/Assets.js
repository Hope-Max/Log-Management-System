import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, Btn, H5, P } from "../../../AbstractElements";
import { formatDate } from "../../../redux/constants";
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
import DatePicker from 'react-datepicker';
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import moment from "moment";
import SocialWidget from "../../Common/CommonWidgets/SocialWidget";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
    createAssetAction,
    createDesignationAction,
    assetListAction,
    updateAssetAction,
    assetDeleteAction,
} from "../../../redux/actions/organizationActions";
import { SET_INITIAL_ORGANIZATION } from "../../../redux/actions/types";
import { department } from "../../../redux/constants";
import { ListUsers } from "../../../redux/actions/commonApiAction";

const Assets = () => {
    const [date, setDate] = useState(new Date());
    const [userList, setUserList] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [modalAddAsset, setModalAddAsset] = useState(false);
    const [modalEditAsset, setModalEditAsset] = useState(false);
    const [assetToBeUpdated, setAssetToBeUpdated] = useState({
        model: "",
        serial_number: "",
        type: "",
        purchase_date: moment(date).format('YYYY-MM-DD'),
        assigned_to: "",
        no_of_assets: "",
    })
    const dispatch = useDispatch();
    const { error, createAssetSuccess, assetListData, updateAssetSuccess, deleteAssetSuccess } = useSelector(
        (state) => state.organizationRes
    );
    const { usersList } = useSelector((state) => state.commonApi);
    const [payload, setPayload] = useState({
        model: "",
        serial_number: "",
        type: "",
        purchase_date: moment(date).format('YYYY-MM-DD'),
        assigned_to: "",
        no_of_assets: "",
    });

    useEffect(() => {
        dispatch(assetListAction());
        dispatch(ListUsers());
    }, []);

    useEffect(() => {
        let ll = usersList?.map((item) => {
            return { label: item?.full_name, value: item?.id };
        });
        setUserList(ll);
    }, [usersList]);

    useEffect(() => {
        if (submit) {
            if (Object.keys(createAssetSuccess).length !== 0) {
                setSubmit(false);
                toggleAdd();
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
                dispatch(assetListAction());
            } else if (!!error?.data) {
                setSubmit(false);
                // setErrorMsg(error?.data?.msg);
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
            }
        }
    }, [createAssetSuccess]);

    useEffect(() => {
        if (submit) {
            if (Object.keys(updateAssetSuccess).length !== 0) {
                setSubmit(false);
                toggleEdit();
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
                dispatch(assetListAction());
            } else if (!!error?.data) {
                setSubmit(false);
                // setErrorMsg(error?.data?.msg);
                dispatch({ type: SET_INITIAL_ORGANIZATION, payload: {} });
            }
        }
    }, [updateAssetSuccess])

    useEffect(() => {
        dispatch(assetListAction());
    }, [deleteAssetSuccess])

    const toggleAdd = () => setModalAddAsset(!modalAddAsset);
    const toggleEdit = () => setModalEditAsset(!modalEditAsset);

    const handleOnChange = (e, type = null, name) => {
        if (type == "select") {
            setPayload({ ...payload, [name]: e.value });
        } else if (type === "date") {
            setPayload({ ...payload, [name]: moment(e).format('YYYY-MM-DD') });
        } else {
            setPayload({ ...payload, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAssetAction(payload));
        setSubmit(true);
    };

    const handleEdit = (id) => {
        toggleEdit();
        let assetToUpdate = assetListData.find(asset => asset.id === id);
        console.log(assetToUpdate)
        setAssetToBeUpdated({
            ...assetToBeUpdated,
            id: assetToUpdate?.id,
            serial_number: assetToUpdate?.serial_number,
            model: assetToUpdate?.model,
            type: assetToUpdate?.type,
            purchase_date: moment(assetToUpdate?.purchase_date).format("YYYY-MM-DD"),
            assigned_to: assetToUpdate?.assigned_to,
            no_of_assets: assetToUpdate?.no_of_assets,
        })
    }

    const handleOnChangeEdit = (e, type = null, name) => {
        if (type === "select") {
            setAssetToBeUpdated({ ...assetToBeUpdated, [name]: e.value });
        }
        else if (type === "date") {
            setAssetToBeUpdated({ ...assetToBeUpdated, [name]: moment(e).format('YYYY-MM-DD') });
        }
        else {
            setAssetToBeUpdated({ ...assetToBeUpdated, [e.target.name]: e.target.value });
        }
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        //console.log(designationToBeUpdated)
        dispatch(updateAssetAction(assetToBeUpdated))
        setSubmit(true);
    }

    const handleDelete = (id) => {
        dispatch(assetDeleteAction({ id: id }))
    }

    const assetTableColumns = [
        {
            name: "S. No.",
            cell: (row, index) => index + 1,
            width: "4.25rem",
            center: true
        },
        {
            name: "Serial No.",
            selector: (row) => `${row?.serial_number}`,
            sortable: true,
            center: false,
        },
        {
            name: "Model",
            selector: (row) => `${row?.model}`,
            sortable: true,
            center: true,
        },
        {
            name: "Type",
            selector: (row) => `${row.type}`,
            sortable: true,
            center: true,
        },
        {
            name: "Assigned to",
            selector: (row) => `${row.assignedTo?.full_name}`,
            sortable: true,
            center: true,
        },
        {
            name: "Assigned by",
            selector: (row) => `${row.assignedBy?.full_name}`,
            sortable: true,
            center: true,
        },
        {
            name: "Purchase Date",
            selector: (row) => `${formatDate(row.purchase_date)}`,
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
            <Breadcrumbs mainTitle="Assets" parent="Organization" title="Assets" />
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
                            {"Add Asset"}
                        </Btn>
                    </div>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <DataTableComponent
                                    data={assetListData}
                                    tableColumns={assetTableColumns}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modalAddAsset} toggle={toggleAdd} size="lg">
                <ModalHeader toggle={toggleAdd}>Add Asset</ModalHeader>
                <ModalBody>
                    <Row>
                        <div>
                            <Form className="theme-form" onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"SR. No."}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="serial_number"
                                                type="text"
                                                placeholder="ex: LT44444SSD44"
                                                value={payload.serial_number}
                                                required
                                                onChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"Asset Type"}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="type"
                                                type="text"
                                                placeholder="ex: Transportation, electronics"
                                                value={payload.type}
                                                required
                                                onChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"Purchase Date"}
                                            </Label>
                                            <DatePicker
                                                className="form-control digits col-sm-6"
                                                name="purchase_date"
                                                value={payload?.purchase_date}
                                                format="YYYY-MM-DD"
                                                onSelect={(e) => handleOnChange(e, 'date', 'purchase_date')}
                                            />
                                            {/* <Input
                                                className={"form-control"}
                                                name="purchase_date"
                                                type="date"
                                                placeholder=""
                                                value={payload.purchase_date}
                                                required
                                                onChange={(e) =>
                                                    handleOnChange(e, "date", "purchase_date")
                                                }
                                            /> */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-4 col-form-label text-start">
                                                {"Model"}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="model"
                                                type="text"
                                                placeholder="ex: BMW X5"
                                                value={payload.model}
                                                required
                                                onChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className=" col-form-label text-start">
                                                {"Assigned to"}
                                            </Label>
                                            <Select
                                                options={userList}
                                                className="js-example-basic-single col-sm-12"
                                                required
                                                name="assigned_to"
                                                value={userList?.find(
                                                    (obj) => obj.value === payload?.assigned_to
                                                )}
                                                onChange={(e) =>
                                                    handleOnChange(e, "select", "assigned_to")
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"No. of assets"}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="no_of_assets"
                                                type="number"
                                                placeholder="ex: 3"
                                                value={payload?.no_of_assets}
                                                required
                                                onChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <ModalFooter>
                                    <Button color="secondary" onClick={toggleAdd}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Add Asset
                                    </Button>{" "}
                                </ModalFooter>
                            </Form>
                        </div>
                    </Row>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalEditAsset} toggle={toggleEdit} size="lg">
                <ModalHeader toggle={toggleEdit}>Edit Asset</ModalHeader>
                <ModalBody>
                    <Row>
                        <div>
                            <Form className="theme-form" onSubmit={handleSubmitEdit}>
                                <Row>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"SR. No."}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="serial_number"
                                                type="text"
                                                placeholder="ex: LT44444SSD44"
                                                value={assetToBeUpdated?.serial_number}
                                                required
                                                onChange={handleOnChangeEdit}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"Asset Type"}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="type"
                                                type="text"
                                                placeholder="ex: Transportation, electronics"
                                                value={assetToBeUpdated?.type}
                                                required
                                                onChange={handleOnChangeEdit}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"Purchase Date"}
                                            </Label>
                                            <DatePicker
                                                className="form-control digits col-sm-6"
                                                name="purchase_date"
                                                value={assetToBeUpdated?.purchase_date}
                                                format="YYYY-MM-DD"
                                                onSelect={(e) => handleOnChangeEdit(e, 'date', 'purchase_date')}
                                            />
                                            {/* <Input
                                                className={"form-control"}
                                                name="purchase_date"
                                                type="date"
                                                placeholder=""
                                                value={assetToBeUpdated?.purchase_date}
                                                required
                                                onChange={(e) =>
                                                    handleOnChangeEdit(e, "date", "purchase_date")
                                                }
                                            /> */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-4 col-form-label text-start">
                                                {"Model"}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="model"
                                                type="text"
                                                placeholder="ex: BMW X5"
                                                value={assetToBeUpdated?.model}
                                                required
                                                onChange={handleOnChangeEdit}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4 mb-4 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className=" col-form-label text-start">
                                                {"Assigned to"}
                                            </Label>
                                            <Select
                                                options={userList}
                                                className="js-example-basic-single col-sm-12"
                                                required
                                                name="assigned_to"
                                                value={{
                                                    label: usersList?.find(user => user.id === assetToBeUpdated?.assigned_to)?.full_name,
                                                    value: usersList?.find(user => user.id === assetToBeUpdated?.assigned_to)?.id,
                                                }}
                                                onChange={(e) =>
                                                    handleOnChangeEdit(e, "select", "assigned_to")
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"No. of assets"}
                                            </Label>
                                            <Input
                                                className={"form-control"}
                                                name="no_of_assets"
                                                type="number"
                                                placeholder="ex: 3"
                                                value={assetToBeUpdated?.no_of_assets}
                                                required
                                                onChange={handleOnChangeEdit}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <ModalFooter>
                                    <Button color="secondary" onClick={toggleEdit}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Update Asset
                                    </Button>{" "}
                                </ModalFooter>
                            </Form>
                        </div>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default Assets;
