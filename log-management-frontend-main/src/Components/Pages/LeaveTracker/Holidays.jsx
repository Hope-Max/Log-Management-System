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
} from "../../../AbstractElements";
import {
  createLeaveRequestAction,
  holidaysAction,
  leaveQuotaListAction,
  updateLeaveRequestAction,
  createHolidayAction,
  deleteHolidayAction,
} from "../../../redux/actions/leaveActions";
import { SET_INITIAL_LEAVE } from "../../../redux/actions/types";
import {
  getCurrentUser,
  formatDate,
  isEmpty,
  staffTypes,
} from "../../../redux/constants";
import { leaveTimeType } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { ListUsers } from "../../../redux/actions/commonApiAction";

const Holidays = () => {
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
  const [users, setUsers] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    createHolidaySuccess,
    leaveQuotaList,
    updateLeaveRequestSuccess,
    holidaysListData,
    deleteHolidaySuccess,
    error,
  } = useSelector((state) => state.leaveRes);
  const { usersList } = useSelector((state) => state.commonApi);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [payload, setPayload] = useState({
    start_date: moment(date).format("YYYY-MM-DD"),
    title: "",
    staff_type: "",
  });

  const toggle = () => setModal(!modal);
  const toolTipToggle = () => setIsOpen(!isOpen);
  const toolTipToggle2 = () => setIsOpen2(!isOpen2);
  const dropdownToggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    dispatch(holidaysAction());
    // dispatch(leaveQuotaListAction());
  }, []);

  useEffect(() => {
    if (submit) {
      if (Object.keys(createHolidaySuccess).length !== 0) {
        setSubmit(false);
        toggle();
        dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
        dispatch(holidaysAction());
        dispatch(leaveQuotaListAction());
      } else if (!!error?.data) {
        setSubmit(false);
        // setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
      }
    }
  }, [createHolidaySuccess]);

  useEffect(() => {
    dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
    dispatch(holidaysAction());
    dispatch(leaveQuotaListAction());
  }, [deleteHolidaySuccess]);

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
    dispatch(createHolidayAction(payload));
    setSubmit(true);
  };

  const leaveRequestsTableColumns = [
    {
      name: "Date",
      selector: (row) => `${row.date}`,
      format: (row) => moment(row.date).format("DD MMMM YYYY"),
      sortable: true,
      sortType: "datetime",
      center: false,
    },
    {
      name: "Title",
      selector: (row) => (
        <>
          <div id="TooltipExample2">{row?.title}</div>
          {/* <Btn attrBtn={{ id: 'TooltipExample' }}>{row?.user?.full_name}</Btn> */}

          <ToolTip
            attrToolTip={{
              placement: "top",
              isOpen: isOpen2,
              target: "TooltipExample2",
              toggle: toolTipToggle2,
            }}
          >
            {row?.title}
          </ToolTip>
        </>
      ),
      sortable: true,
    },
    {
      name: "Staff",
      selector: (row) => `${row?.staff_type}`,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>
          <span
            className="m-l-15"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSubmit(true);
              dispatch(
                deleteHolidayAction({
                  date: moment(row.date).format("YYYY-MM-DD"),
                })
              );
            }}
          >
            <i
              className="icofont icofont-ui-delete"
              style={{ color: "red" }}
            ></i>
          </span>
        </>
      ),
      button: true,
      width: "8rem",
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Holidays"
        parent="Leave Tracker"
        title="Holidays"
      />
      <Container fluid={true}>
        <Row>
          <div className={"flex-space-between align-items-center"}>
            <H5>Year {currentYear}</H5>
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
                Add Holiday
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
                  data={holidaysListData}
                  tableColumns={leaveRequestsTableColumns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle} className={"leave-modal-css"}>
        <ModalHeader toggle={toggle}>Apply Holiday</ModalHeader>
        <ModalBody>
          <Row>
            <div>
              <Form className="theme-form" onSubmit={handleSubmit}>
                <Row>
                  <Col md="6 mb-6">
                    <FormGroup className="form-group row">
                      <Label className="col-sm-12 col-form-label text-start">
                        {"Date"}
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
                          value={payload.date}
                          format="YYYY-MM-DD"
                          required
                          onSelect={(e) => handleOnChange(e, "date", "date")}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="form-group">
                      <div className="d-flex row">
                        <Label className="col-sm-6 col-form-label text-start">
                          {"Holiday Title"}
                        </Label>
                        <input
                          className="form-control"
                          name="title"
                          key="title"
                          type="text"
                          placeholder="Holiday Title"
                          value={payload?.title}
                          required
                          onChange={handleOnChange}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup className="form-group">
                      <div className="d-flex row">
                        <Label className="col-sm-6 col-form-label text-start">
                          {"Staff Type"}
                        </Label>
                        <Select
                          options={staffTypes}
                          className="js-example-basic-single col-sm-12"
                          name="visa_type"
                          value={{
                            label: payload?.staff_type,
                            value: payload?.staff_type,
                          }}
                          onChange={(e) =>
                            handleOnChange(e, "select", "staff_type")
                          }
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <ModalFooter>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Add Holiday
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

export default Holidays;
