import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs, Btn, H5, P } from '../../../AbstractElements';
import {
    Button,
    Card,
    CardBody,
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
    Row
} from 'reactstrap';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { assetTableColumns, dummytabledata, leaveQuotaTableColumns } from '../../../Data/Table/Defaultdata';
import { Plus } from 'react-feather';
import { createLeaveQuotaAction, leaveQuotaListAction, leaveTypeAction } from '../../../redux/actions/leaveActions';
import { useDispatch, useSelector } from 'react-redux';
import { roles } from '../../../redux/constants';
import Select from 'react-select';
import { SET_INITIAL_LEAVE } from '../../../redux/actions/types';

const LeaveQuota = () => {
    const [modal, setModal] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const { createLeaveQuotaSuccess, leaveQuotaList, leaveTypeData, error } = useSelector((state) => state.leaveRes);
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        role_id: '1',
        leave_type_id: 1,
        quota_in_days: 30,
        year: '2023'
    });
    const toggle = () => setModal(!modal);

    useEffect(() => {
        dispatch(leaveTypeAction());
        dispatch(leaveQuotaListAction());
    }, []);

    useEffect(() => {
        let ll = leaveTypeData?.map((item) => {
            return { label: item?.name, value: item?.id };
        });
        setLeaveTypes(ll);
    }, [leaveTypeData]);

    useEffect(() => {
        console.log(leaveQuotaList)
    }, [leaveQuotaList])

    useEffect(() => {
        if (submit) {
            if (Object.keys(createLeaveQuotaSuccess).length !== 0) {
                setSubmit(false);
                toggle();
                dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
                dispatch(leaveQuotaListAction());
            } else if (!!error?.data) {
                setSubmit(false);
                // setErrorMsg(error?.data?.msg);
                dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
            }
        }
    }, [createLeaveQuotaSuccess]);

    const handleOnChange = (e, type = null, name) => {
        if (type == 'select') {
            setPayload({ ...payload, [name]: e.value });
        } else if (type == 'date') {
            setPayload({ ...payload, [name]: e.target.value });
        } else {
            setPayload({ ...payload, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createLeaveQuotaAction(payload));
        setSubmit(true);
    };

    return (
        <Fragment>
            <Breadcrumbs mainTitle="Leave Quota" parent="Settings" title="Leave Quota" />
            <Container fluid={true}>
                <Row>
                    <div className={'d-flex justify-content-end m-b-20'}>
                        <Btn
                            attrBtn={{
                                color: 'primary d-flex align-items-center',
                                onClick: toggle
                            }}
                        >
                            <Plus style={{ width: '18px', height: '18px' }} className="me-2" /> {'Add Leave Quota'}
                        </Btn>
                    </div>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <DataTableComponent data={leaveQuotaList} tableColumns={leaveQuotaTableColumns} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modal} toggle={toggle} className="leave-modal-css">
                <ModalHeader toggle={toggle}>Add Designation</ModalHeader>
                <ModalBody>
                    <Row>
                        <div>
                            <Form className="theme-form" onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-4 col-form-label text-start">{'Role'}</Label>
                                            <Select
                                                options={roles}
                                                className="js-example-basic-single col-sm-12"
                                                required
                                                name="role_id"
                                                value={roles?.find((obj) => obj.value === payload?.role_id)}
                                                onChange={(e) => handleOnChange(e, 'select', 'role_id')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-form-label text-start">{'Leave Type'}</Label>
                                            <Select
                                                options={leaveTypes}
                                                className="js-example-basic-single col-sm-12"
                                                required
                                                name="leave_type_id"
                                                value={leaveTypes?.find((obj) => obj.value === payload?.leave_type_id)}
                                                onChange={(e) => handleOnChange(e, 'select', 'leave_type_id')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-form-label text-start">{'Quota Days'}</Label>
                                            <Input
                                                className={'form-control'}
                                                name="quota_in_days"
                                                type="number"
                                                placeholder="Ex: 30"
                                                onChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3 mb-3 m-l-10">
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-4 col-form-label text-start">{'Year'}</Label>
                                            <Input
                                                className={'form-control'}
                                                name="year"
                                                type="number"
                                                placeholder="Ex: 2023"
                                                onChange={handleOnChange}
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
                                    </Button>{' '}
                                </ModalFooter>
                            </Form>
                        </div>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default LeaveQuota;
