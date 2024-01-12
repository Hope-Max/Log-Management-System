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
import {
  createVendor,
  showVendor,
  updateVendor,
} from "../../../../redux/actions/procurementActions";

const AddVendor = (props) => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  const {
    createVendorSuccess,
    updateVendorSuccess,
    vendorData,
    loading,
    error,
  } = useSelector((state) => state.procurementRes);

  const [url, setUrl] = useState("");
  const [date, setDate] = useState(new Date());

  const countryCodes = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (id) {
      dispatch(showVendor(id));
    }
  }, [id]);

  const [payload, setPayload] = useState({
    company_name: vendorData?.company_name ?? "",
    category: vendorData?.category ?? "",
    name: vendorData?.name ?? "",
    email: vendorData?.email ?? "",
    country_code: vendorData?.country_code ?? "",
    phone: vendorData?.phone ?? "",
    address1: vendorData?.address1 ?? "",
    address2: vendorData?.address2 ?? "",
    city: vendorData?.city ?? "",
    state: vendorData?.state ?? "",
    country: vendorData?.country ?? "",
    postal_code: vendorData?.postal_code ?? "",
  });

  console.log("props", payload);

  useEffect(() => {
    if (!isEmpty(vendorData)) {
      setPayload({
        id: vendorData?.id ?? null,
        company_name: vendorData?.company_name ?? "",
        category: vendorData?.category ?? "",
        name: vendorData?.name ?? "",
        email: vendorData?.email ?? "",
        country_code: vendorData?.country_code ?? "",
        phone: vendorData?.phone ?? "",
        address1: vendorData?.address1 ?? "",
        address2: vendorData?.address2 ?? "",
        city: vendorData?.city ?? "",
        state: vendorData?.state ?? "",
        country: vendorData?.country ?? "",
        postal_code: vendorData?.postal_code ?? "",
      });
    }
  }, [vendorData]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(createVendorSuccess).length !== 0) {
        setSubmit(false);
        console.log("LOGALOGA", createVendorSuccess);
        // setStep(1);
        history(`${process.env.PUBLIC_URL}/procurement/vendors`);
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
      }
    }
  }, [createVendorSuccess]);

  useEffect(() => {
    if (submit) {
      if (Object.keys(updateVendorSuccess).length !== 0) {
        setSubmit(false);
        history(`${process.env.PUBLIC_URL}/procurement/vendors`);
      } else if (!!error?.data) {
        setSubmit(false);
        console.log("VERIFY ", error);
        setErrorMsg(error?.data?.msg);
      }
    }
  }, [updateVendorSuccess]);

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
      if (isEmpty(vendorData)) {
        setSubmit(true);
        dispatch(createVendor(payload));
      } else {
        setSubmit(true);
        dispatch(updateVendor(payload));
      }
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Manage Vendor"
        parent="Procurement"
        title="Vendors"
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <H5>{"Vendor Details"}</H5>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <p style={{ color: "red", fontSize: 25 }}>{errorMsg}</p>
                </div>
                <Col sm="12">
                  <Form className="needs-validation" onSubmit={onSubmit}>
                    <div className="form-row">
                      <Row>
                        <Col md="8 mb-3">
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
                        <Col md="4 mb-3">
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
                        <Col md="4 mb-3">
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
                            placeholder="UAE"
                            value={payload?.country}
                            onChange={handleOnChange}
                          />
                          <div className="valid-feedback">{"Looks good!"}</div>
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-end m-t-10" style={{ gap: "1rem" }}>
                        <Btn
                          attrBtn={{
                            color: "primary",
                            className: "d-flex align-items-center ",
                          }}
                          style={{ gap: "0.5rem", paddingInline: "16px 32px" }}
                          onClick={() =>
                            history(`${process.env.PUBLIC_URL}/procurement/vendors`)
                          }
                        >

                          <i className="icofont icofont-reply"></i>
                          {"Cancel"}
                        </Btn>

                        <Btn
                          attrBtn={{
                            color: "primary d-flex align-items-end",
                            type: "submit",
                          }}
                        >
                          {isEmpty(vendorData) ? "Add Vendor" : "Update Vendor"}
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

export default AddVendor;
