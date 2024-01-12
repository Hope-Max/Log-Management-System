import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs, Btn, H5, P } from '../../../AbstractElements';
import './index.scss';
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
    Row
} from 'reactstrap';
import Select from 'react-select';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import moment from 'moment';
import SocialWidget from '../../Common/CommonWidgets/SocialWidget';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, leaveTableColumns, tableColumns } from '../../../Data/Table/Defaultdata';
import DatePicker from 'react-datepicker';
import { leaveTimeType } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import { createLeaveRequestAction, leaveListAction, leaveTypeAction, leaveQuotaListAction } from '../../../redux/actions/leaveActions';
import { useDispatch, useSelector } from 'react-redux';
import { Textarea } from '@mobiscroll/react-lite';
import { getCurrentUser, isEmpty } from '../../../redux/constants';
import LeaveWidget from '../../Common/CommonWidgets/LeaveWidget';
import { SET_INITIAL_LEAVE } from '../../../redux/actions/types';
import { isWeekday, isWorkingDayForUser } from '../../../Utils';

const SocialWidgetData = [
    {
        title: 'Casual Leave',
        image: '1.png',
        total: '4/12',
        subTitle: 'Taken',
        status: 'success',
        chart: {
            color: ['var(--theme-deafult)'],
            series: [78]
        }
    },
    {
        title: 'Sick Leave',
        image: '2.png',
        total: '4/12',
        subTitle: 'Taken',
        status: 'success',
        chart: {
            color: ['#FFA941'],
            series: [70]
        }
    },
    {
        title: 'Paid Leave',
        image: '3.png',
        total: '4/12',
        subTitle: 'Taken',
        status: 'success',
        chart: {
            color: ['#57B9F6'],
            series: [50]
        }
    },
    {
        title: 'Vacation Leave',
        image: '3.png',
        total: '4/12',
        subTitle: 'Taken',
        status: 'success',
        chart: {
            color: ['#57B9F6'],
            series: [50]
        }
    },
    {
        title: 'Bareavement Leaves',
        image: '3.png',
        total: '4/12',
        subTitle: 'Taken',
        status: 'success',
        chart: {
            color: ['#57B9F6'],
            series: [50]
        }
    }
];

const LeavePage = () => {
    const [date, setDate] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [startDate, setStartDate] = useState(moment(date).startOf('month').format('YYYY-MM-DD'));
    const [lastDate, setLastDate] = useState(moment(date).endOf('month').format('YYYY-MM-DD'));
    const [submit, setSubmit] = useState(true);
    const [leaveType, setLeaveType] = useState("");
    const [leaveTypes, setLeaveTypes] = useState([]);
    const { leaveTypeData, createLeaveRequestSuccess, leaveListData, leaveQuotaList, error } = useSelector((state) => state.leaveRes);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [payload, setPayload] = useState({
        user_id: getCurrentUser().id,
        leave_type_id: null,
        quota_id: null,
        start_date_half: '',
        end_date_half: '',
        start_date: null,
        end_date: null,
        reason: 'required'
    });

    const toggle = () => setModal(!modal);

    useEffect(() => {
        dispatch(leaveListAction());
        dispatch(leaveTypeAction());
        dispatch(leaveQuotaListAction());
    }, []);

    useEffect(() => {
        console.log("Leave Quota List", leaveQuotaList)
    }, [leaveQuotaList])

    useEffect(() => {
        if (submit) {
            if (Object.keys(createLeaveRequestSuccess).length !== 0) {
                setSubmit(false);
                toggle();
                dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
                dispatch(leaveListAction());
                dispatch(leaveTypeAction());
            } else if (!!error?.data) {
                setSubmit(false);
                // setErrorMsg(error?.data?.msg);
                dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
            }
        }
    }, [createLeaveRequestSuccess]);

    const handleDateChange = (action) => {
        if (action === 'increase') {
            let newDate = new Date(date.setMonth(date.getMonth() + 1));
            setDate(newDate);
            setCurrentYear(date.getFullYear());
            setStartDate(moment(date).startOf('month').format('YYYY-MM-DD'));
            setLastDate(moment(date).endOf('month').format('YYYY-MM-DD'));
        } else {
            let newDate = new Date(date.setMonth(date.getMonth() - 1));
            setDate(newDate);
            setCurrentYear(date.getFullYear());
            setStartDate(moment(date).startOf('month').format('YYYY-MM-DD'));
            setLastDate(moment(date).endOf('month').format('YYYY-MM-DD'));
        }
    };

    useEffect(() => {
        console.log("Leave type", leaveTypeData)
        let ll = leaveTypeData?.map((item) => {
            return { label: `${item.name} (${getRemainingLeaveBalance(item)})`, value: item?.id };
        });
        setLeaveTypes(ll);
    }, [leaveTypeData]);

    const handleOnChange = (e, type = null, name) => {
        //console.log('e, type = null, name', e);
        if (type === 'select') {
            setPayload({ ...payload, [name]: e.value });
        } else if (type === 'date') {
            setPayload({ ...payload, [name]: moment(e).format('YYYY-MM-DD') });
        } else {
            setPayload({ ...payload, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let quota_id = leaveQuotaList.find((quota) => quota?.leave_type_id === payload?.leave_type_id && quota?.role_id === getCurrentUser()?.role_id)?.id
        console.log('quota_id', quota_id)
        dispatch(createLeaveRequestAction({
            ...payload,
            quota_id: quota_id
        }));
        setSubmit(true);
    };

    //console.log('handleSubmit', leaveListData);

    return (
        <Fragment>
            <Breadcrumbs mainTitle="Leave" parent="Me" title="Leave" />
            <Container fluid={true}>
                <Row>
                    <div className={'flex-space-between'}>
                        <H5>Leave Year {currentYear}</H5>
                        {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
							<div onClick={() => handleDateChange('decrese')}>
								<FaLessThan style={{ marginRight: '10px' }} />
							</div>
							<p style={{ color: 'blue' }}>
								{startDate.slice(0, 2)} {moment(date).format('MMM')} - {lastDate.slice(0, 2)}{' '}
								{moment(date).format('MMM')}
							</p>
							<FaGreaterThan
								style={{ marginLeft: '10px' }}
								onClick={() => handleDateChange('increase')}
							/>
						</div> */}
                        <div>
                            <Btn attrBtn={{ className: 'btn btn-air-primary', color: 'primary' }} onClick={toggle}>
                                Apply Leave
                            </Btn>
                        </div>
                    </div>
                </Row>
                <Row className="m-t-10">
                    {leaveTypeData?.map((item, i) => {
                        // 7 -> Leave without pay
                        // 4 -> Maternity Leave
                        if (item.id === 7 || (item.id === 4 && getCurrentUser()?.gender === 'male'))
                            return <></>
                        else
                            return (
                                <Col md="2" sm="12" key={i} className='m-b-20'>
                                    {/* <SocialWidget data={item} /> */}
                                    <LeaveWidget data={item} color={'#57B9F6'} series={getPercentValue(item).toFixed(0)} />
                                </Col>
                            )
                    })
                    }
                </Row>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <div className="mainCardHeader">
                                        <div className="paddingTop">
                                            <p>Leave & Holidays</p>
                                        </div>
                                        {/* <div className="mainCardHeaderChild">
											<p className="paddingTop">Upcoming</p>
											<Btn attrBtn={{ className: 'btn btn-air-primary', color: 'primary' }}>
												History
											</Btn>
										</div> */}
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableComponent data={leaveListData} tableColumns={leaveTableColumns} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modal} toggle={toggle} size='md'>
                <ModalHeader toggle={toggle}>Apply leaves</ModalHeader>
                <ModalBody className='m-l-10 m-r-10'>
                    <Row>
                        <Form className="theme-form" onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup className="form-group">
                                        <Label className="col-sm-12 col-form-label text-start">
                                            {"Select leave type"}
                                        </Label>
                                        <Select
                                            options={leaveTypes}
                                            className="js-example-basic-single col-sm-12"
                                            required
                                            name="leave_type_id"
                                            value={leaveTypes?.find(
                                                (obj) => obj.value === payload?.leave_type_id
                                            )}
                                            onChange={(e) =>
                                                handleOnChange(e, "select", "leave_type_id")
                                            }
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row
                                md="12 mb-12"
                                onChange={(e) => setLeaveType(e.target.value)}
                            >
                                <FormGroup className="form-group row" >
                                    <P>{'Do you need leave for ?'}</P>
                                    <Col>
                                        <Label className="d-block" htmlFor="edo-ani">
                                            <Input
                                                className="radio_animated"
                                                id="edo-ani"
                                                type="radio"
                                                name="HD"
                                                value="HD"
                                                checked={leaveType === "HD"}
                                                data-original-title=""
                                                title=""
                                            />
                                            Half day
                                        </Label>
                                    </Col>
                                    <Col>
                                        <Label className="d-block" htmlFor="edo-ani1">
                                            <Input
                                                className="radio_animated"
                                                id="edo-ani1"
                                                type="radio"
                                                name="FD"
                                                value="FD"
                                                checked={leaveType === "FD"}
                                                data-original-title=""
                                                title=""
                                            />
                                            Full day
                                        </Label>
                                    </Col>
                                    <Col>
                                        <Label
                                            className="d-flex align-items-center"
                                            htmlFor="edo-ani2"
                                        >
                                            <Input
                                                className="radio_animated"
                                                id="edo-ani2"
                                                type="radio"
                                                name="MIX"
                                                value="MIX"
                                                checked={leaveType === "MIX"}
                                                data-original-title=""
                                                title=""
                                            />
                                            &gt; 1 day
                                        </Label>
                                    </Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup className="form-group row">
                                        <Label className="col-sm-12 col-form-label text-start">
                                            {leaveType === "MIX" ? "From*" : "Date*"}
                                        </Label>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: "20px",
                                            }}
                                        >
                                            <DatePicker
                                                className="form-control digits col-sm-6"
                                                value={payload.start_date}
                                                format="YYYY-MM-DD"
                                                minDate={date}
                                                filterDate={(date) => isWorkingDayForUser(date, getCurrentUser()?.staff_type)}
                                                onSelect={(e) =>
                                                    handleOnChange(e, "date", "start_date")
                                                }
                                            />
                                            {leaveType !== 'FD' &&
                                                <Select
                                                    options={leaveType === 'HD' ? leaveTimeType?.filter(l => l.value !== 'FD') : leaveTimeType}
                                                    className="js-example-basic-single col-sm-6"
                                                    value={leaveTimeType?.find(
                                                        (obj) => obj.value === payload?.start_date_half
                                                    )}
                                                    onChange={(e) =>
                                                        handleOnChange(e, "select", "start_date_half")
                                                    }
                                                />
                                            }
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                {leaveType === "MIX" && (
                                    <Col>
                                        <FormGroup className="form-group row">
                                            <Label className="col-sm-12 col-form-label text-start">
                                                {"To*"}
                                            </Label>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: "20px",
                                                }}
                                            >
                                                <DatePicker
                                                    className="form-control digits col-sm-6"
                                                    value={payload.end_date}
                                                    minDate={new Date(moment(payload.start_date).add(1, 'days').format('YYYY-MM-DD'))}
                                                    format="YYYY-MM-DD"
                                                    filterDate={(date) => isWorkingDayForUser(date, getCurrentUser()?.staff_type)}
                                                    onChange={(e) =>
                                                        handleOnChange(e, "date", "end_date")
                                                    }
                                                />
                                                <Select
                                                    options={leaveTimeType}
                                                    className="js-example-basic-single col-sm-6"
                                                    value={leaveTimeType?.find(
                                                        (obj) => obj.value === payload?.end_date_half
                                                    )}
                                                    onChange={(e) =>
                                                        handleOnChange(e, "select", "end_date_half")
                                                    }
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                )}
                            </Row>
                            <Row md="12 mb-12">
                                <Col>
                                    <FormGroup>
                                        <Label className="col-sm-6 col-form-label text-start">
                                            {"Reason"}
                                        </Label>
                                        <Input
                                            id="newtask"
                                            type="textarea"
                                            name="reason"
                                            placeholder="type here leave reason"
                                            // defaultValue={task}
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
                                    Apply leave
                                </Button>
                            </ModalFooter>
                        </Form>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment >
    );
};

export const getRemainingLeaveBalance = (data) => {
    if (isEmpty(data.leave_quota)) {
        return '0';
    } else {
        if (!isEmpty(data.leave_quota[0]?.leave_balance)) {
            return `${data.leave_quota[0]?.leave_balance[0]?.remaining}`;
        } else {
            return `${data.leave_quota[0]?.quota_in_days}`;
        }
    }
};

export const getPercentValue = (data) => {
    if (isEmpty(data.leave_quota)) {
        return 0;
    } else {
        if (!isEmpty(data.leave_quota[0]?.leave_balance)) {
            return (data.leave_quota[0]?.leave_balance[0]?.consumed / data.leave_quota[0]?.leave_balance[0]?.quota || 0) * 100;
        } else {
            return (0 / data.leave_quota[0]?.quota_in_days || 0) * 100;
        }
    }
};

export default LeavePage;
