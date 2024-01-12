import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { Btn, H4, P } from "../../../AbstractElements";
import {
  doesUserExist,
  loginVendor,
  sendOTP,
  verifyOTP,
} from "../../../redux/actions/procurementActions";
import {
  HIDE_LOADER,
  SET_INITIAL_AUTH,
  SHOW_LOADER,
} from "../../../redux/actions/types";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router";
import { isEmpty } from "../../../redux/constants";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const VendorLoginTab = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const {
    loading,
    doesVendorExist,
    vendorData,
    otpSendSuccess,
    otpVerifySuccess,
    error,
  } = useSelector((state) => state.procurementRes);

  const [regForm, setRegForm] = useState(false);
  const [otpForm, setOtpForm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [email, setEmail] = useState(null);
  const [otp, setOTP] = useState("");

  const [payload, setPayload] = useState({
    email: email
  })

  useEffect(() => {
    if (loading) {
      dispatch({ type: SHOW_LOADER });
    } else {
      dispatch({ type: HIDE_LOADER });
    }
  }, [loading]);

  useEffect(() => {
    if (doesVendorExist?.userExists) {
      setSubmit(false);
      dispatch(sendOTP({ email: email }));
      setOtpForm(true);
    }
  }, [doesVendorExist]);

  useEffect(() => {
    if (submit) {
      toast.success(otpSendSuccess.msg);
    }
  }, [otpSendSuccess]);

  useEffect(() => {
    if (Object.keys(otpVerifySuccess).length !== 0) {
      toast.success(otpVerifySuccess.msg);
      dispatch(loginVendor({ email: email }));
    }
  }, [otpVerifySuccess]);

  useEffect(() => {
    if (Object.keys(vendorData).length !== 0) {
      history(`${process.env.PUBLIC_URL}/requirements`);
    }
  }, [vendorData]);

  const loginAuth = async (e) => {
    e.preventDefault();
    if (!isEmpty(email)) {
      setSubmit(true);
      dispatch(doesUserExist({ email: email }));
    } else {
      setErrorMsg("Please Enter valid Email Address")
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    setSubmit(true);
    dispatch(verifyOTP({ email: payload.email ?? email, otp: otp }));
  };

  const register = async (e) => {
    e.preventDefault();
    setSubmit(true);
    dispatch(sendOTP(payload));
    setOtpForm(true);
    setRegForm(false)
  }

  const handleOnChange = (e, type = null, name) => {
    // console.log('NONO', e.target.name, e.target.value);
    if (type === "select") {
      // console.log("name", name, e);
      if (name === "phone") {
        setPayload({
          ...payload,
          country_code: e.split("-")[0],
          phone: e.split("-")[1],
        });
      } else {
        setPayload({ ...payload, [name]: e.value });
      }
    } else if (type === "date") {
      // console.log(e)
      // setPayload({ ...payload, [name]: moment(e).format('YYYY-MM-DD') }); -> use in case of DatePicker
      setPayload({ ...payload, [name]: e.target.value });
    } else {
      // console.log("e", e.target.name, e.target.value);
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {!regForm && !otpForm && (
        <Form className="theme-form" onSubmit={loginAuth}>
          <H4>Sign in to account</H4>
          {errorMsg ? (
            <p style={{ color: "red" }}>{errorMsg}</p>
          ) : (
            <P>{"Enter your email to login"}</P>
          )}
          <FormGroup className="m-t-20 m-b-20">
            <Label className="col-form-label">Email Address</Label>
            <Input
              className="form-control"
              type="text"
              required
              onChange={(e) => {
                setErrorMsg(null);
                setEmail(e.target.value);
              }}
            // defaultValue={'test@gmail.com'}
            />
          </FormGroup>
          <div className="position-relative form-group m-b-30">
            <Btn
              attrBtn={{
                color: "primary",
                className: "d-block w-100 mt-2",
                disabled: loading,
                type: "submit"
              }}
            >
              {loading ? "LOADING..." : "Next"}
            </Btn>
          </div>
          <hr />
          <div style={{ fontSize: "0.8rem", display: "flex", justifyContent: "space-between", gap: "1rem", width: "100%" }}>
            <div className="d-flex justify-content-start">
              <Link to={`${process.env.PUBLIC_URL}/login`}>
                {"Login using Password"}
              </Link>
            </div>
            <div className='text-end' style={{ display: "flex", flexDirection: "column" }}>
              <div>
                Don't have account?
              </div>
              <div>
                <Link
                  className="ms-2"
                  onClick={() => {
                    setRegForm(true)
                    setOtpForm(false)
                  }}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>

        </Form>
      )}

      {otpForm && (
        <Form className="theme-form" onSubmit={verify}>
          <FormGroup className="m-t-20 m-b-20">
            <Label className="col-form-label">Enter OTP</Label>
            <OtpInput
              containerStyle={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              inputStyle={{ width: "3rem", flex: "1", textAlign: "center" }}
              value={otp}
              onChange={setOTP}
              numInputs={6}
              renderSeparator={<span>&nbsp;&nbsp;</span>}
              renderInput={(props) => (
                <input {...props} className="form-input" />
              )}
            />
          </FormGroup>
          <div className="position-relative form-group mb-0">
            <Btn
              attrBtn={{
                color: "primary",
                className: "d-block w-100 mt-2",
                disabled: loading,
                type: "submit"
              }}
            >
              {loading ? "LOADING..." : "Verify"}
            </Btn>
          </div>
        </Form>
      )}
      {regForm && (
        <Form className="needs-validation theme-form" onSubmit={register}>
          <H4>Register account</H4>
          {errorMsg ? (
            <p style={{ color: "red" }}>{errorMsg}</p>
          ) : (
            <P>{"Enter your details to register on our platform"}</P>
          )}
          <hr style={{ marginBottom: "30px" }} />
          <div className="form-row m-t-20">
            <Row>
              <Col md="12 mb-3">
                <Label>{"Company Name"}</Label>
                <input
                  className="form-control"
                  name="company_name"
                  type="text"
                  placeholder="Enter company name"
                  required
                  value={payload?.company_name}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label>{"Category"}</Label>
                <input
                  className="form-control"
                  name="category"
                  type="text"
                  placeholder="ex: Fuel, Food"
                  required
                  value={payload?.category}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label>{"Name"}</Label>
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={payload?.name}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label>Phone Number*</Label>
                <PhoneInput
                  country={"ae"}
                  inputProps={{
                    required: true,
                    name: "country_code",
                  }}
                  inputClass="w-100 form-control"
                  enableSearch
                  value={`${payload?.country_code}${payload?.phone}`}
                  onChange={(phone, country) => {
                    handleOnChange(
                      country.dialCode +
                      "-" +
                      phone.replace(country.dialCode, ""),
                      "select",
                      "phone"
                    );
                  }}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label>{"Email*"}</Label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={payload?.email}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label>Present Address*</Label>
                <input
                  className="form-control"
                  name="address1"
                  type="text"
                  placeholder="322S, GB Rd. Jaipur"
                  required
                  value={payload?.address1}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="12 mb-3">
                <Label>Permanent Address*</Label>
                <input
                  className="form-control"
                  name="address2"
                  type="text"
                  placeholder="322S, GB Rd. Jaipur"
                  required
                  value={payload?.address2}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="6 mb-3">
                <Label>City</Label>
                <input
                  className="form-control"
                  name="city"
                  type="text"
                  placeholder="City name"
                  value={payload?.city}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="6 mb-3">
                <Label>Postal Code</Label>
                <input
                  className="form-control"
                  name="postal_code"
                  maxLength={6}
                  type="text"
                  placeholder="Ex. 786876"
                  required
                  value={payload?.postal_code}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="6 mb-3">
                <Label>State</Label>
                <input
                  className="form-control"
                  name="state"
                  type="text"
                  placeholder="State Name"
                  value={payload?.state}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
              <Col md="6 mb-3">
                <Label>Country</Label>
                <input
                  className="form-control"
                  name="country"
                  type="text"
                  placeholder="UAE"
                  value={payload?.country}
                  onChange={handleOnChange}
                />
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>
            </Row>

            <div className="position-relative form-group m-b-30">
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "d-block w-100 mt-2",
                  disabled: loading,
                  type: "submit"
                }}
              >
                {loading ? "LOADING..." : "Next"}
              </Btn>
            </div>
          </div>
        </Form>
      )}

    </Fragment>
  );
};

export default VendorLoginTab;
