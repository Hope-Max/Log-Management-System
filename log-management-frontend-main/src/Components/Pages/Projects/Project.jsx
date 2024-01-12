import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showProject, assignUser } from "../../../redux/actions/projectActions";
import { Breadcrumbs, H5, P } from "../../../AbstractElements";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Button,
} from "reactstrap";
import Select from "react-select";
import { ListUsers } from "../../../redux/actions/commonApiAction";
import { department } from "../../../redux/constants";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { projectUserTableColumns } from "../../../Data/Table/Defaultdata";

const Project = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //console.log(location.state.project_id)
  const projectId = useParams();

  const [userID, setUserID] = useState(null);
  // const [assignee, setAssignee] = useState(null)
  const [users, setUsers] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const [projectData, setProjectData] = useState(null);
  const [projectID, setProjectID] = useState(projectId?.project);

  const [filteredDepartment, setFilteredDepartment] = useState({
    value: "null",
    label: "Select department",
  });
  const [filteredUser, setFilteredUser] = useState({
    value: "null",
    label: "Select user",
  });

  const { project } = useSelector((state) => state.projectRes);
  const { usersList } = useSelector((state) => state.commonApi);

  useEffect(() => {
    dispatch(showProject({ id: projectID }));
    dispatch(ListUsers());
  }, []);

  useEffect(() => {
    setUsers(usersList);
  }, [usersList]);

  useEffect(() => {
    let options = users?.map((user) => {
      return {
        label: user?.full_name,
        value: user?.id,
      };
    });
    setUserOptions(options);
  }, [users]);

  useEffect(() => {
    setProjectData(project);
  }, [project]);

  useEffect(() => {
    setFilteredUser({ value: "null", label: "Select user" });
    const allUsers = usersList;
    //console.log(allUsers)
    if (filteredDepartment?.value) {
      let filteredUsers = usersList?.filter(
        (item) => item?.department === filteredDepartment?.value
      );
      setUsers(filteredUsers ?? []);
    } else {
      setUsers(allUsers);
    }
  }, [filteredDepartment]);

  // const handleChange = (e) => {
  //     e.preventDefault();
  //     setUserID(Number(e.target.value))
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(assignUser({ project_id: projectID, user_id: userID }));
    setTimeout(() => {
      dispatch(showProject({ id: projectID }));
    }, 100);
  };

  const handleDepartmentFilter = (e) => setFilteredDepartment(e);
  const handleSelect = (e) => {
    setUserID(e.value);
    setFilteredUser(e);
  };

  return (
    <Fragment>
      {console.log(projectData)}
      <Breadcrumbs
        mainTitle={projectData?.name}
        title={projectData?.name}
        parent="Projects"
      />
      <Container fluid={true}>
        <Form className="theme-form" onSubmit={handleSubmit}>
          <Card>
            <CardBody>
              <Row>
                <H5 className="mb-10">Assign User</H5>
              </Row>
              <Row>
                <Col>
                  <Select
                    options={department}
                    className="js-example-basic-single "
                    defaultValue={{ value: "null", label: "Select department" }}
                    value={filteredDepartment}
                    required
                    onChange={(v) => handleDepartmentFilter(v)}
                  />
                </Col>
                <Col>
                  <Select
                    options={userOptions}
                    className="js-example-basic-single "
                    defaultValue={{ value: "null", label: "Select user" }}
                    value={filteredUser}
                    onChange={(v) => handleSelect(v)}
                    required
                  />
                </Col>
                <Col style={{ flex: "0 0 fit-content", marginLeft: "auto" }}>
                  <Button color="primary" type="submit">
                    Assign User
                  </Button>{" "}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </Container>
      <Container fluid={true}>
        {/* {users.map(item => {
                    return <div>{item.first_name}</div>
                })} */}
        <Card>
          <CardHeader>
            <H5>Assigned Users</H5>
          </CardHeader>
          <CardBody>
            <DataTableComponent
              data={projectData?.users ?? []}
              tableColumns={projectUserTableColumns}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Project;
