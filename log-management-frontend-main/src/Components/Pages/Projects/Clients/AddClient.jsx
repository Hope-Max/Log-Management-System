import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Form,
  Label,
  Card,
  Container,
  CardHeader,
  CardBody,
} from "reactstrap";
import Select from "react-select";
import { isEmpty } from "../../../../redux/constants";

import { useNavigate, useParams } from "react-router";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs, Btn, H5, Image, P } from "../../../../AbstractElements";
import {
  createClient,
  getClientDetails,
  updateClient,
} from "../../../../redux/actions/projectActions";

const AddClient = (props) => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  const {
    createClientSuccess,
    updateClientSuccess,
    clientData,
    loading,
    error,
  } = useSelector((state) => state.projectRes);

  const [url, setUrl] = useState("");
  const [date, setDate] = useState(new Date());

  const countryCodes = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (id) {
      dispatch(getClientDetails(id));
    }
  }, [id]);

  const [payload, setPayload] = useState({
    first_name: clientData?.first_name ?? "",
    last_name: clientData?.last_name ?? "",
    email: clientData?.email ?? "",
    country_code: clientData?.country_code ?? "",
    phone: clientData?.phone ?? "",
    address1: clientData?.address1 ?? "",
    address2: clientData?.address2 ?? "",
    city: clientData?.city ?? "",
    state: clientData?.state ?? "",
    country: clientData?.country ?? "",
    postal_code: clientData?.postal_code ?? "",
    company_name: clientData?.company_name ?? "",
  });

  console.log("props", payload);

  useEffect(() => {
    if (!isEmpty(clientData)) {
      setPayload({
        id: clientData?.id ?? null,
        first_name: clientData?.first_name ?? "",
        last_name: clientData?.last_name ?? "",
        email: clientData?.email ?? "",
        country_code: clientData?.country_code ?? "",
        phone: clientData?.phone ?? "",
        address1: clientData?.address1 ?? "",
        address2: clientData?.address2 ?? "",
        city: clientData?.city ?? "",
        state: clientData?.state ?? "",
        country: clientData?.country ?? "",
        postal_code: clientData?.postal_code ?? "",
        company_name: clientData?.company_name ?? "",
      });
    }
  }, [clientData]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(createClientSuccess).length !== 0) {
        setSubmit(false);
        console.log("LOGALOGA", createClientSuccess);
        // setStep(1);
        history(`${process.env.PUBLIC_URL}/projects/clients`);
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
      }
    }
  }, [createClientSuccess]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateClientSuccess).length !== 0) {
        setSubmit(false);
        history(`${process.env.PUBLIC_URL}/projects/clients`);
      } else if (!!error?.data) {
        setSubmit(false);
        console.log("VERIFY ", error);
        setErrorMsg(error?.data?.msg);
      }
    }
  }, [updateClientSuccess]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (payload) {
      console.log("payload", payload);
      if (isEmpty(clientData)) {
        setSubmit(true);
        dispatch(createClient(payload));
      } else {
        setSubmit(true);
        dispatch(updateClient(payload));
      }
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Add Client" parent="Projects" title="Clients" />
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
                      history(`${process.env.PUBLIC_URL}/projects/clients`)
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
                <Col sm="12">
                  <Form className="needs-validation" onSubmit={onSubmit}>
                    <div className="d-flex w-100 justify-content-center m-t-10 m-b-20">
                      <H5 attrH5={{ className: "mb-1" }}>{"Client Details"}</H5>
                    </div>
                    <div className="form-row">
                      <Row>
                        <Col md="4 mb-3">
                          <Label>{"FirstName*"}</Label>
                          <input
                            className="form-control"
                            name="first_name"
                            type="text"
                            placeholder="First name"
                            required
                            value={payload?.first_name}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col md="4 mb-3">
                          <Label>{"LastName*"}</Label>
                          <input
                            className="form-control"
                            name="last_name"
                            type="text"
                            placeholder="Last name"
                            required
                            value={payload?.last_name}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col md="4 mb-3">
                          <Label>Company Name</Label>
                          <input
                            className="form-control"
                            name="company_name"
                            type="text"
                            placeholder="Company Name"
                            value={payload?.company_name}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4 mb-3">
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
                        <Col md="4 mb-3">
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
                        <Col md="4 mb-3">
                          <Label>Postal Code</Label>
                          <input
                            className="form-control"
                            name="postal_code"
                            type="tel"
                            placeholder="786876"
                            maxLength={6}
                            required
                            value={payload?.postal_code}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                        <Col md="6 mb-3">
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
                        <Col md="6 mb-3">
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
                        <Col md="4 mb-3">
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
                        <Col md="4 mb-3">
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
                        <Col md="4 mb-3">
                          <Label>Country</Label>
                          <input
                            className="form-control"
                            name="country"
                            // type="tel"
                            //pattern="\d"
                            // minLength="8"
                            // maxLength="23"
                            placeholder="UAE"
                            value={payload?.country}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end m-t-10">
                        <Btn
                          attrBtn={{
                            color: "primary d-flex align-items-end",
                            type: "submit",
                          }}
                        >
                          {isEmpty(clientData) ? "Add Client" : "Update Client"}
                        </Btn>
                      </div>
                    </div>
                  </Form>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddClient;
