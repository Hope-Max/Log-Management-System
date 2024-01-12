import { Textarea } from "@mobiscroll/react-lite";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Form, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import user1 from "../../../assets/images/user/1.jpg";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import DatePicker from "react-datepicker";
import {
  Breadcrumbs,
  Btn,
  H5,
  Image,
  ToolTip,
  P,
} from "../../../AbstractElements";
import {
  createLeaveRequestAction,
  leaveRequestsListAction,
  leaveQuotaListAction,
  updateLeaveRequestAction,
} from "../../../redux/actions/leaveActions";
import { SET_INITIAL_LEAVE } from "../../../redux/actions/types";
import { getCurrentUser, formatDate, isEmpty } from "../../../redux/constants";
import { leaveTimeType } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { getRemainingLeaveBalance } from "../Me/LeavePage";
import { ListUsers } from "../../../redux/actions/commonApiAction";
import { Link } from "react-router-dom";
import { isWorkingDayForUser } from "../../../Utils";

const LeaveApplication = () => {
  const [date, setDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [startDate, setStartDate] = useState(
    moment(date).startOf("month").format("YYYY-MM-DD")
  );
  const [lastDate, setLastDate] = useState(
    moment(date).endOf("month").format("YYYY-MM-DD")
  );
  const [submit, setSubmit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [users, setUsers] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    createLeaveRequestSuccess,
    leaveQuotaList,
    updateLeaveRequestSuccess,
    leaveRequestsListData,
    error,
  } = useSelector((state) => state.leaveRes);
  const { usersList } = useSelector((state) => state.commonApi);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [payload, setPayload] = useState({
    user_id: getCurrentUser().id,
    leave_type_id: 6,
    quota_id: 1,
    start_date_half: "",
    end_date_half: "",
    start_date: moment(date).format("YYYY-MM-DD"),
    end_date: moment(date).format("YYYY-MM-DD"),
    reason: "required",
  });

  const toggle = () => setModal(!modal);
  const toolTipToggle = () => setIsOpen(!isOpen);
  const toolTipToggle2 = () => setIsOpen2(!isOpen2);
  const dropdownToggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    dispatch(leaveRequestsListAction());
    dispatch(ListUsers());
  }, []);

  useEffect(() => {
    if (submit) {
      if (Object.keys(createLeaveRequestSuccess).length !== 0) {
        setSubmit(false);
        toggle();
        dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
        dispatch(leaveRequestsListAction());
        dispatch(leaveQuotaListAction());
      } else if (!!error?.data) {
        setSubmit(false);
        // setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
      }
    }
  }, [createLeaveRequestSuccess]);

  useEffect(() => {
    if (payload.user_id) {
      dispatch(leaveQuotaListAction(payload.user_id));
    }
  }, [payload.user_id]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateLeaveRequestSuccess).length !== 0) {
        setSubmit(false);
        // toggle();
        dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
        dispatch(leaveRequestsListAction());
        // dispatch(leaveQuotaListAction());
      } else if (!!error?.data) {
        setSubmit(false);
        // setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
      }
    }
  }, [updateLeaveRequestSuccess]);

  const handleDateChange = (action) => {
    if (action === "increase") {
      let newDate = new Date(date.setMonth(date.getMonth() + 1));
      setDate(newDate);
      setCurrentYear(date.getFullYear());
      setStartDate(moment(date).startOf("month").format("YYYY-MM-DD"));
      setLastDate(moment(date).endOf("month").format("YYYY-MM-DD"));
    } else {
      let newDate = new Date(date.setMonth(date.getMonth() - 1));
      setDate(newDate);
      setCurrentYear(date.getFullYear());
      setStartDate(moment(date).startOf("month").format("YYYY-MM-DD"));
      setLastDate(moment(date).endOf("month").format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    if (!isEmpty(leaveQuotaList)) {
      let ll = leaveQuotaList?.map((item) => {
        return {
          label: `${item.name} (${getRemainingLeaveBalance(item)})`,
          value: item?.id,
        };
      });
      setLeaveTypes(ll);
    }
  }, [leaveQuotaList]);

  useEffect(() => {
    let ll = usersList?.map((item) => {
      return { label: `${item.full_name} (${item.employee_id})`, value: item?.id };
    });
    setUsers(ll);
  }, [usersList]);

  const handleOnChange = (e, type = null, name) => {
    console.log("e, type = null, name", e);
    if (type === "select") {
      setPayload({ ...payload, [name]: e.value });
    } else if (type === "date") {
      setPayload({ ...payload, [name]: moment(e).format("YYYY-MM-DD") });
    } else {
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLeaveRequestAction(payload));
    setSubmit(true);
  };

  const leaveRequestsTableColumns = [
    {
      name: "S. No.",
      cell: (row, index) => index + 1,
      width: "4.25rem",
      center: true,
    },
    {
      name: "User",
      selector: (row) => (
        <Media className="d-flex">
          <Image
            attrImage={{
              className: "rounded-circle img-30 me-3",
              src: `${user1}`,
              alt: "Generic placeholder image",
            }}
          />
          <Media body className="align-self-center">
            <div id="TooltipExample">{row?.user?.full_name}</div>
            {/* <Btn attrBtn={{ id: 'TooltipExample' }}>{row?.user?.full_name}</Btn> */}

            <ToolTip
              attrToolTip={{
                placement: "top",
                isOpen: isOpen,
                target: "TooltipExample",
                toggle: toolTipToggle,
              }}
            >
              {row?.user?.full_name}
            </ToolTip>
          </Media>
        </Media>
      ),
      sortable: true,
      center: false,
    },
    {
      name: "Duration",
      selector: (row) =>
        row.end_date
          ? `${formatDate(row.start_date)} - ${formatDate(row.end_date)}`
          : `${formatDate(row.start_date)}`,
      sortable: true,
      center: false,
      grow: 2,
      style: {
        minWidth: 220,
      },
    },
    {
      name: "Type",
      selector: (row) => `${row?.leaveType?.name}`,
      sortable: true,
      center: true,
    },
    {
      name: "Count",
      selector: (row) => `${row.total_days} days`,
      sortable: true,
      center: true,
    },
    {
      name: "Requested Date",
      selector: (row) => `${formatDate(row.created_at)}`,
      sortable: true,
      center: true,
    },
    {
      name: "Reason",
      selector: (row) => (
        <>
          <div id="TooltipExample2">{row?.reason}</div>
          {/* <Btn attrBtn={{ id: 'TooltipExample' }}>{row?.user?.full_name}</Btn> */}

          <ToolTip
            attrToolTip={{
              placement: "top",
              isOpen: isOpen2,
              target: "TooltipExample2",
              toggle: toolTipToggle2,
            }}
          >
            {row?.reason}
          </ToolTip>
        </>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Actioned By",
      selector: (row) =>
        `${row?.actionedBy?.full_name ? row?.actionedBy?.full_name : "Pending"
        }`,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => `${row.status}`,
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Row className="d-flex justify-content-between" style={{ gap: "10px" }}>
          {row.status === "open" && (
            <>
              <Col>
                <Link
                  onClick={() => {
                    setSubmit(true);
                    dispatch(
                      updateLeaveRequestAction({
                        id: row.id,
                        status: "rejected",
                      })
                    );
                  }}
                >
                  <i className="icofont icofont-ui-close"></i>
                </Link>
              </Col>
              <Col>
                <Link
                  onClick={() => {
                    setSubmit(true);
                    dispatch(
                      updateLeaveRequestAction({
                        id: row.id,
                        status: "approved",
                      })
                    );
                  }}
                >
                  <i className="icofont icofont-ui-check"></i>
                </Link>
              </Col>
            </>
          )}
        </Row>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Leave Applications"
        parent="Leave Tracker"
        title="Leave Applications"
      />
      <Container fluid={true}>
        <Row>
          <div className={"flex-space-between"}>
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
              <Btn
                attrBtn={{ className: "btn btn-air-primary", color: "primary" }}
                onClick={toggle}
              >
                Apply Leave
              </Btn>
            </div>
          </div>
        </Row>
        {/* <Row className="m-t-10">
					{leaveTypeData?.map((item, i) => (
						<Col md="2" sm="12" key={i}>
							<SocialWidget data={item} />
							<LeaveWidget data={item} color={'#57B9F6'} series={40} />
						</Col>
					))}
				</Row> */}
        <Row className="m-t-10">
          <Col sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <div className="mainCardHeader">
                    <div className="paddingTop">
                      <p>Leave & Holidays</p>
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTableComponent
                  data={leaveRequestsListData}
                  tableColumns={leaveRequestsTableColumns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Apply leaves</ModalHeader>
        <ModalBody className="m-l-10 m-r-10">
          <Row>
            <Form className="theme-form" onSubmit={handleSubmit}>
              <Row>
                <Col md="6 mb-6">
                  <FormGroup className="form-group">
                    <Label className="col-sm-12 col-form-label text-start">
                      {"Select User.."}
                    </Label>
                    <Select
                      options={users}
                      className="js-example-basic-single col-sm-12"
                      required
                      name="user_id"
                      value={{
                        label: users?.find((obj) => obj.value === payload?.user_id)?.label,
                        value: users?.find((obj) => obj.value === payload?.user_id)?.value
                      }}
                      onChange={(e) => handleOnChange(e, "select", "user_id")}
                    />
                  </FormGroup>
                </Col>
              </Row>
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
              <Row md="12 mb-12" onChange={(e) => setLeaveType(e.target.value)}>
                <FormGroup className="form-group row">
                  <P>{"Do you need leave for ?"}</P>
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
                      Mixed
                    </Label>
                  </Col>
                </FormGroup>
              </Row>
              <Row>
                <Col>
                  <FormGroup className="form-group row">
                    <Label className="col-sm-12 col-form-label text-start">
                      {leaveType === "MIX" ? "Date from*" : "Date*"}
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
                        filterDate={(date) =>
                          isWorkingDayForUser(
                            date,
                            usersList?.find(
                              (user) => user.id === payload?.user_id
                            ).staff_type
                          )
                        }
                        onSelect={(e) =>
                          handleOnChange(e, "date", "start_date")
                        }
                      />
                      <Select
                        options={
                          leaveType === "HD"
                            ? leaveTimeType?.filter((l) => l.value !== "FD")
                            : leaveTimeType
                        }
                        className="js-example-basic-single col-sm-6"
                        value={leaveTimeType?.find(
                          (obj) => obj.value === payload?.start_date_half
                        )}
                        onChange={(e) =>
                          handleOnChange(e, "select", "start_date_half")
                        }
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {leaveType === "MIX" && (
                  <Col>
                    <FormGroup className="form-group row">
                      <Label className="col-sm-12 col-form-label text-start">
                        {"Date to*"}
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
                          minDate={
                            new Date(
                              moment(payload.start_date)
                                .add(1, "days")
                                .format("YYYY-MM-DD")
                            )
                          }
                          filterDate={(date) =>
                            isWorkingDayForUser(
                              date,
                              usersList?.find(
                                (user) => user.id === payload?.user_id
                              ).staff_type
                            )
                          }
                          format="YYYY-MM-DD"
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
    </Fragment>
  );
};

export default LeaveApplication;
