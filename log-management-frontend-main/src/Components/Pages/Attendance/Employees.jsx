import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, ToggleButton } from 'react-bootstrap';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { Card, CardBody, CardHeader, Col, Container, Input, Media, Row } from 'reactstrap';
import { Breadcrumbs, Image, ToolTip } from '../../../AbstractElements';
import { dummytabledata, employeeTableColumns } from '../../../Data/Table/Defaultdata';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { getAllUsersAttendance } from '../../../redux/actions/attendanceActions';
import user1 from '../../../assets/images/user/1.jpg'

const Employees = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [date, setDate] = useState(new Date())
    const [daysInMonth, setDaysInMonth] = useState(moment(date).daysInMonth())

    const [usersAttendanceData, setUsersAttendanceData] = useState([])
    const { usersAttendance } = useSelector(state => state.attendance)

    useEffect(() => {
        dispatch(getAllUsersAttendance({
            start_date: moment(date).startOf('month').format('YYYY-MM-DD'),
            end_date: moment(date).endOf('month').format('YYYY-MM-DD')
        }))
    }, [])

    useEffect(() => {
        let attendance = usersAttendance ?? []
        console.log(attendance)
        setUsersAttendanceData(attendance)
    }, [usersAttendance])

    useEffect(() => {
        dispatch(getAllUsersAttendance({
            start_date: moment(date).startOf('month').format('YYYY-MM-DD'),
            end_date: moment(date).endOf('month').format('YYYY-MM-DD')
        }))
    }, [date])

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

    const attendanceTableColumns = [
        {
            name: "S. No.",
            cell: (row, index) => index + 1,
            width: "4.25rem",
            center: true
        },
        {
            name: "Name",
            selector: (row) => (
                <div
                // onClick={() => history(
                //     `${process.env.PUBLIC_URL}/attendance/employees/${row.id}`,
                //     { state: { user_id: row.id } }
                // )}
                >
                    {row?.full_name ?? 'N/A'}
                </div>
            ),
            sortable: true,
            center: false,
        },
        {
            name: "Department",
            selector: (row) => `${row?.department ?? 'N/A'}`,
            sortable: true,
            center: false,
        },
        {
            name: "Designation",
            selector: (row) => `${row?.designation?.title ?? 'N/A'}`,
            sortable: true,
            center: true,
        },
        {
            name: "Total Days",
            selector: (row) => `${daysInMonth}`,
            sortable: true,
            center: true,
        },
        {
            name: "Presents",
            selector: (row) => `${row?.timelogs.length ?? 0}`,
            sortable: true,
            center: true,
        },
        {
            name: "Sick Leaves",
            selector: (row) => `${row?.leaves.filter(leave => leave.leave_type_id === 2).length ?? 0}`,
            sortable: true,
            center: true,
        },
        {
            name: "Casual Leaves",
            selector: (row) => `${row?.leaves.filter(leave => leave.leave_type_id === 1).length ?? 0}`,
            sortable: true,
            center: true,
        },
        {
            name: "Leave without Pays",
            selector: (row) => `${row?.leaves.filter(leave => leave.leave_type_id === 1).length ?? 0}`,
            sortable: true,
            center: true,
        }
    ];

    return (
        <Fragment>
            <Breadcrumbs parent="Attendance" title="Employees" mainTitle="Employees" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
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
                                <DataTableComponent
                                    data={usersAttendanceData}
                                    tableColumns={attendanceTableColumns}
                                    highlightOnHover={true}
                                    pointerOnHover
                                    onRowClicked={(row) => history(
                                        `${process.env.PUBLIC_URL}/attendance/employees/${row.id}`,
                                        { state: { user_id: row.id } }
                                    )}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Employees;
