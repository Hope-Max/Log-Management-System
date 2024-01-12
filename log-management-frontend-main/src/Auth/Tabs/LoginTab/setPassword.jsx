import React, { Fragment, useState, useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, TabContent, TabPane } from "reactstrap";
import { Btn, H4, P } from "../../../AbstractElements";

import {
  HIDE_LOADER,
  SET_INITIAL_AUTH,
  SHOW_LOADER,
} from "../../../redux/actions/types";
import { setNewPassword } from "../../../redux/actions/authAction";
import { ToastContainer, toast } from "react-toastify";
import { getProfile } from "../../../redux/actions/commonApiAction";

const SetPassword = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const auth = useSelector((state) => {
    return state.auth;
  });

  const [selected] = useState("set-password");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    if (auth.loading) {
      dispatch({ type: SHOW_LOADER });
    } else {
      dispatch({ type: HIDE_LOADER });
    }
  }, [auth.loading]);

  useEffect(() => {
    console.log("LOGALOGA", auth.newPasswordSuccess);
    if (submit) {
      if (Object.keys(auth.newPasswordSuccess).length !== 0) {
        setSubmit(false);
        setLoading(false);
        console.log("LOGALOGA", auth.newPasswordSuccess);
        dispatch(getProfile());
        toast.success("Password changed Successfully!");
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });

        history(`${process.env.PUBLIC_URL}/dashboard`);
      } else if (!!auth?.error?.data) {
        setSubmit(false);
        console.log("VERIFY ", auth?.error);
        setErrorMsg(auth?.error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [auth]);

  const changePassword = async (e) => {
    e.preventDefault();
    console.log("preventDefault", password, confirmPassword);
    setLoading(true);

    if (password !== "" && confirmPassword !== "") {
      setSubmit(true);
      dispatch(setNewPassword({ password: password }));
    }
  };
  return (
    <>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                {/* <NavAuth callbackNav={callbackNav} selected={selected} /> */}
                <TabContent activeTab={selected} className="content-login">
                  <TabPane className="fade show" tabId={"set-password"}>
                    <Fragment selected={selected}>
                      <Form className="theme-form">
                        <div className="logo-icon-wrapper d-flex align-item-center m-b-20">
                          <img
                            className="img-fluid"
                            src={require("../../../assets/images/logo/logo.png")}
                            alt=""
                          />
                        </div>
                        <H4>{"Set Password"}</H4>
                        {errorMsg ? (
                          <p style={{ color: "red" }}>{errorMsg}</p>
                        ) : (
                          <P>{"Enter a new and strong password"}</P>
                        )}
                        <FormGroup>
                          <Label className="col-form-label">
                            Enter a New Password
                          </Label>
                          <div className="position-relative">
                            <Input
                              className="form-control"
                              type={togglePassword ? "text" : "password"}
                              onChange={(e) => {
                                setErrorMsg(null);
                                setPassword(e.target.value);
                              }}
                              required=""
                            />
                            <div
                              className="show-hide"
                              onClick={() => setTogglePassword(!togglePassword)}
                            >
                              <span
                                className={togglePassword ? "" : "show"}
                              ></span>
                            </div>
                          </div>
                        </FormGroup>
                        <FormGroup className="position-relative">
                          <Label className="col-form-label">
                            Confirm Password
                          </Label>
                          <div className="position-relative">
                            <Input
                              className="form-control"
                              type={togglePassword ? "text" : "password"}
                              onChange={(e) => {
                                setErrorMsg(null);
                                setConfirmPassword(e.target.value);
                              }}
                              required=""
                            />
                            <div
                              className="show-hide"
                              onClick={() => setTogglePassword(!togglePassword)}
                            >
                              <span
                                className={togglePassword ? "" : "show"}
                              ></span>
                            </div>
                          </div>
                        </FormGroup>
                        <div
                          className="position-relative form-group mb-0"
                          style={{ paddingTop: 20 }}
                        >
                          <Btn
                            attrBtn={{
                              color: "primary",
                              className: "d-block w-100 mt-2",
                              disabled:
                                auth.loading || password !== confirmPassword,
                              onClick: (e) => changePassword(e),
                            }}
                          >
                            {auth.loading ? "LOADING..." : "Update Password"}
                          </Btn>
                        </div>
                      </Form>
                    </Fragment>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default SetPassword;
