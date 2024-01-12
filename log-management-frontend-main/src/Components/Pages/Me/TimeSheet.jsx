import React, { Fragment, useEffect, useState } from "react";
import "./index.scss";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import styles from "./FrameComponent.module.css";
import { Breadcrumbs, Btn, H5, P } from "../../../AbstractElements";
import { Clock } from "react-feather";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  checkIN,
  checkOUT,
  listTimeLogs,
  listTimeLogsOfWeek,
  updateHours,
} from "../../../redux/actions/timesheetAction";
import { getDaysBetweenDates } from "../../../Utils";
import Select from "react-select";
import { getProfile } from "../../../redux/actions/commonApiAction";
import { Textarea } from "@mobiscroll/react-lite";
import { FormLabel } from "react-bootstrap";

const seedTimeSheetData = () => {
  let timeSheet = {
    date: "",
    checkIn: "--:-- --",
    checkOut: "--:-- --",
    totalHrs: "00:00 Hrs",
    start: 1,
    end: 540,
  };

  let fakeTimeSheetData = Array.from({ length: 7 });
  fakeTimeSheetData.fill(timeSheet);

  let startDate = moment().startOf("week").format("YYYY-MM-DD");
  let endDate = moment().endOf("week").format("YYYY-MM-DD");
  const dates = getDaysBetweenDates(startDate, endDate);

  let newTimeSheetData = fakeTimeSheetData.map((timesheet, i = 0) => {
    return {
      ...timesheet,
      date: moment(dates[i++]).format("ddd, DD").toString(),
    };
  });
  fakeTimeSheetData = newTimeSheetData;
  return fakeTimeSheetData;
};

const TimeSheet = () => {
  const dispatch = useDispatch();
  const { loading, timelogToday, timelogsWeek, error } = useSelector(
    (state) => state.timesheet
  );
  const { profile } = useSelector((state) => state.commonApi);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [onSite, setOnSite] = useState(false);
  const [description, setDescription] = useState("");
  const [submit, setSubmit] = useState(false);

  let fakeTimeSheetData = seedTimeSheetData();
  const [timeSheetData, setTimeSheetData] = useState(fakeTimeSheetData);

  const [project, setProject] = useState(null);
  const [assignedProjects, setAssignedProjects] = useState({
    value: "null",
    label: "Select department",
  });

  // const [minOfAllCheckInTimes, setMinOfAllCheckInTimes] = useState(null)
  // const [maxOfAllCheckOutTimes, setMaxOfAllCheckOutTimes] = useState(null)
  //console.log(timelogToday)
  useEffect(() => {
    dispatch(getProfile());
    dispatch(listTimeLogs());
    dispatch(listTimeLogsOfWeek());
  }, []);

  useEffect(() => {
    if (submit) {
      if (Object.keys(timelogToday).length !== 0) {
        setSubmit(false);
        toggle();
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [timelogToday]);

  useEffect(() => {
    let options = profile?.projects?.map((project) => {
      return {
        label: project?.name,
        value: project?.id,
      };
    });
    options?.push({ label: "Other", value: "null" });
    setAssignedProjects(options);

    setTimeSheetData(fakeTimeSheetData)
  }, [profile]);

  useEffect(() => {
    setIsCheckedIn(timelogToday[0]?.is_checked_in);
    setIsCheckedOut(timelogToday[0]?.is_checked_out);
  }, [timelogToday]);

  useEffect(() => {
    updateTimeSheetData();
  }, [timelogsWeek, timelogToday]);

  useEffect(() => {
    dispatch(listTimeLogsOfWeek());
  }, [isCheckedIn, isCheckedOut]);

  const handleCheckIN = () => {
    // console.log("profile", profile?.staff_type);
    if (profile?.staff_type === "office") {
      setOpenModal(true);
    } else {
      // setOpenModal(true);
      dispatch(checkIN());
    }
  };

  const handleCheckOUT = () => {
    dispatch(checkOUT());
  };

  const toggle = () => {
    setOpenModal(!openModal);
    setDescription("");
    setOnSite(false);
  };

  const updateTimeSheetData = () => {
    console.log("In update timsheet..");
    if (timelogsWeek.length > 0) {
      console.log("timeSheetData ", timeSheetData);
      let data = timeSheetData;

      timelogsWeek.forEach((timelog) => {
        let rowToBeUpdated = data.findIndex(
          (timesheet) =>
            timesheet.date === moment(timelog.date).format("ddd, DD")
        );

        let updatedCheckIn = timelog.check_in_time
          ? moment(timelog.check_in_time).format("hh:mm A")
          : "--:-- --";
        let updatedCheckOut = timelog.check_out_time
          ? moment(timelog.check_out_time).format("hh:mm A")
          : "--:-- --";
        let updatedTotalHrs = timelog.hours
          ? `${timelog.hours} Hrs`
          : "00:00 Hrs";

        let updatedStart =
          (Number(moment(timelog.check_in_time).format("HH:mm").slice(0, 2)) -
            9) *
          60 +
          Number(moment(timelog.check_in_time).format("HH:mm").slice(3, 5));
        let updatedEnd =
          updatedStart +
          Number(updatedTotalHrs.slice(0, 2) * 60) +
          Number(updatedTotalHrs.slice(3, 5));

        let updatedRow = {
          ...timeSheetData[rowToBeUpdated],
          checkIn: updatedCheckIn,
          checkOut: updatedCheckOut,
          totalHrs: updatedTotalHrs,
          start: updatedStart,
          end: updatedEnd,
        };

        if (rowToBeUpdated !== -1) data[rowToBeUpdated] = updatedRow;
      });
      console.log("Data ", data);
      setTimeSheetData([...data]);
    }
  };

  const handleSelect = (e) => {
    setProject(e.value);
  };

  const checkInPopup = () => {
    return (
      <Modal isOpen={openModal} toggle={toggle} size='md'>
        <ModalHeader
          toggle={toggle}
          className="d-flex justify-content-center"
        >
          <H5> Please confirm your check-in location.</H5>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
            <Btn
              attrBtn={{ className: "btn btn-danger", color: "danger" }}
              onClick={(e) => {
                setOnSite(true);
              }}
            >
              Outside
            </Btn>
            <Btn
              attrBtn={{ className: "btn btn-success", color: "success" }}
              onClick={() => {
                setSubmit(true);
                dispatch(checkIN({ location: "inside office" }));
              }}
            >
              Office
            </Btn>

          </div>
          {onSite && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmit(true);
                dispatch(
                  checkIN({
                    location: "outside office",
                    description: description,
                  })
                );
              }}
            >
              <div className="d-flex flex-column m-t-30 m-b-10">
                <FormGroup>
                  <Label>Please add required remarks</Label>
                  <Input
                    type="textarea"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>

                <Btn
                  className="w-30 m-auto" type="submit"
                  attrBtn={{ className: 'btn btn-light', color: 'light' }}
                >
                  Submit
                </Btn>
              </div>
            </form>
          )}
        </ModalBody>
      </Modal>
    );
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Timesheet" parent="Me" title="Timesheet" />
      <Container fluid={true}>
        <Row className="mb-2">
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ minWidth: "100%" }}
          >
            {/* <div className="">
              <Select
                options={assignedProjects}
                className="js-example-basic-single "
                defaultValue={{ value: "null", label: "Select Project" }}
                //value={}
                onChange={(v) => handleSelect(v)}
              />
            </div> */}
            <div className="flex-fill text-center">
              {timeSheetData.find(log => log.date === moment().format("ddd, DD"))?.shift_type ?? "General"} &#91;09 AM - 06 PM&#93;
            </div>

            <div className="ms-auto">
              {!isCheckedIn ? (
                <Btn
                  attrBtn={{ className: "btn btn-success", color: "success" }}
                  className="d-flex align-items-center"
                  onClick={handleCheckIN}
                  disabled={isCheckedOut}
                >
                  <Clock
                    style={{ width: "18px", height: "18px" }}
                    className="me-2"
                  />
                  Check-in
                </Btn>
              ) : (
                <Btn
                  attrBtn={{ className: "btn btn-danger", color: "danger" }}
                  className="d-flex align-items-center"
                  onClick={handleCheckOUT}
                >
                  <Clock
                    style={{ width: "18px", height: "18px" }}
                    className="me-2"
                  />
                  Check-out
                </Btn>
              )}
            </div>
          </div>
        </Row>
        {/* <Row>{console.log(profile)}</Row> */}
        <Row>
          <Col sm="12">
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.tableRow}>
                  <div></div>
                  <div>Check-in</div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div>Check-out</div>
                  <div>Total Hours</div>
                </div>
              </div>
              <div className={styles.tableBody}>
                {timeSheetData.map((item, key) => {
                  return (
                    <div key={key} className={styles.tableRow}>
                      {item.date === moment().format("ddd, DD") ? (
                        <div
                          className={`${styles.checkInDate} ${styles.active}`}
                        >
                          {`Today, ${moment().format("DD")}`}
                        </div>
                      ) : (
                        <div className={styles.checkInDate}>
                          {/* {console.log(moment().format('ddd'))} */}
                          {item.date}
                        </div>
                      )}
                      <div className={styles.checkInTime}>{item.checkIn}</div>

                      <Circles />

                      <TimeSheetGrid
                        day={item.date}
                        start={item.start}
                        end={item.end}
                      />

                      <Circles />

                      <div className={styles.checkOutTime}>{item.checkOut}</div>
                      <div className={styles.totalHours}>{item.totalHrs}</div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.tableFooter}>
                <div className={styles.tableRow}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div>{ }</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {checkInPopup()}
    </Fragment>
  );
};

export default TimeSheet;

const Circles = () => {
  return (
    <>
      <div className={styles.circles}>
        <div className={styles.bigCircle}></div>
        <div className={styles.smallCircle}></div>
        <div className={styles.bigCircle}></div>
      </div>
    </>
  );
};

const TimeSheetGrid = ({ day, start, end }) => {
  return (
    <>
      <div className={styles.timeSheet}>
        <div className={styles.timeSheetGrid}>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
          <div className={styles.timeSheetGridCell}></div>
        </div>
        <div className={styles.timelineContainer}>
          {/* {console.log(day.toString())} */}
          {day.toString().startsWith("Sun") ||
            day.toString().startsWith("Sat") ? (
            <div
              className={styles.timeline}
              style={{
                gridColumn: `${start} / ${end}`,
                backgroundColor: "#FFE295",
              }}
            >
              <span className={styles.timelineEndPoint}></span>
              <span
                className={`${styles.weekendFlag} ms-auto`}
                style={{ borderColor: "#FFE295" }}
              >
                Weekend
              </span>
              <span className={`${styles.timelineEndPoint} ms-auto`}></span>
            </div>
          ) : (
            <div
              className={styles.timeline}
              style={{
                gridColumn: `${start} / ${end}`,
                backgroundColor: "#BAD6B1",
              }}
            >
              <span className={styles.timelineEndPoint}></span>
              <span className={`${styles.timelineEndPoint} ms-auto`}></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
