import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../../AbstractElements";
import Profile from "./Profile";
import { getEmployeeProfile } from "../../../../redux/actions/commonApiAction";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const { employeeProfile } = useSelector((state) => state.commonApi);

  const [user, setUser] = useState();

  useEffect(() => {
    dispatch(
      getEmployeeProfile({
        id: id,
      })
    );
  }, []);

  useEffect(() => {
    console.log(employeeProfile);
    setUser(employeeProfile);
  }, [employeeProfile]);

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle={user?.full_name ?? "User Profile"}
        parent="Employee"
        title={user?.employee_id ?? "Emp. ID"}
      />
      <Container fluid={true}>
        <div className="email-wrap bookmark-wrap">
          <Row>
            <Profile user={user} />
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default ProfilePage;
