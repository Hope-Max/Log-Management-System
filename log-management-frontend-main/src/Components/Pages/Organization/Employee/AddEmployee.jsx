import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Breadcrumbs, Btn, P } from "../../../../AbstractElements";

import StepZilla from "react-stepzilla";
import { ArrowLeft } from "react-feather";

import { useNavigate, useParams } from "react-router-dom";

import AddPersonalDetails from "./AddEmployeeForm/AddPersonalDetails";
import AddWorkExperience from "./AddEmployeeForm/AddWorkExperience";
import AddEducationDetails from "./AddEmployeeForm/AddEducationDetails";
import AddDocuments from "./AddEmployeeForm/AddDocuments";
import { useDispatch, useSelector } from "react-redux";
import { SET_INITIAL_AUTH } from "../../../../redux/actions/types";
import { getUserAction } from "../../../../redux/actions/authAction";
import { getRoleBasedAccess, isEmpty } from "../../../../redux/constants";

const AddEmployee = (props) => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  const { createUserSuccess, updateUserSuccess, getUserById, error } =
    useSelector((state) => state.auth);
  console.log("props !!!!!", props);
  useEffect(() => {
    if (submit) {
      if (Object.keys(createUserSuccess).length !== 0) {
        setSubmit(false);
        console.log("LOGALOGA", createUserSuccess);
        setUserId(createUserSuccess?.id);
        setStep(1);
        // history(`${process.env.PUBLIC_URL}/Organization/employee`);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      } else if (!!error?.data) {
        setSubmit(false);
        console.log("VERIFY ", error);
        setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [createUserSuccess]);

  useEffect(() => {
    if (props?.edit) {
      dispatch(getUserAction(id));
    }
  }, [props?.edit]);

  console.log("id id id id", getUserById);

  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem("user"));
    console.log("localUser", localUser, getUserById);
    if (
      localUser &&
      !isEmpty(getUserById) &&
      (localUser?.id == getUserById?.id || [1, 2].includes(localUser.role_id))
    ) {
      return;
    } else if (localUser && !isEmpty(getUserById)) {
      history("/");
    }
  }, [getUserById]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateUserSuccess).length !== 0) {
        setSubmit(false);
        console.log("LOGALOGA", updateUserSuccess);
        setStep((step) => step + 1);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
        // history(`${process.env.PUBLIC_URL}/me/leave`);
      } else if (!!error?.data) {
        setSubmit(false);
        console.log("VERIFY ", error);
        setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [updateUserSuccess]);

  const steps = [
    {
      name: "Personal Details",
      component: (
        <AddPersonalDetails
          submit={submit}
          errorMsg={errorMsg}
          setSubmit={(v) => setSubmit(v)}
          setErrorMsg={(v) => setErrorMsg(v)}
          setUserId={(v) => setUserId(v)}
          setUserData={(v) => setUserData(v)}
          userData={isEmpty(userData) ? getUserById : userData ?? {}}
          userId={userId}
        />
      ),
    },
    {
      name: "Work Experiences",
      component: (
        <AddWorkExperience
          submit={submit}
          errorMsg={errorMsg}
          setSubmit={(v) => setSubmit(v)}
          setErrorMsg={(v) => setErrorMsg(v)}
          setUserData={(v) => setUserData(v)}
          userData={isEmpty(userData) ? getUserById : userData ?? {}}
          userId={userId}
        />
      ),
    },
    {
      name: "Education Details",
      component: (
        <AddEducationDetails
          submit={submit}
          errorMsg={errorMsg}
          setSubmit={(v) => setSubmit(v)}
          setErrorMsg={(v) => setErrorMsg(v)}
          setUserData={(v) => setUserData(v)}
          userData={isEmpty(userData) ? getUserById : userData ?? {}}
          userId={userId}
        />
      ),
    },
    {
      name: "Add Documents",
      component: (
        <AddDocuments
          submit={submit}
          errorMsg={errorMsg}
          setSubmit={(v) => setSubmit(v)}
          setErrorMsg={(v) => setErrorMsg(v)}
          setUserData={(v) => setUserData(v)}
          userData={isEmpty(userData) ? getUserById : userData ?? {}}
          userId={userId}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Employee"
        parent="Organization"
        title="Employee"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <Link to={'organization/employee'}> */}
                  <Btn
                    attrBtn={{
                      color: "primary",
                      className: "d-flex align-items-center ",
                    }}
                    style={{ gap: "0.5rem", paddingInline: "16px 24px" }}
                    onClick={() =>
                      getRoleBasedAccess()
                        ? history(
                            `${process.env.PUBLIC_URL}/organization/employee/${id}`
                          )
                        : history(
                            `${process.env.PUBLIC_URL}/organization/employee`
                          )
                    }
                  >
                    {/* <ArrowLeft
                      style={{ width: "18px", height: "18px" }}
                      className="me-2"
                    />{" "} */}
                    <i className="icofont icofont-reply"></i>
                    {"Exit"}
                  </Btn>
                  {/* </Link> */}
                </div>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <p style={{ color: "red", fontSize: 25 }}>{errorMsg}</p>
                </div>

                <StepZilla
                  steps={steps}
                  showSteps={true}
                  showNavigation={false}
                  stepsNavigation={true}
                  preventEnterSubmission={true}
                  prevBtnOnLastStep={false}
                  dontValidate={true}
                  startAtStep={step}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddEmployee;
