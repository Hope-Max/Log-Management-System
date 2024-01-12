import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import moment from "moment";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

import "./index.scss";
import { getCurrentUser } from "../../../redux/constants";
import { Breadcrumbs, H6 } from "../../../AbstractElements";
import { getAllUsersAttendance } from "../../../redux/actions/attendanceActions";
import {
  createEmpTimelogs,
  updateEmpTimelogs,
  updateEmpHours,
} from "../../../redux/actions/timesheetAction";
import { isWorkingDayForUser, toTitleCase } from "../../../Utils";

const Attendance = (props) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(moment(date).daysInMonth());
  const [allDatesInMonth, setAllDatesInMonth] = useState([]);

  const [userID] = useState(getCurrentUser().id);
  const [userName, setUserName] = useState("");
  const [userAttendance, setUserAttendance] = useState([]);

  const [payload, setPayload] = useState({
    updated_by: getCurrentUser().id,
  });

  const { usersAttendance } = useSelector((state) => state.attendance);
  const { employeeTimelogs } = useSelector((state) => state.timesheet);

  useEffect(() => {
    dispatch(
      getAllUsersAttendance({
        start_date: moment(date).startOf("month").format("YYYY-MM-DD"),
        end_date: moment(date).endOf("month").format("YYYY-MM-DD"),
      })
    );
  }, [date]);

  useEffect(() => {
    let allDates = [];
    let daysCount = 1;
    while (daysCount <= daysInMonth) {
      let current = moment(date).date(daysCount);
      allDates.push(current);
      daysCount++;
    }
    setAllDatesInMonth(allDates);
  }, [date]);

  useEffect(() => {
    let userAttendance = usersAttendance?.find((user) => user.id === userID);
    console.log(userAttendance);

    setUserName(userAttendance?.full_name);
    setUserAttendance(userAttendance);
  }, [usersAttendance]);

  useEffect(async () => {
    dispatch(
      getAllUsersAttendance({
        start_date: moment(date).startOf("month").format("YYYY-MM-DD"),
        end_date: moment(date).endOf("month").format("YYYY-MM-DD"),
      })
    );
    // dispatch(updateEmpHours({ user_id: await getCurrentUser().id }));
  }, [employeeTimelogs]);

  const handleDateChange = (action) => {
    let newDate;
    if (action === "increase") {
      newDate = new Date(date.setMonth(date.getMonth() + 1));
    } else {
      newDate = new Date(date.setMonth(date.getMonth() - 1));
    }
    setDate(newDate);
    setDaysInMonth(moment(newDate).daysInMonth());
  };

  const handleOnChange = (e, type = null, name) => {
    if (type === "select") {
      setPayload({ ...payload, [name]: e.value });
    } else if (type === "date") {
      setPayload({ ...payload, [name]: moment(e).format("YYYY-MM-DD") });
    } else if (type === "datetime") {
      setPayload({
        ...payload,
        [name]: moment(e).format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  // Conditional Styles
  const styles = {
    defaultStyle: {
      backgroundColor: "#F3F4F6",
      borderColor: "#CCC",
    },
    presentStyle: {
      backgroundColor: "#E3F3DB",
      borderColor: "#3FA456",
    },
    absentStyle: {
      backgroundColor: "#FFE6E7",
      borderColor: "#F9888A",
    },
    leaveStyle: {
      backgroundColor: "#FDE9FA",
      borderColor: "#DC4CC5",
    },
    weekendStyle: {
      backgroundColor: "#FCF8E4",
      borderColor: "#FFE03F",
    },
  };

  const Present = (props) => {
    if (props.index === 0)
      return (
        <div
          className="date-grid-cell"
          style={Object.assign({}, styles.presentStyle, {
            gridColumn: `${moment(props.date).weekday() + 1}`,
          })}
        >
          <time datetime={moment(props.date).format("YYYY-MM-DD")}>
            {props.index + 1}
          </time>
          <div className="attendance-flag">
            <i
              className="fa fa-check-circle"
              style={{ color: "#3FA456", fontSize: "20px" }}
            ></i>
            Present
          </div>
          <div className="remarks">
            {toTitleCase(props.attendance.location ?? "Inside Office")}
          </div>
        </div>
      );
    return (
      <div className="date-grid-cell" style={styles.presentStyle}>
        <time datetime={moment(props.date).format("YYYY-MM-DD")}>
          {props.index + 1}
        </time>
        <div className="attendance-flag">
          <i
            className="fa fa-check-circle"
            style={{ color: "#3FA456", fontSize: "20px" }}
          ></i>
          Present
        </div>
        {/* <div className='remarks'>
                    <li>{props.attendance.hours} Hrs</li>
                </div> */}
        <div className="remarks">
          {toTitleCase(props.attendance.location ?? "Inside Office")}
        </div>
      </div>
    );
  };
  const Absent = (props) => {
    if (props.index === 0)
      return (
        <div
          className="date-grid-cell"
          style={Object.assign({}, styles.absentStyle, {
            gridColumn: `${moment(props.date).weekday() + 1}`,
          })}
        >
          <time datetime={moment(props.date).format("YYYY-MM-DD")}>
            {props.index + 1}
          </time>
          <div className="attendance-flag">
            <i
              className="fa fa-times-circle"
              style={{ color: "#F9888A", fontSize: "20px" }}
            ></i>
            Absent
          </div>
        </div>
      );
    return (
      <div className="date-grid-cell" style={styles.absentStyle}>
        <time datetime={moment(props.date).format("YYYY-MM-DD")}>
          {props.index + 1}
        </time>
        <div className="attendance-flag">
          <i
            className="fa fa-times-circle"
            style={{ color: "#F9888A", fontSize: "20px" }}
          ></i>
          Absent
        </div>
      </div>
    );
  };
  const Leave = (props) => {
    if (props.index === 0)
      return (
        <div
          className="date-grid-cell"
          style={Object.assign({}, styles.leaveStyle, {
            gridColumn: `${moment(props.date).weekday() + 1}`,
          })}
        >
          <time datetime={moment(props.date).format("YYYY-MM-DD")}>
            {props.index + 1}
          </time>
          <div className="attendance-flag">
            <i
              className="fa fa-plus-circle"
              style={{ color: "#DC4CC5", fontSize: "20px" }}
            ></i>
            Leave
          </div>
          <div className="remarks" style={{ textAlign: "center" }}>
            {props.leaveType}
          </div>
        </div>
      );
    return (
      <div className="date-grid-cell" style={styles.leaveStyle}>
        <time datetime={moment(props.date).format("YYYY-MM-DD")}>
          {props.index + 1}
        </time>
        <div className="attendance-flag">
          <i
            className="fa fa-plus-circle"
            style={{ color: "#DC4CC5", fontSize: "20px" }}
          ></i>
          Leave
        </div>
        <div className="remarks" style={{ textAlign: "center" }}>
          {props.leaveType}
        </div>
      </div>
    );
  };
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
        <div
          className="date-grid-cell"
          style={Object.assign({}, styles.defaultStyle, {
            gridColumn: `${moment(props.date).weekday() + 1}}`,
          })}
        >
          <time datetime={moment(props.date).format("YYYY-MM-DD")}>
            {props.index + 1}
          </time>
        </div>
      );
    return (
      <div className="date-grid-cell" style={styles.defaultStyle}>
        <time datetime={moment(props.date).format("YYYY-MM-DD")}>
          {props.index + 1}
        </time>
      </div>
    );
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Attendance"
        title="EmployeeID"
        mainTitle={userName}
      />
      <Container fluid={true}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div
                  className="month-indicator"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "center",
                  }}
                >
                  <FaLessThan
                    style={{ marginRight: "10px" }}
                    onClick={() => handleDateChange("decrese")}
                  />
                  <p style={{ color: "blue", userSelect: "none" }}>
                    {moment(date).format("MMM YYYY")}
                  </p>
                  <FaGreaterThan
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDateChange("increase")}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <div className="calendar">
                  <div className="day-of-week" style={{ userSelect: "none" }}>
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
                      let ithDate = moment(idate).format("YYYY-MM-DD");
                      let currentDate = moment().format("YYYY-MM-DD");
                      let joiningDate = moment(userAttendance?.doj).format(
                        "YYYY-MM-DD"
                      );

                      if (
                        moment(ithDate).isAfter(currentDate) ||
                        moment(ithDate).isBefore(joiningDate)
                      )
                        return <DefaultDate index={index} date={ithDate} />;
                      else {
                        let attendance = userAttendance?.timelogs?.find(
                          (log) =>
                            moment(log.date).format("YYYY-DD-MM") ===
                            moment(idate).format("YYYY-DD-MM")
                        );

                        let leave = userAttendance?.leaves?.find((leave) => {
                          let start_date = moment(leave?.start_date).format(
                            "YYYY-MM-DD"
                          );
                          let end_date = moment(leave?.end_date).format(
                            "YYYY-MM-DD"
                          );

                          return (
                            moment(start_date).isSameOrBefore(ithDate) &&
                            moment(end_date).isSameOrAfter(ithDate)
                          );
                        });

                        if (attendance)
                          return (
                            <Present
                              index={index}
                              date={ithDate}
                              attendance={attendance}
                            />
                          );
                        else if (leave) {
                          let leave_type = leave.leaveType.name;
                          return <Leave index={index} leaveType={leave_type} date={ithDate} />;
                        }
                        else if (!isWorkingDayForUser(ithDate, getCurrentUser()?.staff_type))
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
    </Fragment>
  );
};

export default Attendance;
