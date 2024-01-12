import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import moment from 'moment';
import {
    Container, Row, Col,
    Card, CardHeader, CardBody,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Input, Label,
    Button
} from 'reactstrap'
import Select from "react-select";
import DatePicker from 'react-datepicker';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

import './index.scss';
import { getCurrentUser } from '../../../redux/constants';
import { Breadcrumbs, H6 } from '../../../AbstractElements'
import { getAllUsersAttendance } from '../../../redux/actions/attendanceActions';
import { createEmpTimelogs, updateEmpTimelogs, markEmpAbsent } from '../../../redux/actions/timesheetAction';
import { isWorkingDayForUser, toTitleCase } from '../../../Utils';

const MonthlyAttendance = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [date, setDate] = useState(new Date())
    const [daysInMonth, setDaysInMonth] = useState(moment(date).daysInMonth())
    const [allDatesInMonth, setAllDatesInMonth] = useState([])

    const [userID, setUserID] = useState(location?.state?.user_id)
    const [userName, setUserName] = useState("")
    const [userAttendance, setUserAttendance] = useState([])
    const [userProjectsList, setUserProjectsList] = useState([])
    const [timelogID, setTimelogID] = useState(null)
    const [markAbsent, setmarkAbsent] = useState(false)
    const [markAbsentCheck, setmarkAbsentCheck] = useState(true)

    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [submit, setSubmit] = useState(false)

    const intial_payload = {
        updated_by: getCurrentUser().id,
        project_id: null
    }
    const [payload, setPayload] = useState(intial_payload);

    const { usersAttendance } = useSelector(state => state.attendance)
    const { employeeTimelogs, empTimelogDeleteSuccess } = useSelector(state => state.timesheet)

    useEffect(() => {
        dispatch(getAllUsersAttendance({
            start_date: moment(date).startOf('month').format('YYYY-MM-DD'),
            end_date: moment(date).endOf('month').format('YYYY-MM-DD')
        }))
    }, [date])

    useEffect(() => {
        let allDates = []
        let daysCount = 1
        while (daysCount <= daysInMonth) {
            let current = moment(date).date(daysCount);
            allDates.push(current);
            daysCount++;
        }
        setAllDatesInMonth(allDates);
    }, [date])

    useEffect(() => {
        let userAttendance = usersAttendance?.find(user => user.id === userID)

        let projects = userAttendance?.projects.map(project => {
            return { label: project.name, value: project.id }
        })

        projects?.push({
            label: "No Project Selected..",
            value: null
        })
        setUserName(userAttendance?.full_name)
        setUserAttendance(userAttendance)
        setUserProjectsList(projects)
        setPayload(intial_payload)
    }, [usersAttendance])

    useEffect(() => {
        dispatch(getAllUsersAttendance({
            start_date: moment(date).startOf('month').format('YYYY-MM-DD'),
            end_date: moment(date).endOf('month').format('YYYY-MM-DD')
        }))
        // dispatch(updateEmpHours(payload))
        setPayload(intial_payload)
    }, [employeeTimelogs, empTimelogDeleteSuccess])

    useEffect(() => {
        setmarkAbsent(false)
    }, [empTimelogDeleteSuccess])

    const handleDateChange = (action) => {
        let newDate
        if (action === 'increase') {
            newDate = new Date(date.setMonth(date.getMonth() + 1));
        } else {
            newDate = new Date(date.setMonth(date.getMonth() - 1));
        }
        setDate(newDate);
        setDaysInMonth(moment(newDate).daysInMonth())
    };

    const toggle = () => setModal(!modal);

    const handleOnChange = (e, type = null, name) => {
        if (type === 'select') {
            setPayload({ ...payload, [name]: e.value });
        } else if (type === 'date') {
            setPayload({ ...payload, [name]: moment(e).format('YYYY-MM-DD') });
        } else if (type === 'datetime') {
            setPayload({ ...payload, [name]: moment(e).format('YYYY-MM-DD HH:mm:ss') })
        }
        else {
            setPayload({ ...payload, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(payload)

        if (markAbsent)
            dispatch(markEmpAbsent({
                date: payload.date,
                user_id: payload.user_id
            }))
        else if (edit)
            dispatch(updateEmpTimelogs(payload))
        else
            dispatch(createEmpTimelogs(payload))

        setSubmit(true)
        toggle()
        setEdit(false)
    };

    // Conditional Styles
    const styles = {
        defaultStyle: {
            backgroundColor: "#F3F4F6",
            borderColor: "#CCC"
        },
        presentStyle: {
            backgroundColor: "#E3F3DB",
            borderColor: "#3FA456"
        },
        absentStyle: {
            backgroundColor: "#FFE6E7",
            borderColor: "#F9888A"
        },
        leaveStyle: {
            backgroundColor: "#FDE9FA",
            borderColor: "#DC4CC5"
        },
        weekendStyle: {
            backgroundColor: "#FCF8E4",
            borderColor: "#FFE03F"
        }
    };

    const Present = (props) => {
        if (props.index === 0)
            return (
                <div className='date-grid-cell'
                    style={Object.assign({}, styles.presentStyle, { gridColumn: `${moment(props.date).weekday() + 1}` })}>
                    <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                        {props.index + 1}
                    </time>
                    <div className='attendance-flag'>
                        <i className="fa fa-check-circle" style={{ color: "#3FA456", fontSize: "20px" }}></i>
                        Present
                    </div>
                    <div className='attendance-edit' style={{ backgroundColor: "#3FA456", color: 'white' }}
                        onClick={() => {
                            setEdit(true);
                            setPayload({
                                ...payload,
                                user_id: userID,
                                date: moment(props.attendance.date).format('YYYY-MM-DD'),
                                is_checked_in: props.attendance.is_checked_in,
                                check_in_time: moment(props.attendance.check_in_time).format('YYYY-MM-DD HH:mm:ss'),
                                is_checked_out: props.attendance.is_checked_out,
                                check_out_time: moment(props.attendance.check_out_time ?? props.ithDate).format('YYYY-MM-DD HH:mm:ss'),
                                project_id: props.attendance.project_id
                            });
                            setTimelogID(props.attendance.id)
                            setmarkAbsentCheck(true);
                            toggle();
                        }}
                    >
                        <span style={{ cursor: "pointer" }}>
                            <i className="icofont icofont-ui-edit"></i>
                        </span>
                    </div>
                    <div className='remarks'>
                        {toTitleCase(props.attendance.location ?? "")}
                    </div>
                </div>
            )
        return (
            <div className='date-grid-cell' style={styles.presentStyle}>
                <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                    {props.index + 1}
                </time>
                <div className='attendance-flag'>
                    <i className="fa fa-check-circle" style={{ color: "#3FA456", fontSize: "20px" }}></i>
                    Present
                </div>
                <div className='attendance-edit' style={{ backgroundColor: "#3FA456", color: 'white' }}
                    onClick={() => {
                        setEdit(true);
                        setPayload({
                            ...payload,
                            user_id: userID,
                            date: moment(props.attendance.date).format('YYYY-MM-DD'),
                            is_checked_in: props.attendance.is_checked_in,
                            check_in_time: moment(props.attendance.check_in_time).format('YYYY-MM-DD HH:mm:ss'),
                            is_checked_out: props.attendance.is_checked_out,
                            check_out_time: moment(props.attendance.check_out_time ?? props.ithDate).format('YYYY-MM-DD HH:mm:ss'),
                            project_id: props.attendance.project_id
                        });
                        setTimelogID(props.attendance.id)
                        setmarkAbsentCheck(true);
                        toggle();
                    }}
                >
                    <span style={{ cursor: "pointer" }}>
                        <i className="icofont icofont-ui-edit"></i>
                    </span>
                </div>
                <div className='remarks'>
                    {toTitleCase(props.attendance.location ?? "")}
                </div>
            </div>
        )
    }
    const Absent = (props) => {
        if (props.index === 0)
            return (
                <div className='date-grid-cell'
                    style={Object.assign({}, styles.absentStyle, { gridColumn: `${moment(props.date).weekday() + 1}` })}>
                    <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                        {props.index + 1}
                    </time>
                    <div className='attendance-flag'>
                        <i className="fa fa-times-circle" style={{ color: "#F9888A", fontSize: "20px" }}></i>
                        Absent
                    </div>
                    <div className='attendance-edit' style={{ backgroundColor: "#F9888A", color: 'white' }}
                        onClick={() => {
                            setPayload({
                                ...payload,
                                user_id: userID,
                                date: moment(props.date).format('YYYY-MM-DD')
                            });
                            setmarkAbsentCheck(false);
                            toggle();
                        }}
                    >
                        <span style={{ cursor: "pointer" }}>
                            <i className="icofont icofont-plus"></i>
                        </span>
                    </div>
                </div>
            )
        return (
            <div className='date-grid-cell' style={styles.absentStyle}>
                <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                    {props.index + 1}
                </time>
                <div className='attendance-flag'>
                    <i className="fa fa-times-circle" style={{ color: "#F9888A", fontSize: "20px" }}></i>
                    Absent
                </div>
                <div className='attendance-edit' style={{ backgroundColor: "#F9888A", color: 'white' }}
                    onClick={() => {
                        setPayload({
                            ...payload,
                            user_id: userID,
                            date: moment(props.date).format('YYYY-MM-DD')
                        });
                        setmarkAbsentCheck(false);
                        toggle();
                    }}
                >
                    <span style={{ cursor: "pointer" }}>
                        <i className="icofont icofont-plus"></i>
                    </span>
                </div>
            </div>
        )
    }
    const Leave = (props) => {
        if (props.index === 0)
            return (
                <div className='date-grid-cell'
                    style={Object.assign({}, styles.leaveStyle, { gridColumn: `${moment(props.date).weekday() + 1}` })}>
                    <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                        {props.index + 1}
                    </time>
                    <div className='attendance-flag'>
                        <i className="fa fa-plus-circle" style={{ color: "#DC4CC5", fontSize: "20px" }}></i>
                        Leave
                    </div>
                    <div className='attendance-edit' style={{ backgroundColor: "#DC4CC5", color: 'white' }}
                    // onClick={toggle}
                    >
                        <span style={{ cursor: "pointer" }}>
                            <i className="icofont icofont-info"></i>
                        </span>
                    </div>
                    <div className='remarks' style={{ textAlign: 'center' }}>
                        {props.leaveType}
                    </div>
                </div>
            )
        return (
            <div className='date-grid-cell' style={styles.leaveStyle}>
                <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                    {props.index + 1}
                </time>
                <div className='attendance-flag'>
                    <i className="fa fa-plus-circle" style={{ color: "#DC4CC5", fontSize: "20px" }}></i>
                    Leave
                </div>
                <div className='attendance-edit' style={{ backgroundColor: "#DC4CC5", color: 'white' }}
                // onClick={toggle}
                >
                    <span style={{ cursor: "pointer" }}>
                        <i className="icofont icofont-info"></i>
                    </span>
                </div>
                <div className='remarks' style={{ textAlign: 'center' }}>
                    {props.leaveType}
                </div>
            </div >
        )
    }
    const Weekend = (props) => {
        if (props.index === 0)
            return (
                <div
                    className="date-grid-cell"
                    style={Object.assign({}, styles.weekendStyle, {
                        gridColumn: `${moment(props.date).weekday() + 1}`,
                    })}
                >
                    <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                        {props.index + 1}
                    </time>
                    <div className="attendance-flag">
                        <i
                            className="fa fa-home"
                            style={{ color: "#FFE03F", fontSize: "20px" }}
                        ></i>
                        Weekend
                    </div>
                </div>
            );
        return (
            <div className="date-grid-cell" style={styles.weekendStyle}>
                <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                    {props.index + 1}
                </time>
                <div className="attendance-flag">
                    <i
                        className="fa fa-home"
                        style={{ color: "#FFE03F", fontSize: "20px" }}
                    ></i>
                    Weekend
                </div>
            </div>
        );
    };
    const DefaultDate = (props) => {
        if (props.index === 0)
            return (
                <div className='date-grid-cell'
                    style={Object.assign({}, styles.defaultStyle, { gridColumn: `${moment(props.date).weekday() + 1}` })}>
                    <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                        {props.index + 1}
                    </time>
                </div>
            )
        return (
            <div className='date-grid-cell' style={styles.defaultStyle}>
                <time datetime={moment(props.date).format("YYYY-MM-DD")}>
                    {props.index + 1}
                </time>
            </div>
        )
    }

    return (
        <Fragment>
            <Breadcrumbs parent="Attendance" title={userAttendance?.employee_id} mainTitle={userName} />
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <div className="month-indicator" style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
                                    <FaLessThan
                                        style={{ marginRight: '10px' }}
                                        onClick={() => handleDateChange('decrese')}
                                    />
                                    <p style={{ color: 'blue', userSelect: 'none' }}>
                                        {moment(date).format("MMM YYYY")}
                                    </p>
                                    <FaGreaterThan
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => handleDateChange('increase')}
                                    />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="calendar">
                                    <div className="day-of-week" style={{ userSelect: 'none' }}>
                                        <div>Sun</div>
                                        <div>Mon</div>
                                        <div>Tue</div>
                                        <div>Wed</div>
                                        <div>Thu</div>
                                        <div>Fri</div>
                                        <div>Sat</div>
                                    </div>
                                    <div className="date-grid">
                                        {allDatesInMonth?.map((idate, index) => {
                                            let ithDate = moment(idate).format('YYYY-MM-DD')
                                            let currentDate = moment().format('YYYY-MM-DD')
                                            let joiningDate = moment(userAttendance?.doj).format('YYYY-MM-DD')

                                            if (moment(ithDate).isAfter(currentDate) || moment(ithDate).isBefore(joiningDate))
                                                return <DefaultDate index={index} date={ithDate} />
                                            else {
                                                let attendance = userAttendance?.timelogs?.find(log => moment(log.date).format("YYYY-DD-MM") === moment(idate).format("YYYY-DD-MM"))

                                                let leave = userAttendance?.leaves?.find(leave => {

                                                    let start_date = moment(leave?.start_date).format('YYYY-MM-DD')
                                                    let end_date = moment(leave?.end_date).format('YYYY-MM-DD')

                                                    return (moment(start_date).isSameOrBefore(ithDate) && moment(end_date).isSameOrAfter(ithDate))
                                                })

                                                if (attendance)
                                                    return <Present index={index} date={ithDate} attendance={attendance} />
                                                else if (leave) {
                                                    let leave_type = leave.leaveType.name
                                                    return <Leave index={index} leaveType={leave_type} date={ithDate} />
                                                }
                                                else if (!isWorkingDayForUser(ithDate, userAttendance?.staff_type))
                                                    return <Weekend index={index} date={ithDate} />;
                                                else return <Absent index={index} date={ithDate} />;
                                            }
                                        })}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <ModalHeader toggle={toggle}>Timesheet</ModalHeader>
                <ModalBody>
                    <Row>
                        <div style={{ paddingInline: '1.25rem' }}>
                            <Form className="theme-form" onSubmit={handleSubmit}>
                                {
                                    markAbsentCheck && (
                                        <Row>
                                            <Col md="6">
                                                <FormGroup check inline>
                                                    <div className="checkbox checkbox-dark m-squar">
                                                        <Input
                                                            id="inline-sqr-1"
                                                            type="checkbox"
                                                            onChange={() => setmarkAbsent(!markAbsent)}
                                                        />
                                                        <Label className="mt-0" for="inline-sqr-1">
                                                            {"Mark as Absent"}
                                                        </Label>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    )
                                }
                                {
                                    !markAbsent && (
                                        <>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup className="form-group row">
                                                        <Label className="col-sm-6 col-form-label text-start">
                                                            <H6>{'Date'}</H6>
                                                        </Label>
                                                        <DatePicker
                                                            className="form-control digits col-sm-6"
                                                            name='date'
                                                            value={payload.date}
                                                            format="YYYY-MM-DD"
                                                            onSelect={(e) => handleOnChange(e, 'date', 'date')}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="form-group row">
                                                        <Label className="col-sm-6 col-form-label text-start">
                                                            <H6>{"Project"}</H6>
                                                        </Label>
                                                        <Select
                                                            options={userProjectsList}
                                                            // styles={{
                                                            //     control: (baseStyles, state) => ({
                                                            //         ...baseStyles,
                                                            //         border: (state.isFocused || state.isOptionSelected || state.isSelected) ? 'none ' : 'none',
                                                            //     }),
                                                            // }}
                                                            className="js-example-basic-single col-sm-12"
                                                            type="select"
                                                            name="project_id"
                                                            value={{
                                                                label: userProjectsList?.find(project => project.value === payload.project_id)?.label,
                                                                value: payload.project_id
                                                            }}
                                                            onChange={(e) =>
                                                                handleOnChange(e, "select", "project_id")
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup className="form-group row">
                                                        <Label className="col-sm-6 col-form-label text-start">
                                                            <H6>{'Check-in Time'}</H6>
                                                        </Label>
                                                        <DatePicker
                                                            className="form-control digits col-sm-6"
                                                            name='check_in_time'
                                                            value={moment(payload.check_in_time).format('hh:mm a')}
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            // timeCaption="Time"
                                                            dateFormat="hh:mm a"
                                                            onChange={(e) => handleOnChange(e, 'datetime', 'check_in_time')}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="form-group row">
                                                        <Label className="col-sm-6 col-form-label text-start">
                                                            <H6>{'Check-out Time'}</H6>
                                                        </Label>
                                                        <DatePicker
                                                            className="form-control digits col-sm-6"
                                                            name='check_out_time'
                                                            value={moment(payload.check_out_time).format('hh:mm a')}
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            // timeCaption="Time"
                                                            dateFormat="hh:mm a"
                                                            onChange={(e) => handleOnChange(e, 'datetime', 'check_out_time')}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                }
                                <ModalFooter className='m-t-20'>
                                    <Button color="secondary" onClick={toggle}>
                                        Cancel
                                    </Button>
                                    {
                                        markAbsent
                                            ?
                                            (
                                                <Button color="secondary" type="submit">
                                                    Delete
                                                </Button>
                                            )
                                            :
                                            (
                                                <Button color="primary" type="submit">
                                                    Update
                                                </Button>
                                            )
                                    }
                                </ModalFooter>
                            </Form>
                        </div>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment >
    )
}

export default MonthlyAttendance