import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./index.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  TabContent,
  TabPane,
  Progress,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Breadcrumbs, Btn, H5, H6, P, Image } from "../../../AbstractElements";
import { Plus, Target, Info, CheckCircle } from "react-feather";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import moment from "moment";
import Autocomplete from "react-google-autocomplete";
// import Geocode from "react-geocode";
import { getCurrentUser, formatDate } from "../../../redux/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  ClientsList,
  createProject,
  listProjects,
} from "../../../redux/actions/projectActions";
import { ListUsers } from "../../../redux/actions/commonApiAction";
import CusClass from "../../Application/Project/Common/CusClass";
import Project from "./Project";
import { point } from "leaflet";

const Projects = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [activeTab, setActiveTab] = useState("1");

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [managers, setManagers] = useState([]);

  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [payload, setPayload] = useState({
    created_by: getCurrentUser().id,
  });
  const [finalPayload, setFinalPayload] = useState({
    start_date: moment(date).format("YYYY-MM-DD"),
    end_date: moment(date).format("YYYY-MM-DD"),
  });

  //Geocode.setApiKey("AIzaSyBSG0yfUw7KXoEBtfeqvnboC4zD_OJQHHY");
  //Geocode.setLanguage("en");

  const { createProjectSuccess, projectsList, clientListData, error } =
    useSelector((state) => state.projectRes);
  const { usersList } = useSelector((state) => state.commonApi);

  useEffect(() => {
    dispatch(ClientsList());
    dispatch(listProjects());
    dispatch(ListUsers());
  }, []);

  useEffect(() => {
    setProjects(projectsList);
  }, [projectsList]);

  useEffect(() => {
    let allClients = clientListData?.map((client) => {
      return { label: client?.full_name, value: client?.id };
    });
    setClients(allClients);
  }, [clientListData]);

  useEffect(() => {
    //console.log("Users: ", usersList)
    let allSupervisors = usersList
      ?.filter((user) => user?.designation?.title === "Site Supervisor")
      ?.map((supervisor) => {
        return { label: supervisor?.full_name, value: supervisor?.id };
      });
    //console.log("Sup", allSupervisors)
    setSupervisors(allSupervisors);
    let allManagers = usersList
      ?.filter((user) => user?.designation?.title === "Site Manager")
      ?.map((manager) => {
        return { label: manager?.full_name, value: manager?.id };
      });
    //console.log("Mana", allManagers)
    setManagers(allManagers);
  }, [usersList]);

  useEffect(() => {
    dispatch(listProjects());
    if (submit) {
      if (Object.keys(createProjectSuccess).length !== 0) {
        setSubmit(false);
        toggle();
        // dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
        // dispatch(leaveRequestsListAction());
        // dispatch(leaveQuotaListAction());
      } else if (!!error?.data) {
        setSubmit(false);
        // console.log(error?.data?.msg)
        //setErrorMsg(error?.data?.msg);
        //dispatch({ type: SET_INITIAL_LEAVE, payload: {} });
      }
    }
  }, [createProjectSuccess]);

  // Enable or disable logs. Its optional.
  //Geocode.enableDebug();

  const toggle = () => setModal(!modal);

  const handleOnChange = (e, type = null, name) => {
    // console.log('e, type = null, name', e);
    if (type === "select") {
      setFinalPayload({ ...finalPayload, [name]: e.value });
    } else if (type === "date") {
      setFinalPayload({
        ...finalPayload,
        [name]: moment(e).format("YYYY-MM-DD"),
      });
    } else {
      //console.log(e.target.name, e.target.value)
      setFinalPayload({ ...finalPayload, [e.target.name]: e.target.value });
    }
    // console.log(finalPayload)
  };

  const handleOnChangeAddress = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    // console.log(payload)
  };

  const setAddressFeilds = (place) => {
    //console.log(payload)
    // console.log("Inside set address")
    let street_number =
      place?.address_components?.find((obj) =>
        obj.types.includes("street_number")
      )?.long_name ?? "";
    let route =
      place?.address_components?.find((obj) => obj.types.includes("route"))
        ?.long_name ?? "";
    let neighborhood =
      place?.address_components?.find((obj) =>
        obj.types.includes("neighborhood")
      )?.long_name ?? "";

    let sublocality_level_1 =
      place?.address_components?.find((obj) =>
        obj.types.includes("sublocality_level_1")
      )?.long_name ?? "";
    let sublocality_level_2 =
      place?.address_components?.find((obj) =>
        obj.types.includes("sublocality_level_2")
      )?.long_name ?? "";
    let sublocality_level_3 =
      place?.address_components?.find((obj) =>
        obj.types.includes("sublocality_level_3")
      )?.long_name ?? "";

    let city =
      place?.address_components?.find((obj) =>
        obj.types.includes("locality" || "administrative_area_level_2")
      )?.long_name ?? "";
    let state =
      place?.address_components?.find((obj) =>
        obj.types.includes("administrative_area_level_1")
      )?.long_name ?? "";
    let postal_code =
      place?.address_components?.find((obj) =>
        obj.types.includes("postal_code")
      )?.long_name ?? "";

    // let address = `${street_number}, ${route}, ${neighborhood}, ${sublocality_level_3}, ${sublocality_level_2}, ${sublocality_level_1}`
    // address = address.replaceAll(/,\1+/g, "").trim(',').trim(' ')

    let address = "";
    if (street_number) address += " " + street_number + ",";
    if (route) address += " " + route + ", ";
    if (neighborhood) address += " " + neighborhood + ",";
    if (sublocality_level_1) address += " " + sublocality_level_1 + ",";
    if (sublocality_level_2) address += " " + sublocality_level_2 + ",";
    if (sublocality_level_3) address += " " + sublocality_level_3;

    address = address
      .trim()
      .replace(/(^,)|(,$)/g, "")
      .trim();

    let latitude = place?.geometry?.location?.lat();
    let longitude = place?.geometry?.location?.lng();

    console.log(place);
    setPayload({
      ...payload,
      address1: address,
      //address2: "",
      city: city,
      state: state,
      postal_code: postal_code,
      lat_long: JSON.parse(
        `{"latitude":${latitude}, "longitude":${longitude}}`
      ),
    });
    //console.log(payload)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject({ ...finalPayload, ...payload }));
    setSubmit(true);
  };

  const filterProjects = (status) => {
    if (status === "all") setProjects(projectsList);
    else {
      let projectsData = projectsList.filter(
        (project) => project.status === status
      );
      setProjects(projectsData);
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Projects" title="All" parent="Projects" />
      <Container fluid={true}>
        <Row className="project-card">
          <Col md="12" className="project-list">
            <Card>
              <Row>
                <Col md="6">
                  <Nav tabs className="border-tab">
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => filterProjects("all")}
                      >
                        <Target />
                        All
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => filterProjects("ongoing")}
                      >
                        <Info />
                        Ongoing
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => filterProjects("done")}
                      >
                        <CheckCircle />
                        Done
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col md="6">
                  <div
                    className={"d-flex justify-content-end align-items-center"}
                  >
                    <Btn
                      attrBtn={{
                        color: "primary d-flex align-items-center",
                        onClick: toggle,
                      }}
                    >
                      <Plus
                        style={{ width: "18px", height: "18px" }}
                        className="me-2"
                      />{" "}
                      {"Add Project"}
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {/* <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <DataTableComponent data={projects} tableColumns={projectTableColumns} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row> */}
        <Row className="project-card">
          <Col sm="12">
            <Card>
              <CardBody>
                <TabContent>
                  <TabPane>
                    <Row>
                      {projects.map((project) => {
                        return (
                          <Col className="col-xxl-4 m-b-25" md="6">
                            <div
                              className="project-box"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history(
                                  `${process.env.PUBLIC_URL}/projects/${project.id}`,
                                  { state: { project_id: project.id } }
                                )
                              }
                            >
                              <span
                                className={`badge ${
                                  project?.status === "done"
                                    ? "badge-light-success"
                                    : "badge-light-danger"
                                }`}
                              >
                                {project.status ?? "ongoing"}
                              </span>

                              <div>
                                <H5>{project.name}</H5>
                                <div className="media mb-10">
                                  {/* <Image attrImage={{ className: 'img-20', src: `${require(`../../../assets/images/map-pin.svg`)}`, alt: '' }} /> */}
                                  <div
                                    className="media-body"
                                    style={{
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <P>{project.complete_address}</P>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <P>
                                  <span className="project-item item-success">
                                    Manager
                                  </span>{" "}
                                  : {project?.pManager?.full_name}
                                </P>
                                <P>
                                  <span className="project-item item-warning">
                                    Supervisor
                                  </span>{" "}
                                  : {project?.sup?.full_name}
                                </P>
                              </div>

                              <div>
                                <span className="item-count">
                                  Assigned Users Count
                                </span>{" "}
                                : {project?.users.length}
                              </div>

                              <div className="project-description">
                                {project?.description}
                              </div>

                              <div className="project-status">
                                <div className="total-hours-worked m-b-15">
                                  --:-- Hours Completed
                                </div>
                                <div className="media mb-0">
                                  <P>
                                    {project.status === "done"
                                      ? 100
                                      : project.progress ?? 0}
                                    %
                                  </P>
                                  <div className="media-body text-end">
                                    <span>Done</span>
                                  </div>
                                </div>
                                {/* <Progress className='sm-progress-bar' color='success' value={0} style={{ height: '5px' }} /> */}
                                {project?.status === "done" ||
                                project?.progress === "100" ? (
                                  <Progress
                                    className="sm-progress-bar"
                                    color="success"
                                    value={project.progress ?? 100}
                                    style={{ height: "5px" }}
                                  />
                                ) : (
                                  <Progress
                                    className="sm-progress-bar"
                                    striped
                                    color="primary"
                                    value={project.progress ?? 0}
                                    style={{ height: "5px" }}
                                  />
                                )}
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Add Project</ModalHeader>
        <ModalBody>
          <Row>
            <div style={{ paddingInline: "1.25rem" }}>
              <Form className="theme-form" onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="col-sm-6 col-form-label text-start">
                        <H6>{"Project Name"}</H6>
                      </Label>
                      <Input
                        className="form-input"
                        name="name"
                        value={finalPayload.name}
                        type="text"
                        placeholder="type here the name of project"
                        onChange={handleOnChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6 mb-4">
                    <FormGroup>
                      <Label className="col-sm-6 col-form-label text-start">
                        <H6>{"Project Type"}</H6>
                      </Label>
                      <Select
                        options={[
                          {
                            label: "Design & Build",
                            value: "Design & Build",
                          },
                          {
                            label: "Build",
                            value: "Build",
                          },
                        ]}
                        className=""
                        name="type"
                        onChange={(e) => handleOnChange(e, "select", "type")}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6 mb-4">
                    <FormGroup>
                      <Label className="col-sm-6 col-form-label text-start">
                        <H6>{"Client Name"}</H6>
                      </Label>
                      <Select
                        options={clients}
                        className=""
                        name="customer_id"
                        onChange={(e) =>
                          handleOnChange(e, "select", "customer_id")
                        }
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6 mb-4">
                    <FormGroup>
                      <Label className="col-sm-12 col-form-label text-start">
                        <H6>{"Supervisor"}</H6>
                      </Label>
                      <Select
                        options={supervisors}
                        className=""
                        name="supervisor"
                        onChange={(e) =>
                          handleOnChange(e, "select", "supervisor")
                        }
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6 mb-4">
                    <FormGroup>
                      <Label className="col-sm-12 col-form-label text-start">
                        <H6>{"Manager"}</H6>
                      </Label>
                      <Select
                        options={managers}
                        className=""
                        name="manager"
                        onChange={(e) => handleOnChange(e, "select", "manager")}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6 mb-4">
                    <FormGroup className="form-group row">
                      <Label className="col-sm-6 col-form-label text-start">
                        <H6>{"Start from"}</H6>
                      </Label>
                      <DatePicker
                        className="form-control digits col-sm-6"
                        name="start_date"
                        value={finalPayload.start_date}
                        format="YYYY-MM-DD"
                        onSelect={(e) =>
                          handleOnChange(e, "date", "start_date")
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6 mb-4">
                    <FormGroup className="form-group row">
                      <Label className="col-sm-6 col-form-label text-start">
                        <H6>{"End to"}</H6>
                      </Label>
                      <DatePicker
                        className="form-control digits col-sm-6"
                        name="end_date"
                        value={finalPayload.end_date}
                        format="YYYY-MM-DD"
                        onSelect={(e) => handleOnChange(e, "date", "end_date")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12 mb-4">
                    <FormGroup>
                      <Label className="col-sm-12 col-form-label text-start">
                        <H6>{"Description"}</H6>
                      </Label>
                      <Input
                        className="form-input"
                        name="description"
                        type="textarea"
                        value={payload.description}
                        placeholder="Give a brief description of the project here ..."
                        onChange={handleOnChange}
                        //required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12 mb-4">
                    <FormGroup className="form-group row">
                      <Label className="col-sm-12 col-form-label text-start">
                        <H6>{"Address"}</H6>
                      </Label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBlockEnd: "2rem",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          {/* <Label className="col-sm-12 col-form-label text-start">{'Address 1'}</Label> */}
                          {/* <Input
                                                        className="form-input"
                                                        name="address1"
                                                        type="text"
                                                        placeholder="Address Line 1"
                                                        onChange={handleOnChange}
                                                    /> */}
                          <div style={{ position: "relative" }}>
                            <Autocomplete
                              apiKey={"AIzaSyBSG0yfUw7KXoEBtfeqvnboC4zD_OJQHHY"}
                              className="form-input"
                              style={{ width: "100%" }}
                              onPlaceSelected={(place) =>
                                setAddressFeilds(place)
                              }
                              options={{
                                types: ["geocode", "establishment"],
                                // componentRestrictions: { country: "SA" }
                              }}
                              placeholder="Search Address here.."
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1.25rem",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          {/* <Label className="col-sm-12 col-form-label text-start">{'Address 1'}</Label> */}
                          <Input
                            className="form-input"
                            name="address1"
                            type="text"
                            value={payload.address1}
                            placeholder="Address Line 1"
                            onChange={handleOnChangeAddress}
                            required
                          />
                          {/* <div style={{ position: 'relative' }}>
                                                        <Autocomplete
                                                            apiKey={'AIzaSyBSG0yfUw7KXoEBtfeqvnboC4zD_OJQHHY'}
                                                            className="form-input"
                                                            style={{ width: "100%" }}
                                                            onPlaceSelected={(place) => setAddressFeilds(place)}
                                                            options={{
                                                                types: ["address"]
                                                                //componentRestrictions: { country: "ind" }
                                                            }}
                                                            value={payload.address1}
                                                        />
                                                    </div> */}
                        </div>
                        <div style={{ width: "100%" }}>
                          {/* <Label className="col-sm-12 col-form-label text-start">{'Address 1'}</Label> */}
                          <Input
                            className="form-input"
                            name="address2"
                            type="text"
                            value={payload.address2}
                            placeholder="Address Line 2"
                            onChange={handleOnChangeAddress}
                          />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="12 mb-4">
                    <FormGroup>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1.25rem",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <Label className="col-sm-12 col-form-label text-start">
                            <H6>{"City"}</H6>
                          </Label>
                          <Input
                            className="form-input"
                            name="city"
                            type="text"
                            placeholder="Ex. Jaipur"
                            onChange={handleOnChangeAddress}
                            value={payload.city}
                            required
                          />
                        </div>
                        <div style={{ width: "100%" }}>
                          <Label className="col-sm-12 col-form-label text-start">
                            <H6>{"State"}</H6>
                          </Label>
                          <Input
                            className="form-input"
                            name="state"
                            type="text"
                            placeholder="Ex. Rajasthan"
                            onChange={handleOnChangeAddress}
                            value={payload.state}
                            required
                          />
                        </div>
                        <div style={{ width: "100%" }}>
                          <Label className="col-sm-12 col-form-label text-start">
                            <H6>{"Postal Code"}</H6>
                          </Label>
                          <Input
                            className="form-input"
                            name="postal_code"
                            type="text"
                            placeholder="Ex. 302002"
                            onChange={handleOnChangeAddress}
                            value={payload.postal_code}
                          />
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                {/* <Row>
                                    <Col md="6 mb-4">
                                        <FormGroup>
                                            <Label className="col-sm-12 col-form-label text-start">
                                                <H6>{'Latitude'}</H6>
                                            </Label>
                                            <Input
                                                className="form-control digits col-sm-6"
                                                name="latitude"
                                                type="text"
                                                value={payload?.lat_long?.latitude}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md="6 mb-4">
                                        <FormGroup>
                                            <Label className="col-sm-12 col-form-label text-start">
                                                <H6>{'Longitude'}</H6>
                                            </Label>
                                            <Input
                                                className="form-control digits col-sm-6"
                                                name="longitude"
                                                type="text"
                                                value={payload?.lat_long?.longitude}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row> */}
                <ModalFooter>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Add Project
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

export default Projects;
