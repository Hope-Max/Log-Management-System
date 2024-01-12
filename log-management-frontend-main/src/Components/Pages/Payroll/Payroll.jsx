import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import moment from 'moment';
import { Breadcrumbs, Btn } from '../../../AbstractElements';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { getAllUsersAttendance } from '../../../redux/actions/attendanceActions';
import { listAll } from '../../../redux/actions/payrollActions'
import { handleDownloadExcel } from '../../../Utils';


const Payroll = () => {
    const dispatch = useDispatch()

    const [date, setDate] = useState(new Date())
    const [daysInMonth, setDaysInMonth] = useState(moment(date).daysInMonth())

    const [payrollData, setPyarollData] = useState([])
    const { usersAttendance } = useSelector(state => state.attendance)

    const [monthlyPayrollData, setMonthlyPayrollData] = useState([])
    const { all_users_monthly_payroll } = useSelector(state => state.payroll)

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

    useEffect(() => {
        dispatch(getAllUsersAttendance({
            start_date: moment(date).startOf('month').format('YYYY-MM-DD'),
            end_date: moment(date).endOf('month').format('YYYY-MM-DD')
        }))
        dispatch(listAll({
            year: moment(date).year(),
            month: moment(date).format('MMM')
        }))
    }, [])

    useEffect(() => {
        let attendance = usersAttendance ?? []
        console.log(attendance)
        let data = attendance.map(item => {
            return {
                // need to recheck all data
                "Visa Branch": item?.visa_branch ?? 'N/A',
                "Working Branch": item?.working_branch ?? 'N/A',
                "Employee Name": item?.full_name ?? 'N/A',
                "Emp. ID": item?.employee_id ?? 'N/A',
                "Labour Card No.": item?.labour_id ?? 'N/A',
                "Department": item?.department ?? 'N/A',
                "Designation": item?.designation?.title ?? 'N/A',
                "MOHRE Salary (In AED)": item?.mohre_salary ?? '0.0',
                "Basic Fixed Salary (In AED)": item?.base_salary ?? '0.0',
                "Total Days": daysInMonth ?? 0,
                "Leave without Pays": item?.leaves.filter(leave => leave.leave_type_id === 7).length ?? 0,
                "Sick Leaves": item?.leaves.filter(leave => leave.leave_type_id === 2).length ?? 0,
                "Paid Days": item?.timelogs.length ?? 0,
                "Overtime Hours": monthlyPayrollData.find(payroll => payroll.user_id === item.id)?.payables?.workHoursDesc?.total_overtime_hours ?? '00:00',
                "Overtime Rate": item?.per_hour_salary ?? '0.0',
                "Overtime Amount (In AED)": monthlyPayrollData.find(payroll => payroll.user_id === item.id)?.payables?.workHoursDesc?.total_overtime_hours ?? '0.0',
                "Gross Pay (In AED)": item?.gross_salary ?? '0.0',
                "Allowances / Expenses / Gratuity": item?.payables?.other ?? '0.0',
                "Annual Leave Pay": item?.payables?.other ?? '0.0',
                "Loans / Advances": item?.deductions?.loan ?? '0.0',
                "Other Deductions": item?.deductions?.other ?? '0.0',
                "Leave Deductions": item?.deductions?.other ?? '0.0',
                "Net Pay (In AED)": monthlyPayrollData.find(payroll => payroll.user_id === item.id)?.net_pay ?? '0.0',
                "Minimum Pay Req.": item?.mohre_salary ?? '0.0',
                "Remarks": item?.remarks ?? 'N/A'
            }
        })
        setPyarollData(data)
    }, [usersAttendance])

    useEffect(() => {
        dispatch(getAllUsersAttendance({
            start_date: moment(date).startOf('month').format('YYYY-MM-DD'),
            end_date: moment(date).endOf('month').format('YYYY-MM-DD')
        }))
    }, [date])

    useEffect(() => {
        console.log(all_users_monthly_payroll)
        setMonthlyPayrollData(all_users_monthly_payroll)
    }, [all_users_monthly_payroll])

    const downloadExcel = () => {
        handleDownloadExcel(payrollData, "SHEET_NAME", "MY_FILENAME")
    };

    const payrollTableColumns = [
        {
            name: "S. No.",
            cell: (row, index) => index + 1,
            width: "4.25rem",
            center: true
        },
        {
            name: "Visa Branch",
            selector: (row) => `${row["Visa Branch"]}`,
        },
        {
            name: "Working Branch",
            selector: (row) => `${row["Working Branch"]}`,
        },
        {
            name: "Employee Name",
            selector: (row) => `${row["Employee Name"]}`,
            sortable: true
        },
        {
            name: "Emp. ID",
            selector: (row) => `${row["Emp. ID"]}`,
            sortable: true
        },
        {
            name: "Labour Card No.",
            selector: (row) => `${row["Labour Card No."]}`,
            sortable: true
        },
        {
            name: "Department",
            selector: (row) => `${row["Department"]}`,
            sortable: true,
        },
        {
            name: "Designation",
            selector: (row) => `${row["Designation"]}`,
            sortable: true,
        },
        {
            name: "MOHRE Salary (In AED)",
            selector: (row) => `${row["MOHRE Salary (In AED)"]}`,
            sortable: true,
        },
        {
            name: "Basic Fixed Salary (In AED)",
            selector: (row) => `${row["Basic Fixed Salary (In AED)"]}`,
            sortable: true,
        },
        {
            name: "Total Days",
            selector: (row) => `${row["Total Days"]}`,
            sortable: true,
        },
        {
            name: "Leave without Pays",
            selector: (row) => `${row["Leave without Pays"]}`,
            sortable: true,
        },
        {
            name: "Sick Leaves",
            selector: (row) => `${row["Sick Leaves"]}`,
            sortable: true,
        },
        {
            name: "Paid Days",
            selector: (row) => `${row["Paid Days"]}`,
            sortable: true,
        },
        {
            name: "Overtime Hours",
            selector: (row) => `${row["Overtime Hours"]}`,
            sortable: true,
        },
        {
            name: "Overtime Rate",
            selector: (row) => `${row["Overtime Rate"]}`,
            sortable: true,
        },
        {
            name: "Overtime Amount (In AED)",
            selector: (row) => `${row["Overtime Amount (In AED)"]}`,
            sortable: true,
        },
        {
            name: "Gross Pay (In AED)",
            selector: (row) => `${row["Gross Pay (In AED)"]}`,
            sortable: true,
        },
        {
            name: "Allowances / Expenses / Gratuity",
            selector: (row) => `${row["Allowances / Expenses / Gratuity"]}`,
            sortable: true
        },
        {
            name: "Annual Leave Pay",
            selector: (row) => `${row["Annual Leave Pay"]}`,
            sortable: true
        },
        {
            name: "Loans / Advances",
            selector: (row) => `${row["Loans / Advances"]}`,
            sortable: true
        },
        {
            name: "Other Deductions",
            selector: (row) => `${row["Other Deductions"]}`,
            sortable: true
        },
        {
            name: "Leave Deductions",
            selector: (row) => `${row["Leave Deductions"]}`,
            sortable: true
        },
        {
            name: "Net Pay (In AED)",
            selector: (row) => `${row["Net Pay (In AED)"]}`,
            sortable: true
        },
        {
            name: "Minimum Pay Req.",
            selector: (row) => `${row["Minimum Pay Req."]}`,
            sortable: true,
        },
        {
            name: "Remarks",
            selector: (row) => `${row["Remarks"]}`,
            sortable: true
        }
    ];


    return (
        <Fragment>
            <Breadcrumbs mainTitle="Payroll Summary" parent="Payroll" title="Employees" />
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <div
                                    className="d-flex flex-row justify-content-center align-items-center"
                                    style={{ minWidth: "100%" }}
                                >
                                    <div className="flex-fill text-center month-indicator" style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', height: '100%' }}>
                                        <FaLessThan
                                            style={{ marginRight: '10px' }}
                                            onClick={() => handleDateChange('decrese')}
                                        />
                                        <span style={{ color: 'blue', userSelect: 'none' }}>
                                            {moment(date).format("MMM YYYY")}
                                        </span>
                                        <FaGreaterThan
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => handleDateChange('increase')}
                                        />
                                    </div>
                                    <Btn
                                        className='ms-auto d-flex-inline align-items-center'
                                        attrBtn={{
                                            color: 'primary',
                                            onClick: downloadExcel,
                                        }}
                                    >
                                        <i className="fa fa-file-excel-o m-r-10" style={{ fontSize: '16px' }}></i>
                                        {'Export'}
                                    </Btn>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <DataTableComponent data={payrollData} tableColumns={payrollTableColumns} highlightOnHover={true} pointerOnHover />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment >
    )
}

export default Payroll