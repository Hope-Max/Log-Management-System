import React, { Fragment, useState, useEffect, useContext } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Btn, H4, P } from "../../../AbstractElements";
import {
  EmailAddress,
  EmployeeID,
  ForgotPassword,
  LoginWithJWT,
  Password,
  RememberPassword,
  SignIn,
} from "../../../Constant";

import { Link, useNavigate } from "react-router-dom";
import { Jwt_token } from "../../../Config/Config";
import man from "../../../assets/images/dashboard/profile.png";
import { handleResponse } from "../../../Services/fack.backend";

import CustomizerContext from "../../../_helper/Customizer";
import OtherWay from "./OtherWay";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoginAction } from "../../../redux/actions/authAction";
import {
  HIDE_LOADER,
  SET_INITIAL_AUTH,
  SHOW_LOADER,
} from "../../../redux/actions/types";
import SidebarIcon from "../../../Layout/Sidebar/SidebarIcon";

const LoginTab = ({ selected }) => {
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => {
    return state.auth;
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [auth.loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(localStorage.getItem("Name"));

  useEffect(() => {
    if (auth.loading) {
      dispatch({ type: SHOW_LOADER });
    } else {
      dispatch({ type: HIDE_LOADER });
    }
  }, [auth.loading]);

  useEffect(() => {
    console.log("LOGALOGA", auth.user);
    if (submit) {
      if (Object.keys(auth.user).length !== 0) {
        setSubmit(false);
        console.log("LOGALOGA", auth.user);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
        dispatch({ type: HIDE_LOADER });
        if (auth.user.password_reseted) {
          history(`${process.env.PUBLIC_URL}/set-password`);
        }
        else {
          history(`${process.env.PUBLIC_URL}/dashboard`);
        }
      } else if (!!auth?.error?.data) {
        setSubmit(false);
        console.log("VERIFY ", auth?.error);
        setErrorMsg(auth?.error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [auth]);

  const loginAuth = async (e) => {
    e.preventDefault();
    console.log("preventDefault", email, password);
    // setLoading(true);
    // setValue(man);
    // setName('Emay Walter');
    if (email !== "" && password !== "") {
      setSubmit(true);
      dispatch(
        LoginAction({
          email: email,
          password: password,
        })
      );
    }
  };

  const loginWithJwt = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email, password },
    };

    return fetch("/users/authenticate", requestOptions)
      .then(handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        setValue(man);
        setName("Emay Walter");
        localStorage.setItem("token", Jwt_token);
        window.location.href = `${process.env.PUBLIC_URL}/pages/sample-page/${layoutURL}`;
        return user;
      });
  };

  return (
    <Fragment>
      <Form className="theme-form">
        <H4>{selected === "simpleLogin" ? "Sign In" : "Sign In With Jwt"}</H4>
        {errorMsg ? (
          <p style={{ color: "red" }}>{errorMsg}</p>
        ) : (
          <P>{"Enter your Email Address & Password to login"}</P>
        )}
        <FormGroup>
          <Label className="col-form-label">{"Email Address"}</Label>
          <Input
            className="form-control"
            type="text"
            required=""
            onChange={(e) => {
              setErrorMsg(null);
              setEmail(e.target.value);
            }}
          // defaultValue={'test@gmail.com'}
          />
        </FormGroup>
        <FormGroup className="position-relative">
          <Label className="col-form-label">{Password}</Label>
          <div className="position-relative">
            <Input
              className="form-control"
              type={togglePassword ? "text" : "password"}
              onChange={(e) => {
                setErrorMsg(null);
                setPassword(e.target.value);
              }}
              // defaultValue={'test123'}
              required=""
            />
            <div
              className="show-hide"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              <span className={togglePassword ? "" : "show"}></span>
            </div>
          </div>
        </FormGroup>
        <div className="position-relative form-group mb-0">
          <div className="checkbox">
            <Input id="checkbox1" type="checkbox" />
            <Label className="text-muted" for="checkbox1">
              Remember Me
            </Label>
          </div>
          <a className="link" href>
            {ForgotPassword}
          </a>
          {selected === "simpleLogin" && (
            <Btn
              attrBtn={{
                color: "primary",
                className: "d-block w-100 mt-2",
                disabled: auth.loading ? auth.loading : auth.loading,
                onClick: (e) => loginAuth(e),
              }}
            >
              {auth.loading ? "LOADING..." : SignIn}
            </Btn>
          )}
        </div>
        {/* <OtherWay /> */}
      </Form>
      <hr style={{ marginBlockStart: "30px" }} />
      <div className="d-flex justify-content-center">
        <Link to={`${process.env.PUBLIC_URL}/mfa/login`}>
          {"Login using Passcode"}
        </Link>
      </div>
    </Fragment>
  );
};

export default LoginTab;
